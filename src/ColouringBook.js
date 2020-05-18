import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';
import {
	printIcon,
	clearIcon,
	saveIcon,
	undoIcon,
	framed_mono_eraser,
	framed_colour_eraser,
	framed_colour_pen1,
	framed_colour_pen2,
	framed_colour_pen3,
	framed_colour_pen4,
} from './SvgIcons.js'


export class ColouringBook extends LitElement {
	static get styles() {
		return css`

	mwc-icon-button {
  --mdc-icon-size: 48px; }

	mwc-icon-button-toggle {
  --mdc-icon-size: 48px; }

    .wrapper { 
        width:100%;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;}
    
    /*default theme*/
	.imageNav {
		direction: rtl;
	}

    .imageNav img {
        box-sizing:border-box;
        border:3px solid transparent;
        width:12%; min-width:75px; max-width:150px;
        margin:4px;

    }
    .imageNav img.selected {
        border: 3px solid green; 
      
    }
    .toolbar {
        z-index:100000;
        position: sticky;  position: -webkit-sticky; 
        top: 0;
        background-color: rgba(200,200,200,.1) 
    }
    .tools {
        display:flex;
        justify-content:flex-end;
        flex-wrap:wrap;
        max-width:100%;
    }
    .spacer {
        flex-basis:0;
        flex-grow:1;
    }
    .tools > * {margin:12px}
    .palette {
        display:inline-block;
    }
    .paletteColour {
        text-align:center; 
        height:28px;
        width:28px;
        margin:2px;
        border-radius:50%;
        box-sizing:border-box; 
        border:3px solid rgba(232,232,232,1); 
        display:inline-block; 
        overflow:hidden;
    }
    .paletteColour.selected {
        border-color:black;
        transform: scale(1.2);
    }

    .canvasWrapper {
        display:inline-block;
        position:relative;
        width:100%
    }
    .canvas {
        z-index:1000;
        position:absolute;
        top:0;left:0;
        width:100%;
    }
    .activeCanvas {
        z-index:1001;
        position:absolute;
        top:0;left:0;
        width:100%;
    }
    .canvasBackgroundImage{width:100%}
	
	.form__options {
	border: none;
	padding: 0;
}

.form__question {
	font-size: 25px;
}

.form__answer {
	display: inline-block;
	box-sizing: border-box;


	vertical-align: top;
}

label {
	border: 1px solid rgba(#FAFAFA,.15);

	cursor: pointer;
	opacity: .25;
	transition: all .5s ease-in-out;

}
/* Input style */

input[type="radio"] {
	opacity: 0;
	width: 0;
  	height: 0;
}

input[type="radio"]:active ~ label {
  opacity: 1;
}

input[type="radio"]:checked ~ label {
  opacity: 1;
}
	`;
	}

	static get properties() {
		return {
			images: { type: Array },
			paletteColours: { type: Array },
			maxBrushSize: { type: Number },
			selectedImage: { type: String },
			colour: { type: String },
			noPrint: { type: Boolean },
			noSave: { type: Boolean },
			identity: { type: String},
			_erase: { type: Boolean },
		};
	}

	constructor() {
		super();
		// this.loadIcons();
		this.noSave = false
		this.noPrint = false
		this._erase = false
		this.maxbrushsize = 8
		this.paletteColours = [
			'rgba(87, 87, 87,0.8)',
			'rgba(220, 35, 35,0.8)',
			'rgba(42, 75, 215,0.8)',
			'rgba(29, 105, 20,0.8)',
			'rgba(129, 74, 25,0.8)',
			'rgba(129, 38, 192,0.8)',
			'rgba(160, 160, 160,0.8)',
			'rgba(129, 197, 122,0.8)',
			'rgba(157, 175, 255,0.8)',
			'rgba(41, 208, 208,0.8)',
			'rgba(255, 146, 51,0.8)',
			'rgba(255, 238, 51,0.8)',
			'rgba(233, 222, 187,0.8)',
			'rgba(255, 205, 243,0.8)',
			'white']; // last colour is eraser
		this.dragging = false;
		this.brushSize = 16;
		this.paths = [];
		this.selectedImage = ""
	}

