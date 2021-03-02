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

Note that you can alternatively `<script src="https://cdn.jsdelivr.net/npm/single-spa-angularjs@<VERSION>/lib/single-spa-angularjs.js` and access the library
via the `window.singleSpaAngularjs.default()` global function if that is easier for you.

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
      _export(window.singleSpaAngularjs.default({
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
- `uiRouter`: (optional) If you are using angular-ui-router, set this option to either `true` or to a string value. The string value will be the value of the ui-view HTML attribute. For example, `uiRouter: 'core'` will be `<div ui-view="core" />` whereas `uiRouter: true` turns into `<div ui-view />`.
- `preserveGlobal`: (optional) A boolean that defaults to false. Set if you want to keep angular on the global even after an app unmounts.
- `elementId`: (optional) A string which will be used to identify the element appended to the DOM and bootstrapped by Angular.
- `strictDi`: (optional - part of the bootstrap [config object](https://docs.angularjs.org/api/ng/function/angular.bootstrap#usage)) A boolean that defaults to false. Set if you want to enable StrictDi mode
- `template`: (optional) An HTML string that will be inserted into the DOM when the app is mounted. The template goes inside of the element returned by domElementGetter. If not provided, no template will be inserted. When using angular-ui-router, you often do not need to use this since ui-router will be putting a template onto the dom for you.

## Custom Props

[single-spa custom props](/docs/building-applications/#lifecycle-props) are made available as `$rootScope.singleSpaProps`.

## Parcels

### Creating AngularJS parcels

The `singleSpaAngularJs()` function returns an object that can serve as either a [single-spa application](/docs/building-applications) or [single-spa parcel](/docs/parcels-overview).

### Rendering parcels in AngularJS

To render a single-spa parcel inside of your AngularJS application, you can use the `<single-spa-parcel>` directive. To do so, first add the `"single-spa-angularjs"` module as a dependency of your application:

```js
import 'single-spa-angularjs/lib/parcel.js';

angular.module('myMainModule', [
  'single-spa-angularjs'
])
```

Then you can use the `<single-spa-parcel>` directive in your templates:

```html
<single-spa-parcel
  parcel-config="parcelConfig"
  props="parcelProps"
  mount-parcel="mountRootParcel"
/>
```

In your controller, set the corresponding values on the $scope:

```js
import { mountRootParcel } from 'single-spa';

// The parcelConfig binding is required. It must be an object or loading function that resolves with an object.
$scope.parcelConfig = {async mount() {}, async unmount() {}}

// You can retrieve parcels from other microfrontends via cross-microfrontend imports
// See https://single-spa.js.org/docs/recommended-setup#cross-microfrontend-imports
// $scope.parcelConfig = () => System.import('@org/settings-modal');

// The props binding is optional, defaulting to no custom props being passed into the parcel
$scope.props = {
  extra: 'info can be passed here'
}

// As long as you're using <single-spa-parcel> inside of another single-spa application or parcel,
// the mountParcel binding is not needed. However, it is needed otherwise.
$scope.mountParcel = mountRootParcel
```

If you run into issues related to `singleSpaProps` not being available for injection, this is likely caused by using `<single-spa-parcel>` outside of a single-spa application or parcel. It is okay to do so, but you'll need to manually provide the `singleSpaProps` value:

```js
import { mountRootParcel } from 'single-spa';

angular.module('single-spa-angularjs').config(['$provide', ($provide) => {
  // This can be an empty object, you just need the DI to not fail
  const props = {};

  // Alternatively, you can provide a mountParcel function that will be used as the default value for the mount-parcel attribute
  // const props = {mountParcel: mountRootParcel}

  $provide.value('singleSpaProps', props);
}])
```

## Migrating

Migrating an existing AngularJS application to single-spa can be a tricky. Here are some recommendations.

### High level approach

1. Convert the angularjs application to be a single-spa application via global variables.
2. Switch the angularjs application from being a global variable to being SystemJS in-browser module.
3. Add a new single-spa application (doesn't need to be angularjs)

### Step 1: Convert to global variable

1. Load single-spa and single-spa-angularjs as global variables in your main HTML file:

```html
<!--
  Consider upgrading the versions of these libraries
  They likely have had updates since this documentation was written
-->
<script src="https://cdn.jsdelivr.net/npm/single-spa@5.9.1/lib/umd/single-spa.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/single-spa-angularjs@4.2.1/lib/single-spa-angularjs.min.js"></script>
```

2. Change your angularjs application to not mount to the DOM. This is generally done removing the `ng-app` attribute in your main html file.
3. In one of the first / main scripts loaded for your angularjs application, create your single-spa application as a global variable. See [this code](#as-a-global-variable).
4. In your main HTML file, add the following:
```html
<script>
  window.singleSpa.registerApplication({
    name: "legacyAngularjsApp",
    app: window.legacyAngularjsApp,
    activeWhen: ['/']
  })
  window.singleSpa.start();
</script>
```
5. Confirm that your application now is mounting again and works properly. Also, check that it's in `MOUNTED` status as a single-spa microfrontend:

```js
// in the browser console, check that it's in `MOUNTED` status
console.log('legacyAngularjsApp status', singleSpa.getAppStatus('legacyAngularjsApp');
```

### Step 2: Convert to SystemJS module:

This step is not required unless you want to do [cross microfrontend imports](/docs/recommended-setup#cross-microfrontend-imports) between your angularjs microfrontend and other microfrontends.

1. Add systemjs to your index.html file:

```html
<!-- consider checking/upgrading systemjs version -->
<script type="systemjs-importmap">
  {
    "imports": {
      "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.1/lib/system/single-spa.min.js",
      "@org/legacyAngularjsApp": "/main-angular-app.js"
    }
  }
</script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.9.1/dist/system.min.js"></script>
```

2. Remove the global single-spa script:

```diff
- <script src="https://cdn.jsdelivr.net/npm/single-spa@5.9.1/lib/umd/single-spa.min.js"></script>
```

3. Modify your main / first angularjs script file to create a systemjs module instead of global variable. See [this code](/docs/ecosystem-angularjs#as-a-systemjs-module).

4. Remove the `<script>` for loading that main / first angularjs script file. Replace it with a System.import.

```diff
- <script src="/main-angular-app.js"></script>
```

5. Modify the `<script>` in your main HTML file to load the angularjs app as a systemjs module instead of global variable:

```diff
 window.singleSpa.registerApplication({
   name: "legacyAngularjsApp",
-   app: window.legacyAngularjsApp,
+   app: function() { return System.import('@org/legacyAngularjsApp'); },
   activeWhen: ['/']
 })
```

6. Verify that the app continues working.

### Step 3: Add new microfrontend

In single-spa, it's encouraged to split microfrontends by route. During the migration/transition period, you may need to have the legacy angularjs application always active to show navigation menus, even for routes that are controlled by new microfrontends.

It's recommended to create new microfrontends via the [single-spa CLI](/docs/create-single-spa).

1. Add a new call to `registerApplication()` to your index.html file.
```js
window.singleSpa.registerApplication({
  name: "new-microfrontend",
  app: function () { return System.import("new-microfrontend"); },
  activeWen: ["/route-for-new-microfrontend"]
})
```
2. Add the new microfrontend to your import map in the index.html file.

```html
<script type="systemjs-importmap">
  {
    "imports": {
      "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.1/lib/system/single-spa.min.js",
      "@org/legacyAngularjsApp": "/main-angular-app.js",
      "@org/new-microfrontend": "http://localhost:8080/new-microfrontend.js"
    }
  }
</script>
```
3. Start a new microfrontend on the port in the import map. Go to the route for the new microfrontend and verify it is loaded.

## Examples

- [polyglot microfrontends account settings](https://github.com/polyglot-microfrontends/account-settings): Gulp + angularjs@1.7 project integrated with Vue microfrontends.
- [single-spa-es5-angularjs](https://github.com/joeldenning/single-spa-es5-angularjs): No build process - just global variables.
