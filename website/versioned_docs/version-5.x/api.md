---
id: api
title: Applications API
sidebar_label: Applications API
---

Single-spa exports named functions and variables rather than a single default export.
This means importing must happen in one of two ways:

```js
import { registerApplication, start } from 'single-spa';
// or
import * as singleSpa from 'single-spa';
```

## registerApplication

`registerApplication` is the most important API your root config will use. Use this function to register any application within single-spa.
Note that if an application is registered from within another application, that no hierarchy will be maintained between the applications.

There are two ways of registering your application:

### Simple arguments

```js
singleSpa.registerApplication(
  'appName',
  () => System.import('appName'),
  location => location.pathname.startsWith('appName'),
);
```

<h3>arguments</h3>

<dl className="args-list">
	<dt>appName: string</dt>
	<dd>App name that single-spa will register and reference this application with, and will be labelled with in dev tools.</dd>
	<dt>applicationOrLoadingFn: () => &lt;Function | Promise&gt;</dt>
	<dd>Must be a loading function that either returns the resolved application or a promise.</dd>
	<dt>activityFn: (location) => boolean</dt>
	<dd>Must be a pure function. The function is called with <codehtml>window.location</codehtml> as the first argument {/* TODO: any only? */} and should return a truthy value whenever the application should be active.</dd>
	<dt>customProps?: Object | () => Object</dt>
	<dd>Will be passed to the application during each lifecycle method.</dd>
</dl>

<h3>returns</h3>

`undefined`

### Configuration object

```js
singleSpa.registerApplication({
	name: 'appName',
	app: () => System.import('appName'),
	activeWhen: '/appName'
	customProps: {
		authToken: 'xc67f6as87f7s9d'
	}
})

singleSpa.registerApplication({
	name: 'appName',
	app: () => System.import('appName'),
	activeWhen: '/appName',
	// Dynamic custom props that can change based on route
	customProps(appName, location) {
		return {
			authToken: 'xc67f6as87f7s9d'
		}
	}
})
```

<h3>arguments</h3>

<dl className="args-list">
	<dt>name: string</dt>
	<dd>App name that single-spa will register and reference this application with, and will be labelled with in dev tools.</dd>
	<dt>app: Application | () => Application | Promise&lt;Application&gt; </dt>
	<dd>Application object or a function that returns the resolved application (Promise or not)</dd>
	<dt>activeWhen: string | (location) => boolean | (string | (location) => boolean)[]</dt>
	<dd>Can be a path prefix which will match every URL starting with this path,
	an activity function (as described in the simple arguments) or an array
	containing both of them. If any of the criteria is true, it will keep the
	application active. The path prefix also accepts dynamic values (they must
	start with ':'), as some paths would receive url params and should still
	trigger your application.
	Examples:
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
	</dd>
	<dt>customProps?: Object | () => Object</dt>
	<dd>Will be passed to the application during each lifecycle method.</dd>
</dl>

<h3>returns</h3>

`undefined`

