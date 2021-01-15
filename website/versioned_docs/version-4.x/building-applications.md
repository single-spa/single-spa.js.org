---
id: building-applications
title: Building single-spa applications
sidebar_label: single-spa applications
---

A single-spa registered application is everything that a normal SPA is, except that it doesn't have an HTML page. In a single-spa world, your SPA contains many registered applications, where each has its own framework. Registered applications have their own client-side routing and their own frameworks/libraries. They render their own HTML and have full freedom to do whatever they want, whenever they are _mounted_. The concept of being _mounted_ refers to whether a registered application is putting content on the DOM or not. What determines if a registered application is mounted is its [activity function](configuration#activity-function). Whenever a registered application is _not mounted_, it should remain completely dormant until mounted.

## Creating a registered application

To create a registered application, first [register the application with single-spa](configuration#registering-applications). Once registered, the registered application must correctly implement **all** of the following lifecycle functions inside of its main entry point.

## Registered application lifecycle

During the course of a single-spa page, registered applications are loaded, bootstrapped (initialized), mounted, unmounted, and unloaded. single-spa provides hooks into each phase via `lifecycles`.

A lifecycle function is a function or array of functions that single-spa will call on a registered application. single-spa calls these by finding specific named exports from the registered application's main file.

Notes:

- Implementing `mount` and `unmount` is required. But implementing `bootstrap` and `unload` is optional.
- Each lifecycle function must either return a `Promise` or be an `async function`.
- If an array of functions is exported (instead of just one function), the functions will be called
  one-after-the-other, waiting for the resolution of one function's promise before calling the next.
- If single-spa is [not started](api.md#start), applications will be loaded,
  but will not be bootstrapped, mounted or unmounted.

:::info
Framework-specific helper libraries exist in the [single-spa ecosystem](ecosystem.md) to implement these required lifecycle methods. This documentation is helpful for understanding what those helpers are doing, or for implementing your own.
:::

## Lifecyle props

Lifecycle functions are called with a `props` argument, which is an object with some guaranteed information and additional custom information.

```js
function bootstrap(props) {
  const {
    name, // The name of the application
    singleSpa, // The singleSpa instance
    mountParcel, // Function for manually mounting
    customProps, // Additional custom information
  } = props; // Props are given to every lifecycle
  return Promise.resolve();
}
```

#### Built-in props

Each lifecycle function is guranteed to be called with the following props:

- `name`: The string name that was registered to single-spa.
- `singleSpa`: A reference to the singleSpa instance, itself. This is intended to allow applications and helper libraries to call singleSpa
  APIs without having to import it. This is useful in situations where there are multiple webpack configs that are not set up to ensure
  that only one instance of singleSpa is loaded.
- `mountParcel`: The [mountParcel function](/docs/parcels-api.html#mountparcel).

#### Custom props

In addition to the built-in props that are provided by single-spa, you may optionally specify custom props to be passed to an application by providing a fourth argument to `registerApplication`. These _customProps_ will be passed into each lifecycle method.

```js title="root.application.js"
singleSpa.registerApplication(
  'app1',
  () => {},
  () => {},
  { authToken: 'd83jD63UdZ6RS6f70D0' },
);
```

```js title="app1.js"
export function mount(props) {
  console.log(props.customProps.authToken); // do something with the common authToken in app1
  return reactLifecycles.mount(props);
}
```

Some use cases could be to:

- share a common access token with all child apps
- pass down some initialization information, like the rendering target
- pass a reference to a common event bus so each app may talk to each other

Note that when no _customProps_ are provided during registration, `props.customProps` defaults to an empty object.

### Lifecycle helpers

Some helper libraries that implement lifecycle functions for ease of use are available for many popular frameworks/libraries. Learn more on the [Ecosystem page](ecosystem.md).

### Load

When registered applications are being lazily loaded, this refers to when the code for a registered application is fetched from the server and executed. This will happen once the registered application's [activity function](configuration#activity-function) returns a truthy value for the first time. It is best practice to do as little as possible / nothing at all during `load`, but instead to wait until the bootstrap lifecycle function to do anything. If you need to do something during `load`, simply put the code into a registered application's main entry point, but not inside of an exported function. For example:

```js
console.log("The registered application has been loaded!");

export async function bootstrap(props) {...}
export async function mount(props) {...}
export async function unmount(props) {...}
```

### Bootstrap

This lifecycle function will be called once, right before the registered application is mounted for the first time.

```js
export function bootstrap(props) {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log('bootstrapped!');
  });
}
```

### Mount

This lifecycle function will be called whenever the registered application is not mounted, but its [activity function](configuration#activity-function) returns a truthy value. When called, this function should look at the URL to determine the active route and then create DOM elements, DOM event listeners, etc. to render content to the user. Any subsequent routing events (such as `hashchange` and `popstate`) will **not** trigger more calls to `mount`, but instead should be handled by the application itself.

```js
export function mount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI rendering here
    console.log('mounted!');
  });
}
```

### Unmount

This lifecycle function will be called whenever the registered application is mounted, but its [activity function](configuration#activity-function) returns a falsy value. When called, this function should clean up all DOM elements, DOM event listeners, leaked memory, globals, observable subscriptions, etc. that were created at any point when the registered application was mounted.

```js
export function unmount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('unmounted!');
  });
}
```

### Unload

The `unload` lifecycle is an optionally implemented lifecycle function. It will be called whenever an application should be `unloaded`. This will not ever happen unless someone calls the [`unloadApplication`](api.md#unloadapplication) API. If a registered application does not implement the unload lifecycle, then it assumed that unloading the app is a no-op.

The purpose of the `unload` lifecycle is to perform logic right before a single-spa application is unloaded. Once the application is unloaded, the application status will be NOT_LOADED and the application will be re-bootstrapped.

The motivation for `unload` was to implement the hot-loading of entire registered applications, but it is useful in other scenarios as well when you want to re-bootstrap applications, but perform some logic before applications are re-bootstrapped.

```js
export function unload(props) {
  return Promise.resolve().then(() => {
    // Hot-reloading implementation goes here
    console.log('unloaded!');
  });
}
```

## Timeouts

By default, registered applications obey the global dieOnTimeout configuration, but can override that behavior for their specific application. This is done by exporting a `timeouts` object from the main entry point of the registered application. Example:

```js title="app-1.js"
export function bootstrap(props) {...}
export function mount(props) {...}
export function unmount(props) {...}

export const timeouts = {
  bootstrap: {
    millis: 5000,
    dieOnTimeout: true,
  },
  mount: {
    millis: 5000,
    dieOnTimeout: false,
  },
  unmount: {
    millis: 5000,
    dieOnTimeout: true,
  },
  unload: {
    millis: 5000,
	dieOnTimeout: true,
  },
};
```

## Transitioning between applications

If you find yourself wanting to add transitions as applications are mounted and unmounted, then you'll probably want to tie into the `bootstrap`, `mount`, and `unmount` lifecycle methods. This [single-spa transitions](https://github.com/frehner/singlespa-transitions) repo is a small proof-of-concept of how you can tie into these lifecycle methods to add transitions as your apps mount and unmount.

Transitions for pages within a mounted application can be handled entirely by the application itself. For example, using [react-transition-group](https://github.com/reactjs/react-transition-group) for React-based projects.
