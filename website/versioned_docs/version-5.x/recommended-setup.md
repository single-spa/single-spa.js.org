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

* [qiankun](https://github.com/umijs/qiankun) is a popular alternative to this recommended setup.
* [Isomorphic Layout Composer](https://github.com/namecheap/ilc) - complete solution for Micro Frontends composition into SPA with SSR support

## In-browser versus build-time modules

Tutorial video: [Youtube](https://www.youtube.com/watch?v=Jxqiu6pdMSU&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=2) / [Bilibili](https://www.bilibili.com/video/av83498486/)

An in-browser JavaScript module is when imports and exports are not compiled away by your build tool, but instead are
resolved within the browser. This is different from build-time modules, which are supplied by your node_modules and
compiled away before they touch the browser.

The way to tell webpack and rollup to leave some dependencies untouched during the build, so that they come from the browser,
is via [webpack externals](https://webpack.js.org/configuration/externals/#root) and [rollup externals](https://rollupjs.org/guide/en/#external).

Here are our recommendations:

1. Each single-spa application should be an in-browser Javascript module.
2. Each large shared-dependency (ie, the react, vue, or angular libraries) should also be an in-browser module.
3. Everything else should be a build-time module.

## Import Maps

Tutorial video: [Youtube](https://www.youtube.com/watch?v=Lfm2Ge_RUxs&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=3) / [Bilibili](https://www.bilibili.com/video/av83617496/)

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

Import Maps are not supported in all browsers. See https://caniuse.com/import-maps for more detail. You can use [SystemJS](https://github.com/systemjs/systemjs) or [es-module-shims](https://github.com/guybedford/es-module-shims) to polyfill support for import maps.

## Module Federation

[Module Federation](https://dev.to/marais/webpack-5-and-module-federation-4j1i) is a webpack-specific technique for sharing [build-time modules](#in-browser-versus-build-time-modules). It involves each microfrontend bundling all of its dependencies, even the shared ones. This means that there are multiple copies of each shared dependency - one per microfrontend. In the browser, the first copy of the shared dependency will be downloaded, but subsequent microfrontends will reuse that shared dependency without downloading their copy of it.

Note that Module Federation is a new feature (at the time of this writing) and requires that you use webpack@>=5. It is still an evolving technology.

single-spa is a way of structuring your routes for microfrontends. Module Federation is a performance technique for microfrontends. They complement each other well and can be used together. Here is a [YouTube video](https://www.youtube.com/watch?v=wxnwPLLIJCY) by a community member that talks about using single-spa and module federation together.

With module federation, you must choose how you wish to load the microfrontends themselves. The single-spa core team recommends using SystemJS + import maps as a module loader for the microfrontends. Alternatively, you may use global variables and `<script>` elements. An example of using SystemJS to load microfrontends with module federation can be found at https://github.com/ScriptedAlchemy/mfe-webpack-demo/pull/2.

The single-spa core team recommends choosing either import maps or module federation for your shared, third-party dependencies. We do not recommend sharing some third-party dependencies via import map and others via module federation. When choosing between the two approaches, we have a preference towards import maps, but no objection to module federation. See the [shared dependencies section](#shared-dependencies) for a comparison.

## SystemJS

Tutorial video: [Youtube](https://www.youtube.com/watch?v=AmdKF2UhFzw&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=7) / [Bilibili](https://www.bilibili.com/video/av83620028/)

SystemJS provides polyfill-like behavior for import maps and in-browser modules. It is not a true polyfill of import maps, due to limitations of the JavaScript language in polyfilling the resolution of bare import specifiers to URLs.

Since SystemJS is only polyfill-like, you'll need to compile your applications into [System.register format](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md) instead of to ESM format. This allows for in-browser modules to be fully emulated in environments that don't support modules or import maps.

To compile your code to System.register format, set webpack's [`output.libraryTarget`](https://webpack.js.org/configuration/output/#outputlibrarytarget) to `"system"`, or set rollup's [`format`](https://rollupjs.org/guide/en/#outputformat) to `"system"`.

Shared dependencies like React, Vue, and Angular, do not publish System.register versions of their libraries. However, you can find System.register versions of the libraries in [the esm-bundle project](https://github.com/esm-bundle) ([blog post](https://medium.com/@joeldenning/an-esm-bundle-for-any-npm-package-5f850db0e04d)). Alternatively, SystemJS is capable of loading them via [global loading](https://github.com/systemjs/systemjs#2-systemjs-loader) or [the AMD and named-exports extras](https://github.com/systemjs/systemjs#extras).

An alternative to SystemJS that provides polyfill behavior for import maps is [es-module-shims](https://github.com/guybedford/es-module-shims). This has the advantage of using truly native ES modules. However, it is not the single-spa core team's recommended approach for production applications, since it requires less-performant in browser parsing and modification of all your bundles.

## Lazy loading

Tutorial video: [Youtube](https://www.youtube.com/watch?v=-LkvBMpCK-A&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=8) / [Bilibili](https://www.bilibili.com/video/av83620658/)

Lazy loading is when you only download JavaScript code that the user needs for the current page, instead of all JavaScript up front. It is a technique for improving the performance of your application by decreasing the time-to-meaningful-render when you initially load the page. If you use [single-spa loading functions](/docs/configuration#loading-function-or-application), you already have built-in lazy loading for your applications and parcels. Since an application is an "in-browser module," this means that you are only downloading the in-browser modules in your import map when you need them.

Often, the route-based lazy loading provided by single-spa loading functions is all that you need to ensure great performance. However, it is also possible to do lazy loading via "code splits" with your bundler (webpack or rollup). For documentation on webpack code splits, see [these docs](https://webpack.js.org/guides/code-splitting/#dynamic-imports). It is recommended to use dynamic import (`import()`) instead of multiple entry points for code splits in a single-spa application. For code splits to work properly, you'll need to [dynamically set your public path](https://webpack.js.org/guides/public-path/#on-the-fly). A tool exists to help you set your public path correctly for use with systemjs - https://github.com/joeldenning/systemjs-webpack-interop.

## Local development

Tutorial video: [Youtube](https://www.youtube.com/watch?v=vjjcuIxqIzY&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=4) / [Bilibili](https://www.bilibili.com/video/av83617789/)

In contrast to monolithic frontend applications, local development with single-spa encourages only running the one microfrontend you're working on, while using deployed versions of all other microfrontends. This is important because running every single-spa microfrontend every time you want to do anything is unwieldy and cumbersome.

To accomplish local development of only one microfrontend at a time, we can customize the URL for that microfrontend within the import map. For example, the following import map is set up for local development of the `navbar` application, since that's the only one pointing to a local web server. The `planets` and `things` applications are pointing to deployed (already hosted) versions of the applications.

```json
{
  "imports": {
    "@react-mf/navbar": "https://localhost:8080/react-mf-navbar.js",
    "@react-mf/planets": "https://react.microfrontends.app/planets/2717466e748e53143474beb6baa38e3e5320edd7/react-mf-planets.js",
    "@react-mf/things": "https://react.microfrontends.app/things/7f209a1ed9ac9690835c57a3a8eb59c17114bb1d/react-mf-things.js"
  }
}
```

A tool called [import-map-overrides](https://github.com/joeldenning/import-map-overrides) exists to customize your import map through an in-browser UI. This tool will automatically let you toggle one or more microfrontends between your localhost and the deployed version.

Alternatively, you can use [standalone-single-spa-webpack-plugin](https://github.com/single-spa/standalone-single-spa-webpack-plugin), which allows you to develop each application in standalone mode. Another alternative is to always run the single-spa root config locally, in addition to whichever microfrontends you're developing.

The single-spa core team recommends development on deployed environments via import-map-overrides, as we find that to be the best developer experience, since it allows you to only start one project at a time while also ensuring there's no difference between the local environment and fully-integrated deployed environment. However, there are cases when running the root config locally or using standalone-single-spa-webpack-plugin can be useful.
## Build tools (Webpack / Rollup)

Tutorial video: [Youtube](https://www.youtube.com/watch?v=I6COIg-2lyM&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=9) / [Bilibili](https://www.bilibili.com/video/av84104639/)

It is highly encouraged to use a bundler such as webpack, rollup, parceljs, pikapack, etc. Webpack is an industry-standard for compiling many JavaScript source files into one or more production JavaScript bundles.

Below are some tips for configuring your bundler to be consumable by SystemJS and single-spa. Note that if you're using [create-single-spa](/docs/create-single-spa) that these are all set up for you. We leave these instructions here not to overwhelm you with webpack configuration hell, but rather to help you if you choose not to use create-single-spa.

1. Set the output target to `system`. In webpack, this is done via [`output.libraryTarget`](https://webpack.js.org/configuration/output/#outputlibrarytarget)
1. Use a single [entry point](https://webpack.js.org/concepts/entry-points/#root), with [dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) for any code splitting that you'd like to accomplish. This best matches the "one bundled project = one in-browser module" paradigm encouraged by the single-spa core team.
1. Do not use webpack's [`optimization`](https://webpack.js.org/configuration/optimization/#root) configuration options, as they make it harder to load the outputted JavaScript files as a single in-browser JavaScript module. Doing so does not make your bundle less optimized - dynamic imports are a viable strategy for accomplishing optimized bundles.
1. Follow [the systemjs docs for webpack](https://github.com/systemjs/systemjs#compatibility-with-webpack).
1. Consider using [systemjs-webpack-interop](https://github.com/joeldenning/systemjs-webpack-interop) to create or verify your webpack config.
1. Use [systemjs-webpack-interop](https://github.com/joeldenning/systemjs-webpack-interop) to [set your webpack public path "on the fly"](https://webpack.js.org/guides/public-path/#on-the-fly).
1. Do not set webpack [`output.library`](https://webpack.js.org/configuration/output/#outputlibrary). SystemJS does not need a name, and in fact does not support named modules without additional configuration.
1. Consider turning off [webpack hashing](https://webpack.js.org/configuration/output/#outputfilename) for both entry and code split bundles. It is often easier to add in a commit hash during deployment of your microfrontend via your CI environment variables.
1. Configure webpack-dev-server to not do host checks. ([docs](https://webpack.js.org/configuration/dev-server/#devserverdisablehostcheck)).
1. Configure webpack-dev-server for CORS by setting `{headers: {'Access-Control-Allow-Origin': '*'}}`. ([docs](https://stackoverflow.com/questions/31602697/webpack-dev-server-cors-issue))
1. If developing on https, [configure webpack-dev-server for HTTPS](https://webpack.js.org/configuration/dev-server/#devserverhttps). Also consider [trusting SSL certificates from localhost](https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate).
1. Make sure that your [webpack externals](https://webpack.js.org/configuration/externals/#root) are correctly configured for any shared, in-browser modules that you are importing.
1. Set [output.jsonpFunction](https://webpack.js.org/configuration/output/#outputjsonpfunction) to be a unique string for this project. Since you'll have multiple webpack bundles running in the same browser tab, a collision of the `jsonpFunction` could result in webpack modules getting mixed between bundles.
1. Set [sockPort](https://webpack.js.org/configuration/dev-server/#devserversockport), [sockPath](https://webpack.js.org/configuration/dev-server/#devserversockpath), and [sockHost](https://webpack.js.org/configuration/dev-server/#devserversockhost) inside of your `devServer` configuration.
1. For webpack, set [`output.devtoolNamespace`](https://webpack.js.org/configuration/output/#outputdevtoolnamespace) to your MFE's name. This helps namespace your sourcemaps to each MFE.

For a bit more information specific to webpack code splits, see [the code splits FAQ](/docs/faq#code-splits).

## Utility modules (styleguide, API, etc)

A "utility module" is an in-browser JavaScript module that is not a single-spa application or parcel. In other words, it's only purpose is to export functionality for other microfrontends to import.

Common examples of utility modules include styleguides, authentication helpers, and API helpers. These modules do not need to be registered with single-spa, but are important for maintaining consistency between several single-spa applications and parcels.

Example code in a utility module:
```js
// In a repo called "api", you may export functions from the repo's entry file.
// These functions will be available to single-spa application, parcels, and other in-browser modules
// via an import statement.

export function authenticatedFetch(url, init) {
  return fetch(url, init).then(r => {
    // Maybe do some auth stuff here
    return r.json()
  })
}
```

Example code in a single-spa application that is using the utility module:
```js
// Inside of a single-spa application, you can import the functions from the 'api' repo
import React from 'react'
import { authenticatedFetch } from '@org-name/api';

export function Foo(props) {
  React.useEffect(() => {
    const abortController = new AbortController()
    authenticatedFetch(`/api/clients/${props.clientId}`, {signal: abortController.signal})
    .then(client => {
      console.log(client)
    })

    return () => {
      abortController.abort()
    }
  }, [props.clientId])

  return null
}
```

To make utility modules work, you must ensure that your webpack externals and import map are properly configured. An example of a working styleguide may be found at https://github.com/vue-microfrontends/styleguide.

## Cross microfrontend imports

Example - [exporting a shared component](https://github.com/vue-microfrontends/styleguide/blob/af3eaa70bec7daa74635eb3ec76140fb647b0b14/src/vue-mf-styleguide.js#L5), [importing a shared component](https://github.com/vue-microfrontends/rate-dogs/blob/fe3196234b9cbd6d627199b03a96e7b5f0285c4b/src/components/rate-dogs.vue#L25), and [required webpack config](https://github.com/vue-microfrontends/rate-dogs/blob/97489e2acb1de44aca910ef5e3e0a9d2494200c7/vue.config.js#L14).

You can import and export functions, components, logic, data, event emitters, and environment variables between your microfrontends that are in different git repos and JavaScript bundles. Each microfrontend should have a single [entry file](https://webpack.js.org/concepts/entry-points/#root) that serves as the "public interface" that controls what is exposed outside of the microfrontend.

To make cross microfrontend imports possible, configure your bundler so that the microfrontends are treated as "externals" ([webpack docs](https://webpack.js.org/configuration/externals/#root) / [rollup docs](https://rollupjs.org/guide/en/#external)). Marking them as externals ensures that they are treated as [in-browser modules](#in-browser-versus-build-time-modules) instead of build-time modules.

```js
// Inside of the "entry file" for a utility module called @org-name/auth,
// expose your public interface that other microfrontends can access.
// Often this is within the main.js or main.single-spa.js file.

export function userHasAccess(permission) {
  return loggedInUser.permissions.some(p => p === permission);
}
```

```js
import { userHasAccess } from '@org-name/auth'

// Inside of a single-spa application, import and use a util function from a different microfrontend
const showLinkToInvoiceFeature = userHasAccess('invoicing');
```

```js
// In your webpack config, mark @org-name auth as a webpack external
module.exports = {
  externals: ['@org-name/auth'],

  // Alternatively, mark *all* org-name packages as externals
  // externals: [/^@org-name\/.+/]
}
```

## Shared dependencies

For performance, it is crucial that your web app loads large JavaScript libraries only once. Your framework of choice (React, Vue, Angular, etc) should only be loaded on the page a single time.

It is not advisable to make everything a shared dependency, because shared dependencies must be upgraded at once for every microfrontend that uses them. For small libraries, it is likely acceptable to duplicate them in each microfrontend that uses them. For example, react-router is likely small enough to duplicate, which is nice when you want to upgrade your routing one microfrontend at a time. However, for large libraries like react, momentjs, rxjs, etc, you may consider making them shared dependencies.

There are two approaches to sharing dependencies:

1. [In-browser modules with import maps](#import-maps)
2. [Build-time modules with module federation](#module-federation)

You may use either one, or both. We currently recommend only using import maps, although we have no objection to module federation.

### Comparison of approaches

| Approach          | Share dependencies | Bundler requirements |  Managing dependencies |
| ----------------- | ------------------ | -------------------- | ---------------------- |
| Import Maps       | Fully supported    | Any bundler          | [shared dependecies repo](https://github.com/polyglot-microfrontends/shared-dependencies/blob/master/importmap.json) |
| Module Federation | Fully supported    | Only webpack@>=5     | [multiple webpack configs](https://github.com/ScriptedAlchemy/mfe-webpack-demo/blob/f48ff0bd0b7d62b722ea000e5ded73f0d076a0b7/packages/01-host/webpack.config.js#L47) |

### Sharing with Import Maps

To share a dependency between microfrontends with [Import Maps](#import-maps), you should use [webpack externals](https://webpack.js.org/configuration/externals/#root), [rollup externals](https://rollupjs.org/guide/en/#external), or similar. Marking libraries as external tells your bundler to not use the version in your node_modules, but rather to expect the library to exist as an in-browser module.

To make the shared dependencies available as in-browser modules, they must be present in your import map. A good way of managing them is to create a repository called `shared-dependencies` that has a partial import map in it. The CI process for that repository updates your deployed import map. Upgrading the shared dependencies can then be achieved by making a pull request to that repository.

Not all libraries publish their code in a suitable format for SystemJS consumption. In those cases, check https://github.com/esm-bundle for a SystemJS version of those libraries. Alternatively, you may use [SystemJS extras](https://github.com/systemjs/systemjs#extras) to support UMD bundles, which are often available.

Another option for finding a suitable version of a library for your import map is to use the JSPM CDN, which provides precompiled SystemJS versions of every package on npm (example: https://system-cdn.jspm.io/npm:@material-ui/core@4.11.3/index.js). See https://jspm.org/docs/cdn for more info. You can generate an import map for your shared dependencies at https://generator.jspm.io/.

An example of a shared-dependencies repo, along with a functioning CI process for it, can be found at https://github.com/polyglot-microfrontends/shared-dependencies.

### Sharing with Module Federation

At the time of this writing, module federation is new and still changing. Check out [this example repo](https://github.com/joeldenning/mfe-webpack-demo/tree/system) which uses systemjs to load the microfrontends, but module federation to share `react`, `react-dom`, and `react-router`.

## Deployment and Continuous Integration (CI)

Tutorial video (Part 1): [Youtube](https://www.youtube.com/watch?v=QHunH3MFPZs&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=5) / [Bilibili](https://www.bilibili.com/video/av84100303/)

Tutorial video (Part 2): [Youtube](https://www.youtube.com/watch?v=nC7rpDXa4B8&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=6) / [Bilibili](https://www.bilibili.com/video/av84099642/)

[Example CI configuration files](https://github.com/single-spa/import-map-deployer/tree/master/examples)

Microfrontends are built and deployed completely independently. This means that the git repository, CI, build, and deployments all occur without going through a centralized repository. For this reason, monorepos are not encouraged for microfrontends. CI for monorepos can be configured to only build and deploy the packages that have changed but it is often more complex. Modern CI platforms such as [AWS Amplify](https://aws.amazon.com/blogs/mobile/set-up-continuous-deployment-and-hosting-for-a-monorepo-with-aws-amplify-console/) and [Vercel](https://vercel.com/blog/monorepos) are starting to have built-in support for monorepos however.

There are two steps to deploying a microfrontend.

1. Uploading production JavaScript bundles to a web server / CDN. It is encouraged to use a CDN such as AWS S3 + Cloudfront, Google Cloud Storage, Microsoft Azure Storage, Digital Ocean Spaces, etc because of their superior availability, caching, and performance due to edge locations. The JavaScript files that you upload are completely static. It is encouraged to always write new files to the CDN instead of overwriting files.
2. Updating your import map to point to the newly deployed file.

The implementation of Step 1 is dependent on the infrastructure you're using for your CDN. The AWS CLI ([`aws s3 sync`](https://docs.aws.amazon.com/cli/latest/reference/s3/)), Google gsutil ([`gsutil cp`](https://github.com/single-spa/import-map-deployer/blob/master/examples/ci-for-javascript-repo/gitlab-gcp-storage/.gitlab-ci.yml)), etc are easy ways of accomplishing this.

For the implementation of Step 2, you have a choice:

a) Your CI makes a `curl` HTTP call to a running instance of [import-map-deployer](https://github.com/single-spa/import-map-deployer), which updates the import map in a concurrent-safe way.
b) Your CI runner pulls down the import map, modify it, and reuploads it.

The advantage of a) is that it is concurrent-safe for multiple, simultaneous deployments. Without a concurrent-safe solution, there might be multiple processes pulling down and reuploading the import map at the same time, which could result in a race condition where one CI process thinks it successfully updated the import map when in reality the other CI process wrote the import map later, having based its changes on a stale version of the import map.

The advantage of b) is that it doesn't require running the import-map-deployer in your production environment. Ultimately, you should choose whichever option makes sense for your organization.

## Applications versus parcels versus utility modules

Single-spa has [different categories](/docs/microfrontends-concept#types-of-microfrontends) of microfrontends. It is up to you where and how you use each of them. However, the single-spa core team recommends the following:

**Many route-based single-spa applications, very few single-spa parcels**

1. Prefer splitting microfrontends by route, instead of by components within a route. This means preferring single-spa applications over single-spa parcels whenever possible. The reason for this is that transitions between routes often involve destroying and recreating most UI state, which means your single-spa applications on different routes do not need to ever share UI state.
2. Move fixed navigation menus into their own single-spa applications. Implement their [activity functions](/docs/configuration#activity-function) to be active by default, only unmounting for the login page.
3. Create utility modules for your core component library / styleguide, for shared authentication / authorization code, and for global error handling.
4. If you are only using one framework, prefer framework components (i.e. React, Vue, and Angular components) over single-spa parcels. This is because framework components interop easier with each other than when there is an intermediate layer of single-spa parcels. You can import components between single-spa applications You should only create a single-spa parcel if you need it to work with multiple frameworks.

## Inter-app communication

*A good architecture is one in which microfrontends are decoupled and do not need to frequently communicate. Following the guidelines above about applications versus parcels helps you keep your microfrontends decoupled. Route-based single-spa applications inherently require less inter-app communication.*

There are three things that microfrontends might need to share / communicate:

1. Functions, components, logic, and environment variables.
2. API data
3. UI state

### Functions, components, logic, and environment variables

We recommend using [cross microfrontend imports](#cross-microfrontend-imports) to share functions, components, logic, and environment variables.

### API Data

Example - [exporting a `fetchWithCache` function](https://github.com/react-microfrontends/api/blob/c3c336129e920bbc6137f04cce24b718105efed1/src/react-mf-api.js#L3) and [importing the function](https://github.com/react-microfrontends/people/blob/ad18de9b96b52e6975244e6662becfe13e41a2db/src/utils/api.js#L1).

API data often does not need to be shared between microfrontends, since each single-spa application controls different routes and different routes often have different data. However, occasionally you do need to share API data between microfrontends. An in-memory JavaScript cache of API objects is a solution used by several companies to solve this. For React users, this is similar to Data Fetching with Suspense, where the fetching logic for routes is split out from the component code that uses the data.

```js
// Inside of your api utility module, you can lazily fetch data either when another microfrontend calls your exported
// functions, or eagerly fetch it when the route changes.
let loggedInUserPromise = fetch('...').then(r => {
  if (r.ok) {
    return r.json()
  } else {
    throw Error(`Error getting user, server responded with HTTP ${r.status}`)
  }
})

export function getLoggedInUser() {
  return loggedInUserPromise;
}
```

```js
import { getLoggedInUser } from '@org-name/api';

// Inside of app1, you can import something from an "api" utility module
getLoggedInUser().then(user => {
  console.log('user', user);
});
```

### UI State

*If two microfrontends are frequently passing state between each other, consider merging them. The disadvantages of microfrontends are enhanced when your microfrontends are not isolated modules.*

UI State, such as "is the modal open," "what's the current value of that input," etc. largely does not need to be shared between microfrontends. If you find yourself needing constant sharing of UI state, your microfrontends are likely more coupled than they should be. Consider merging them into a single microfrontend.

Under the rare circumstances where you do need to share UI state between single-spa applications, an event emitter may be used to do so. Below are a few examples of event emitters that might help you out.

1. Observables / Subjects (rxjs) - one microfrontend emits new values to a stream that can be consumed by any other microfrontend. It exports the observable to all microfrontends from its in-browser module, so that others may import it.
2. CustomEvents - browsers have a built-in event emitter system that allows you to fire custom events. Check out [this documentation](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) for more information. Firing the events with `window.dispatchEvent` allows you to subscribe in any other microfrontend with `window.addEventListener`.
3. Any other pub/sub event emitter system.

## State management

The single-spa core team cautions against using redux, mobx, and other global state management libraries. However, if you'd like to use a state management library, we recommend keeping the state management tool specific to a single repository / microfrontend instead of a single store for all of your microfrontends. The reason is that microfrontends are not truly decoupled or framework agnostic if they all must use a global store. You cannot independently deploy a microfrontend if it relies on the global store's state to be a specific shape or have specific actions fired by other microfrontends - to do so you'd have to think really hard about whether your changes to the global store are backwards and forwards compatible with all other microfrontends. Additionally, managing global state during route transitions is hard enough without the complexity of multiple microfrontends contributing to and consuming the global state.

Instead of a global store, the single-spa core team recommends using local component state for your components, or a store for each of your microfrontends. See the above section "[Inter-app communication](#inter-app-communication)" for more related information.
