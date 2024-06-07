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

The following Vite config can be used as the basis for a single-spa + Vite setup:

```js
import vue from "@vitejs/plugin-vue";

export default {
  rollupOptions: {
    input: "src/main.js",
    format: "system",
    preserveEntrySignatures: true,
  },
  base: "http://localhost:3000",
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: "/src",
        },
      },
    }),
  ],
};
```

## Local development

Vite works well with [development via import map overrides](https://single-spa.js.org/docs/recommended-setup#local-development). You should use http://localhost:3000/src/main.js as the URL for your import map override. It is important to note, however, that assets such as images and fonts require either the `base` or the `server.origin` configuration property to be properly set. The import map is only used to load JavaScript, not media files. The import map does not affect asset URL's. Refer to Vite's documentation for further information on these properties.

## Native Modules vs SystemJS

single-spa works well with native modules, systemjs, or even both. With Vite + single-spa, a general recommendation is to use native modules during local development, but SystemJS in production (since browser support for Import Maps is still pending). Doing this is nice because it matches Vite's development workflow; however, mixing native and systemjs modules also can have some caveats:

- The browser and SystemJS maintain separate module registries. This means that you can't share imports between SystemJS and native modules. So if you are doing an import map override for a Vite application on a page that also uses SystemJS, you may end up with multiple instances of Vue (and other shared libraries), which is different than how things will work in production. This is generally okay, except for situations where the Vue instance is modified via `Vue.use()`.
- [This PR to SystemJS](https://github.com/systemjs/systemjs/pull/2187) shows how you can populate native modules into the SystemJS registry, allowing for one-way sharing of modules between the two registries. The PR was closed due to some edge cases, but it generally works. Even though the PR is closed, you can paste the ESM extra into your root config and it will work. If you have interest in driving forward better SystemJS + ESM compatibility, comment on Github or Slack with your interest.

## vite-plugin-single-spa (v0.7.0)

This is a relatively new plug-in (1 year old as of May, 2024) capable of producing a bundle that conforms to single-spa's specifications for micro-frontend projects that are bundled with Vite.

In a nutshell, any *Vite + [framework of choice]* project created with `npm create vite` can take advantage of this plug-in.  Configuration is usually minimal, and the resulting project will be capable of working as a single-spa micro-frontend and as a standalone project simultaneously (while in *serve* mode).

The plug-in can also be used in root config projects that are bundled wth Vite.

### Main Features

For micro-frontends:

- Supports stock Vite projects, regardless of framework.
- Micro-frontend projects behave dually while in *serve* mode: The micro-frontend can be previewed as a standalone web application with its server URL, or it can be served as a single-spa micro-frontend.
- Provides mounting and unmounting of CSS.  The algorithm:
    + Supports Vite's code splitting
    + Supports parcels
    + Supports mounting the same micro-frontend or parcel multiple times (**read the documentation**)
    + Provides FOUC (flash of unstyled content) prevention

For root config projects:

- Automatically picks up import maps from `src/importMap.dev.json` and `src/importMap.json`.
- Automatically adds the `import-map-overrides` NPM package, user interface included.
- Can merge multiple import map JSON files.

:::info

This plug-in (or better stated, *Vite*), will produce bundles in ES module format by default.  The recommendation when using this plug-in is to **keep it this way**.  However, feel free to add rollup configuration options to request the output in the SystemJS module format if you wish.  Just keep in mind that all of the plug-in's documentation assumes native ES modules.

Also, please remember that Vite, while in serve mode (`npm run dev`) only serves native ES modules.  If you wish to attempt development + HMR (which doesn't work for React, but other frameworks might get lucky), your entire `single-spa` setup needs to be run in ES modules.  This means import maps, root config and all MFE's.

:::

### Root Config Projects

In order to create a vite-based root config project, start by creating a Vite + Svelte project.  Projects based on other frameworks work too, it is just that Svelte projects are very easily cleaned up.

:::tip

While not recommended by single-spa, `vite-plugin-single-spa` can make root config projects out of framework-powered Vite projects.  In other words, cleaning a framework off of the Vite project as described in this section is **optional**.

:::

After creating the project, open `package.json` and remove the lines shown below (this may change over time as the `create-vite` package is updated, so always double check for new things to clean):

```json
{
  "name": "my-vite-based-root-config",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    // ---------- DELETE 1 LINE ----------
    "check": "svelte-check --tsconfig ./tsconfig.json"
  },
  "devDependencies": {
    // ---------- DELETE 4 LINES ----------
    "@sveltejs/vite-plugin-svelte": "^3.0.2",
    "@tsconfig/svelte": "^5.0.2",
    "svelte": "^4.2.12",
    "svelte-check": "^3.6.7",

    "tslib": "^2.6.2",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
```

> The sample above comes from a Vite + Svelte + TypeScript project.  It may vary for a JavaScript project.

Now delete all Svelte code.  In the project sample generated for this write-up, it is:

+ `src/App.svelte`
+ `src/lib/Counter.svelte`
+ `src/main.ts` (or clean it up)

If you deleted `src/main.ts`, then remove the line `<script type="module" src="/src/main.ts"></script>` from `/index.html`.

For the TypeScript template, open `/tsconfig.json` and remove the line `"extends": "@tsconfig/svelte/tsconfig.json",`.

Finally, open `vite.config.ts`.  Remove the lines marked below:

```typescript
import { defineConfig } from 'vite'
// ---------- DELETE 1 LINE ----------
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  // ---------- DELETE 1 LINE ----------
  plugins: [svelte()],
})
```

At this point, you should be able to install packages and build successfully.  If true, add `vite-plugin-single-spa` and configure it:

```typescript
import { defineConfig } from 'vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginSingleSpa({
    type: 'root',
    imo: '3.1.1'
  })]
})
```

Follow the plug-in instructions on how to add import maps and any other details that your particular case may need.

### Micro-Frontend Projects

To convert a Vite project to a micro-frontend project, very little configuration is needed, plus a file that exports the single-spa lifecycle functions.

```typescript
// vite.config.ts for a Vite + React project

import react from "@vitejs/plugin-react";
import vitePluginSingleSpa from "vite-plugin-single-spa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginSingleSpa({
      serverPort: 4101,
      spaEntryPoints: "src/spa.tsx",
    }),
  ],
});
```

```typescript
// src/spa.tsx

import React from 'react';
import ReactDOMClient from 'react-dom/client';
// @ts-expect-error
import singleSpaReact from 'single-spa-react';
import App from './App';
import { cssLifecycleFactory } from 'vite-plugin-single-spa/ex';

const lc = singleSpaReact({
    React,
    ReactDOMClient,
    rootComponent: App,
    errorBoundary(err: any, _info: any, _props: any) {
        return <div>Error: {err}</div>
    }
});

// IMPORTANT:  The argument passed here depends on the file name.
const cssLc = cssLifecycleFactory('spa');

export const bootstrap = [cssLc.bootstrap, lc.bootstrap];
export const mount = [cssLc.mount, lc.mount];
export const unmount = [cssLc.unmount, lc.unmount];
```
Using `cssLifecycleFactory` is **not** required.  You may use your own or a third-party CSS mounting algorithm if you want.