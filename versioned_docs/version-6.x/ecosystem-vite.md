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

Vite works well with [development via import map overrides](https://single-spa.js.org/docs/recommended-setup#local-development). You should use http://localhost:3000/src/main.js as the URL for your import map override. It is important to note, however, that assets such as images and fonts won't load. The import map is only used to load JavaScript, not media files. The import map does not affect asset URL's. Asset URL's are affected by Vite's `base` configuration property, and Vite doesn't respect full URL's in said property while in serve mode (`npm run dev`). While in serve mode, a base with a full URL is stripped down to its path. Therefore, the asset URL's don't really get the correct host URL. The author of [vite-plugin-single-spa](https://www.npmjs.com/package/vite-plugin-single-spa) has opened [a discussion in Vite's GitHub](https://github.com/vitejs/vite/discussions/13927) that you can opt to support by upvoting it.

## Native Modules vs SystemJS

single-spa works well with native modules, systemjs, or even both. With Vite + single-spa, a general recommendation is to use native modules during local development, but SystemJS in production (since browser support for Import Maps is still pending). Doing this is nice because it matches Vite's development workflow; however, mixing native and systemjs modules also can have some caveats:

- The browser and SystemJS maintain separate module registries. This means that you can't share imports between SystemJS and native modules. So if you are doing an import map override for a Vite application on a page that also uses SystemJS, you may end up with multiple instances of Vue (and other shared libraries), which is different than how things will work in production. This is generally okay, except for situations where the Vue instance is modified via `Vue.use()`.
- [This PR to SystemJS](https://github.com/systemjs/systemjs/pull/2187) shows how you can populate native modules into the SystemJS registry, allowing for one-way sharing of modules between the two registries. The PR was closed due to some edge cases, but it generally works. Even though the PR is closed, you can paste the ESM extra into your root config and it will work. If you have interest in driving forward better SystemJS + ESM compatibility, comment on Github or Slack with your interest.

## vite-plugin-single-spa

This is a new entry that is currently in the early stages of development, but shows significant progress ([view in GitHub](https://github.com/WJSoftware/vite-plugin-single-spa)). It claims to be able to convert out-of-the-box Vite projects (regardless of the framework) into single-spa micro-frontend projects and even root config projects. While the single-spa team discourages the use of UI frameworks in root configs, it is indeed an alternative that may interest people.

To convert a Vite project to a root config project, all that is needed is install `vite-plugin-single-spa`, and then use it in `vite.config.ts`. This is a Vite + Vue example:

```typescript
import vitePluginSingleSpa from 'vite-plugin-single-spa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginSingleSpa({
    type: 'root'
    }
  })]
});
```

To convert a Vite project to a micro-frontend project, a similarly minimalistic configuration is needed, plus a file that exports the single-spa lifecycle functions.

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
// @ts-ignore
import singleSpaReact from 'single-spa-react';
import App from './App';
import { cssLifecycle } from 'vite-plugin-single-spa/ex';

const lc = singleSpaReact({
    React,
    ReactDOMClient,
    rootComponent: App,
    errorBoundary(err: any, _info: any, _props: any) {
        return <div>Error: {err}</div>
    }
});

export const bootstrap = [cssLifecycle.bootstrap, lc.bootstrap];
export const mount = [cssLifecycle.mount, lc.mount];
export const unmount = [cssLifecycle.unmount, lc.unmount];
```

### Main Features

- Supports stock Vite projects, regardless of framework.
- Micro-frontend projects behave dually while in serve mode: The micro-frontend can be previewed as a standalone web application with its server URL, or it can be served as a single-spa micro-frontend.
- As seen in the example above, it provides an extra module that automatically mounts and unmounts the CSS referenced by the lifecycle-exporting module (`src/spa.tsx` in the example). **COMING SOON**
- Automatically picks up import maps from `src/importMap.dev.json` and `src/importMap.json`.
- Automatically adds the `import-map-overrides` NPM package, user interface included.

---

**IMPORTANT**: The author of this plug-in does not believe in creating dedicated root config projects. Furthermore, this package will, by default, create import maps for native modules. We at single-spa recommend SystemJS modules. Yes, single-spa is perfectly capable of working with native modules as well.

The opinions of the author of this plug-in in no way represent those of single-spa, and it is an independent work. We present it here as one more option in the Vite ecosystem.
