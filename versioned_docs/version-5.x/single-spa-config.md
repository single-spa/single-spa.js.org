---
id: configuration
title: Configuring single-spa
sidebar_label: Configuring single-spa
---

The single-spa root config consists of the following:

1. The root HTML file that is shared by all single-spa applications.
2. The JavaScript that calls [`singleSpa.registerApplication()`](/docs/api.html#registerapplication).

Your root config exists only to start up the single-spa applications.

## Index.html file
See [this example root config](https://github.com/polyglot-microfrontends/root-config/blob/master/src/index.ejs) for what a root HTML file looks like.

**You do not have to use SystemJS when using single-spa**, but many examples and tutorials will encourage you to do so because
it allows you to [independently deploy](/docs/separating-applications.html) your applications.

## Registering applications

You must register [applications](building-applications.md) with single-spa so it knows how and when to
initiate, load, mount, and unmount each application. Registration most commonly occurs inside of the single-spa config but
does not have to. Note that if an application is registered from within another application, no hierarchy will be
maintained between the applications. Instead, the applications will be siblings and will be mounted
and unmounted according to their own activity functions.

In order to register an application, call the `registerApplication` function. Example:

```js
// single-spa-config.js
import { registerApplication, start } from 'single-spa';

// Simple usage
registerApplication(
  'app2',
  () => import('src/app2/main.js'),
  (location) => location.pathname.startsWith('/app2'),
  { some: 'value' }
);

// Config with more expressive API
registerApplication({
  name: 'app1',
  app: () => import('src/app1/main.js'),
  activeWhen: '/app1',
  customProps: {
    some: 'value',
  }
});

start();
```
### Using arguments

#### Application name
The first argument to `registerApplication` must be a string name.

#### Loading Function or Application
The second argument to `registerApplication` must be either a function that returns a promise [loading function](configuration#loading-function) or the resolved Application.

##### Application as second argument
Optionally for the second argument you can use the resolved Application, consisting of an object with the lifecycle methods.
This allows you import the Application from another file or define applications inline in your single-spa-config

```js
const application = {
  bootstrap: () => Promise.resolve(), //bootstrap function
  mount: () => Promise.resolve(), //mount function
  unmount: () => Promise.resolve(), //unmount function
}
registerApplication('applicationName', application, activityFunction)

```

##### Loading function
The second argument to `registerApplication` must be a function that returns a promise (or an ["async function"](https://ponyfoo.com/articles/understanding-javascript-async-await)).
The function will be called with no arguments when it's time to load the application for the first time. The returned
promise must be resolved with the application. The most common implementation of a loading function is an import call:
`() => import('/path/to/application.js')`

#### Activity function
The third argument to `registerApplication` must be a pure function, the function is provided `window.location` as the first argument, and returns a truthy
value whenever the application should be active. Most commonly, the activity function determines if an application
is active by looking at `window.location`/the first param.

Another way of looking at this is that single-spa is a top-level router that has a lot of applications that have their own sub-router.

single-spa will call each application's activity function under the following scenarios:
- `hashchange` or `popstate` event
- `pushState` or `replaceState` is called
- [`triggerAppChange`](api.md#triggerappchange) api is called on single-spa
- Whenever the `checkActivityFunctions` method is called

#### Custom props

The optional fourth argument to `registerApplication` is [custom props](/docs/building-applications/#custom-props) that are passed to the application's single-spa lifecycle functions. The custom props may be either an object or a function that returns an object. Custom prop functions are called with the application name and current `window.location` as arguments.

### Using configuration object

```js
singleSpa.registerApplication({
  name: 'myApp',
  app: () => import('src/myApp/main.js'),
  activeWhen: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')],
  customProps: {
    some: 'value',
  },
});

singleSpa.registerApplication({
  name: 'myApp',
  app: () => import('src/myApp/main.js'),
  activeWhen: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')],
  customProps: (name, location) => ({
    some: 'value',
  }),
});
```

#### config.name
Must be a string name

#### config.app
The definition of your app, which can be an object with single-spa lifecycle
methods, or a loading function, the same as the second argument on the arguments API

#### config.activeWhen
Can be an activity function, like the arguments API, a path prefix or an array
with both. Since the most common use case is to look at the `window.location` and match the URL with a
prefix, we decided to do this for you!

#### Path prefix
The path prefix will match the start of your URL, allowing everything after the
prefix. Examples:
  <dl>
    <dt>'/app1'</dt>
    <dd>✅ https://app.com/app1</dd>
    <dd>✅ https://app.com/app1/anything/everything</dd>
    <dd>🚫 https://app.com/app2</dd>
    <dt>'/users/:userId/profile'</dt>
    <dd>✅ https://app.com/users/123/profile</dd>
    <dd>✅ https://app.com/users/123/profile/sub-profile/</dd>
    <dd>🚫 https://app.com/users//profile/sub-profile/</dd>
    <dd>🚫 https://app.com/users/profile/sub-profile/</dd>
    <dt>'/pathname/#/hash'</dt>
    <dd>✅ https://app.com/pathname/#/hash</dd>
    <dd>✅ https://app.com/pathname/#/hash/route/nested</dd>
    <dd>🚫 https://app.com/pathname#/hash/route/nested</dd>
    <dd>🚫 https://app.com/pathname#/another-hash</dd>
    <dt>['/pathname/#/hash', '/app1']</dt>
    <dd>✅ https://app.com/pathname/#/hash/route/nested</dd>
    <dd>✅ https://app.com/app1/anything/everything</dd>
    <dd>🚫 https://app.com/pathname/app1</dd>
    <dd>🚫 https://app.com/app2</dd>
  </dl>

#### config.customProps

The optional `customProps` property provides [custom props](/docs/building-applications/#custom-props) that are passed to the application's single-spa lifecycle functions. The custom props may be either an object or a function that returns an object. Custom prop functions are called with the application name and current `window.location` as arguments.

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
it's really really powerful. One approach to do this is to create a `<div>` for each app,
so that they never try to modify the same DOM at the same time.

The `<div>` will need an `id` starting with the prefix `single-spa-application:`
and then your app name. For example, if you had an app called `app-name`, you'd
make a `<div>` with the id `single-spa-application:app-name`.

An example with multiple applications would look like this:

```html
<div id="single-spa-application:app-name"></div>
<div id="single-spa-application:other-app"></div>
```
