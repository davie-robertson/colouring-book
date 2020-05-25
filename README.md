# \<colouring-book>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i colouring-book
```

## Properties
```html
identity - a string containing a unique ID for each user
onThumbnails - Boolean to show colour on the thumbnail images too
images - an array of URLs for each worksheet
colourPalette - an array of colours that can be used in the component
noPrint - Boolean to disable print
noSave - Boolean to disable save/download to local machine

    const img = ['images/L0_P_U1_IW2.pdf-1.png','images/L0_P_U1_IW2.pdf-2.png'];
    const cols=[
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
            'white'];
    render(
      html`
        <colouring-book noPrint noSave .images=${img} .colourPalette=${cols} onThumbnails> 
        </colouring-book>
    );

```
### Events

The following events are emmited by the component
```html
@image-selected - the 'image' URL selected
@clear-paths - all paths ahave been removed for 'image'
@remove-path - the last drawn path as been removed for 'image'
@add-path - 'path' (array) has been added to 'image'

```

## Usage
```html
<script type="module">
  import 'colouring-book/colouring-book.js';
</script>

<colouring-book></colouring-book>
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

## Demoing with Storybook
To run a local instance of Storybook for your component, run
```bash
npm run storybook
```

To build a production version of Storybook, run
```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
