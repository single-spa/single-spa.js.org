---
id: ecosystem-angularjs
title: single-spa-angularjs
sidebar_label: AngularJS
---

single-spa-angularjs is a helper library that helps implement [single-spa registered application](single-spa-config.md#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for for use with [AngularJS](https://angularjs.org/). Check out the [single-spa-angularjs github](https://github.com/CanopyTax/single-spa-angularjs).

## Examples

In addition to this Readme, example usage of single-spa-angularjs can be found in the [single-spa-examples](https://github.com/CanopyTax/single-spa-examples/blob/master/src/angular1/angular1.app.js) project.

## Quickstart

First, in the [single-spa application](building-applications.md#registered-applications), run `npm install --save single-spa-angularjs`. Then, create an entry file for the application:

```js
import singleSpaangularJS from 'single-spa-angularjs';
import angular from 'angular';

const ng1Lifecycles = singleSpaangularJS({
  angular: angular,
  domElementGetter: () => document.getElementById('main-content'),
  mainAngularModule: 'app',
  uiRouter: true,
  preserveGlobal: false,
  template: '<my-component />',
});

export const bootstrap = [
  ng1Lifecycles.bootstrap,
];

export const mount = [
  ng1Lifecycles.mount,
];

export const unmount = [
  ng1Lifecycles.unmount,
];
```

## Looking for an ES5 version?
Check out [this example repo](https://github.com/joeldenning/single-spa-es5-angular1)

## Options

All options are passed to single-spa-angularjs via the `opts` parameter when calling `singleSpaangularJS(opts)`. The following options are available:

- `angular`: (required) The main angular object, which is generally either exposed onto the window or is available via `require('angular')` or `import angular from 'angular'`.
- `domElementGetter`: (required) A function that takes in no arguments and returns a DOMElement. This dom element is where the angular application will be bootstrapped, mounted, and unmounted.
- `mainAngularModule`: (required) A string that is the name of the angular module that will be bootstrapped by angular. See [angular docs](https://docs.angularjs.org/api/ng/function/angular.bootstrap) for `angular.bootstrap()`.
- `uiRouter`: (optional) If you are using angular-ui-router, set this option to either `true` or to a string value. The string value will be the value of the ui-view html attribute. For example, `uiRouter: 'core'` will be `<div ui-view="core" />` whereas `uiRouter: true` turns into `<div ui-view />`.
- `preserveGlobal`: (optional) A boolean that defaults to false. Set if you want to keep angular on the global even after an app unmounts.
- `elementId`: (optional) A string which will be used to identify the element appended to the DOM and bootstrapped by Angular.
- `strictDi`: (optional - part of the bootstrap [config object](https://docs.angularjs.org/api/ng/function/angular.bootstrap#usage)) A boolean that defaults to false. Set if you want to enable StrictDi mode
- `template`: (optional) An html string that will be inserted into the DOM when the app is mounted. The template goes inside of the element returned by domElementGetter. If not provided, no template will be inserted. When using angular-ui-router, you often do not need to use this since ui-router will be putting a template onto the dom for you.