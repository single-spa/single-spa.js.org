---
id: ecosystem-vue
title: single-spa-vue
sidebar_label: Vue
---

single-spa-vue is a helper library that helps implement [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for use with [Vue.js](https://vuejs.org/). Check out the [single-spa-vue github](https://github.com/single-spa/single-spa-vue).

## Example

For a full example, see [vue-microfrontends](https://github.com/vue-microfrontends).

## Live demo

https://coexisting-vue-microfrontends.surge.sh

## Installation

### Vue CLI

The [vue-cli-plugin-single-spa](https://github.com/single-spa/vue-cli-plugin-single-spa) will get everything set up.

```sh
vue add single-spa
```

The CLI Plugin does the following for you:

1. Modify your webpack config so that your project works as a single-spa application or parcel.
2. Install [single-spa-vue](https://github.com/single-spa/single-spa-vue).
3. Modify your `main.js` or `main.ts` file so that your project works as a single-spa application or parcel.
4. Add a `set-public-path.js` that will use `systemjs-webpack-interop` in order to set the public path of your application.

### Without Vue CLI

```sh
npm install --save single-spa-vue
```

Alternatively, you can use single-spa-vue by adding `<script src="https://unpkg.com/single-spa-vue"></script>` to your HTML file and
accessing the `singleSpaVue` global variable.

## Usage

Install `systemjs-webpack-interop` if you have not already done so.

`npm install systemjs-webpack-interop -S`

Create a file at the same level as your `main.js/ts` called `set-public-path.js`

```js
import { setPublicPath } from 'systemjs-webpack-interop';

setPublicPath('appName');
```

Note that if you are using the Vue CLI Plugin, your `main.ts` or `main.js` file will be updated with this code automatically and the `set-public-path.js` file
will automatically be created with the app name being your package.json's name property.

If you want to deal with your Vue instance, you can modify the mount method by following this. mount method will return Promise with Vue instance after [v1.6.0](https://github.com/single-spa/single-spa-vue/releases/tag/v1.6.0).

```js
const vueLifecycles = singleSpaVue({...})

export const mount = props => vueLifecycles.mount(props).then(instance => {
  // do what you want with the Vue instance
  ...
})
```

### Vue 2

For Vue 2, change your application's entry file to be the following:

```js
import './set-public-path';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App);
    },
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```

### Vue 3

For Vue 3, change your application's entry file to be the following:

```js
import './set-public-path';
import { h, createApp } from 'vue';
import singleSpaVue from '../lib/single-spa-vue.js';
import router from './router';
import App from './App.vue';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecyle-props
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
      });
    },
  },
  handleInstance: (app) => {
    app.use(router);
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```

## Custom props

[Single-spa custom props](/docs/building-applications/#custom-props) can be passed to your root component like so:

```js
// main.js
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        mountParcel: this.mountParcel,
        otherProp: this.otherProp,
      });
    },
    router,
  },
});
```


```vue
// App.vue
<template>
  <button>{{ otherProp }}</button>
</template>
<script>
export default {
  props: ['mountParcel', 'otherProp'],
}
</script>
```

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
    config.externals(['vue', 'vue-router']);
  },
};
```

### Shared deps without Vue CLI

```js
// webpack.config.js
module.exports = {
  externals: ['vue', 'vue-router'],
};
```

## Options

All options are passed to single-spa-vue via the `opts` parameter when calling `singleSpaVue(opts)`. The following options are available:

- `Vue`: (required) The main Vue object, which is generally either exposed onto the window or is available via `require('vue')` `import Vue from 'vue'`.
- `appOptions`: (required) An object which will be used to instantiate your Vue.js application. `appOptions` will pass directly through to `new Vue(appOptions)`. Note that if you do not provide an `el` to appOptions, that a div will be created and appended to the DOM as a default container for your Vue application.
- `loadRootComponent`: (optional and replaces `appOptions.render`) A promise that resolves with your root component. This is useful for lazy loading.
- `handleInstance`: (optional) A method can be used to handle Vue instance. Vue 3 brings [new instance API](https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp), and you can access *the app instance* from this, like `handleInstance: (app) => app.use(router)`. For Vue 2 users, a [Vue instance](https://vuejs.org/v2/guide/instance.html) can be accessed.

To configure which dom element the single-spa application is mounted to, use [appOptions.el](https://vuejs.org/v2/api/#el):

```js
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: h => h(App),
    el: '#a-special-container',
  },
});
```

## Custom Props

[single-spa custom props](/docs/building-applications.html#custom-props) are available in the `render()` function in your main file. They can be passed as custom props to your App component.

```js
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
        },
      });
    },
  },
});
```

## Parcels

### Creating a parcel

A parcel config is an object that represents a component implemented in Vue, React, Angular, or any other framework.

To create a VueJS single-spa parcel config object, simply omit the `el` option from your appOptions, since the dom element will be specified by the user of the Parcel. Every other
option should be provided exactly the same as in the example above.

```js
const parcelConfig = singleSpaVue({...});
```

### Rendering a parcel

To render a parcel config object in Vue, you can use single-spa-vue's `Parcel` component:

```vue
<template>
  <Parcel
    v-on:parcelMounted="parcelMounted()"
    v-on:parcelUpdated="parcelUpdated()"
    :config="parcelConfig"
    :mountParcel="mountParcel"
    :wrapWith="wrapWith"
    :wrapClass="wrapClass"
    :wrapStyle="wrapStyle"
    :parcelProps="getParcelProps()"
  />
