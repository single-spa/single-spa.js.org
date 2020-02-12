---
id: recommended-setup
title: The Recommended Setup
sidebar_label: Overview
---

The single-spa npm package is not opinionated about your build tools, CI process, or local development workflow. However, to implement single-spa you will have to figure all of those things out (and more). To help you decide how to approach these problems, the single-spa core team has put together a "recommended setup" that gives an opinionated approach to solving the practical problems of microfrontends.

## Overview
We recommend a setup that uses in-browser ES modules + import maps (or SystemJS to polyfill these if you need better browser support). This setup has several advantages:

1. Common libraries are easy to manage, and are only downloaded once. If you're using SystemJS, you can also preload them for a speed boost as well.
2. Sharing code / functions / variables is as easy as import/export, just like in a monolithic setup
3. Lazy loading applications is easy, which enables you to speed up initial load times
4. Each application (AKA microservice, AKA ES module) can be independently developed and deployed. Teams are enabled to work at their own speed, experiment (within reason as defined by the organization), QA, and deploy on thier own schedules. This usually also means that release cycles can be decreased to days instead of weeks or months
5. A great developer experience (DX): go to your dev environment and add an import map that points the application's url to your localhost. See sections below for details

## Alternatives

[qiankun](https://github.com/umijs/qiankun) is a popular alternative to this recommended setup.

## In-browser versus build-time modules

[Tutorial video](https://www.youtube.com/watch?v=Jxqiu6pdMSU&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=2)

An in-browser javascript module is when imports and exports are not compiled away by your build tool, but instead are
resolved within the browser. This is different from build-time modules, which are supplied by your node_modules and
compiled away before they touch the browser.

The way to tell webpack and rollup to leave some dependencies untouched during the build, so that they come from the browser,
is via [webpack externals](https://webpack.js.org/configuration/externals/#root) and [rollup externals](https://rollupjs.org/guide/en/#external).

Here are our recommendations:

1. Each single-spa application should be an in-browser Javascript module.
2. Large shared dependencies (ie, the react, vue, or angular libraries) should each be in-browser modules.
3. Everything else should be a build-time module.

## Import Maps

[Tutorial video](https://www.youtube.com/watch?v=Lfm2Ge_RUxs&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=3)

[Import Maps](https://github.com/WICG/import-maps) are a browser specification for aliasing "import specifiers" to a URL.
An import specifier is the string indicating which module to load. Examples:

```js
// ./thing.js is the import specifier
import thing from './thing.js';

// react is the import specifier
import React from 'react';
```

Specifiers that are not a URL are called "bare specifiers," such as `import 'react'`. Being able to alias bare specifiers to a URL
is crucial to being able to use in-browser modules, which is why import maps exist.

As of Feb 2020, import maps are only implemented in Chrome, and behind a developer feature toggle. As such, you will need a polyfill
to make import maps work.

## SystemJS

[Tutorial video](https://www.youtube.com/watch?v=AmdKF2UhFzw&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=7)

SystemJS provides polyfill-like behavior for import maps and in-browser modules. It is not a true polyfill of import maps, due to limitations of the javascript language in polyfilling the resolution of bare import specifiers to URLs.

Since SystemJS is only polyfill-like, you'll need to compile your applications into [System.register format](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md) instead of to ESM format. This allows for in-browser modules to be fully emulated in environments that don't support modules or import maps.

To compile your code to System.register format, set webpack's [`output.libraryTarget`](https://webpack.js.org/configuration/output/#outputlibrarytarget) to `"system"`, or set rollup's [`format`](https://rollupjs.org/guide/en/#outputformat) to `"system"`.

Shared dependencies like React, Vue, and Angular, do not publish System.register versions of their libraries. However, you can find System.register versions of the libraries in [the esm-bundle project](https://github.com/esm-bundle) ([blog post](https://medium.com/@joeldenning/an-esm-bundle-for-any-npm-package-5f850db0e04d)). Alternatively, SystemJS is capable of loading them via [global loading](https://github.com/systemjs/systemjs#2-systemjs-loader) or [the AMD and named-exports extras](https://github.com/systemjs/systemjs#extras).

An alternative to SystemJS that provides polyfill behavior for import maps is [es-module-shims](https://github.com/guybedford/es-module-shims). This has the advantage of using truly native ES modules. However, it is not the single-spa core team's recommended approach for production applications, since it requires less-performant in browser parsing and modification of all your bundles.

## Lazy loading

[Tutorial video](https://www.youtube.com/watch?v=-LkvBMpCK-A&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=8)

## Local development

[Tutorial video](https://www.youtube.com/watch?v=vjjcuIxqIzY&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=4)

## Build tools (Webpack / Rollup)

[Tutorial video](https://www.youtube.com/watch?v=I6COIg-2lyM&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=9)

## Utility modules (styleguide, API, etc)

## Shared dependencies

## Deployment

[Tutorial video](https://www.youtube.com/watch?v=QHunH3MFPZs&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=5)

## Continuous Integration (CI)

[Tutorial video](https://www.youtube.com/watch?v=nC7rpDXa4B8&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=6)

## Applications versus parcels

## Inter-app communication

## State management
