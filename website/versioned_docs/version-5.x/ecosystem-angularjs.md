---
id: ecosystem-angularjs
title: single-spa-angularjs
sidebar_label: AngularJS
---

single-spa-angularjs is a helper library that helps implement [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for use with [AngularJS](https://angularjs.org/). Check out the [single-spa-angularjs github](https://github.com/single-spa/single-spa-angularjs).

## Installation
```sh
npm install --save single-spa-angularjs
```

Note that you can alternatively `<script src="https://unpkg.com/single-spa-angularjs"></script>` and access the library
via the `singleSpaAngularjs` global variable if that is easier for you.

## With a bundler

If you're using a bundler such as webpack, add the following to your entry file:

```js
import singleSpaAngularJS from 'single-spa-angularjs';
import angular from 'angular';

const ngLifecycles = singleSpaAngularJS({
  angular: angular,
  mainAngularModule: 'app',
  uiRouter: true,
  preserveGlobal: false,
  template: '<my-component />',
});

export const bootstrap = ngLifecycles.bootstrap;
export const mount = ngLifecycles.mount;
export const unmount = ngLifecycles.unmount;
```

## Without a bundler
If you're not using a bundler, you'll need to make your angularjs application a SystemJS module or a global variable. The SystemJS
module is preferred, and you can read about it more in the [recommended single-spa setup](/docs/faq.html#is-there-a-recommended-setup).

### As a SystemJS module
Add the following to your AngularJS application. If you're using gulp/grunt to concatenate files together, just create a new file called
`single-spa-application.js` and make sure it's included in your final build file.

```js
System.register([], function(_export) {
  return {
    execute: function() {
      _export(singleSpaAngularJS({
        angular: angular,
        mainAngularModule: 'app',
        uiRouter: true,
        preserveGlobal: false,
        template: '<my-component />',
      }))
    }
  }
})
```

Once you do this, you can `System.import()` the bundle file and SystemJS + single-spa will know what to do with your module. Your
[loading function](/docs/configuration.html#loading-function-or-application) should be `System.import('name-of-app')`. Make sure to
add `name-of-app` to your [import map](https://single-spa-playground.org/playground/import-map).

### As a global variable
```js
// note that "js" is not capitalized in the name of the global variable.
window.myAngularApp = singleSpaAngularjs({
  angular: angular,
  mainAngularModule: 'app',
  uiRouter: true,
  preserveGlobal: false,
  template: '<my-component />',
})
```

Your [loading function](/docs/configuration.html#loading-function-or-application) should just be the global variable itself. For example:
```js
singleSpa.registerApplication({
  name: 'my-angular-app',
  app: myAngularApp,
  activeWhen: () => true
});
```

## Options

All options are passed to single-spa-angularjs via the `opts` parameter when calling `singleSpaAngularJS(opts)`. The following options are available:

- `angular`: (required) The main angular object, which is generally either exposed onto the window or is available via `require('angular')` or `import angular from 'angular'`.
- `domElementGetter`: (optional) A function that takes in the `props` parameter and returns a DOMElement. This dom element is where the angular
  application will be bootstrapped, mounted, and unmounted. If not provided, the default is to create a div and append it to `document.body`.
- `mainAngularModule`: (required) A string that is the name of the angular module that will be bootstrapped by angular. See [angular docs](https://docs.angularjs.org/api/ng/function/angular.bootstrap) for `angular.bootstrap()`.
- `uiRouter`: (optional) If you are using angular-ui-router, set this option to either `true` or to a string value. The string value will be the value of the ui-view html attribute. For example, `uiRouter: 'core'` will be `<div ui-view="core" />` whereas `uiRouter: true` turns into `<div ui-view />`.
- `preserveGlobal`: (optional) A boolean that defaults to false. Set if you want to keep angular on the global even after an app unmounts.
- `elementId`: (optional) A string which will be used to identify the element appended to the DOM and bootstrapped by Angular.
- `strictDi`: (optional - part of the bootstrap [config object](https://docs.angularjs.org/api/ng/function/angular.bootstrap#usage)) A boolean that defaults to false. Set if you want to enable StrictDi mode
- `template`: (optional) An html string that will be inserted into the DOM when the app is mounted. The template goes inside of the element returned by domElementGetter. If not provided, no template will be inserted. When using angular-ui-router, you often do not need to use this since ui-router will be putting a template onto the dom for you.

## Custom Props

[single-spa custom props](./building-applications.md#lifecycle-props) are made available as `$rootScope.singleSpaProps`.

## Examples

- [polyglot microfrontends account settings](https://github.com/polyglot-microfrontends/account-settings): Gulp + angularjs@1.7 project integrated with Vue microfrontends.
- [single-spa-es5-angularjs](https://github.com/joeldenning/single-spa-es5-angularjs): No build process - just global variables.