:::note
It is described in detail inside of the [Configuration docs](configuration#registering-applications)
:::

## start

```js
singleSpa.start();

// Optionally, you can provide configuration
singleSpa.start({
  urlRerouteOnly: true,
});
```

Must be called by your single spa config. Before `start` is called, applications will be loaded, but will never be bootstrapped, mounted or unmounted. The reason for `start` is to give you control over the performance of your single page application. For example, you may want to declare registered applications immediately (to start downloading the code for the active ones), but not actually mount the registered applications until an initial AJAX request (maybe to get information about the logged in user) has been completed. In that case, the best performance is achieved by calling `registerApplication` immediately, but calling `start` after the AJAX request is completed.

<h3>arguments</h3>

The `start(opts)` api optionally accepts a single `opts` object, with the following properties. If the opts object is omitted, all defaults will be applied.

- `urlRerouteOnly`: A boolean that defaults to false. If set to true, calls to `history.pushState()` and `history.replaceState()` will not trigger a single-spa reroute unless the client side route was changed. Setting this to true can be better for performance in some situations. For more information, read [original issue](https://github.com/single-spa/single-spa/issues/484).

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
<a href="/new-url" onclick="singleSpaNavigate(event)">My link</a>
```

Use this utility function to easily perform url navigation between registered applications without needing to deal with `event.preventDefault()`, `pushState`, `triggerAppChange()`, etc.

<h3>arguments</h3>

<dl className="args-list">
	<dt>navigationObj: string | context | DOMEvent</dt>
	<dd>
		navigationObj must be one of the following types:
		<ul>
			<li>a url string.</li>
			<li>a context / thisArg that has an <codehtml>href</codehtml> property; useful for calling <codehtml>singleSpaNavigate.call(anchorElement)</codehtml> with a reference to the anchor element or other context.</li>
			<li>a DOMEvent object for a click event on a DOMElement that has an <codehtml>href</codehtml> attribute; ideal for the <codehtml>&lt;a onclick="singleSpaNavigate">&lt;/a></codehtml> use case.</li>
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
	<dd>Each string is the name of a registered application that is currently <codehtml>MOUNTED</codehtml>.</dd>
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
		Will be one of the following string constants, or <codehtml>null</codehtml> if the app does not exist.
		<dl className="dl-inline">
			<div>
				<dt>NOT_LOADED</dt>
				<dd>app has been registered with single-spa but has not yet been loaded.</dd>
			</div>
			<div>
				<dt>LOADING_SOURCE_CODE</dt>
				<dd>app's source code is being fetched.</dd>
			</div>
			<div>
				<dt>NOT_BOOTSTRAPPED</dt>
				<dd>app has been loaded but not bootstrapped.</dd>
			</div>
			<div>
				<dt>BOOTSTRAPPING</dt>
				<dd>the <codehtml>bootstrap</codehtml> lifecycle function has been called but has not finished.</dd>
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

### Handling LOAD_ERROR status to retry module

If a module fails to load (for example, due to network error), single-spa will handle the error but SystemJS will not automatically retry to download the module later. To do so, add a single-spa errorHandler that deletes the module from the SystemJS registry and re-attempt to download the module when `System.import()` on an application in `LOAD_ERROR` status is called again.

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

The purpose of unloading a registered application is to set it back to a NOT_LOADED status, which means that it will be re-bootstrapped the next time it needs to mount. The main use-case for this was to allow for the hot-reloading of entire registered applications, but `unloadApplication` can be useful whenever you want to re-bootstrap your application.

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
	<dd>The options must be an object that has a <codehtml>waitForUnmount</codehtml> property. When <codehtml>waitForUnmount</codehtml> is <codehtml>false</codehtml>, single-spa immediately unloads the specified registered application even if the app is currently mounted. If it is <codehtml>true</codehtml>, single-spa will unload the registered application as soon as it is safe to do so (when the app status is not <codehtml>MOUNTED</codehtml>).</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>Promise</dt>
	<dd>This promise will be resolved when the registered application has been successfully unloaded.</dd>
</dl>

## unregisterApplication

```js
import { unregisterApplication } from 'single-spa';

unregisterApplication('app1').then(() => {
  console.log('app1 is now unmounted, unloaded, and no longer registered!');
});
```

The `unregisterApplication` function will unmount, unload, and unregister an application. Once it is no longer registered, the application will never again be mounted.

This api was introduced in single-spa@5.8.0. A few notes about this api:

- Unregistering an application does not delete it from the SystemJS module registry.
- Unregistering an application does not delete its code or javascript frameworks from browser memory.
- An alternative to unregistering applications is to perform permission checks inside of the application's activity function. This has a similar effect of preventing the application from ever mounting.

<h3>arguments</h3>

<dl className="args-list">
	<dt>appName: string</dt>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>Promise</dt>
	<dd>This promise will be resolved when the application has been successfully unregistered.</dd>
</dl>

## checkActivityFunctions

```js
const appsThatShouldBeActive = singleSpa.checkActivityFunctions();
console.log(appsThatShouldBeActive); // ['app1']

const appsForACertainRoute = singleSpa.checkActivityFunctions(new URL('/app2', window.location.href));
console.log(appsForACertainRoute); // ['app2']
```

Will call every app's activity function with `url` and give you list of which applications should be mounted with that location.

<h3>arguments</h3>

<dl className="args-list">
	<dt>url: URL</dt>
	<dd>A <codehtml>URL</codehtml> object that will be used instead of window.location when calling every application's activity function to test if they return true.</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>appNames: string[]</dt>
	<dd>Each string is the name of a registered application that matches the provided <codehtml>url</codehtml>.</dd>
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
	<dd>Must be a function. Will be called with an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">Error object</a> that additionally has a <codehtml>message</codehtml> and <codehtml>appOrParcelName</codehtml> property.</dd>
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
	<dd><codehtml>true</codehtml> if the error handler was removed, and <codehtml>false</codehtml> if it was not.</dd>
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

:::caution Parcels do not automatically unmount
Unmounting will need to be triggered manually.
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

## pathToActiveWhen

The `pathToActiveWhen` function converts a string URL path into an [activity function](/docs/configuration/#activity-function). The string path may contain route parameters that single-spa will match any characters to. By default, pathToActiveWhen assumes that the string provided is a **prefix**; however, this can be altered with the `exactMatch` parameter.

This function is used by single-spa when a string is passed into `registerApplication` as the `activeWhen` argument.

**_Arguments_**

1. `path` (string): The URL prefix that.
2. `exactMatch` (boolean, optional, defaults to `false`, requires single-spa@>=5.9.0): A boolean that controls whether trailing characters after the path should be allowed. When `false`, trailing characters are allowed. When `true`, trailing characters are not allowed.

**_Return Value_**

`(url: URL) => boolean`

A function that accepts a `URL` object as an argument and returns a boolean indicating whether the path matches that URL.

**_Examples:_**

```js
let activeWhen = singleSpa.pathToActiveWhen('/settings');
activewhen(new URL('http://localhost/settings')); // true
activewhen(new URL('http://localhost/settings/password')); // true
activeWhen(new URL('http://localhost/')); // false

activeWhen = singleSpa.pathToActiveWhen('/users/:id/settings');
activewhen(new URL('http://localhost/users/6f7dsdf8g9df8g9dfg/settings')); // true
activewhen(new URL('http://localhost/users/1324/settings')); // true
activewhen(new URL('http://localhost/users/1324/settings/password')); // true
activewhen(new URL('http://localhost/users/1/settings')); // true
activewhen(new URL('http://localhost/users/1')); // false
activewhen(new URL('http://localhost/settings')); // false
activeWhen(new URL('http://localhost/')); // false

activeWhen = singleSpa.pathToActiveWhen('/page#/hash');
activeWhen(new URL('http://localhost/page#/hash')); // true
activeWhen(new URL('http://localhost/#/hash')); // false
activeWhen(new URL('http://localhost/page')); // false
```

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

// don't do a console warning for slow lifecycles until 10 seconds have elapsed
singleSpa.setBootstrapMaxTime(3000, true, 10000);
```

Sets the global configuration for bootstrap timeouts.

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>Number of milliseconds to wait for bootstrap to complete before timing out.</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>If false, registered applications that are slowing things down will cause nothing more than some warnings in the console up until <codehtml>millis</codehtml> is reached.</p>
		<p>If true, registered applications that are slowing things down will be siloed into a SKIP_BECAUSE_BROKEN status where they will never again be given the chance to break everything.</p>
		<p>Each registered application can override this behavior for itself.</p>
	</dd>
	<dt>warningMillis: number = 1000</dt>
	<dd>Number of milliseconds to wait between console warnings that occur before the final timeout.</dd>
</dl>

<h3>returns</h3>

`undefined`

## setMountMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setMountMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setMountMaxTime(3000, true);

// don't do a console warning for slow lifecycles until 10 seconds have elapsed
singleSpa.setMountMaxTime(3000, true, 10000);
```

Sets the global configuration for mount timeouts.

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>Number of milliseconds to wait for mount to complete before timing out.</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>If false, registered applications that are slowing things down will cause nothing more than some warnings in the console up until <codehtml>millis</codehtml> is reached.</p>
		<p>If true, registered applications that are slowing things down will be siloed into a SKIP_BECAUSE_BROKEN status where they will never again be given the chance to break everything.</p>
		<p>Each registered application can override this behavior for itself.</p>
	</dd>
	<dt>warningMillis: number = 1000</dt>
	<dd>Number of milliseconds to wait between console warnings that occur before the final timeout.</dd>
</dl>

<h3>returns</h3>

`undefined`

## setUnmountMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setUnmountMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setUnmountMaxTime(3000, true);

// don't do a console warning for slow lifecycles until 10 seconds have elapsed
singleSpa.setUnmountMaxTime(3000, true, 10000);
```

Sets the global configuration for unmount timeouts.

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>Number of milliseconds to wait for unmount to complete before timing out.</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>If false, registered applications that are slowing things down will cause nothing more than some warnings in the console up until <codehtml>millis</codehtml> is reached.</p>
		<p>If true, registered applications that are slowing things down will be siloed into a SKIP_BECAUSE_BROKEN status where they will never again be given the chance to break everything.</p>
		<p>Each registered application can override this behavior for itself.</p>
	</dd>
	<dt>warningMillis: number = 1000</dt>
	<dd>Number of milliseconds to wait between console warnings that occur before the final timeout.</dd>
</dl>

<h3>returns</h3>

`undefined`

---

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
		<p>If false, registered applications that are slowing things down will cause nothing more than some warnings in the console up until <codehtml>millis</codehtml> is reached.</p>
		<p>If true, registered applications that are slowing things down will be siloed into a SKIP_BECAUSE_BROKEN status where they will never again be given the chance to break everything.</p>
		<p>Each registered application can override this behavior for itself.</p>
	</dd>
	<dt>warningMillis: number = 1000</dt>
	<dd>Number of milliseconds to wait between console warnings that occur before the final timeout.</dd>
</dl>

<h3>returns</h3>

`undefined`

## Events

single-spa fires Events to the `window` as a way for your code to hook into URL transitions.

### PopStateEvent

single-spa fires [PopStateEvent](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent) events when it wants to instruct all active applications to re-render. This occurs when one application calls [history.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState), [history.replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState), or [triggerAppChange](#triggerAppChange). Single-spa deviates from the browser's default behavior in some cases, as described in [this Github issue](https://github.com/single-spa/single-spa/issues/484#issuecomment-601279869).

```js
window.addEventListener('popstate', evt => {
  if (evt.singleSpa) {
    console.log(
      'This event was fired by single-spa to forcibly trigger a re-render',
    );
    console.log(evt.singleSpaTrigger); // pushState | replaceState
  } else {
    console.log('This event was fired by native browser behavior');
  }
});
```

### Canceling navigation

Canceling navigation refers to the URL changing and then immediately changing back to what it was before. This is done before any mounting, unmounting, or loading that would otherwise take place. This can be used in conjunction with Vue router and Angular router's built-in navigation guards that allow for cancelation of a navigation event.

To cancel a navigation event, listen to the `single-spa:before-routing-event` event:

```js
window.addEventListener(
  'single-spa:before-routing-event',
  ({ detail: { oldUrl, newUrl, cancelNavigation } }) => {
    if (
      new URL(oldUrl).pathname === '/route1' &&
      new URL(newUrl).pathname === '/route2'
    ) {
      cancelNavigation();
    }
  },
);
```

When a navigation is canceled, no applications will be mounted, unmounted, loaded, or unloaded. All single-spa routing events will fire for the canceled navigation, but they will each have the `navigationIsCanceled` property set to `true` on the `event.detail` (Details below in Custom Events section).

Navigation cancelation is sometimes used as a mechanism for preventing users from accessing routes for which they are unauthorized. However, we generally recommend permission checks on each route as the proper way to guard routes, instead of navigation cancelation.

### Custom Events

single-spa fires a series of [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) whenever it reroutes. A reroute occurs whenever the browser URL changes in any way or a `triggerAppChange` is called. The custom events are fired to the `window`. Each custom event has a [`detail` property](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) with the following properties:

```js
window.addEventListener('single-spa:before-routing-event', evt => {
  const {
    originalEvent,
    newAppStatuses,
    appsByNewStatus,
    totalAppChanges,
    oldUrl,
    newUrl,
    navigationIsCanceled,
    cancelNavigation,
  } = evt.detail;
  console.log(
    'original event that triggered this single-spa event',
    originalEvent,
  ); // PopStateEvent | HashChangeEvent | undefined
  console.log(
    'the new status for all applications after the reroute finishes',
    newAppStatuses,
  ); // { app1: MOUNTED, app2: NOT_MOUNTED }
  console.log(
    'the applications that changed, grouped by their status',
    appsByNewStatus,
  ); // { MOUNTED: ['app1'], NOT_MOUNTED: ['app2'] }
  console.log(
    'number of applications that changed status so far during this reroute',
    totalAppChanges,
  ); // 2
  console.log('the URL before the navigationEvent', oldUrl); // http://localhost:8080/old-route
  console.log('the URL after the navigationEvent', newUrl); // http://localhost:8080/new-route
  console.log('has the navigation been canceled', navigationIsCanceled); // false

  // The cancelNavigation function is only defined in the before-routing-event
  evt.detail.cancelNavigation();
});
```

The following table shows the order in which the custom events are fired during a reroute:

| Event order | Event Name                                                          | Condition for firing                                |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------- |
| 1           | `single-spa:before-app-change` or `single-spa:before-no-app-change` | Will any applications change status?                |
| 2           | `single-spa:before-routing-event`                                   | &mdash;                                             |
| 3           | `single-spa:before-mount-routing-event`                             | &mdash;                                             |
| 4           | `single-spa:before-first-mount`                                     | Is this the first time any application is mounting? |
| 5           | `single-spa:first-mount`                                            | Is this the first time any application was mounted? |
| 6           | `single-spa:app-change` or `single-spa:no-app-change`               | Did any applications change status?                 |
| 7           | `single-spa:routing-event`                                          | &mdash;                                             |

### before-app-change event

```js
window.addEventListener('single-spa:before-app-change', evt => {
  console.log('single-spa is about to mount/unmount applications!');
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { app1: MOUNTED }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: ['app1'], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 1
});
```

A `single-spa:before-app-change` event is fired before reroutes that will result in at least one application changing status.

### before-no-app-change

```js
window.addEventListener('single-spa:before-no-app-change', evt => {
  console.log('single-spa is about to do a no-op reroute');
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: [], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 0
});
```

A `single-spa:before-no-app-change` event is fired before reroutes that will result in zero applications changing status.

### before-routing-event

```js
window.addEventListener('single-spa:before-routing-event', evt => {
  console.log('single-spa is about to mount/unmount applications!');
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: [], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 0
});
```

A `single-spa:before-routing-event` event is fired before every routing event occurs, which is after each hashchange, popstate, or triggerAppChange, even if no changes to registered applications were necessary.

### before-mount-routing-event

```js
window.addEventListener('single-spa:before-mount-routing-event', evt => {
  console.log('single-spa is about to mount/unmount applications!');
  console.log(evt.detail);
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { app1: MOUNTED }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: ['app1'], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 1
});
```

A `single-spa:before-mount-routing-event` event is fired after `before-routing-event` and before `routing-event`. It is guaranteed to fire after all single-spa applications have been unmounted, but before any new applications have been mounted.

### before-first-mount

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

### first-mount

```js
window.addEventListener('single-spa:first-mount', () => {
  console.log('single-spa just mounted the very first application');
});
```

After the first of any single-spa applications is mounted, single-spa fires a `single-spa:first-mount` event; therefore it will only be fired once ever.

:::tip Suggested use case
log the time it took before the user sees any of the apps mounted.
:::

### app-change event

```js
window.addEventListener('single-spa:app-change', evt => {
  console.log(
    'A routing event occurred where at least one application was mounted/unmounted',
  );
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { app1: MOUNTED, app2: NOT_MOUNTED }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: ['app1'], NOT_MOUNTED: ['app2'] }
  console.log(evt.detail.totalAppChanges); // 2
});
```

A `single-spa:app-change` event is fired every time that one or more apps were loaded, bootstrapped, mounted, unmounted, or unloaded. It is similar to `single-spa:routing-event` except that it will not fire unless one or more apps were actually loaded, bootstrapped, mounted, or unmounted. A hashchange, popstate, or triggerAppChange that does not result in one of those changes will not cause the event to be fired.

### no-app-change event

```js
window.addEventListener('single-spa:no-app-change', evt => {
  console.log(
    'A routing event occurred where zero applications were mounted/unmounted',
  );
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: [], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 0
});
```

When no applications were loaded, bootstrapped, mounted, unmounted, or unloaded, single-spa fires a `single-spa:no-app-change` event. This is the inverse of the `single-spa:app-change` event. Only one will be fired for each routing event.

### routing-event

```js
window.addEventListener('single-spa:routing-event', evt => {
  console.log('single-spa finished mounting/unmounting applications!');
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { app1: MOUNTED, app2: NOT_MOUNTED }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: ['app1'], NOT_MOUNTED: ['app2'] }
  console.log(evt.detail.totalAppChanges); // 2
});
```

A `single-spa:routing-event` event is fired every time that a routing event has occurred, which is after each hashchange, popstate, or triggerAppChange, even if no changes to registered applications were necessary; and after single-spa verified that all apps were correctly loaded, bootstrapped, mounted, and unmounted.
