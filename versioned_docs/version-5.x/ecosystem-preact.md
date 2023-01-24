---
id: ecosystem-preact
title: single-spa-preact
sidebar_label: Preact
---

single-spa-preact is a helper library that helps implement [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for for use with [Preact](https://preactjs.com/). Check out the [single-spa-preact github](https://github.com/single-spa/single-spa-preact).

## Installation
```sh
npm install --save preact
```

## Quickstart
In your project's entry file, add the following:

```js
import preact from 'preact';
import rootComponent from './path-to-root-component.js';
import singleSpaPreact from 'single-spa-preact';

const preactLifecycles = singleSpaPreact({
  preact,
  rootComponent,
  domElementGetter: () => document.getElementById('main-content'),
});

export const bootstrap = preactLifecycles.bootstrap;
export const mount = preactLifecycles.mount;
export const unmount = preactLifecycles.unmount;
```

## Options

All options are passed to single-spa-preact via the `opts` parameter when calling `singleSpaPreact(opts)`. The following options are available:

- `preact`: (required) The main Preact object, which is generally either exposed onto the window or is available via `require('preact')` or `import preact from 'preact'`.
- `rootComponent`: (required) The top level preact component which will be rendered
- `domElementGetter`: (optional) A function that is given the single-spa props and returns a DOMElement. This dom element is where the Preact application will be bootstrapped, mounted, and unmounted. If omitted, a div will be created and appended to the body.
