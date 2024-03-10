---
id: ecosystem-riot
title: single-spa-riot
sidebar_label: Riot
---

single-spa-riot is a helper library that helps implement [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for for use with [riot](https://riot.js.org/). Check out the [single-spa-riot github](https://github.com/ariesjia/single-spa-riot).

[![NPM](https://img.shields.io/npm/v/single-spa-riot.svg)](https://www.npmjs.com/package/single-spa-riot)

[![Build Status](https://travis-ci.com/ariesjia/single-spa-riot.svg?branch=master)](https://travis-ci.com/ariesjia/single-spa-riot)

[![minified](https://badgen.net/bundlephobia/minzip/single-spa-riot)](https://bundlephobia.com/result?p=single-spa-riot)

## Installation

```sh
npm install --save single-spa-riot
```

## Usage

```js
import * as Riot from "riot";
import singleSpaRiot from "single-spa-riot";
import App from "./App.riot";

const riotLifecycles = singleSpaRiot({
  rootComponent: Riot.component(App),
  domElementGetter: () => document.getElementById("#app"),
});

export const bootstrap = riotLifecycles.bootstrap;

export const mount = riotLifecycles.mount;

export const unmount = riotLifecycles.unmount;
```

## Options

All options are passed to single-spa-riot via the `opts` parameter when calling `singleSpaRiot(opts)`. The following options are available:

- `domElementGetter`: (required) the callback to get root component mount element.
- `rootComponent`: (optional and replaces `appOptions.loadRootComponent`) the root riot component.
- `loadRootComponent`: (optional and replaces `appOptions.rootComponent`) A promise that resolves with your root component. This is useful for lazy loading.
