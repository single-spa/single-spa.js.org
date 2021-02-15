---
id: getting-started-overview
title: Getting Started with single-spa
sidebar_label: Overview of single-spa
---

## JavaScript Microfrontends

[Join the chat on Slack](https://join.slack.com/t/single-spa/shared_invite/zt-mafdeybq-0v1aIm3KKaqyVCT2xeny3Q)

single-spa is a framework for bringing together multiple JavaScript microfrontends in a frontend application. Architecting your frontend using single-spa enables many benefits, such as:

- [Use multiple frameworks](ecosystem.md#help-for-frameworks) on the same page [without page refreshing](building-applications.md)
  ([React](ecosystem-react.md), [AngularJS](ecosystem-angularjs.md), [Angular](ecosystem-angular.md), [Ember](ecosystem-ember.md), or whatever you're using)
- Deploy your microfrontends independently
- Write code using a new framework, without rewriting your existing app
- Lazy load code for improved initial load time

## Demos and Examples

See [our examples page](/docs/examples).

## Architectural Overview

single-spa takes inspiration from modern framework component lifecycles by abstracting lifecycles for entire applications.
Born out of Canopy's desire to use React + react-router instead of being forever stuck with our AngularJS + ui-router application, single-spa is now a mature library that enables frontend microservices architecture aka "microfrontends". Microfrontends enable many benefits such as independent deployments, migration and experimentation, and resilient applications.

single-spa apps consist of the following:

1. A [single-spa root config](configuration), which renders the HTML page _and_ the JavaScript that registers applications. Each application is registered with three things:
   - A name
   - A function to load the application's code
   - A function that determines when the application is active/inactive
1. [Applications](building-applications.md) which can be thought of as single-page applications packaged up into modules. Each application must know how to bootstrap, mount, and unmount itself from the DOM. The main difference between a traditional SPA and single-spa applications is that they must be able to coexist with other applications as they do not each have their own HTML page.

   For example, your React or Angular SPAs are applications. When active, they can listen to url routing events and put content on the DOM. When inactive, they do not listen to url routing events and are totally removed from the DOM.

## The Recommended Setup

The single-spa core team has put together documentation, tools, and videos showing the currently encouraged best practices with single-spa. Check out [these docs](/docs/recommended-setup/) for more information.

## How hard will it be to use single-spa?

single-spa works with ES5, ES6+, TypeScript, Webpack, SystemJS, Gulp, Grunt, Bower, ember-cli, or really any build system available. You can npm install it or even just use a `<script>` tag if you prefer.

While our objective is to make using single-spa as easy as possible, we should also note that this is an _advanced architecture_ that is different from how front-end applications are typically done. This will require changes to existing paradigms as well as understanding of underlying tools.

If you're not starting your application from scratch, you'll have to [migrate your SPA](migrating-existing-spas.md) to become a single-spa application.

single-spa works in Chrome, Firefox, Safari, Edge, and IE11 (with polyfills).

## Isn't single-spa sort of a redundant name?

Yep.

## Documentation

The documentation is divided into several sections:

- [Getting Started](getting-started-overview.md)
- [single-spa Applications](building-applications.md)
- [single-spa Parcels](parcels-overview.md)
- [Examples](examples.md)
- [Ecosystem](ecosystem.md)
- [Contributing Guide](contributing-overview.md)
- [Blog](https://single-spa.js.org/blog/)
- [Where to Get Support](https://single-spa.js.org/help/)

You can help improve the single-spa website by sending pull requests to the [`single-spa.js.org` repository](https://github.com/single-spa/single-spa.js.org).

## Quick start

To help beginners to single-spa get started quickly we have developed [`create-single-spa`](/docs/create-single-spa/), a utility for generating starter code. This guide will cover creating the root-config and your first single-spa application. Let's get started.

:::note
Once you've gotten some of the basics down, refer to these other [single-spa examples](/docs/examples/) to see more advanced usage.
:::

### Create a root config

1.  Invoke `create-single-spa` to generate a root-config by running:

        npx create-single-spa --moduleType root-config

    Follow the remaining prompts with a few things in mind:

    - [single-spa Layout Engine](https://single-spa.js.org/docs/layout-overview) is optional at this time but is recommended if you foresee utilizing [server side rendering](https://single-spa.js.org/docs/ssr-overview)
    - the `orgName` should be the same across all of your applications as it is used as a namespace to enable [in-browser module resolution](https://single-spa.js.org/docs/recommended-setup/#in-browser-versus-build-time-modules)

1.  Once created, navigate into the newly created root-config folder
1.  Run the `start` script using your preferred package manager
1.  Navigate to http://localhost:9000/ in your browser
1.  You now have a working root-config!

**Be sure to review the comments inside the generated code as well as the information in the Welcome application** even if some of the content is duplicated in this guide.

:::tip
[single-spa-playground.org](http://single-spa-playground.org/playground) is an alternative guide to run an application without needing to create your own root-config.
:::

### Create a single-spa application

1.  Invoke `create-single-spa` to generate a single-spa application by running:

        npx create-single-spa --moduleType app-parcel

    Follow the remaining prompts to generate a single-spa application using your framework of choice

1.  Once created, navigate into the newly created application folder
1.  Run the `start` script using your preferred package manager

### Add shared dependencies

[Shared dependencies](https://single-spa.js.org/docs/recommended-setup/#shared-dependencies) are used to improve performance by sharing a module in the browser through [import maps](https://single-spa.js.org/docs/recommended-setup/#import-maps) declared in the root-config. Adding these at this point is _conditionally optional_, depending on if the generated application expects any shared dependencies.

For example, if using React the generated Webpack config already expects `React` and `ReactDOM` to be shared dependencies, so you must add these to the import map. Vue, Angular, and Svelte don't require shared dependencies at this time.

```json
"react": "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js",
"react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js"
```

As your architecture matures, you may add more shared dependencies in the future so don't stress about leveraging these perfectly at first.

### Register the application

1. Return to the root-config and add your application to the import map in `src/index.ejs`

   <small>The application's package.json name field is recommended</small>

1. Register as a single-spa application

   if **not** using single-spa Layout Engine

   - Open `src/root-config.js`
   - Remove the code for registering `@single-spa/welcome` as an application
   - Uncomment the sample `registerApplication` code and update it with the module name of your application

   if using single-spa Layout Engine

   - Remove the existing `<application name="@single-spa/welcome"></application>` element
   - Add your own `<application name=""></application>` element using the `name` the module name used in the import map from the previous step

Thats it! Your first single-spa application should now be running in your root-config.

---

## API

Read more at [single-spa API](api.md) and [application api](building-applications.md#application-lifecycle).

## Contributing

The main purpose of this repository is to continue to evolve single-spa, making it better and easier to use. Development of single-spa, and the [single-spa ecosystem](ecosystem.md) happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving single-spa.

### [Code of Conduct](CODE_OF_CONDUCT.md)

single-spa has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](contributing-overview.md)

Read our [contributing guide](/docs/contributing-overview/) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to single-spa.

## Who's Using This?

See [user showcase](/users).

Is your company or project using single-spa? Let us know by submitting a PR to [this section](https://github.com/single-spa/single-spa.js.org/blob/master/website/src/data/users.js)!
