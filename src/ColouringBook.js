import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import iro from '@jaames/iro';



export class ColouringBook extends LitElement {
    static get styles() {
        return css`
    /*icons*/
    @font-face {
      font-family: 'Material Icons';
      font-style: normal;
      font-weight: 400;
      src: url(https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNZ.ttf) format('truetype');
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 18px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
    }
    .wrapper { 
        width:100%;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;}
    
    /*default theme*/
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
    input[type=range].sizerTool {
  -webkit-appearance: none;
  width: 100%;
  margin: 8.35px 0;
}
input[type=range].sizerTool:focus {
  outline: none;
}
input[type=range].sizerTool::-webkit-slider-runnable-track {
  width: 100%;
  height: 13.3px;
  cursor: pointer;
  box-shadow: 1.4px 1.4px 1.7px #ffb2df, 0px 0px 1.4px #ffccea;
  background: #0091d8;
  border-radius: 25px;
  border: 2.3px solid #dbd58f;
}
input[type=range].sizerTool::-webkit-slider-thumb {
  box-shadow: 4.1px 4.1px 7.2px #27aaff, 0px 0px 4.1px #41b4ff;
  border: 5px solid #ffcd12;
  height: 30px;
  width: 30px;
  border-radius: 12px;
  background: #ffff7d;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -10.65px;
}
input[type=range].sizerTool:focus::-webkit-slider-runnable-track {
  background: #02acff;
}
input[type=range].sizerTool::-moz-range-track {
  width: 100%;
  height: 13.3px;
  cursor: pointer;
  box-shadow: 1.4px 1.4px 1.7px #ffb2df, 0px 0px 1.4px #ffccea;
  background: #0091d8;
  border-radius: 25px;
  border: 2.3px solid #dbd58f;
}
input[type=range].sizerTool::-moz-range-thumb {
  box-shadow: 4.1px 4.1px 7.2px #27aaff, 0px 0px 4.1px #41b4ff;
  border: 5px solid #ffcd12;
  height: 30px;
  width: 30px;
  border-radius: 12px;
  background: #ffff7d;
  cursor: pointer;
}
input[type=range].sizerTool::-ms-track {
  width: 100%;
  height: 13.3px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range].sizerTool::-ms-fill-lower {
  background: #0076af;
  border: 2.3px solid #dbd58f;
  border-radius: 50px;
  box-shadow: 1.4px 1.4px 1.7px #ffb2df, 0px 0px 1.4px #ffccea;
}
input[type=range].sizerTool::-ms-fill-upper {
  background: #0091d8;
  border: 2.3px solid #dbd58f;
  border-radius: 50px;
  box-shadow: 1.4px 1.4px 1.7px #ffb2df, 0px 0px 1.4px #ffccea;
}
input[type=range].sizerTool::-ms-thumb {
  box-shadow: 4.1px 4.1px 7.2px #27aaff, 0px 0px 4.1px #41b4ff;
  border: 5px solid #ffcd12;
  height: 30px;
  width: 30px;
  border-radius: 12px;
  background: #ffff7d;
  cursor: pointer;
  height: 13.3px;
}
input[type=range].sizerTool:focus::-ms-fill-lower {
  background: #0091d8;
}
input[type=range].sizerTool:focus::-ms-fill-upper {
  background: #02acff;
}

    .spacer {
        flex-basis:0;
        flex-grow:1;
    }
    .tools > * {margin:2px}
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

    .paletteColour.eraser { border-color: red; background-image: linear-gradient(135deg,white 43%, red 45%, red 55%, white 57%, white)}

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
    .undoButton > i::after{ content: "undo"}
    .clearButton > i::after{ content: "clear"}
    .printButton > i::after{ content: "print"}
    .saveButton > i::after{ content: "save"}
    `;
    }

    static get properties() {
        return {
            images: { type: Array },
            paletteColours: { type: Array },
            maxBrushSize: { type: Number },
            selectedImage: { type: String }
        };
    }

    constructor() {
        super();
        this.loadIcons();

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
        this.paths = [];
        this.selectedImage = ""
        this.colour = 'Yellow'
    }

    firstUpdated() {
        this.sizer = this.shadowRoot.getElementById('sizerTool');
        this.wrapper = this.shadowRoot.getElementById('wrapper');
        this.canvas = this.shadowRoot.getElementById('canvas');
        this.activeCanvas = this.shadowRoot.getElementById('activeCanvas');
        this.selectImage(this.images[0])
        this._imageChanged()
        this.setCursor()
    }

