---
id: ecosystem-html-web-components
title: single-spa-html
sidebar_label: HTML / Web Components
---

[single-spa-html](https://github.com/single-spa/single-spa-html) is a helper library for mounting raw HTML and web components as
single-spa applications or parcels.

## Installation
```sh
npm install --save single-spa-html

# or
yarn add single-spa-html
```

Alternatively, you can use single-spa-html from a CDN as a global variable:
```html
<script src="https://cdn.jsdelivr.net/npm/single-spa-html"></script>
```

Note that you might want to lock down the package to a specific version. See [here](https://cdn.jsdelivr.net/npm/single-spa-html) for
how to do that.

## Usage
### Via npm

```js
import singleSpaHtml from 'single-spa-html';

const htmlLifecycles = singleSpaHtml({
  template: '<x-my-web-component></x-my-web-component>',
})

export const bootstrap = htmlLifecycles.bootstrap;
export const mount = htmlLifecycles.mount;
export const unmount = htmlLifecycles.unmount;
```

### Via cdn
Example usage when installed via CDN:

```js
const webComponentApp = window.singleSpaHtml.default({
  template: props => `<x-my-web-component attr="${props.attr}"></x-my-web-component>`,
})

singleSpa.registerApplication({
  name: 'name',
  app: webComponentApp,
  activeWhen: () => true
})
```

## API / Options
single-spa-html is called with an object that has the following properties:
- `template` (required): An HTML string or a function that returns a string or promise that resolves a string. The function will be called with the single-spa custom props. The returned string is injected into the DOM during the single-spa mount lifecycle.
- `domElementGetter` (optional): A function that is given the single-spa props and returns the dom element container into which the HTML will be injected. If omitted,
  a default implementation is provided that wraps the template in a `<div>` that is appended to `document.body`.
