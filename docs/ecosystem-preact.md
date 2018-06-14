---
id: ecosystem-preact
title: single-spa-preact
sidebar_label: Preact
---

Generic lifecycle hooks for Preact applications that are registered as [applications](https://github.com/CanopyTax/single-spa/blob/master/docs/applications.md#registered-applications) of [single-spa](https://github.com/CanopyTax/single-spa).

## Quickstart

First, in the [single-spa application](https://github.com/CanopyTax/single-spa/blob/master/docs/applications.md#registered-applications), run `npm install --save single-spa-preact`. Then, in the application's entry file, add the following.

```js
import preact from 'preact';
import rootComponent from './path-to-root-component.js';
import singleSpaPreact from 'single-spa-preact';

const reactLifecycles = singleSpaPreact({
  preact,
  rootComponent,
  domElementGetter: () => document.getElementById('main-content'),
});

export const bootstrap = [
  preactLifecycles.bootstrap,
];

export const mount = [
  preactLifecycles.mount,
];

export const unmount = [
  preactLifecycles.unmount,
];
```

## Options

All options are passed to single-spa-preact via the `opts` parameter when calling `singleSpaPreact(opts)`. The following options are available:

- `preact`: (required) The main Preact object, which is generally either exposed onto the window or is available via `require('preact')` or `import preact from 'preact'`.
- `rootComponent`: (required) The top level preact component which will be rendered
- `domElementGetter`: (required) A function that takes in no arguments and returns a DOMElement. This dom element is where the Preact application will be bootstrapped, mounted, and unmounted.