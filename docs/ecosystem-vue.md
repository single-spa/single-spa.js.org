---
id: ecosystem-vue
title: single-spa-vue
sidebar_label: Vue
---

single-spa-vue is a helper library that helps implement [single-spa registered application](single-spa-config.md#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for for use with [Vue.js](https://vuejs.org/). Check out the [single-spa-vue github](https://github.com/CanopyTax/single-spa-vue).

## Installation
```sh
npm install --save single-spa-vue
```

Alternatively, you can use  single-spa-vue by adding `<script src="https://unpkg.com/single-spa-vue"></script>` to your html file and
accessing the `singleSpaVue` global variable.

## Quickstart
Add the following to your application's entry file

```js
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from ./App.vue

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: h => h(App),
  }
});

export const bootstrap = vueLifecycles.bootstrap;

export const mount = vueLifecycles.mount;

export const unmount = vueLifecycles.unmount;
```

## Options

All options are passed to single-spa-vue via the `opts` parameter when calling `singleSpaVue(opts)`. The following options are available:

- `Vue`: (required) The main Vue object, which is generally either exposed onto the window or is available via `require('vue')` `import Vue from 'vue'`.
- `appOptions`: (required) An object which will be used to instantiate your Vue.js application. `appOptions` will pass directly through to `new Vue(appOptions)`. Note that if you do not provide an `el` to appOptions, that a div will be created and appended to the DOM as a default container for your Vue application.
- `loadRootComponent`: (optional and replaces `appOptions.render`) A promise that resolves with your root component. This is useful for lazy loading.

## As a single-spa parcel
To create a single-spa parcel, simply omit the `el` option from your appOptions, since the dom element will be specified by the user of the Parcel. Every other
option should be provided exactly the same as in the example above.