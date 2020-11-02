---
id: layout-overview
title: Layout Engine
sidebar_label: Overview
---

## Introduction

[Github repository](https://github.com/single-spa/single-spa-layout/)

The `single-spa-layout` npm package is an optional add-on to single-spa. The layout engine provides a routing API that controls your top level routes, applications, and dom elements. Using single-spa-layout makes it easier to accomplish the following:

- DOM placement and ordering of applications.
- Loading UIs when applications are downloaded.
- Default routes for Not Found / 404 pages.
- Transitions between routes (implementation pending).
- Server side rendering of single-spa applications
- Error pages

In the browser, the layout engine performs two major tasks:

1. Generate [single-spa registration config](/docs/api/#configuration-object) from an HTML Element and/or JSON object.
1. Listen to [routing events](/docs/api/#events) to ensure that all DOM elements are laid out correctly before the single-spa applications are mounted.

On the server, the layout engine performs two tasks:

1. Construct a [server layout object](/docs/layout-api#constructserverlayout) from an HTML template.
2. Send an HTML document (HTTP response headers and body) to the browser, based on the server layout object and current route.

`single-spa-layout` is 3.2kb gzipped (9kb ungzipped).

## Installation

You only need to install the layout engine into your [root config](/docs/configuration/) (not in any other application).

```sh
npm install --save single-spa-layout

# or
yarn add single-spa-layout
```

### Browser / NodeJS support

`single-spa-layout` works in all browsers supported by single-spa, including IE11. On the server, all NodeJS versions that support ESM are supported.

### Requirements

You must use single-spa@>=5.4.0 in order for the layout engine to work. Additionally, you may not provide custom `domElementGetter` functions for any of your single-spa applications, as those override the configuration within single-spa-layout.

## Basic usage

In your root html file, add a `<template>` element to the head. It should have a `<single-spa-router>` element that contains `<route>` elements, `<application>` elements, and any other dom elements:

```html
<html>
  <head>
    <template id="single-spa-layout">
      <single-spa-router>
        <nav class="topnav">
          <application name="@organization/nav"></application>
        </nav>
        <div class="main-content">
          <route path="settings">
            <application name="@organization/settings"></application>
          </route>
          <route path="clients">
            <application name="@organization/clients"></application>
          </route>
        </div>
        <footer>
          <application name="@organization/footer"></application>
        </footer>
      </single-spa-router>
    </template>
  </head>
</html>
```

Then inside of your root-config's JavaScript code, add the following:

```js
import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

const routes = constructRoutes(document.querySelector('#single-spa-layout'));
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
start();
```
