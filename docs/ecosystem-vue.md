---
id: ecosystem-vue
title: single-spa-vue
sidebar_label: Vue
---

single-spa-vue is a helper library that helps implement [single-spa registered application](single-spa-config.md#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for for use with [Vue.js](https://vuejs.org/). Check out the [single-spa-vue github](https://github.com/CanopyTax/single-spa-vue).

## Installation
### Vue CLI
The [vue-cli-plugin-single-spa](https://github.com/CanopyTax/vue-cli-plugin-single-spa) will get everything set up.

```sh
vue add single-spa
```

The CLI Plugin does the following for you:
1) Modify your webpack config so that your project works as a single-spa application or parcel.
2) Install [single-spa-vue](https://github.com/CanopyTax/single-spa-vue).
3) Modify your `main.js` or `main.ts` file so that your project works as a single-spa application or parcel.

### Without Vue CLI
```sh
npm install --save single-spa-vue
```

Alternatively, you can use  single-spa-vue by adding `<script src="https://unpkg.com/single-spa-vue"></script>` to your html file and
accessing the `singleSpaVue` global variable.

## Usage
Change your application's entry file to be the following.

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

Note that if you are using the Vue CLI Plugin, your `main.ts` or `main.js` file will be updated with this code automatically.

## Options

All options are passed to single-spa-vue via the `opts` parameter when calling `singleSpaVue(opts)`. The following options are available:

- `Vue`: (required) The main Vue object, which is generally either exposed onto the window or is available via `require('vue')` `import Vue from 'vue'`.
- `appOptions`: (required) An object which will be used to instantiate your Vue.js application. `appOptions` will pass directly through to `new Vue(appOptions)`. Note that if you do not provide an `el` to appOptions, that a div will be created and appended to the DOM as a default container for your Vue application.
- `loadRootComponent`: (optional and replaces `appOptions.render`) A promise that resolves with your root component. This is useful for lazy loading.

## As a single-spa parcel
To create a single-spa parcel, simply omit the `el` option from your appOptions, since the dom element will be specified by the user of the Parcel. Every other
option should be provided exactly the same as in the example above.