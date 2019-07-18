---
id: ecosystem-inferno
title: single-spa-inferno
sidebar_label: Inferno
---

single-spa-inferno is a helper library that helps implement [single-spa registered application](single-spa-config.md#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for for use with [Inferno](https://infernojs.org/). Check out the [single-spa-inferno github](https://github.com/CanopyTax/single-spa-inferno).

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

export const bootstrap = infernoLifecyles.bootstrap;
export const mount = infernoLifecyles.mount;
export const unmount = infernoLifecyles.unmount;
```

## Options

All options are passed to single-spa-inferno via the `opts` parameter when calling `singleSpaInferno(opts)`. The following options are available:

- `inferno`: (required) The main Inferno object, which is generally either exposed onto the window or is available via `require('inferno')` or `import Inferno from 'inferno'`.
- `createElement`: (required) The default export from Inferno's `inferno-create-element` package.
- `rootComponent`: (required) The top level Inferno component which will be rendered.
- `domElementGetter`: (required) A function that takes in no arguments and returns a DOMElement. This dom element is where the Inferno application will be bootstrapped, mounted, and unmounted.