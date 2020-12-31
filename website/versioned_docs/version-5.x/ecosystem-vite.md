---
id: ecosystem-vite
title: Vite
sidebar_label: Vite
---

[Vite](https://github.com/vitejs/vite) is a tool for both local development and the building of applications. It was created within the Vue ecosystem, but can be used with other UI frameworks, too.

## Example repo

https://github.com/joeldenning/vite-single-spa-example

## Overview

By default, Vite uses ES modules in local development, but not in production. This works well with single-spa, which encourages using [in-browser modules](/docs/recommended-setup#in-browser-versus-build-time-modules) as the interface for each microfrontend. To use vite with single-spa, you must export the [single-spa lifecycle functions](/docs/building-applications#registered-application-lifecycle) from your Vite's `main.js` file and then make a few modifications to the `vite.config.js` file.

## Configuration

Modify the `src/main.js` file to not mount your app immediately, but rather to export the single-spa lifecycles. For Vue apps, see https://single-spa.js.org/docs/ecosystem-vue#usage.

Then install the koa cors plugin:

```sh
npm install --save-dev @koa/cors

# alternative
yarn add --dev @koa/cors
```

The following Vite config can be used as the basis for a single-spa + Vite setup:

```js
import cors from '@koa/cors'

export default {
  configureServer: ({ app }) => {
    // The server is only used in dev - not in prod,
    // so allowing any origin is safe.
    app.use(cors({ origin: '*' }));
  },
  rollupInputOptions: {
    // Make sure that rollup captures the exports from your main.js,
    // so that single-spa can find them
    input: 'src/main.js',
    preserveEntrySignatures: true,
  },
  rollupOutputOptions: {
    // Compile the bundle to System.register format, for production usage
    format: 'system',
  },
  // vue template assets will correctly resolve even when you are
  // using import map overrides
  vueTransformAssetUrls: {
    base: 'http://localhost:3000/src/'
  }
}
```

## Local development

Vite works well with [development via import map overrides](https://single-spa.js.org/docs/recommended-setup#local-development). You should use http://localhost:3000/src/main.js as the URL for your import map override.

## Native Modules vs SystemJS

single-spa works well with native modules, systemjs, or even both. With Vite + single-spa, a general recommendation is to use native modules during local development, but SystemJS in production (since browser support for Import Maps is still pending). Doing this is nice because it matches Vite's development workflow; however, mixing native and systemjs modules also can have some caveats:

- The browser and SystemJS maintain separate module registries. This means that you can't share imports between SystemJS and native modules. So if you are doing an import map override for a Vite application on a page that also uses SystemJS, you may end up with multiple instances of Vue (and other shared libraries), which is different than how things will work in production. This is generally okay, except for situations where the Vue instance is modified via `Vue.use()`.
- [This PR to SystemJS](https://github.com/systemjs/systemjs/pull/2187) shows how you can populate native modules into the SystemJS registry, allowing for one-way sharing of modules between the two registries. The PR was closed due to some edge cases, but it generally works. Even though the PR is closed, you can paste the ESM extra into your root config and it will work. If you have interest in driving forward better SystemJS + ESM compatibility, comment on Github or Slack with your interest.