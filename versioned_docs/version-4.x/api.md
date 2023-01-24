---
id: api
title: Applications API
sidebar_label: Applications API
---

single-spa exports named functions and variables rather than a single default export.
This means importing must happen in one of two ways:

```js
import { registerApplication, start } from 'single-spa';
// or
import * as singleSpa from 'single-spa';
```

## registerApplication

```js
singleSpa.registerApplication(
  'appName',
  () => System.import('appName'),
  location => location.pathname.startsWith('appName'),
);
```

`registerApplication` is the most important api your root config will use. Use this function to register any application within single-spa.

Note that if an application is registered from within another application, that no hierarchy will be maintained between the applications.

:::note
It is described in detail inside of the [Configuration docs](configuration#registering-applications)
:::

<h3>arguments</h3>

<dl className="args-list">
	<dt>appName: string</dt>
	<dd>App name that single-spa will register and reference this application with, and will be labelled with in dev tools.</dd>
	<dt>applicationOrLoadingFn: () => &lt;Function | Promise&gt;</dt>
	<dd>Must be a loading function that either returns the resolved application or a promise.</dd>
	<dt>activityFn: (location) => boolean</dt>
	<dd>Must be a pure function. The function is called with <code>window.location</code> as the first argument !-- TODO: any only? --> and should return a truthy value whenever the application should be active.</dd>
	<dt>customProps?: Object = {}</dt>
	<dd>Will be passed to the application during each lifecycle method.</dd>
</dl>

<h3>returns</h3>

`undefined`

## start

```js
singleSpa.start();
```

Must be called by your single spa config. Before `start` is called, applications will be loaded, but will never be bootstrapped, mounted or unmounted. The reason for `start` is to give you control over the performance of your single page application. For example, you may want to declare registered applications immediately (to start downloading the code for the active ones), but not actually mount the registered applications until an initial AJAX request (maybe to get information about the logged in user) has been completed. In that case, the best performance is achieved by calling `registerApplication` immediately, but calling `start` after the AJAX request is completed.

<h3>arguments</h3>

none

<h3>returns</h3>

`undefined`

## triggerAppChange

```js
singleSpa.triggerAppChange();
```

Returns a Promise that will resolve/reject when all apps have mounted/unmounted. This was built for testing single-spa and is likely not
needed in a production application.

<h3>arguments</h3>

none

<h3>returns</h3>

<dl className="args-list">
	<dt>Promise</dt>
	<dd>Returns a Promise that will resolve/reject when all apps have mounted.</dd>
</dl>

## navigateToUrl

```js
// Three ways of using navigateToUrl
singleSpa.navigateToUrl('/new-url');
singleSpa.navigateToUrl(document.querySelector('a'));
document.querySelector('a').addEventListener(singleSpa.navigateToUrl);
```

```html
<!-- A fourth way to use navigateToUrl, this one inside of your HTML -->
<a href="/new-url" onclick="singleSpaNavigate()">My link</a>
```

Use this utility function to easily perform url navigation between registered applications without needing to deal with `event.preventDefault()`, `pushState`, `triggerAppChange()`, etc.

<h3>arguments</h3>

<dl className="args-list">
	<dt>navigationObj: string | context | DOMEvent</dt>
	<dd>
		navigationObj must be one of the following types:
		<ul>
			<li>a url string.</li>
			<li>a context / thisArg that has an <code>href</code> property; useful for calling <code>singleSpaNavigate.call(anchorElement)</code> with a reference to the anchor element or other context.</li>
			<li>a DOMEvent object for a click event on a DOMElement that has an <code>href</code> attribute; ideal for the <code>&lt;a onclick="singleSpaNavigate">&lt;/a></code> use case.</li>
		</ul>
	</dd>
</dl>

<h3>returns</h3>

`undefined`

## getMountedApps

```js
const mountedAppNames = singleSpa.getMountedApps();
console.log(mountedAppNames); // ['app1', 'app2', 'navbar']
```

<h3>arguments</h3>

none

<h3>returns</h3>

<dl className="args-list">
	<dt>appNames: string[]</dt>
	<dd>Each string is the name of a registered application that is currently <code>MOUNTED</code>.</dd>
</dl>

## getAppNames

```js
const appNames = singleSpa.getAppNames();
console.log(appNames); // ['app1', 'app2', 'app3', 'navbar']
```

<h3>arguments</h3>

none

<h3>returns</h3>

<dl className="args-list">
	<dt>appNames: string[]</dt>
	<dd>Each string is the name of a registered application regardless of app status.</dd>
</dl>

## getAppStatus

```js
const status = singleSpa.getAppStatus('app1');
console.log(status); // one of many statuses (see list below). e.g. MOUNTED
```

<h3>arguments</h3>

<dl className="args-list">
	<dt>appName: string</dt>
	<dd>Registered application name.</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>appStatus: &lt;string | null&gt;</dt>
	<dd>
		Will be one of the following string constants, or <code>null</code> if the app does not exist.
		<dl className="dl-inline">
			<div>
				<dt>NOT_LOADED</dt>
				<dd>app has been registered with single-spa but has not yet been loaded.</dd>
			</div>
			<div>
				<dt>LOADING_SOURCE_CODE</dt>
				<dd>'s source code is being fetched.</dd>
			</div>
			<div>
				<dt>NOT_BOOTSTRAPPED</dt>
				<dd>app has been loaded but not bootstrapped.</dd>
			</div>
			<div>
				<dt>BOOTSTRAPPING</dt>
				<dd>the <code>bootstrap</code> lifecycle function has been called but has not finished.</dd>
			</div>
			<div>
				<dt>NOT_MOUNTED</dt>
				<dd>app has been loaded and bootstrapped but not yet mounted.</dd>
			</div>
			<div>
				<dt>MOUNTING</dt>
				<dd>app is being mounted but not finished.</dd>
			</div>
			<div>
				<dt>MOUNTED</dt>
				<dd>app is currently active and is mounted to the DOM.</dd>
			</div>
			<div>
				<dt>UNMOUNTING</dt>
				<dd>app is currently being unmounted but has not finished.</dd>
			</div>
			<div>
				<dt>UNLOADING</dt>
				<dd>app is currently being unloaded but has not finished.</dd>
			</div>
			<div>
				<dt>SKIP_BECAUSE_BROKEN</dt>
				<dd>app threw an error during load, bootstrap, mount, or unmount and has been siloed because it is misbehaving and has been skipped. Other apps will continue on normally.</dd>
			</div>
			<div>
				<dt>LOAD_ERROR</dt>
				<dd>
					The app's loading function returned a promise that rejected. This is often due to a network error attempting to download the JavaScript bundle for the application. Single-spa will retry loading the application after the user navigates away from the current route and then comes back to it.
				</dd>
			</div>
		</dl>
	</dd>
</dl>

**Note about LOAD_ERROR status**

Note that if you're using SystemJS to load your bundles, you need to add the following code to get SystemJS to re-attempt the network request
when your loading function calls `System.import()` on an application in `LOAD_ERROR` status.

```js
singleSpa.addErrorHandler(err => {
  if (singleSpa.getAppStatus(err.appOrParcelName) === singleSpa.LOAD_ERROR) {
    System.delete(System.resolve(err.appOrParcelName));
  }
});
```

## unloadApplication

```js
// Unload the application right now, without waiting for it to naturally unmount.
singleSpa.unloadApplication('app1');

// Unload the application only after it naturally unmounts due to a route change.
singleSpa.unloadApplication('app1', { waitForUnmount: true });
```

The purpose of unloading a registered application is to set it back to to a NOT_LOADED status, which means that it will be re-bootstrapped the next time it needs to mount. The main use-case for this was to allow for the hot-reloading of entire registered applications, but `unloadApplication` can be useful whenever you want to re-bootstrap your application.

Single-spa performs the following steps when unloadApplication is called.

1. Call the [unload lifecyle](api.md#unload) on the registered application that is being unloaded.
2. Set the app status to NOT_LOADED
3. Trigger a reroute, during which single-spa will potentially mount the application that was just unloaded.

Because a registered application might be mounted when `unloadApplication` is called, you can specify whether you want to immediately unload or if you want to wait until the application is no longer mounted. This is done with the `waitForUnmount` option.

<h3>arguments</h3>

<dl className="args-list">
	<dt>appName: string</dt>
	<dd>Registered application name.</dd>
	<dt>options?: &#123;waitForUnmount: boolean = false}</dt>
	<dd>The options must be an object that has a <code>waitForUnmount</code> property. When `waitForUnmount` is `false`, single-spa immediately unloads the specified registered application even if the app is currently mounted. If it is <code>true</code>, single-spa will unload the registered application as soon as it is safe to do so (when the app status is not <code>MOUNTED</code>).</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>Promise</dt>
	<dd>This promise will be resolved when the registered application has been successfully removed.</dd>
</dl>

## checkActivityFunctions

```js
const appsThatShouldBeActive = singleSpa.checkActivityFunctions();
console.log(appsThatShouldBeActive); // ['app1']

const appsForACertainRoute = singleSpa.checkActivityFunctions({
  pathname: '/app2',
});
console.log(appsForACertainRoute); // ['app2']
```

Will call every app's activity function with the `mockWindowLocation` and give you list of which applications should be mounted with that location.

<h3>arguments</h3>

<dl className="args-list">
	<dt>mockWindowLocation: string</dt>
	<dd>A string representing a window.location that will be used when calling every application's activity function to test if they return true.</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>appNames: string[]</dt>
	<dd>Each string is the name of a registered application that matches the provided <code>mockWindowLocation</code>.</dd>
</dl>

## addErrorHandler

```js
singleSpa.addErrorHandler(err => {
  console.log(err);
  console.log(err.appOrParcelName);
  console.log(singleSpa.getAppStatus(err.appOrParcelName));
});
```

Adds a handler that will be called every time an application throws an error during a lifecycle function or activity function. When there are no error handlers, single-spa throws the error to the window.

<dl className="args-list">
	<dt>errorHandler: Function(error: Error)</dt>
	<dd>Must be a function. Will be called with an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">Error object</a> that additionally has a <code>message</code> and <code>appOrParcelName</code> property.</dd>
</dl>

<h3>returns</h3>

`undefined`

## removeErrorHandler

```js
singleSpa.addErrorHandler(handleErr);
singleSpa.removeErrorHandler(handleErr);

function handleErr(err) {
  console.log(err);
}
```

Removes the given error handler function.

<h3>arguments</h3>

<dl className="args-list">
	<dt>errorHandler: Function</dt>
	<dd>Reference to the error handling function.</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>boolean</dt>
	<dd><code>true</code> if the error handler was removed, and <code>false</code> if it was not.</dd>
</dl>

## mountRootParcel

```js
// Synchronous mounting
const parcel = singleSpa.mountRootParcel(parcelConfig, {
  prop1: 'value1',
  domElement: document.getElementById('a-div'),
});
parcel.mountPromise.then(() => {
  console.log('finished mounting the parcel!');
});

// Asynchronous mounting. Feel free to use webpack code splits or SystemJS dynamic loading
const parcel2 = singleSpa.mountRootParcel(() => import('./some-parcel.js'), {
  prop1: 'value1',
  domElement: document.getElementById('a-div'),
});
```

Will create and mount a [single-spa parcel](parcels-overview.md).

:::caution
Parcels do not automatically unmount. Unmounting will need to be triggered manually.
:::

<h3>arguments</h3>

<dl className="args-list">
	<dt>parcelConfig: Object or Loading Function</dt>
	<dd>[parcelConfig](parcels-api.md#parcel-configuration)</dd>
	<dt>parcelProps: Object with a domElement property</dt>
	<dd>[parcelProps](parcels-api.md#parcel-props)</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>Parcel object</dt>
	<dd>See <a href="/docs/parcels-api.html">Parcels API</a> for more detail.</dd>
</dl>

## ensureJQuerySupport

```js
singleSpa.ensureJQuerySupport(jQuery);
```

jQuery uses [event delegation](https://learn.jquery.com/events/event-delegation/) so single-spa must monkey-patch each version of jQuery on the page<!-- TODO: in order to properly support... (I'm guessing navigation/routing ) -->. single-spa will attempt to do this automatically by looking for `window.jQuery` or `window.$`. Use this explicit method if multiple versions are included on your page or if jQuery is bound to a different global variable.

<h3>arguments</h3>

<dl className="args-list">
	<dt>jQuery?: JQueryFn = window.jQuery</dt>
	<dd>A reference to the global variable that jQuery has been bound to.</dd>
</dl>

<h3>returns</h3>

`undefined`

## setBootstrapMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setBootstrapMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setBootstrapMaxTime(3000, true);
```

Sets the global configuration for bootstrap timeouts.

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>Number of milliseconds to wait for bootstrap to complete before timing out.</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>If false, registered applications that are slowing things down will cause nothing more than some warnings in the console up until <code>millis</code> is reached.</p>
		<p>If true, registered applications that are slowing things down will be siloed into a SKIP_BECAUSE_BROKEN status where they will never again be given the chance to break everything.</p>
		<p>Each registered application can override this behavior for itself.</p>
	</dd>
</dl>

<h3>returns</h3>

`undefined`

## setMountMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setMountMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setMountMaxTime(3000, true);
```

Sets the global configuration for mount timeouts.

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>Number of milliseconds to wait for mount to complete before timing out.</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>If false, registered applications that are slowing things down will cause nothing more than some warnings in the console up until <code>millis</code> is reached.</p>
		<p>If true, registered applications that are slowing things down will be siloed into a SKIP_BECAUSE_BROKEN status where they will never again be given the chance to break everything.</p>
		<p>Each registered application can override this behavior for itself.</p>
	</dd>
</dl>

<h3>returns</h3>

`undefined`

## setUnmountMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setUnmountMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setUnmountMaxTime(3000, true);
```

Sets the global configuration for unmount timeouts.

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>Number of milliseconds to wait for unmount to complete before timing out.</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>If false, registered applications that are slowing things down will cause nothing more than some warnings in the console up until <code>millis</code> is reached.</p>
		<p>If true, registered applications that are slowing things down will be siloed into a SKIP_BECAUSE_BROKEN status where they will never again be given the chance to break everything.</p>
		<p>Each registered application can override this behavior for itself.</p>
	</dd>
</dl>

<h3>returns</h3>

`undefined`

## setUnloadMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setUnloadMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setUnloadMaxTime(3000, true);

// don't do a console warning for slow lifecycles until 10 seconds have elapsed
singleSpa.setUnloadMaxTime(3000, true, 10000);
```

Sets the global configuration for unload timeouts.

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>Number of milliseconds to wait for unload to complete before timing out.</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>If false, registered applications that are slowing things down will cause nothing more than some warnings in the console up until <code>millis</code> is reached.</p>
		<p>If true, registered applications that are slowing things down will be siloed into a SKIP_BECAUSE_BROKEN status where they will never again be given the chance to break everything.</p>
		<p>Each registered application can override this behavior for itself.</p>
	</dd>
	<dt>warningMillis: number = 1000</dt>
	<dd>Number of milliseconds to wait between console warnings that occur before the final timeout.</dd>
</dl>

<h3>returns</h3>

`undefined`

---

# Events

All of the following are [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) fired by single-spa on the window. The event `detail` property contains the native DOM event that triggered the reroute, such as a [PopStateEvent](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent) or [HashChangeEvent](https://developer.mozilla.org/en-US/docs/Web/API/HashChangeEvent). These events can be handled by using [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), like so:

<!-- TODO: are these events augmented like the addErrorHandler Error is? -->

```js
window.addEventListener('single-spa:before-routing-event', evt => {
  const originalEvent = evt.detail;
  console.log('single-spa event', originalEvent);
});
```

## before routing event

```js
window.addEventListener('single-spa:before-routing-event', () => {
  console.log('single-spa is about to mount/unmount applications!');
});
```

A `single-spa:before-routing-event` event is fired before every routing event occurs, which is after each hashchange, popstate, or triggerAppChange, even if no changes to registered applications were necessary.

## routing event

```js
window.addEventListener('single-spa:routing-event', () => {
  console.log('single-spa finished mounting/unmounting applications!');
});
```

A `single-spa:routing-event` event is fired every time that a routing event has occurred, which is after each hashchange, popstate, or triggerAppChange, even if no changes to registered applications were necessary; and after single-spa verified that all apps were correctly loaded, bootstrapped, mounted, and unmounted.

## app-change event

```js
window.addEventListener('single-spa:app-change', () => {
  console.log(
    'A routing event occurred where at least one application was mounted/unmounted',
  );
});
```

A `single-spa:app-change` event is fired every time that one or more apps were loaded, bootstrapped, mounted, unmounted, or unloaded. It is similar to `single-spa:routing-event` except that it will not fire unless one or more apps were actually loaded, bootstrapped, mounted, or unmounted. A hashchange, popstate, or triggerAppChange that does not result in one of those changes will not cause the event to be fired.

## no-app-change event

```js
window.addEventListener('single-spa:before-routing-event', () => {
  console.log(
    'A routing event occurred where zero applications were mounted/unmounted',
  );
});
```

When no applications were loaded, bootstrapped, mounted, unmounted, or unloaded, single-spa fires a `single-spa:no-app-change` event. This is the inverse of the `single-spa:app-change` event. Only one will be fired for each routing event.

## before-first-mount

```js
window.addEventListener('single-spa:before-first-mount', () => {
  console.log(
    'single-spa is about to mount the very first application for the first time',
  );
});
```

Before the first of any single-spa applications is mounted, single-spa fires a `single-spa:before-first-mount` event; therefore it will only be fired once ever. More specifically, it fires after the application is already loaded but before mounting.

:::tip Suggested use case
remove a loader bar that the user is seeing right before the first app will be mounted.
:::

## first-mount

```js
window.addEventListener('single-spa:first-mount', () => {
  console.log('single-spa just mounted the very first application');
});
```

After the first of any single-spa applications is mounted, single-spa fires a `single-spa:first-mount` event; therefore it will only be fired once ever.

:::tip Suggested use case:
log the time it took before the user sees any of the apps mounted.
:::