	firstUpdated() {
		this.sizer = this.shadowRoot.getElementById('sizerTool');
		this.wrapper = this.shadowRoot.getElementById('wrapper');
		this.canvas = this.shadowRoot.getElementById('canvas');
		this.activeCanvas = this.shadowRoot.getElementById('activeCanvas');
		this.selectImage(this.images[0]);
		this._imageChanged()
		this.setCursor();
		this.colour=this.paletteColours[0]
		this.setCursor()
	}

	selectImage(sourceImg) {
		if (this.selectedImage !== sourceImg) {
			this.selectedImage = sourceImg
			this.img = this.shadowRoot.getElementById(`canvasImage`)
		}

		this.drawCanvas();
	}

	touchStart(oe) {
		let e = oe.originalEvent;
		let touch = e.touches[0];
		e.clientX = touch.clientX;
		e.clientY = touch.clientY;
		this.mouseDown(e)
	}

	touchEnd(oe) {
		let e = oe.originalEvent;
		this.mouseUp(e);
	}

	touchMove(oe) {
		let e = oe.originalEvent;
		if (e.touches.length >= 2) return true; // allow 2 finger gestures through
		e.preventDefault();
		e.stopPropagation();
		let touch = e.touches[0];
		e.clientX = touch.clientX;
		e.clientY = touch.clientY;
		this.mouseMove(e)
	}


	async print() {
		const dataUrl = await this.getImageData();

		let windowContent = '<!DOCTYPE html>';
		windowContent += '<html>';
		windowContent += '<head><title>Print Your Creation</title></head>';
		windowContent += '<body>';
		windowContent += '<img src="' + dataUrl + '" style="width:100%">';
		windowContent += '</body>';
		windowContent += '</html>';

		const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
		printWin.document.open();
		printWin.document.write(windowContent);
		printWin.document.addEventListener('load', function () {
			printWin.focus();
			printWin.print();
			printWin.document.close();
			printWin.close();
		}, true);
	}

	loadImage(url) {
		return new Promise(resolve => {
			const image = new Image();
			image.addEventListener('load', () => {
				resolve(image);
			});
			image.src = url;
		});
	}

	async getImageData() {
		let height = this.img.naturalHeight;
		let width = this.img.naturalWidth;
		let cv = document.createElement('canvas')
		cv.width = width
		cv.height = height
		let c = cv.getContext('2d');
		c.drawImage(this.img, 0, 0, width, height);
		let i = await this.loadImage(this.canvas.toDataURL('image/png'));
		c.drawImage(i, 0, 0);
		return cv.toDataURL('image/png');
	}

	async save() {
		let link = await this.getImageData();
		var save = document.createElement('a');
		save.href = link;
		save.download = "arabee-worksheet.png";
		document.body.appendChild(save);
		save.click()
		document.getElementsByTagName.removeChild(save);
	}

	clear() {
		this.paths = [];
		localStorage.setItem('v2:' +this.identity + this.selectedImage, JSON.stringify(this.paths));
		this.refresh();
	}

	undo() {
		this.paths.pop();
		this.refresh();
	}

	sizeCanvas() {
		this.sizer = this.shadowRoot.getElementById('sizerTool');
		this.wrapper = this.shadowRoot.getElementById('wrapper');
		this.canvas = this.shadowRoot.getElementById('canvas');
		this.activeCanvas = this.shadowRoot.getElementById('activeCanvas');
		this.canvasPos = this.canvas.getBoundingClientRect();
		this.canvas.height = this.img.naturalHeight;
		this.canvas.width = this.img.naturalWidth;
		this.activeCanvas.height = this.img.naturalHeight;
		this.activeCanvas.width = this.img.naturalWidth;
	}

	getCursorPosition(e) {
		this.canvasPos = this.canvas.getBoundingClientRect();
		let adj = this.canvas.width / this.canvas.offsetWidth;
		return {
			x: (e.clientX - this.canvasPos.left) * adj,
			y: (e.clientY - this.canvasPos.top) * adj,
		};
	}