    selectImage(sourceImg) {
        if (this.selectedImage !== sourceImg) {
            this.selectedImage = sourceImg
            this.img = this.shadowRoot.getElementById(`canvasImage`)
        }

        this.drawCanvas();
    }

    loadIcons() {
        //load Material Icons.
        try {
            let material = new FontFace('Material Icons', 'url(https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNZ.ttf)');
            material.load().then(function (loaded_face) {
                document.fonts.add(loaded_face);
            }).catch(function (error) {
                // error occurred
            });
        }
        catch (err) {
        }
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
        //let cv=jQuery(`<canvas height="${height}" width="${width}" />`)[0];
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
        localStorage.setItem('v2:' + this.selectedImage, JSON.stringify(this.paths));
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
        pos.c = this.colour;
        pos.s = this.sizer.value;
        this.paths.push([pos]);
        this.setCursor();
    }

    mouseUp(e) {
        this.commitActivePath();
        if (this.dragging) localStorage.setItem('v2:' + this.selectedImage, JSON.stringify(this.paths));
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
        if (saveToCanvas == true || path[0].c == (this.paletteColours[this.paletteColours.length - 1])) { ctx = this.ctx; }
        else { ctx = this.activeCtx; }

        if (!path[0].c) { path[0].c = 0; }
        ctx.strokeStyle = path[0].c;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = path[0].s * (this.img.naturalWidth / this.img.width);
        if (path[0].c == this.paletteColours[(this.paletteColours.length - 1)]) {
            /*eraser*/
            ctx.globalCompositeOperation = "destination-out";
            ctx.strokeStyle = `white`;
        } else ctx.globalCompositeOperation = "source-over";
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
            ctx.strokeStyle = path[0].c;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = path[0].s * (this.img.naturalWidth / this.img.width);
            if (path[0].c == (this.paletteColours[(this.paletteColours.length - 1)])) {
                /* eraser*/
                ctx.globalCompositeOperation = "destination-out";
                ctx.strokeStyle = `white`;
            }
            else ctx.globalCompositeOperation = "source-over";
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            path.map(line =>
                ctx.lineTo(line.x, line.y))
            ctx.stroke();
        })
    }

    updateSize() {
        this.setCursor();
    }

    setCursor() {
        let size = this.sizer.value;
        if (size < 2) size = 2;
        if (size > 32) size = 32;
        let canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32
        let context = canvas.getContext('2d');
        context.beginPath();
        context.arc(16, 16, size / 2, 0, 2 * Math.PI, false);
        context.fillStyle = this.colour
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
        let x = window.localStorage.getItem('v2:' + this.selectedImage);
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
        var colorPicker = new iro.ColorPicker(this.shadowRoot.getElementById('picker'));
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
				<input id='sizerTool' class="sizerTool input" type="range" min="1" max="${this.maxBrushSize || 32}" @input=${this.updateSize}>
				<div class="spacer"></div>
				<button class="undoButton button"><i class="material-icons" @click=${this.undo}></i></button>
				<button class="clearButton button"><i class="material-icons" @click=${this.clear}></i></button>
				<button class="printButton button"><i class="material-icons" @click=${this.print}></i></button>
				<button class="saveButton  button"><i class="material-icons" @click=${this.save}></i></button>
			</div>
			<div class="palette">
            <div id="picker"></div>
                ${this.paletteColours.map((col, index) => (html`
                    <div class='paletteColour ${classMap({ eraser: index == this.paletteColours.length - 1 })}' style=${styleMap({ backgroundColor: col })} data-colour='${col}'
                        @click=${(e) => this.selectColour(e)}>
                        <i class="material-icons" 
                        ></i>
                    </div>
                    `))}
            </div>
		</div>
		<div class="canvasWrapper">
        <img id='canvasImage' class='canvasBackgroundImage' src=${this.selectedImage} @load=${this._imageChanged}>
            <canvas id='canvas' class='canvas'></canvas>
            <canvas id='activeCanvas' class='activeCanvas'
            @mousedown=${(e) => this.mouseDown(e)}
            @mouseup=${(e) => this.mouseUp(e)} 
            @mousemove=${(e) => this.mouseMove(e)}
            @touchstart=${(e) => this.touchStart(e)}
            @touchend=${(e) => this.touchEnd(e)}
            @touchmove=${(e) => this.touchMove(e)}
            
            ></canvas>
        </div>
	</div>
    `;
    }
}
