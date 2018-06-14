---
id: ecosystem-inferno
title: single-spa-inferno
sidebar_label: Inferno
---

Generic lifecycle hooks for Inferno applications that are registered as [applications](https://github.com/CanopyTax/single-spa/blob/master/docs/applications.md) of [single-spa](https://github.com/CanopyTax/single-spa).

## Quickstart

First, in the application, run `npm install --save single-spa-inferno`. Then, add the following to your application's entry file.

```js
import Inferno from 'inferno';
import rootComponent from './path-to-root-component.js';
import singleSpaInferno from 'single-spa-inferno';

const infernoLifecycles = singleSpaInferno({
  Inferno,
  createElement,
  rootComponent,
  domElementGetter: () => document.getElementById('main-content'),
});

export const bootstrap = [
  infernoLifecycles.bootstrap,
];

export const mount = [
  infernoLifecycles.mount,
];

export const unmount = [
  infernoLifecycles.unmount,
];
```

## Options

All options are passed to single-spa-inferno via the `opts` parameter when calling `singleSpaInferno(opts)`. The following options are available:

- `inferno`: (required) The main Inferno object, which is generally either exposed onto the window or is available via `require('inferno')` or `import Inferno from 'inferno'`.
- `createElement`: (required) The default export from Inferno's `inferno-create-element` package.
- `rootComponent`: (required) The top level Inferno component which will be rendered.
- `domElementGetter`: (required) A function that takes in no arguments and returns a DOMElement. This dom element is where the Inferno application will be bootstrapped, mounted, and unmounted.