	mouseDown(e) {
		let pos = this.getCursorPosition(e);
		this.dragging = true;
		this._erase ? pos.c = 'erase' : pos.c = this.colour;
		pos.s = this.brushSize;
		this.paths.push([pos]);
		this.setCursor();
	}

	mouseUp(e) {
		this.commitActivePath();
		if (this.dragging) localStorage.setItem('v2:' +this.identity + this.selectedImage, JSON.stringify(this.paths));
		this.dragging = false;
	}

	mouseMove(e) {
		let pos;
		if (!this.dragging) return;
		pos = this.getCursorPosition(e);
		this.paths[this.paths.length - 1].push(pos); // Append point to current path.
		this.drawActivePath();
	}

	commitActivePath() {
		this.drawActivePath(true);
	}

	clearActivePath() {
		let height = this.img.naturalHeight;
		let width = this.img.naturalWidth;
		let ctx = this.activeCtx;
		ctx.clearRect(0, 0, width, height);
	}

	drawActivePath(saveToCanvas = false) {

		this.clearActivePath();
		let ctx;
		let path = this.paths[this.paths.length - 1];
		if (saveToCanvas == true || path[0].c == 'erase') { ctx = this.ctx; }
		else { ctx = this.activeCtx; }

		if (!path[0].c) { path[0].c = 0; }

		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.lineWidth = path[0].s * (this.img.naturalWidth / this.img.width);
		if (path[0].c == 'erase') {
			/*eraser*/
			ctx.globalCompositeOperation = "destination-out";
			ctx.strokeStyle = `white`;
		} else {
			ctx.globalCompositeOperation = "source-over";
			ctx.strokeStyle = path[0].c;
		}
		ctx.beginPath();
		ctx.moveTo(path[0].x, path[0].y);
		for (let j = 1; j < path.length; ++j)
			ctx.lineTo(path[j].x, path[j].y);
		ctx.stroke();
	}

	refresh() {
		this.clearActivePath()
		let height = this.img.naturalHeight;
		let width = this.img.naturalWidth;
		let ctx = this.ctx;
		ctx.clearRect(0, 0, width, height);
		this.paths.map((path) => {
			if (!path[0].c) { path[0].c = 0; }
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.lineWidth = path[0].s * (this.img.naturalWidth / this.img.width);
			if (path[0].c == 'erase') {
				/* eraser*/
				ctx.globalCompositeOperation = "destination-out";
				ctx.strokeStyle = `white`;
			}
			else {
				ctx.globalCompositeOperation = "source-over";
				ctx.strokeStyle = path[0].c;
			}
			ctx.beginPath();
			ctx.moveTo(path[0].x, path[0].y);
			path.map(line =>
				ctx.lineTo(line.x, line.y))
			ctx.stroke();
		})
	}

	updateSize(size = 8) {
		this.brushSize = size
		this.setCursor();
	}

	setCursor() {
		let size = this.brushSize;
		if (size < 2) size = 2;
		if (size > 32) size = 32;
		let canvas = document.createElement('canvas')
		canvas.width = 32
		canvas.height = 32
		let context = canvas.getContext('2d');
		context.beginPath();
		context.arc(16, 16, size / 2, 0, 2 * Math.PI, false);
		context.fillStyle = this._erase ? 'white' : this.colour
		context.fill();
		context.strokeStyle = 'black'
		context.strokeWidth = 2;
		context.stroke();
		context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
		context.strokeWidth = 2;
		context.beginPath();
		context.moveTo(0, 16)
		context.lineTo(32, 16)
		context.moveTo(16, 0)
		context.lineTo(16, 32)
		context.stroke();
		let url = canvas.toDataURL();
		this.wrapper.style.cursor = `url(${url}) 16 16, pointer`;
	}

