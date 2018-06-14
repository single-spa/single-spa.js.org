---
id: ecosystem-angular1
title: single-spa-angular1
sidebar_label: AngularJS
---

Generic lifecycle hooks for angular 1 applications that are registered as [single-spa applications](https://github.com/CanopyTax/single-spa/blob/master/docs/applications.md#registered-applications) of [single-spa](https://github.com/CanopyTax/single-spa).

## Examples

In addition to this Readme, example usage of single-spa-angular1 can be found in the [single-spa-examples](https://github.com/CanopyTax/single-spa-examples/blob/master/src/angular1/angular1.app.js) project.

## Quickstart

First, in the [single-spa application](https://github.com/CanopyTax/single-spa/blob/master/docs/applications.md#registered-applications), run `npm install --save single-spa-angular1`. Then, create an entry file for the application:

```js
import singleSpaAngular1 from 'single-spa-angular1';
import angular from 'angular';

const ng1Lifecycles = singleSpaAngular1({
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
Check out [this example repo](https://github.com/joeldenning/single-spa-es5-angularjs)

## Options

All options are passed to single-spa-angular1 via the `opts` parameter when calling `singleSpaAngular1(opts)`. The following options are available:

- `angular`: (required) The main angular object, which is generally either exposed onto the window or is available via `require('angular')` or `import angular from 'angular'`.
- `domElementGetter`: (required) A function that takes in no arguments and returns a DOMElement. This dom element is where the angular application will be bootstrapped, mounted, and unmounted.
- `mainAngularModule`: (required) A string that is the name of the angular module that will be bootstrapped by angular. See [angular docs](https://docs.angularjs.org/api/ng/function/angular.bootstrap) for `angular.bootstrap()`.
- `uiRouter`: (optional) If you are using angular-ui-router, set this option to either `true` or to a string value. The string value will be the value of the ui-view html attribute. For example, `uiRouter: 'core'` will be `<div ui-view="core" />` whereas `uiRouter: true` turns into `<div ui-view />`.
- `preserveGlobal`: (optional) A boolean that defaults to false. Set if you want to keep angular on the global even after an app unmounts.
- `elementId`: (optional) A string which will be used to identify the element appended to the DOM and bootstrapped by Angular.
- `strictDi`: (optional - part of the bootstrap [config object](https://docs.angularjs.org/api/ng/function/angular.bootstrap#usage)) A boolean that defaults to false. Set if you want to enable StrictDi mode
- `template`: (optional) An html string that will be inserted into the DOM when the app is mounted. The template goes inside of the element returned by domElementGetter. If not provided, no template will be inserted. When using angular-ui-router, you often do not need to use this since ui-router will be putting a template onto the dom for you.