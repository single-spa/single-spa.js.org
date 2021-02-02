---
id: examples
title: Single-spa Examples
sidebar_label: Resources
---

## Core team examples

### Actively maintained

- [React Microfrontends](https://github.com/react-microfrontends) (check out root-config repo first)
- [Vue Microfrontends](https://github.com/vue-microfrontends) (check out root-config repo first)
- [Polyglot Microfrontends](https://github.com/polyglot-microfrontends) (check out root-config repo first)
- [single-spa-es5-angularjs](https://github.com/joeldenning/single-spa-es5-angularjs) is a very tiny es5 example with angularjs.
- [Isomorphic Microfrontends](https://github.com/isomorphic-microfrontends) shows server-side rendering (SSR) with single-spa and single-spa-layout.
- [Vite single-spa application](https://github.com/joeldenning/vite-single-spa-example) shows a single-spa application that uses Vite.
- [Snowpack single-spa application](https://github.com/joeldenning/snowpack-single-spa-example) shows a single-spa application that uses Snowpack.

### Older examples

- [coexisting-angular-microfrontends](https://github.com/joeldenning/coexisting-angular-microfrontends) is a full blown Angular 9 microfrontends repo that combines three separate Angular CLI projects into one page.
- [coexisting-vue-microfrontends](https://github.com/joeldenning/coexisting-vue-microfrontends) shows three separate Vue CLI projects existing within one page.
- [single-spa-portal-example](https://gitlab.com/TheMcMurder/single-spa-portal-example) is a great example of coexisting React microfrontends.
- [simple-single-spa-webpack-example](https://github.com/joeldenning/simple-single-spa-webpack-example) is a small, simple example that can be used as a webpack starter.

## Community examples

- [single-spa-parcel-example](https://github.com/Guillembonet/single-spa-parcel-example) is an example of one Vue and one React microfrontend, containing a React and a Vue parcel respectively and two Node.js microservices running in 6 different Docker VMs seamlessly working together in a single web app located in a 7th VM.
- [single-spa-login-example-with-npm-packages](https://github.com/jualoppaz/single-spa-login-example-with-npm-packages) is a single-spa application example which imports registered applications from NPM packages and manages authentication features as login.
- [demo-single-spa-with-spax](https://github.com/crossjs/spax/tree/master/packages/demo-single-spa) is a tiny [spax](https://spax.js.org) example with react-scripts and craco.
- [single-spa-html with js example](https://github.com/filoxo/single-spa-html-with-js-example) is an example repo of using single-spa-html that is enhanced with plain JavaScript.
- [coexisting-angular-microfrontends/login](https://github.com/Vallerious/coexisting-angular-microfrontends/tree/feature/login) is a branch that implements a login functionality between Angular apps. It uses localStorage as shared memory space to store and retrieve a token.
- [single-spa-angular-cli](https://github.com/matt-gold/single-spa-angular-cli) is an all-Angular example repo that uses SystemJS to load single-spa-angular applications into a containing Angular CLI application at different routes.
- [ember-micro-frontends](https://github.com/ember-micro-frontends) is an all-Ember example repo that uses single-spa-ember applications into a containing Ember.js application at different routes.
- [single-spa application with shared styled-components](https://github.com/filoxo/single-spa-example-shared-styled-components) shows how to share styled-components, a library that is required to be a singleton instance.
- [single-spa application with Webpack lazyStyleTag](https://github.com/filoxo/single-spa-example-webpack-lazystyletag) is a simple example that leverages Webpack style-loader's lazyStyleTag functionality to dynamically add and remove the CSS associated with a single-spa application.
- [single-spa shared state utility using Rxjs](https://github.com/filoxo/single-spa-example-rxjs-shared-state) shows how to use a utility module that shares application state across multiple single-spa applications and frameworks.
- [svelte-micro-frontends](https://github.com/svelte-micro-frontends) is an all-Svelte example of a Restaurant booking app based on the popular [Micro frontends article](https://martinfowler.com/articles/micro-frontends.html) by [Cam Jackson](https://twitter.com/thecamjackson).
- [single-spa-examples](https://github.com/daniloesk/single-spa-examples/) contains Angular examples with step-by-step commits on how they were built. Some of the examples are:
  - [root and basic](https://github.com/daniloesk/single-spa-examples/tree/v20201211-registration): root-config with Angular's Zone.js and prepared for reflect-metadata and Angular 11 application with lazy loaded routing and assets examples.
  - [scoped sharing](https://github.com/daniloesk/single-spa-examples/tree/v20201215-scoped-importmap): Import map sharing of coexisting Angular 10 and 11 using scopes. This uses View Engine.
  - [Ivy sharing](https://github.com/daniloesk/single-spa-examples/tree/v20201217-importmap-ivy): Dependency sharing using Ivy.


Have your own example or starter repo? [Submit a PR](https://github.com/single-spa/single-spa.js.org/edit/master/website/versioned_docs/version-5.x/examples.md) to add yours to this list.
