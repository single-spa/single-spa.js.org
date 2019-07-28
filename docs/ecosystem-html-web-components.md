---
id: ecosystem-html-web-components
title: single-spa-html
sidebar_label: HTML / Web Components
---

[single-spa-html](https://travis-ci.org/CanopyTax/single-spa-html) is a helper library for mounting raw html and web components as
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
  template: '<x-my-web-component></x-my-web-component>',
})

singleSpa.registerApplication('name', webComponentApp, () => true)
```

## API / Options
single-spa-html is called with an object that has the following properties:
- `template` (required): An HTML string that will be injected into the DOM during the single-spa mount lifecycle.
- `domElementGetter` (optional): A function that returns the dom element container into which the HTML will be injected. If omitted,
  a default implementation is provided that wraps the template in a `<div>` that is appended to `document.body`.