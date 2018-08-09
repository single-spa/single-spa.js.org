---
id: ecosystem-vue
title: single-spa-vue
sidebar_label: Vue
---

single-spa-vue is a helper library that helps implement [single-spa registered application](single-spa-config.md#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for for use with [Vue.js](https://vuejs.org/). Check out the [single-spa-vue github](https://github.com/CanopyTax/single-spa-vue).

## Example

In addition to this Readme, example usage of single-spa-vue can be found in the [single-spa-examples](https://github.com/CanopyTax/single-spa-examples/blob/master/src/vue/vue.app.js) project.

## Quickstart

First, in the [single-spa application](https://github.com/CanopyTax/single-spa/blob/master/docs/applications.md#registered-applications), run `npm install --save single-spa-vue`. Then, add the following to your application's entry file

```js
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#mount-location',
    template: '<div>some template</div>'
  }  
});

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
];

export const unmount = [
  vueLifecycles.unmount,
];
```

## Routing
In order for Vue router to work with Single-Spa's routing, it needs to be in `history` mode, not in `#` hash mode which is the default.  
```
const router = new Router({
  mode: 'history',
  routes,
});
```

## Options

All options are passed to single-spa-vue via the `opts` parameter when calling `singleSpaVue(opts)`. The following options are available:

- `Vue`: (required) The main Vue object, which is generally either exposed onto the window or is available via `require('vue')` `import Vue from 'vue'`.
- `appOptions`: (required) An object which will be used to instantiate your Vue.js application. `appOptions` will pass directly through to `new Vue(appOptions)`
