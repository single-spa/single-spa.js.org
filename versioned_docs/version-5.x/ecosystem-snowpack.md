---
id: ecosystem-snowpack
title: Snowpack
sidebar_label: Snowpack
---

[Snowpack](https://www.snowpack.dev/) is a tool for both local development and the building of applications. It uses in-browser ES modules during development, and then bundles with webpack (or other build tools) for production.

## Example repo

https://github.com/joeldenning/snowpack-single-spa-example

## Overview

Snowpack uses ES modules in local development, but not in production. This works well with single-spa, which encourages using [in-browser modules](/docs/recommended-setup#in-browser-versus-build-time-modules) as the interface for each microfrontend. To use snowpack with single-spa, you must export the [single-spa lifecycle functions](/docs/building-applications#registered-application-lifecycle) from your Snowpack project's `index.js` file and then make a few modifications to the `snowpack.config.js` file.

## Configuration

Modify the `index.js` file to not mount your app immediately, but rather to export the single-spa lifecycles. If using Vue, for example, see https://single-spa.js.org/docs/ecosystem-vue#usage.

The following Snowpack config can be used as the basis for a single-spa + Snowpack setup. It requires installing [systemjs-webpack-interop](https://github.com/joeldenning/systemjs-webpack-interop) and `@snowpack/plugin-webpack`:

```sh
npm install --save-dev systemjs-webpack-interop @snowpack/plugin-webpack

yarn add --dev systemjs-webpack-interop @snowpack/plugin-webpack

pnpm install --save-dev systemjs-webpack-interop @snowpack/plugin-webpack
```

```js
const { merge } = require("webpack-merge");
const SystemJSPublicPathWebpackPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    [
      "@snowpack/plugin-webpack",
      {
        extendConfig(config) {
          delete config.optimization.runtimeChunk;
          delete config.optimization.splitChunks;

          return merge(config, {
            mode: "development",
            module: {
              rules: [
                // This rule is necessary in webpack 4, but breaks things in webpack 5
                // At the time of writing this documentation, @snowpack/plugin-webpack uses webpack 4.
                {
                  parser: {
                    system: false,
                  },
                },
              ],
            },
            output: {
              libraryTarget: "system",
            },
            plugins: [
              new SystemJSPublicPathWebpackPlugin({
                systemjsModuleName: "snowpack-test",
                rootDirectoryLevel: 2,
              }),
            ],
          });
        },
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {},
  buildOptions: {
    baseUrl: "http://localhost:8080/",
  },
};
```

## Local development

Snowpack works well with [development via import map overrides](https://single-spa.js.org/docs/recommended-setup#local-development). You should use http://localhost:8080/index.js as the URL for your import map override.

:::caution
Static Assets currently do not load from the correct URL in development, pending a PR to Snowpack: https://github.com/snowpackjs/snowpack/pull/2407. However, static assets do load from the correct URL in production, due to systemjs-webpack-interop.
:::

## Native Modules vs SystemJS

single-spa works well with native modules, systemjs, or even both. With Snowpack + single-spa, a general recommendation is to use native modules during local development, but SystemJS in production (since browser support for Import Maps is still pending). Doing this is nice because it matches Snowpack's development workflow; however, mixing native and systemjs modules also can have some caveats:

- The browser and SystemJS maintain separate module registries. This means that you can't share imports between SystemJS and native modules. So if you are doing an import map override for a Snowpack application on a page that also uses SystemJS, you may end up with multiple instances of Vue or React (and other shared libraries), which is different than how things will work in production. This is generally okay, except for situations where the Vue instance is modified via `Vue.use()`.
- [This PR to SystemJS](https://github.com/systemjs/systemjs/pull/2187) shows how you can populate native modules into the SystemJS registry, allowing for one-way sharing of modules between the two registries. The PR was closed due to some edge cases, but it generally works. Even though the PR is closed, you can paste the ESM extra into your root config and it will work. If you have interest in driving forward better SystemJS + ESM compatibility, comment on Github or Slack with your interest.