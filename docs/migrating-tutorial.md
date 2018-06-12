---
id: migrating-tutorial
title: Migrating an Existing Project
sidebar_label: Migrating an Existing Project
---

# Project Overview

single-spa allows you to build micro frontends that coexist and can each be written with their own framework. This will allow you and your team to:

1. Use multiple frameworks on the same page. see the single-spa ecosystem for more info

2. Write code using a new framework, without rewriting your existing application

3. Lazy load code for improved initial load time.

Single-spa can be used with just about any build system or javascript framework, but this tutorial will focus on taking existing applications and converting them into a single-spa web application using a single code repository. It is also possible to have [separate code repositories](https://single-spa.js.org/docs/separating-applications.html#option-3-dynamic-module-loading) for each of your applications.

If you'd like to learn how to build a single-spa web application from scratch, check out [this tutorial](https://single-spa.js.org/docs/starting-from-scratch.html). If you'd like to learn how to use single-spa with Angular 2+, Vue, or other frameworks, [try these tutorials](https://github.com/CanopyTax/single-spa-examples).

Since this tutorial will be covering how to migrate existing applications, we have created a repository containing the applications we will be converting. You can find the code needed to follow along [here](https://github.com/alocke12992/migrating-to-single-spa-starter). You can find the completed [code for this tutorial here](https://github.com/alocke12992/single-spa-migration-tutorial). Read more about [separating applications](https://single-spa.js.org/docs/separating-applications.html) using single-spa.

Be sure to read through the [single-spa docs](https://single-spa.js.org/), check the [single-spa github](https://github.com/CanopyTax/single-spa) and the [help section](https://single-spa.js.org/help.html) for more support.

## Project Setup

Get started by typing the following command into your terminal:

```bash
git clone git@github.com:alocke12992/migrating-to-single-spa-starter.git
cd migrating-to-single-spa-starter
yarn
```

Regardless of how your current project is set up, we recommend having a root folder that will contain each of your existing applications. You will find we already have Four React applications ready for us to use all housed in our main folder.

1. NavBar - An app that controls routing between our SPAs using the single-spa [navigateToUrl()](https://single-spa.js.org/docs/api.html#navigatetourl) api.
2. Home - A simple React application we will use as our landing page.
3. [Pokedex](https://github.com/alik0211/pokedex) - A list of Pokemon you can live search using React, ReactDOM, Redux and Redux-Thunk.
4. [Huge Apps](https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps) - This is the react-router `huge-apps` example application.

If you would like to read more about how we built the `NavBar` app, check out the [getting started from scratch](https://single-spa.js.org/docs/starting-from-scratch.html#step-five-create-a-navbar) tutorial. It is important to note that this tutorial will not cover building the `NavBar` or `Home` apps, since we covered the build for both in the [Getting Started From Scratch](https://single-spa.js.org/docs/starting-from-scratch.html) tutorial. Check out the [NavBar build here](https://single-spa.js.org/docs/starting-from-scratch.html#step-five-create-a-navbar) and the [Home build here](https://single-spa.js.org/docs/starting-from-scratch.html#step-four-create-the-home-application).

Notice we have also included a `.babelrc` and a `webpack.config.js` file. This is not required to migrate to a single-spa web applicaiton.

## Step One: Register the Applications

It is required to register your applications with single-spa. This enables single-spa to know how and when to initiate, load, mount and unmount an application.

### a) Create a config file

If you take a look at the `webpack.config.js` file, you will notice we have already set up webpack to look for registration inside of a single spa config. This will allow hierarchy to be maintained between the applications.

Inside of the root directory create a `single-spa-config.js` file.

```bash
# from the root directory
touch single-spa-config.js
```

Now that we have our single-spa-config.js file, we can begin to register applications. In order to register an application with single-spa we call the `registerApplication()` api and include the application `name`, a `loadingFunction` and an `activityFunction`.

In `single-spa-config.js`, start by importing the `registerApplication` and `start` functions.

```js
// single-spa-config.js
import {registerApplication, start} from 'single-spa';
```

The start() api must be called by your single spa config in order for applications to actually be mounted. Before start is called, applications will be loaded, but not bootstrapped/mounted/unmounted. Learn more about the [start()](https://single-spa.js.org/docs/configuration.html#calling-singlespastart) api here.

### b) Register the root application

With our functions imported, we can now register an application with single-spa and call `start()`. Let's start by creating adding the 'Home' application.

```js
// single-spa-config.js
import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function
  loadingFunction,
  // Our activity function
  activityFunction
  );

  start()
```

The second argument to `registerApplication()`, the [loading function](https://single-spa.js.org/docs/configuration.html#loading-function), must be a function that returns a promise (or an ["async function"](https://ponyfoo.com/articles/understanding-javascript-async-await)). The function will be called with no arguments when it's time to load the application for the first time. The returned promise must be resolved with the application. The most common implementation of a loading function is an import call: `() => import('/path/to/application.js')`

```js
// single-spa-config.js

import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function which is an import call using the path to the application
  () => import('./home/home.app.js'),
  // Our activity function
  activityFunction
);

start()
```  

The third argument to `registerApplication()`, `activityFunction`, must be a pure function. The function is provided `window.location` as the first argument, and returns a truthy value whenever the application should be active. Most commonly, the activity function determines if an application is active by looking at `window.location`/the first param.

Since `Home` will be our root component, we can set the `activityFunction` to be our root path.

```js
// single-spa-config.js
import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function which is an import call using the path to the application
  () => import('./home/home.app.js'),
  // Our activity function
  () => location.pathname === "" || location.pathname === "/")
  );

  start()
```

### c) Register the NavBar

Creating and registering our NavBar application will be very similar to the process we used to create our `Home` app. Learn more about [setting up inter-app navigation](https://single-spa.js.org/docs/starting-from-scratch.html#d-set-up-navigation) from the `Getting Started from Scratch` tutorial.

Just as we did before, we need to register our navBar using the `registerApplication()` api in our `single-spa-config.js` file:

```js
// single-spa-config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('./navBar/navBar.app.js'), activityFunction);
registerApplication('home', () => import('./home/home.app.js'), () => location.pathname === "" || location.pathname === "/");

start();
```

Recall that the activityFunction is provided `window.location` as the first argument, and returns a truthy value whenever the application should be active.
Since we want our navBar to persist regardless of any other mounted SPAs, we will set the `activityFunction` to return a value of `true`.

```js
// single-spa-config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('../navBar/navBar.app.js'), () => true);
registerApplication('home', () => import('../home/home.app.js'), () => location.pathname === "" || location.pathname === "/");

start();
```

### d) Register the final two apps



## Step Two: Convert and Register your app 

## Step Three: Adjust your HTML

