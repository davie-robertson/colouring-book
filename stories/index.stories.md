```js script
import { html } from '@open-wc/demoing-storybook';
import '../colouring-book.js';

export default {
  title: 'ColouringBook',
  component: 'colouring-book',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# ColouringBook

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add colouring-book
```

```js
import 'colouring-book/colouring-book.js';
```

```js preview-story
export const Simple = () => html`
  <colouring-book></colouring-book>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <colouring-book title="Hello World"></colouring-book>
`;
```
