---
id: ecosystem
title: The single-spa ecosystem
sidebar_label: Overview
---

The single-spa ecosystem is quickly growing to support as many frameworks and build tools as possible.

## Help for frameworks
There is a growing number of projects that help you bootstrap, mount,
and unmount your applications that are written with popular frameworks. Feel free
to contribute to this list with your own project:

- [single-spa-react](./ecosystem-react.md)
- [single-spa-vue](./ecosystem-vue.md)
- [single-spa-angular](./ecosystem-angular.md)
- [single-spa-angularjs](./ecosystem-angularjs.md)
- [single-spa-cycle](./ecosystem-cycle.md)
- [single-spa-ember](./ecosystem-ember.md)
- [single-spa-inferno](./ecosystem-inferno.md)
- [single-spa-preact](./ecosystem-preact.md)
- [single-spa-svelte](./ecosystem-svelte.md)
- [single-spa-riot](./ecosystem-riot.md)
- [single-spa-backbone](./ecosystem-backbone.md)

## Webpack 2+
With webpack 2+, we can take advantage of its support for [code splitting](https://webpack.js.org/guides/code-splitting/) with [import()](https://webpack.js.org/api/module-methods/#import)
in order to easily lazy-load registered applications when they are needed. When registering
registered applications from inside of your single spa config, try the following for your
[loading functions](configuration#loading-function).
```js
import {registerApplication} from 'single-spa';

registerApplication('app-name', () => import('./my-app.js'), activeWhen);

function activeWhen() {
	return window.location.pathname.indexOf('/my-app') === 0;
}
```

## SystemJS
Since SystemJS is a Promise-based [loader](https://whatwg.github.io/loader), the way to
lazy load your registered applications is straightforward:

```js
import {registerApplication} from 'single-spa';

// Import the registered application with a SystemJS.import call
registerApplication('app-name-1', () => SystemJS.import('./my-app.js'), activeWhen);

// Alternatively, use the more out-of-date System.import (instead of SystemJS.import)
registerApplication('app-name-2', () => System.import('./my-other-app.js'), activeWhen);

function activeWhen() {
	return window.location.pathname.indexOf('/my-app') === 0;
}
```

## Webpack 1
With webpack 1, there is no support for Promise-based code splitting. Instead, we have to either wrap
a require.ensure in a Promise, or just give up on lazy loading completely.

```js
import {registerApplication} from 'single-spa';
import app1 from './app1'; // Not lazy loading with code splitting :(

// Giving up on lazy loading and code splitting :(
registerApplication('app-1', () => Promise.resolve(app1), activeWhen);

// Still doing code splitting! But verbose :(
registerApplication('app-2', app2InPromise, activeWhen);

/* Unfortunately, this logic cannot be abstracted into a generic
 * function that handles wrapping require.ensure in a promise for
 * any dynamically imported module. This is because webpack needs to
 * be able to statically analyze the code and find all of the require.ensure
 * calls at build-time, so you can't pass variables into require.ensure.
 */
function app2InPromise() {
	return new Promise((resolve, reject) => {
		require.ensure(['./app-2.js'], require => {
			try {
				resolve(require('./app-2.js'));
			} catch(err) {
				reject(err);
			}
		});
	});
}

function activeWhen() {
	return window.location.pathname.indexOf('/my-app') === 0;
}
```