</template>

<script>
// For old versions of webpack
import Parcel from 'single-spa-vue/dist/esm/parcel'
// For new versions of webpack
import Parcel from 'single-spa-vue/parcel'

import { mountRootParcel } from 'single-spa'

export default {
  components: {
    Parcel
  },
  data() {
    return {
      /*
        parcelConfig (object, required)

        The parcelConfig is an object, or a promise that resolves with a parcel config object.
        The object can originate from within the current project, or from a different
        microfrontend via cross microfrontend imports. It can represent a Vue component,
        or a React / Angular component.
        https://single-spa.js.org/docs/recommended-setup#cross-microfrontend-imports

        Vanilla js object:
        parcelConfig: {
          async mount(props) {},
          async unmount(props) {}
        }

        // React component
        parcelConfig: singleSpaReact({...})

        // cross microfrontend import is shown below
      */
      parcelConfig: System.import('@org/other-microfrontend').then(ns => ns.Widget),


      /*
        mountParcel (function, required)

        The mountParcel function can be either the current Vue application's mountParcel prop or
        the globally available mountRootParcel function. More info at
        http://localhost:3000/docs/parcels-api#mountparcel
      */
      mountParcel: mountRootParcel,

      /*
        wrapWith (string, optional)

        The wrapWith string determines what kind of dom element will be provided to the parcel.
        Defaults to 'div'
      */
      wrapWith: 'div'

      /*
        wrapClass (string, optional)

        The wrapClass string is applied to as the CSS class for the dom element that is provided to the parcel
      */
      wrapClass: "bg-red"

      /*
        wrapStyle (object, optional)

        The wrapStyle object is applied to the dom element container for the parcel as CSS styles
      */
      wrapStyle: {
        outline: '1px solid red'
      },
    }
  },
  methods: {
    // These are the props passed into the parcel
    getParcelProps() {
      return {
        text: `Hello world`
      }
    },
    // Parcels mount asynchronously, so this will be called once the parcel finishes mounting
    parcelMounted() {
      console.log("parcel mounted");
    },
    parcelUpdated() {
      console.log("parcel updated");
    }
  }
}
</script>
```

## Webpack Public Path

[vue-cli-plugin-single-spa](https://github.com/single-spa/vue-cli-plugin-single-spa) sets the [webpack public path](https://webpack.js.org/guides/public-path/#root) via [SystemJSPublicPathWebpackPlugin](https://github.com/joeldenning/systemjs-webpack-interop). By default, the public path is set to match the following output directory structure:

```sh
dist/
  js/
    app.js
  css/
    main.css
```

With this directory structure (which is the Vue CLI default), the public path should **not** include the `js` folder. This is accomplished by setting [`rootDirectoryLevel`](https://github.com/joeldenning/systemjs-webpack-interop#as-a-webpack-plugin) to be `2`. If this doesn't match your directory structure or setup, you can change the `rootDirectoryLevel` with the following code in your vue.config.js or webpack.config.js:

```js
// vue.config.js
module.exports = {
  chainWebpack(config) {
    config.plugin('SystemJSPublicPathWebpackPlugin').tap((args) => {
      args[0].rootDirectoryLevel = 1;
      return args;
    });
  }
}
```