	drawCanvas() {
		this.ctx = this.shadowRoot.getElementById('canvas').getContext('2d');
		this.activeCtx = this.shadowRoot.getElementById('activeCanvas').getContext('2d');
	}

	_imageChanged() {
		this.sizeCanvas();
		let x = window.localStorage.getItem('v2:' +this.identity + this.selectedImage);
		if (x) {
			this.paths = JSON.parse(x);
			this.refresh();
		} else {
			this.paths = [];
			this.refresh();
		}
	}

	selectColour(e) {
		this.colour = e.currentTarget.dataset.colour
		if (this._erase) {
			const eraseButton = this.shadowRoot.getElementById('eraser')
			eraseButton.on = false
			this._erase = false
		}
		this.setCursor()
	}

	toggleErase(e) {
		if (this._erase) {
			this.colour = this._oldCol
		} else {
			this._oldCol = this.colour
			this.colour = 'none'
		}
		this._erase = e.detail.isOn;
		this.setCursor()
	}

	render() {
		return html`
		<div id='wrapper' class="wrapper">
		<div class="imageNav">
            ${
			this.images.map(image =>
				html`<img src='${image}' class="${classMap({ selected: this.selectedImage == image })}" @click=${() => this.selectImage(image)}>
                `)
			}
        </div>
		<div class="toolbar">
			<div class="tools">

		<p class="form__answer">
				<input type="radio" name="match" id="match_1" value="2" >
				<label for="match_1" @click=${() => this.updateSize(2)}>
					${framed_colour_pen1}					
				</label></p>
		<p class="form__answer"> 
				<input type="radio" name="match" id="match_2" value="8" checked> 
				<label for="match_2" @click=${() => this.updateSize(8)}>
					${framed_colour_pen2}					
				</label></p>		
		<p class="form__answer"> 
				<input type="radio" name="match" id="match_3" value="16" > 
				<label for="match_3" @click=${() => this.updateSize(16)}>
					${framed_colour_pen3}					
				</label></p>
		<p class="form__answer"> 
				<input type="radio" name="match" id="match_4" value="32" > 
				<label for="match_4" @click=${() => this.updateSize(32)}>
					${framed_colour_pen4}					
				</label></p>

		<mwc-icon-button-toggle id='eraser' @MDCIconButtonToggle:change=${(e) => this.toggleErase(e)}>
		${framed_colour_eraser}
		${framed_mono_eraser}
		</mwc-icon-button-toggle>


		<div class="spacer"></div>
        <mwc-icon-button @click=${this.undo}>${undoIcon}</mwc-icon-button>
        <mwc-icon-button @click=${this.clear}>${clearIcon}</mwc-icon-button>
		
		${!this.noPrint ? html`
		<mwc-icon-button @click=${this.print}>${printIcon}</mwc-icon-button>
		`
				:
				html``
			}
		${!this.noSave ? html`
		<mwc-icon-button @click=${this.save}>${saveIcon}</mwc-icon-button>
		`
				:
				html``
			}

		</div>
			<div class="palette">
                ${this.paletteColours.map((col, index) => (html`
                    <div class='paletteColour ${classMap({ selected: this.colour == col })}'
                    style=${styleMap({ backgroundColor: col })} data-colour='${col}' data-debug="${this.colour} ${col}"
                    @click=${(e) => this.selectColour(e)}>
                    </div>
                  `
			))}
              </div>
            </div>
            <div class="canvasWrapper">
              <img
                id="canvasImage"
                class="canvasBackgroundImage"
                src=${this.selectedImage}
                @load=${this._imageChanged}
              />
              <canvas id="canvas" class="canvas"></canvas>
              <canvas
                id="activeCanvas"
                class="activeCanvas"
                @mousedown=${e => this.mouseDown(e)}
                @mouseup=${e => this.mouseUp(e)}
                @mousemove=${e => this.mouseMove(e)}
                @touchstart=${e => this.touchStart(e)}
                @touchend=${e => this.touchEnd(e)}
                @touchmove=${e => this.touchMove(e)}
              ></canvas>
            </div>
          </div>
        `;
	}
}
