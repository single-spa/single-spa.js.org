---
id: ecosystem-leaked-globals
title: single-spa-leaked-globals
sidebar_label: Leaked globals
---

[single-spa-leaked-globals](https://github.com/single-spa/single-spa-leaked-globals) is a helper library for dealing with single-spa-applications
that depend on global variables. Such applications are usually applications that use AngularJS, Backbone, or other older frameworks
that were popular when ES modules were not yet available.

## What single-spa-leaked-globals does
single-spa-leaked-globals will remove specific global variables from `window` during your application's
[unmount lifecycle](/docs/building-applications.html#unmount), and add them back to `window` during your application's
[mount lifecycle](/docs/building-applications.html#mount).

## Before using single-spa-leaked-globals
It might be okay for single-spa applications to leak some global variables. Those leaked global variables could be harmless. Below are some
situations where using single-spa-leaked-globals could be useful. If your situation is not listed, consider not using single-spa-leaked-globals.

1. Your applications are accidentally sharing global variables and the order in which they are mounted matters. For example, the jQuery `$` variable
  is available at the start, but app1 installs a jQuery plugin that app2 assumes is there. If app2 is mounted
  before app1, you might get an error because the jQuery plugin is not installed. In that situation, the best solution is maybe to install
  the jQuery plugin inside of your [single-spa config](/docs/configuration.html). But if that's not desireable, you can use single-spa-leaked-globals
  to manage two separate versions of jQuery -- one for app1 and one for app2.
2. Your applications require different versions of the same global variable. For example, consider when app1 depends on
  an [underscorejs](https://underscorejs.org/) `_` global variable and app2 depends on a [lodash](https://lodash.com/) `_` global variable.
  They both need a global `_` variable, but expect different functions to be available on it. The same could be true for different versions of the
  same library, such as lodash 3 vs lodash 4. In those situations, you can use single-spa-leaked-globals to make sure the `_` that is available
  for app1 and app2 is the correct one.

## Limitations
single-spa-leaked-globals cannot change the global nature of global dependencies. Only one instance of the global variable can be on the
`window` at a time. **This means that you probably can only have one application mounted at a time that depends on that global variable.**
If two applications depend on the same global variable and are [active](docs/configuration.html#activity-function) at the same time,
single-spa-leaked-globals won't work for you.

## Installation
### Via npm
```sh
npm install --save single-spa-leaked-globals

# or
yarn add single-spa-leaked-globals
```

### Via cdn
You can also use single-spa-leaked-globals via CDN, ironically as a global variable itself:
```html
<script src="https://cdn.jsdelivr.net/npm/single-spa-leaked-globals"></script>
```

Note that you should probably lock down the version of the library to avoid accidentally upgrading. See 
https://cdn.jsdelivr.net/npm/single-spa-leaked-globals/ to find the latest version.

## Usage
The single-spa-leaked-globals library is often used in conjunction with another helper library, such as
single-spa-angularjs or single-spa-backbone. As such, you'll want to
[export an array](/docs/building-applications.html#registered-application-lifecycle) for your lifecycle functions
instead of exporting just a function.

```js
import singleSpaLeakedGlobals from 'single-spa-leaked-globals';

// Use single-spa-angularjs, single-spa-backbone, etc to get your framework specific lifecycles
const frameworkLifecycles = ...

const leakedGlobalsLifecycles = singleSpaLeakedGlobals({
  globalVariableNames: ['$', 'jQuery', '_'],
})

export const bootstrap = [
  leakedGlobalsLifecycles.bootstrap,
  frameworkLifecycles.bootstrap,
]

export const mount = [
  // Make sure leaked globals lifecycles' mount function is **before** other lifecycles' mount
  // This is so the global vars are available when the framework mounts
  leakedGlobalsLifecycles.mount,
  frameworkLifecycles.mount,
]

export const unmount = [
  leakedGlobalsLifecycles.unmount,
  // Make sure leaked globals lifecycles' unmount function is **after** other lifecycles' unmount
  // This is so the global vars are still available during the framework unmount lifecycle function.
  frameworkLifecycles.unmount,
]
```

If you're using single-spa-leaked-globals as a global variable itself:
```js
const leakedGlobalsLifecycles = window.singleSpaLeakedGlobals.default({
  globalVariableNames: ['_'],
})
```

## API / Options
single-spa-leaked-globals is called with an object with the following properties:
- `globalVariableNames` (required): An array of strings. Each string is the name of a global variable that should
  be removed when the application is unmounted, and added back when the application is mounted.
