---
id: ecosystem-dojo
title: single-spa-dojo
sidebar_label: Dojo
---

[![Build Status](https://travis-ci.com/single-spa/single-spa-dojo.svg?branch=master)](https://travis-ci.com/single-spa/single-spa-dojo)

single-spa-dojo is a helper library that helps implement [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for use with [Dojo](https://dojo.io/). Check out the [single-spa-dojo github](https://github.com/single-spa/single-spa-dojo).

## Installation
```sh
npm install --save single-spa-dojo

# or
yarn add single-spa-dojo
```

## Quickstart
Your bundler's "entry file" should look like this, which allows your application to be downloaded as an in-browser ES module.

```js
import { renderer } from '@dojo/framework/core/vdom';
import { v, w } from '@dojo/framework/widget-core/d';
import singleSpaDojo from 'single-spa-dojo';
import App from './app';

const dojoLifecycles = singleSpaDojo({
  // required
  renderer,

  // required
  v,

  // required
  w,

  // required
  appComponent: App,

  // optional - see https://dojo.io/learn/creating-widgets/rendering-widgets#mountoptions-properties
  mountOptions: {
    // optional
    registry: myRegistry,

    // optional - one will be provided by single-spa automatically
    domNode: document.getElementById('myContainer'),

    // optional
    sync: true
  }
});

export const bootstrap = dojoLifecycles.bootstrap;
export const mount = dojoLifecycles.mount;
export const unmount = dojoLifecycles.unmount;
```

## Options

All options are passed to single-spa-dojo via the `opts` parameter when calling `singleSpaDojo(opts)`. The following options are available:

- `renderer` (required): The `renderer` function imported from Dojo. See https://dojo.io/learn/creating-widgets/rendering-widgets#rendering-to-the-dom.
- `v` (required): The function used to render dom elements in Dojo. Often JSX hides this function from you, but it can be found at `import { v } from '@dojo/framework/widget-core/d'`.
- `w` (required): The function used to render dom elements in Dojo. Often JSX hides this function from you, but it can be found at `import { w } from '@dojo/framework/widget-core/d'`.
- `appComponent` (required): The class or function for your root Dojo component.
- `mountOptions` (optional): An object of [Dojo MountOptions](https://dojo.io/learn/creating-widgets/rendering-widgets#mountoptions-properties). Note that a `domNode` will be provided by single-spa-dojo, if one is not provided.