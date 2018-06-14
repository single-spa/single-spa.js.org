---
id: ecosystem-cycle
title: single-spa-cycle
sidebar_label: Cycle
---

A single-spa plugin for cycle.js applications (adapted from [CanopyTax/single-spa-react](https://github.com/CanopyTax/single-spa-react))

Generic lifecycle hooks for Cycle.js applications that are registered as [child applications](https://github.com/CanopyTax/single-spa/blob/master/docs/child-applications.md) of [single-spa](https://github.com/CanopyTax/single-spa).

## Quickstart

First, in the child application, run `npm install --save @pcmnac/single-spa-cycle`. Then, in your [child app's entry file](https://github.com/CanopyTax/single-spa/blob/docs-1/docs/configuring-child-applications.md#the-entry-file), do the following:

```js

import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import singleSpaCycle from '@pcmnac/single-spa-cycle';
import rootComponent from './root.component.js';

const cycleLifecycles = singleSpaCycle({
	run,
	rootComponent,
	drivers: { DOM: makeDOMDriver(document.getElementById('main-content'))}, // or { DOM: makeDOMDriver('#main-content')}
});

export const bootstrap = [
	cycleLifecycles.bootstrap
];

export const mount = [
	cycleLifecycles.mount
];

export const unmount = [
	cycleLifecycles.unmount
];
```

## Options

All options are passed to single-spa-cycle via the `opts` parameter when calling `singleSpaCycle(opts)`. The following options are available:

- `run`: (required) Cycle.js run function.
- `drivers`: (required) Drivers (including DOM Driver) to be used by your Cycle.js root component.
- `rootComponent`: (required) The top level Cycle.js component which will be rendered