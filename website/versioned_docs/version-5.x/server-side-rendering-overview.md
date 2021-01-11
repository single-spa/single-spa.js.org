---
id: ssr-overview
title: Server Side Rendering
sidebar_label: Overview
---

## Intro to SSR

In the context of single page applications (SPAs), server-side rendering (SSR) refers to dynamic generation of the HTML page that is sent from web server to browser. In a single page application, the server only generates the very first page that the user requests, leaving all subsequent pages to be rendered by the browser.

To accomplish server-side rendering of an SPA, javascript code is executed in NodeJS to generate the initial HTML. In the browser, the same javascript code is executed during a "hydration" process, which attaches event listeners to the HTML. Most popular UI Frameworks (Vue, React, Angular, etc) are capable of executing in both NodeJS and the browser, and offer APIs for both generating the server HTML and hydrating it in the browser. Additionally, there are popular frameworks such as NextJS and Nuxt which simplify the developer experience of server-side rendering.

In the context of microfrontends, server-side rendering refers to assembling the HTML from multiple, separate microfrontends. Each microfrontend controls a fragment of the HTML sent from web server to browser, and hydrate their fragment once initialized in the browser.

## Purpose

A primary purpose of server-side rendering is improved performance. Server rendered pages often display their content to users faster than their static counterparts, since the user is presented with the content before javascript resources have been initialized. Other reasons for SSR include improved search engine optimization (SEO).

Server rendered applications are generally harder to build and maintain, since the code has to work on both client and server. Additionally, SSR often complicates the infrastructure needed to run your application, since many SPA + SSR solutions require NodeJS, which is not required in production for client-only SPAs.

## Example

