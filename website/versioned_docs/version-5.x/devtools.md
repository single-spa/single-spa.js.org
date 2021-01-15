---
id: devtools
title: single-spa-inspector
sidebar_label: Overview
---

The single-spa-inspector is a Firefox/Chrome devtools extension to provide utilities for helping with [single-spa](https://single-spa.js.org) applications. [Github project](https://github.com/single-spa/single-spa-inspector).

Requires >= single-spa@4.1.

## Installation links

- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/single-spa-inspector/)
- [Chrome](https://chrome.google.com/webstore/detail/single-spa-inspector/emldbibkihanfiaiaghebffnbahjcgcp)

Note: you can also build and run this locally. See [how to contribute](#how-to-contribute).

## Features

- List all registered applications (mounted at top)
- Show all application statuses (statii)
- Force mount and unmount an application
- Show app overlays (see [configuring app overlays](#configuring-app-overlays) to enable this feature)
- Provides an interface for adding [import-map overrides](#import-map-overrides)

## Configuring app overlays

App overlays allow you to hover over a mounted app's name and have an "inspect element" type experience which shows where the app is in the DOM. This is especially useful for when multiple apps are mounted at the same time (e.g. in some places Canopy has upwards of 4 apps mounted on a single page/URL!).

To add app overlays, find the file where you export your lifecycle functions (e.g. `bootstrap`, `mount`, `unmount`) and add another exported object with the following shape:

```js
// must be called "devtools"
export const devtools = {
  overlays: {
    // selectors is required for overlays to work
    selectors: [
      // an array of CSS selector strings, meant to be unique ways to identify the outermost container of your app
      // you can have more than one, for cases like parcels or different containers for differet views
      '#my-app',
      '.some-container .app',
    ],
    // options is optional
    options: {
      // these options allow you some control over how the overlay div looks/behaves
      // the listed values below are the defaults

      width: '100%',
      height: '100%',
      zIndex: 40,
      position: 'absolute',
      top: 0,
      left: 0,
      color: '#000', // the default for this is actually based on the app's name, so it's dynamic. can be a hex or a CSS color name
      background: '#000', // the default for this is actually based on the app's name, so it's dynamic. can be a hex or a CSS color name
      textBlocks: [
        // allows you to add additional text to the overlay. for example, you can add the name of the team/squad that owns this app
        // each string in this array will be in a new div
        // 'blue squad', 'is awesome'
        // turns into:
        // <div>blue squad</div><div>is awesome</div>
      ],
    },
  },
};
```

## import-map-overrides

If your environment uses [import-maps](https://github.com/WICG/import-maps), single-spa Inspector provides an interface for adding import-map overrides when utilizing the [import-map-overrides](https://github.com/joeldenning/import-map-overrides) library. Once the [installation requirements](https://github.com/joeldenning/import-map-overrides#installation) for import-map-overrides are completed, you can add, remove, and refresh the page with your overrides.

![Example of single-spa Inspector extension with import-maps overrides](/img/demo-with-importmapoverrides.png)
