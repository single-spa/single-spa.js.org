---
id: configuration
title: Using single-spa-config
sidebar_label: single-spa config
---

The single spa root config consists of the following:
1. The root HTML file that is shared by all single-spa applications.
2. the javascript that calls [`singleSpa.registerApplication()`](/docs/api.html#registerapplication).

Your root config exists only to start up the single-spa applications.

## Index.html file
See [this example root config](http://single-spa-playground.org/playground/html-file) for what a root HTML file looks like.
Notice how it does not have any divs or buttons, but just calls `registerApplication()`.

**You do not have to use SystemJS when using single-spa**, but many examples and tutorials will encourage you to do so because
it allows you to [independently deploy](/docs/separating-applications.html) your applications.

## Registering applications

You must register [applications](building-applications.md) with single-spa so it knows how and when to
initiate, load, mount, and unmount. Registration most commonly occurs inside of the single spa config, but
does not have to. Note that if an application is registered from within another application, that no hierarchy
will be maintained between the applications. Instead, the applications will be siblings and will be mounted
and unmounted according to their own activity functions.

In order to register an application, call the `registerApplication(name, howToLoad, activityFunction)` api. Example:

```js
// single-spa-config.js
import { registerApplication, start } from 'single-spa';

registerApplication("applicationName", loadingFunction, activityFunction);
start();

function loadingFunction() {
  return import("src/app1/main.js");
}

function activityFunction(location) {
  return location.pathname.indexOf("/app1/") === 0;
}
```

### Application name
The first argument to `registerApplication` must be a string name.

### Loading Function or Application
The second argument to `registerApplication` must be either a function that returns a promise [loading function](configuration#loading-function) or the resolved Application.

#### Application as second argument
Optionally for the second argument you can use the resolved Application, consisting of an object with the lifecycle methods.
This allows you import the Application from another file or define applications inline in your single-spa-config

```js
const application = {
  bootstrap: () => Promise.resolve(), //bootstrap function
  mount: () => Promise.resolve(), //mount function
  unmount: () => Promise.resolve(), //unmount function
}
registerApplication('applicatonName', application, activityFunction)

```

#### Loading function
The second argument to `registerApplication` must be a function that returns a promise (or an ["async function"](https://ponyfoo.com/articles/understanding-javascript-async-await)).
The function will be called with no arguments when it's time to load the application for the first time. The returned
promise must be resolved with the application. The most common implementation of a loading function is an import call:
`() => import('/path/to/application.js')`

### Activity function
The third argument to `registerApplication` must be a pure function, the function is provided `window.location` as the first argument, and returns a truthy
value whenever the application should be active. Most commonly, the activity function determines if an application
is active by looking at `window.location`/the first param.

Another way of looking at this is that single-spa is a top-level router that has a lot of applications that have their own sub-router.

single-spa will call each application's activity function under the following scenarios:
- `hashchange` or `popstate` event
- `pushState` or `replaceState` is called
- [`triggerAppChange`](api.md#triggerappchange) api is called on single-spa
- Whenever the `checkActivityFunctions` method is called

## Calling singleSpa.start()
The [`start()` api](api.md#start) **must** be called by your single spa config in order for
applications to actually be mounted. Before `start` is called, applications will be loaded, but not bootstrapped/mounted/unmounted.
The reason for `start` is to give you control over performance. For example, you may want to register applications
immediately (to start downloading the code for the active ones), but not actually mount the applications
until an initial AJAX request (maybe to get information about the logged in user) has been completed. In that case,
the best performance is achieved by calling `registerApplication` immediately, but calling `start` after
the AJAX request is completed.

```js
//single-spa-config.js
import { start } from 'single-spa';

/* Calling start before registering apps means that single-spa can immediately mount apps, without
 * waiting for any initial setup of the single page app.
 */
start();

// Register applications....
```

## Two registered applications simultaneously??
Yep, it's possible. And it's actually not that scary if you do it right. And once you do,
it's really really powerful. One approach to do this is to create a `<div id="app-name"></div>` for each app,
so that they never try to modify the same DOM at the same time.