The [isomorphic-microfrontends example](https://github.com/isomorphic-microfrontends) shows React server-rendered microfrontends. You can view the live demo of the code at https://isomorphic.microfrontends.app.

## Implementation Overview

The ultimate goal of server-side rendering is to generate an HTTP response that the browser will display to the user while javascript is hydrating. Most microfrontend server-side rendering implementations, including single-spa's recommended approach, do this with the following steps:

1. Layout - Identify which microfrontends to render for the incoming HTTP request, and where within the HTML they will be placed. This is usually route based.
2. Fetch - Begin rendering the HTML for each microfrontend to a stream.
3. Headers - Retrieve HTTP response headers from each microfrontend. Merge them together and send the result as the HTTP response headers to the browser.
4. Body - Send the HTTP response body to the browser, which is an HTML document consisting of static and dynamic parts. This involves waiting for each microfrontend's stream to end before proceeding to the next portion of HTML.
5. Hydrate - Within the browser, download all javascript needed and then hydrate the HTML.

## 1. Layout

To define an HTML template that lays out your page, first choose a "microfrontend layout middleware":

1. [single-spa-layout](/docs/layout-overview): The official layout engine for single-spa.
2. [Tailor](https://github.com/zalando/tailor): A popular, battle tested layout engine that predates single-spa-layout and is not officially affiliated with single-spa.
3. [TailorX](https://github.com/StyleT/tailorx): An actively maintained fork of Tailor that is used by [Namecheap](https://www.namecheap.com/) in their single-spa website. The single-spa core team collaborated with the creators of TailorX when authoring single-spa-layout, taking some inspiration from it.

We generally recommend single-spa-layout, although choosing one of the other options might make sense for your situation, since single-spa-layout is newer and has been used less than Tailor/TailorX.

With single-spa-layout, you define a single template that handles all routes. [Full documentation](/docs/layout-definition).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Isomorphic Microfrontends</title>
    <meta
      name="importmap-type"
      content="systemjs-importmap"
      server-cookie
      server-only
    />
    <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@2.0.0/dist/import-map-overrides.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.6.1/dist/system.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.6.1/dist/extras/amd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.6.1/dist/extras/named-exports.min.js"></script>
  </head>
  <body>
    <template id="single-spa-layout">
      <single-spa-router>
        <nav>
          <application name="@org-name/navbar"></application>
        </nav>
        <main>
          <route path="settings">
            <application name="@org-name/settings"></application>
          </route>
          <route path="home">
            <application name="@org-name/home"></application>
          </route>
        </main>
      </single-spa-router>
    </template>
    <fragment name="importmap"></fragment>
    <script>
      System.import('@org-name/root-config');
    </script>
    <import-map-overrides-full
      show-when-local-storage="devtools"
      dev-libs
    ></import-map-overrides-full>
  </body>
</html>
```

## 2. Fetch

Your microfrontend layout middleware (see [Layout section](#1-layout)) determines which microfrontends match the HTTP request's route. The middleware then fetches the HTTP response headers and HTML content for each microfrontend.

When using single-spa-layout, fetching each microfrontend is handled by the `renderApplication` function that is provided to `renderServerResponseBody`.

The method of fetching the headers and HTML content can vary, since single-spa-layout allows for any arbitrary, custom method of fetching. However, in practice, there are two popular approaches, which are described below. We generally recommend dynamic module loading as the primary method, since it requires less infrastructure to set up and has arguably (slightly) better performance. However, HTTP requests have some advantages, too, and it's also possible for different microfrontends to be implemented with different fetch methods.

### A. Module loading

Module loading refers to loading javascript code using `import` and `import()`. Using module loading, the implementation of fetching the headers and content for each microfrontend is done purely within a single web server and operating system process:

```js
import('@org-name/navbar/server.js').then(navbar => {
  const headers = navbar.getResponseHeaders(props);
  const htmlStream = navbar.serverRender(props);
});
```

In the context of single-spa-layout, this is done inside of the `renderApplication` function:

```js
import {
  constructServerLayout,
  sendLayoutHTTPResponse,
} from 'single-spa-layout/server';
import http from 'http';

const serverLayout = constructServerLayout({
  filePath: 'server/views/index.html',
});

http
  .createServer((req, res) => {
    const { bodyStream } = sendLayoutHTTPResponse({
      res,
      serverLayout,
      urlPath: req.path,
      async renderApplication({ appName, propsPromise }) {
        const [app, props] = await Promise.all([
          import(`${props.name}/server.mjs`, propsPromise),
        ]);
        return app.serverRender(props);
      },
      async retrieveApplicationHeaders({ appName, propsPromise }) {
        const [app, props] = await Promise.all([
          import(`${props.name}/server.mjs`, propsPromise),
        ]);
        return app.getResponseHeaders(props);
      },
      async retrieveProp(propName) {
        return 'prop value';
      },
      assembleFinalHeaders(appHeaders) {
        return Object.assign(
          {},
          ...Object.values(allHeaders).map(a => a.appHeaders),
        );
      },
      renderFragment(name) {
        // not relevant to the docs here
      },
    });

    bodyStream.pipe(res);
  })
  .listen(9000);
```

To facilitate independent deployments of our microfrontends, such that the web server does not have to reboot/redeploy every time we update every microfrontend, we can use _dynamic module loading_. Dynamic module loading refers to loading a module from a dynamic location - often from somewhere on disk or over the network. By default, NodeJS will only load modules from relative URLs or from the `node_modules` directory, but dynamic module loading allows you to load modules from any arbitrary file path or URL.

A pattern to facilitate independent deployments via dynamic module loading is for each microfrontend's deployment to upload one or more javascript files to a trusted CDN, and then use dynamic module loading to load a certain version of the code on the CDN. The web server polls for new versions of each microfrontend and downloads the newer versions as they are deployed.

To accomplish dynamic module loading, we can use [NodeJS module loaders](https://nodejs.org/api/esm.html#esm_experimental_loaders). Specifically, [@node-loader/import-maps](https://github.com/node-loader/node-loader-import-maps) and [@node-loader/http](https://github.com/node-loader/node-loader-http) allow us to control where the module is located and how to download it over the network. The code belows how a server-side import map facilitates dynamic module loading

**Before deployment of navbar**:

```json
{
  "imports": {
    "@org-name/navbar/": "https://cdn.example.com/navbar/v1/"
  }
}
```

**After deployment of navbar**:

```json
{
  "imports": {
    "@org-name/navbar/": "https://cdn.example.com/navbar/v2/"
  }
}
```

The import map itself is hosted on the CDN, so that deployments may occur without restarting the web server. An example of this setup is [shown here](https://github.com/isomorphic-microfrontends/root-config/blob/master/server/index-html.js).

### B. HTTP Request

It is also possible to implement the fetching of HTML content and HTTP headers from microfrontends using HTTP requests. In this setup, **each microfrontend must run as a deployed web server**. The root web server (responsible for responding to the browser) makes an HTTP call to each of the microfrontends' web servers. Each microfrontend web server responds with an HTML page as response body, along with its HTTP response headers. The response body is streamed to the root web server so that it can send the bytes as soon as possible to the browser.

In the context of single-spa-layout, this is done with the `renderApplication` function:

```js
import {
  constructServerLayout,
  sendLayoutHTTPResponse,
} from 'single-spa-layout/server';
import http from 'http';
import fetch from 'node-fetch';

const serverLayout = constructServerLayout({
  filePath: 'server/views/index.html',
});

http
  .createServer((req, res) => {
    const fetchPromises = {};

    sendLayoutHTTPResponse(serverLayout, {
      res,
      serverLayout,
      urlPath: req.path,
      async renderApplication({ appName, propsPromise }) {
        const props = await propsPromise;
        const fetchPromise =
          fetchPromises[appName] ||
          (fetchPromises[appName] = fetchMicrofrontend(props));
        const response = await fetchPromise;
        // r.body is a Readable stream when you use node-fetch,
        // which is best for performance when using single-spa-layout
        return response.body;
      },
      async retrieveApplicationHeaders({ appName, propsPromise }) {
        const props = await propsPromise;
        const fetchPromise =
          fetchPromises[appName] ||
          (fetchPromises[appName] = fetchMicrofrontend(props));
        const response = await fetchPromise;
        return response.headers;
      },
      async retrieveProp(propName) {
        return 'prop value';
      },
      assembleFinalHeaders(allHeaders) {
        return Object.assign({}, ...Object.values(allHeaders));
      },
      renderFragment(name) {
        // not relevant to the docs here
      },
    });

    bodyStream.pipe(res);
  })
  .listen(9000);

async function fetchMicrofrontend(props) {
  fetch(`http://${props.name}`, {
    headers: props,
  }).then(r => {
    if (r.ok) {
      return r;
    } else {
      throw Error(
        `Received http response ${r.status} from microfrontend ${appName}`,
      );
    }
  });
}
```

## 3. HTTP Response Headers

The HTTP response headers sent to the browser are a combination of default headers and the headers retrieved from each microfrontend. Your [method of fetching microfrontends](#2-fetch) does not change how the final headers are merged and assembled for the browser.

Tailor and TailorX have built-in methods of merging headers. Single-spa-layout allows for custom merging via the `assembleFinalHeaders` option:

```js
import {
  constructServerLayout,
  sendLayoutHTTPResponse,
} from 'single-spa-layout/server';
import http from 'http';

const serverLayout = constructServerLayout({
  filePath: 'server/views/index.html',
});

http
  .createServer((req, res) => {
    const { bodyStream } = sendLayoutHTTPResponse({
      res,
      serverLayout,
      urlPath: req.path,
      async renderApplication({ appName, propsPromise }) {
        const [app, props] = await Promise.all([
          import(`${props.name}/server.mjs`, propsPromise),
        ]);
        return app.serverRender(props);
      },
      async retrieveApplicationHeaders({ appName, propsPromise }) {
        const [app, props] = await Promise.all([
          import(`${props.name}/server.mjs`, propsPromise),
        ]);
        return app.getResponseHeaders(props);
      },
      async retrieveProp(propName) {
        return 'prop value';
      },
      assembleFinalHeaders(allHeaders) {
        // appHeaders contains all the application names, props, and headers for
        return Object.assign(
          {},
          ...Object.values(allHeaders).map(a => a.appHeaders),
        );
      },
      renderFragment(name) {
        // not relevant to the docs here
      },
    });

    bodyStream.pipe(res);
  })
  .listen(9000);
```

## 4. HTTP Response Body

The HTTP Response body sent from the web server to the browser must be streamed, byte by byte, in order to maximize performance. [NodeJS Readable streams](https://nodejs.org/api/stream.html#stream_readable_streams) make this possible by acting as a buffer that sends each byte as received, instead of all bytes at once.

All microfrontend layout middlewares mentioned in this document stream the HTML response body to the browser. In the context of single-spa-layout, this is done by calling `sendLayoutHTTPResponse`

```js
import { sendLayoutHTTPResponse } from 'single-spa-layout/server';
import http from 'http';

const serverLayout = constructServerLayout({
  filePath: 'server/views/index.html',
});

http
  .createServer((req, res) => {
    sendLayoutHTTPResponse({
      res,
      // Add all other needed options here, too
    });
  })
  .listen(9000);
```

## 5. Hydrate

Hydration (or rehydration) refers to browser Javascript initializing and attaching event listeners to the HTML sent by the server. There are several variants, including progressive rehydration and partial rehydration.

:::info
See also ["Rendering on the Web"](https://developers.google.com/web/updates/2019/02/rendering-on-the-web) by Google.
:::

In the context of microfrontends, hydration is done by the underlying UI framework of the microfrontend (React, Vue, Angular, etc). For example, in React, this is done by calling [ReactDOM.hydrate()](https://reactjs.org/docs/react-dom.html#hydrate). The [single-spa adapter libraries](/docs/ecosystem) allow you to specify whether you are hydrating or mounting for the first time (see single-spa-react's [`renderType` option](/docs/ecosystem-react#options)).

The role of single-spa-layout is to determine which microfrontends should hydrate which parts of the DOM. This is done automatically when you call [constructLayoutEngine](/docs/layout-api#constructlayoutengine) and [singleSpa.start()](/docs/api#start). If using TailorX instead of single-spa-layout, the [Isomorphic Layout Composer Project](https://github.com/namecheap/ilc) serves a similar purpose as `constructLayoutEngine`.
