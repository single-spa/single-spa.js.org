---
id: migrating-react-tutorial
title: Migrating an Existing React Project
sidebar_label: React - Migrating to single-spa
---

## Project Setup

You can find the code needed to follow along [here](https://github.com/alocke12992/migrating-to-single-spa-react-starter). You can find the completed [code for this tutorial here](https://github.com/alocke12992/migrating-to-single-spa-react).

Get started by cloning the starter pack, moving into the project and initializing the package manager of your choice so we can install the single-spa library. For this tutorial, we will be using [yarn](https://yarnpkg.com/en/).

```bash
git clone git@github.com:alocke12992/migrating-to-single-spa-react-starter.git
cd migrating-to-single-spa-react-starter
yarn # or npm install
yarn add single-spa # or npm install --save single-spa
```

Run `yarn start` from the root directory to fire up the server at [http://localhost:3000](http://localhost:3000).

## Step One: Set up the single-spa config

The **single-spa config** consists of all code that is not part of a [registered application](configuration#registeringapplications). Ideally, this only includes an HTML file and a JavaScript file that registers single-spa applications. It is best practice to keep your single spa config as small as possible and to simply defer to single-spa to manage all of the applications.

Usually, when using [webpack](https://webpack.js.org/) with React, we recommend setting your **single-spa config** as the entry point in your _webpack.config.js_ ([see also the "Setup Webpack" example](starting-from-scratch.md#1b-setup-webpack)). However, this application was built using [create-react-app](https://github.com/facebook/create-react-app), so we don't have access to the _webpack.config.js_ without [ejecting](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject).

To avoid having to eject, we are going to hijack the current entry point, _src/index.js_ so we can use it to register our SPA as a single-spa application.

Start by removing everything except `registerServiceWorker`.

```js title="src/index.js"
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();
```

## Step Two: Register the Application

Now that we have prepared _index.js_ to function as our **single-spa config**, we can begin to register the application. It is required to [register applications](https://single-spa.js.org/docs/configuration.html#registering-applications) with single-spa. This enables single-spa to know how and when to bootstrap, mount and unmount an application.

In order to register an application with single-spa we call the `registerApplication()` api and include the application [name](configuration#application-name), a [loadingFunction](configuration#loading-function-or-application) and an [activityFunction](configuration#activity-function).

Finally, the [start()](api.md#start) api **must** be called by your `single spa config` in order for applications to actually be mounted. Before `start()` is called, applications will be loaded, but not bootstrapped/mounted/unmounted.

In _src/index.js_, start by importing the `registerApplication` and `start` functions:

```js {2} title="src/index.js"
import registerServiceWorker from './registerServiceWorker';
import { registerApplication, start } from 'single-spa';

registerServiceWorker();
```

With our functions imported, we can now register an application with single-spa and call `start()`:

```js {4-8,10} title="src/index.js"
import registerServiceWorker from './registerServiceWorker';
import { registerApplication, start } from 'single-spa';

registerApplication(
  'root', // Name of this single-spa application
  loadingFunction, // Our loading function
  activityFunction, // Our activity function
);

start();
registerServiceWorker();
```

The second argument in `registerApplication`, `loadingFunction`, must be a function that returns a promise (or an ["async function"](https://ponyfoo.com/articles/understanding-javascript-async-await)). The function will be called with no arguments when it's time to load the application for the first time. The returned promise must be resolved with the application. We will be creating this in the next step.

The third argument, `activityFunction`, must be a pure function. The function is provided `window.location` as the first argument, and returns a truthy value whenever the application should be active. In this case we have set the activity function to return true. This will set our SPA to always be mounted regardless of the location. Later, if we wanted to add other SPAs to our single-spa web application, we can change the activity function to return based on `location.hash.startsWith('#/someRoute')`. See the ["Starting From Scratch" tutorial](starting-from-scratch.md#b-register-the-application) for an example of how to set up routing between multiple SPAs.

## Step Three: Setup Lifecycle Functions

Since we have registered our application, single-spa will be listening for the application to `bootstrap` and `mount`. We can use the [single-spa-react](ecosystem-react.md) helper library to make use of the generic React lifecycle hooks. See the [registered application lifecycle](building-applications.md#registered-application-lifecycle) docs to learn more about each lifecycle function.

For this tutorial, we will be implementing the required lifecycle functions in a new _root.app.js_ file within the _src/_ folder. From the root directory, run the following code to install the [single-spa-react](https://github.com/single-spa/single-spa-react) helper library and create the new file:

```bash
yarn add single-spa-react
touch src/root.app.js
```

During this process, we need to establish a `rootComponent`, which is the top level React component to be rendered. In this case _src/containers/App.js_ has already been designated as the top level component. If you recall, we removed this from the _index.js_ file so we could set up our **single-spa config**.

Finally, we will use the `domElementGetter()` function to return a DOMElement where the application will be bootstrapped, mounted, and unmounted. Notice that our SPA already has an HTML file in the _public/_ folder containing a `<div />` with and id of `root`.

Set up the registered application lifecycle functions by adding the following to _src/root.app.js_:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './containers/App.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter,
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [reactLifecycles.mount];

export const unmount = [reactLifecycles.unmount];

function domElementGetter() {
  // This is where single-spa will mount our application
  return document.getElementById('root');
}
```

## Step Four: Connect to single-spa Config

Head back to the **single-spa config** in _src/index.js_ to add a [loading function](configuration#loading-function) for the registered application by importing _root.app.js_.

:::note
It is important to note that **you do not have to use a loading function** and instead can simply pass in the application config object directly to the `registerApplication` function. However, with [Webpack 2+](https://webpack.js.org/), we can take advantage of its support for [code splitting](https://webpack.js.org/guides/code-splitting/) with [import()](https://webpack.js.org/api/module-methods/#import) in order to easily lazy-load registered applications when they are needed. Think about your project's build when deciding which route to take.
:::

```js {8} title="src/index.js"
import registerServiceWorker from './registerServiceWorker';
import { registerApplication, start } from 'single-spa';

registerApplication(
  'root',
  () => import('./root.app.js'),
  () => true,
);

start();
registerServiceWorker();
```

# That's it

Head back to the console and start up the server on [http://localhost:3000](http://localhost:3000) by running `yarn start` from the root directory.

Inspect the page and notice that our SPA is now being rendered inside of the `<div id="root"/>`. Technically, we are back to square one, with a fully functioning SPA. However, now that our SPA is a registered single-spa application we can take advantage of single-spa's functionality by building additional applications to mount side by side with our current React SPA.

Feel free to start using that new Javacript framework everyone has been talking about.
