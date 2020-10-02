---
id: layout-api
title: Layout Engine API
sidebar_label: API
---

The single-spa-layout library exposes several javascript functions as a public API.

## Browser

In the browser, single-spa-layout exports the following functions as named exports.

### constructRoutes

The `constructRoutes` API transforms your [Layout Definition](/docs/layout-definition/) into an opaque "resolved routes" object. We call it "opaque" because the shape of the object is irrelevant, as you will only use it when calling other APIs within single-spa-layout.

```js
import { constructRoutes } from 'single-spa-layout';

const htmlTemplate = document.querySelector('#single-spa-template')
const layoutData = {
  props: {
    authToken: "78sf9d0fds89-0fysdiuf6sf8",
    loggedInUser: fetch('/api/user')
  },
  loaders: {
    mainContent: `<img src="loading.gif">`,
    // A single-spa parcel config
    topNav: singleSpaReact({...})
  }
};

const resolvedRoutes = constructRoutes(htmlTemplate, layoutData)
```

**Arguments**

- `routesConfig` (required): Routes config is a [JSON Layout Definition](/docs/layout-definition/#json-layouts), an [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), or a [parse5 HTML element](https://github.com/inikulin/parse5). If it is an HTMLElement, it must be a `<single-spa-router>` element or a `<template>` that contains a single-spa-router element.
- `layoutData` (optional): Layout data is an optionally provided object that defines [props](/docs/layout-definition/#props) and [loaders](/docs/layout-definition/#props) for [HTML Layouts](/docs/layout-definition/#html-layouts). You can omit it if using a [JSON Layout](/docs/layout-definition/#json-layout) or if you do not need to define props or loaders in your HTML Layout. The layoutData object should have top level properties `props` and `loaders` that are each objects. Each of those objects' keys is the name of a prop or loader and its corresponding value.

**Return value**

An opaque `resolvedRoutes` object. It is opaque because you will only use the object when calling other single-spa-layout APIs and do not need to read or modify the resolvedRoutes.

### constructApplications

The `constructApplications` API transforms your `resolvedRoutes` into [single-spa application registration objects](/docs/configuration#registering-applications). These application registration objects are then used to call [singleSpa.registerApplication()](/docs/api/#registerapplication).

```js
import { constructRoutes, constructApplications } from 'single-spa-layout';
import { registerApplication } from 'single-spa';

const resolvedRoutes = constructRoutes(...)
const applications = constructApplications({
  routes: resolvedRoutes,
  loadApp: (app) => System.import(app.name)
})
applications.forEach(registerApplication);
```

**Arguments**

`constructApplications` accepts a single object as an argument, with the following properties:

- `routes` (required): The opaque `resolvedRoutes` object returned from `constructRoutes`.
- `loadApp` (required): A function that is given an application object and must return a [loading function](/docs/configuration/#loading-function-or-application).

**Return value**

`constructApplications` returns an array of [single-spa registration objects](/docs/configuration/#registering-applications).

### constructLayoutEngine

The `constructLayoutEngine` API transforms your `resolvedRoutes` and `applications` into a `layoutEngine` object. The layout engine is responsible for creating, destroying, and rearranging dom elements during route transitions.

```js
import { constructRoutes, constructApplications, constructLayoutEngine } from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

const resolvedRoutes = constructRoutes(...);
const applications = constructApplications(...);
const layoutEngine = constructLayoutEngine({routes: resolvedRoutes, applications: applications});

layoutEngine.isActive(); // true
layoutEngine.deactivate();
layoutEngine.activate();

applications.forEach(registerApplication);
start();
```

**Arguments**

`constructLayoutEngine` accepts a single object as an argument, with the following properties:

- `routes` (required): The opaque `resolvedRoutes` object returned from `constructRoutes`.
- `applications` (required): The array of [application registration objects](/docs/configuration/#registering-applications) returned from `constructApplications`.
- `active` (optional): A boolean that indicates whether the layout engine should start out active or not. Defaults to true.

**Return Value**

A `layoutEngine` object, with the following properties:

- `isActive`: a function that accepts no arguments and returns a boolean indicating whether the layout engine is active or not. When active, the layout engine will change the DOM during route transitions.

- `activate`: a function that accepts no arguments and returns `undefined`. Calling this function activates the layout engine, which includes setting up routing event listeners so that the layout engine can change the DOM during route transitions.
- `deactivate`: a function that accepts no arguments and returns `undefined`. Calling this function deactivates the layout engine, which includes tearing down all routing event listeners so that the layout engine no longer changes the DOM during route transitions.

### matchRoute

The `matchRoute` API primarily exists for server rendering. It returns a filtered `resolvedRoutes` object that contains only the routes that match a particular string path.

```js
import { constructRoutes, matchRoute } from 'single-spa-layout';

const resolvedRoutes = constructRoutes(...);

const settingsRoutes = matchRoute(resolvedRoutes, "/settings")
const dashboardRoutes = matchRoute(resolvedRoutes, "/dashboard")
```

**Arguments**

- `routes` (required): The opaque `resolvedRoutes` object returned from `constructRoutes`.
- `path` (required): A string path representing the URL fragment to match the routes with. Note that the path is not a full URL - it only is the pathname part of a browser's URL. In server rendering contexts, this is often available as `req.url`.

**Return Value**

An opaque `resolvedRoutes` object. It is opaque because you will only use the object when calling other single-spa-layout APIs and do not need to read or modify the resolvedRoutes.

## Server

In NodeJS, single-spa-layout exports the following functions as named exports. Note that the code is published in ESM and therefore won't work in old versions of Node. Additionally, single-spa-layout uses [package entry points](https://nodejs.org/dist/latest-v14.x/docs/api/packages.html#packages_package_entry_points), which are only supported in newer versions of Node.

```js
// Works in newer versions of NodeJS
import 'single-spa-layout';

// Works in older versions of NodeJS
import 'single-spa-layout/dist/esm/single-spa-layout-server.min.js';
```

### constructServerLayout

The `constructServerLayout` api parses an HTML file and prepares it for rendering. This should be done once when the NodeJS server boots up, so the same serverLayout can be reused for all incoming HTTP requests.

```js
import { constructServerLayout } from 'single-spa-layout';

const serverLayout = constructServerLayout({
  // filepath is resolved relative to the cwd (current working directory)
  // of the NodeJS process.
  filePath: "server/views/index.html"
})

// Alternatively, provide the html as a string
const serverLayout = constructServerLayout({
  html: `
    <html>
      <head>
        <single-spa-router>
          <application name="nav"></application>
        </single-spa-router>
      </head>
    </html>
  `
})
```

**Arguments**

`constructServerLayout` accepts a single object argument, with the following properties:

- `filePath` (optional): A string file path to the HTML template file. Relative paths are resolved relative to `process.cwd()`. If `filePath` is omitted, `html` must be provided.
- `html` (optional): An HTML string containing the HTML template. If `html` is omitted, `filePath` must be provided.

**Return Value**

`constructServerLayout` returns an opaque ServerLayout object. This object is then provided to `sendLayoutHTTPResponse`.

### sendLayoutHTTPResponse

The `sendLayoutHTTPResponse` api sends HTTP headers and HTML content to the browser. It streams a full HTML file to the browser, so that the browser shows content as soon as it is available, instead of waiting for the entire HTML document. This is done by providing a [ServerResponse object](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_class_http_serverresponse), or `res` to `sendLayoutHTTPResponse` .

```js
import { constructServerLayout, sendLayoutHTTPResponse } from 'single-spa-layout';
import http from 'http';

const serverLayout = constructServerLayout({...})

http.createServer((req, res) => {
  sendLayoutHTTPResponse({
    res,
    serverLayout,
    urlPath: req.path,
    async renderApplication({ appName, propsPromise }) {
      return `<button>${appName} app</button>`;
    },
    async retrieveApplicationHeaders({ appName, propsPromise }) {
      return {
        'x-custom-header': 'value'
      }
    },
    async renderFragment(fragmentName) {
      return `<script type="systemjs-importmap">{"imports": {}}</script>`;
    },
    async retrieveProp(propName) {
      return "prop value";
    },
    assembleFinalHeaders(allHeaders) {
      allHeaders.forEach(({appProps, appHeaders}) => {
      })

      return {}
    }
  })
})
```

**Arguments**

`sendLayoutHTTPResponse` accepts one object argument, with the following properties:

- `res` (required): A [ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) object. Express `res` objects (and likely other framework-specific objects) are supported.
- `serverLayout` (required): The opaque server layout object returned from `constructServerLayout`.
- `urlPath` (required): A string url path that will be used as the current route. Example: `/settings`
- `assembleFinalHeaders` (required): A function that is passed all application headers and returns the final HTTP headers sent to the browser. The application headers are collected from the `retrieveApplicationHeaders` function into an array of AppHeaders objects. Each AppHeaders object has an `appName` and `appHeaders` object, where the appName is a string and the `appHeaders` is a headers object. `assembleFinalHeaders` must return a headers object.
- `renderApplication` (optional): A function that is given information about a single-spa application and should return the HTML content for that application. This function is required if a single-spa application matches the current route. The argument passed to the renderApplication function is an object with an `appName` string and a `propsPromise` promise. The `propsPromise` resolves with the props for the application. The function can return a string, [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams), or a Promise. Returned promises must resolve with a string or Readable stream.
- `retrieveApplicationHeaders` (optional): A function that is given information about a single-spa application and should return the HTTP response headers for that application. This function is required if a single-spa application matches the current route. The argument passed to the retrieveApplicationHeaders function is an object with an `appName` string and a `propsPromise` promise. The `propsPromise` resolves with the props for the application. The function can a headers object or a Promise that resolves with a headers object.
- `renderFragment` (optional): A function that is given a fragment name and returns the HTML content for that fragment. This corresponds to `<fragment>` elements in the layout definition, and is required if the the layout definition contains a `<fragment>` element. The `renderFragment` function can return a string, [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams), or a Promise. Returned promises must resolve with a string or Readable stream.
- `retrieveProp` (optional): A function that is given a propName and returns the prop's value. This function is required if any rendered applications have props. `retrieveProp` can return a value, or a promise that resolves with a value.

**Return Value**

A promise that resolves when headers (but not necessarily HTTP response body) are sent.