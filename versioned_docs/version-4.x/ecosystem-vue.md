---
id: ecosystem-vue
title: single-spa-vue
sidebar_label: Vue
---

single-spa-vue is a helper library that helps implement [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for for use with [Vue.js](https://vuejs.org/). Check out the [single-spa-vue github](https://github.com/single-spa/single-spa-vue).

## Starter repo
For a full example, see [coexisting-vue-microfrontends](https://github.com/joeldenning/coexisting-vue-microfrontends).

## Live demo
https://coexisting-vue-microfrontends.surge.sh

## Installation
### Vue CLI
The [vue-cli-plugin-single-spa](https://github.com/single-spa/vue-cli-plugin-single-spa) will get everything set up.

```sh
vue add single-spa
```

The CLI Plugin does the following for you:
1) Modify your webpack config so that your project works as a single-spa application or parcel.
2) Install [single-spa-vue](https://github.com/single-spa/single-spa-vue).
3) Modify your `main.js` or `main.ts` file so that your project works as a single-spa application or parcel.
4) Add a `set-public-path.js` that will use `systemjs-webpack-interop` in order to set the public path of your application.

### Without Vue CLI
```sh
npm install --save single-spa-vue
```

Alternatively, you can use  single-spa-vue by adding `<script src="https://unpkg.com/single-spa-vue"></script>` to your HTML file and
accessing the `singleSpaVue` global variable.

## Usage
Install `systemjs-webpack-interop` if you have not already done so.

`npm install systemjs-webpack-interop -S`

Create a file at the same level as your `main.js/ts` called `set-public-path.js` 

```js
import { setPublicPath } from 'systemjs-webpack-interop';

setPublicPath('appName');

```

Change your application's entry file to be the following.

```js
import './set-public-path';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: h => h(App),
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

```

Note that if you are using the Vue CLI Plugin, your `main.ts` or `main.js` file will be updated with this code automatically and the `set-public-path.js` file
will automatically be created with the app name being your package.json's name property.

## Shared dependencies
For performance, it is best to share a single version and instance of Vue, Vue Router, and other large libraries.

To do this, add your shared dependencies as [webpack externals](https://webpack.js.org/configuration/externals). Then you use
an in-browser module loader such as [systemjs](https://github.com/systemjs/systemjs) to provide those shared dependencies
to each of the single-spa applications. Adding `vue` and other libraries to your
[import map](http://single-spa-playground.org/playground/import-map). For an example import map that is doing this,
checkout [coexisting-vue-microfrontends' index.html file](https://github.com/joeldenning/coexisting-vue-microfrontends/blob/master/root-html-file/index.html).

Sharing a single instance of Vue and other common libraries is highly recommended. See the
[recommended setup for single-spa](https://single-spa.js.org/docs/faq.html#is-there-a-recommended-setup) for more details on why.

### Shared deps with Vue CLI
```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.externals(['vue', 'vue-router'])
  }
}
```

### Shared deps without Vue CLI
```js
// webpack.config.js
module.exports = {
  externals: ['vue', 'vue-router'],
}
```

## Options

All options are passed to single-spa-vue via the `opts` parameter when calling `singleSpaVue(opts)`. The following options are available:

- `Vue`: (required) The main Vue object, which is generally either exposed onto the window or is available via `require('vue')` `import Vue from 'vue'`.
- `appOptions`: (required) An object which will be used to instantiate your Vue.js application. `appOptions` will pass directly through to `new Vue(appOptions)`. Note that if you do not provide an `el` to appOptions, that a div will be created and appended to the DOM as a default container for your Vue application.
- `loadRootComponent`: (optional and replaces `appOptions.render`) A promise that resolves with your root component. This is useful for lazy loading.

## As a single-spa parcel
To create a single-spa parcel, simply omit the `el` option from your appOptions, since the dom element will be specified by the user of the Parcel. Every other
option should be provided exactly the same as in the example above.

## Custom Props
[single-spa custom props](/docs/building-applications.html#custom-props) are added to your App component as
`appOptions.data`, and are accessible via `vm.$data`. See [this Vue documentation](https://vuejs.org/v2/api/#data)
for more information on `appOptions.data`.
