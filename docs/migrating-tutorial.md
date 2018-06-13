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

## Step One: Create the Root Application

The first step is to create what single-spa calls your “root application.” Really your root application is just the stuff that initializes single-spa, and it starts with an html file.

You’ll want to keep your root application as small as possible, since it’s sort of the master controller of everything and could become a bottleneck. You don’t want to be constantly changing both the root application and the child applications.

### a) Create a master html
In your root directory, create a master html file.

```bash
touch index.html
```

In order to register two or more applications simultaneously, we need to create a `<div id="app-name"></div>` for each application. This ensures that they never try to modify the same DOM at the same time. For this project we will be creating a `<div>` for the four SPAs we will be migrating in this tutorial.

In `index.html` add the following:

```html
<!-- index.html -->
<body>
  <div id="navbar"></div>
  <div id="home"></div>
  <div id="pokedex"></div>
  <div id="huge_apps"></div>
</body>
```

### b) Include global scripts and stylesheets

For this tutorial we will be using the [Materialize-css](https://materializecss.com/) framework. To use Materialize across all of our SPAs we need to include styles and scripts in the root `index.html` file. This will allow all of our separate applications to access the Materialize library.

Additionally, to get single-spa connected, we will need to include a script tag connecting the html file to the [root-application](https://single-spa.js.org/docs/configuration.html#indexhtml-file) via a `single-spa.config.js` file (we will be building this in the next step).

```html
<!-- index.html -->
<html>
  <head>
    <!-- Materialize CSS --> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </head>
  <body>
    <!-- single-spa apps -->
    <div id="navbar"></div>
    <div id="home"></div>
    <div id="pokedex"></div>
    <div id="huge_apps"></div>

    <!-- Jquery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <!-- Materialize -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
    <!-- connect to the single-spa config file -->
    <script src="/dist/single-spa.config.js"></script>
  </body>
</html>
```

## Step Two: Register the Applications

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

registerApplication('navBar', () => import ('./navBar/navBar.app.js'), () => true);
registerApplication('home', () => import('./home/home.app.js'), () => location.pathname === "" || location.pathname === "/");

start();
```

### d) Register the final two apps

Just as we did for the Home and NavBar applications, we start by registering the final two SPAs in `single-spa.config.js`

```js
// single-spa.config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('./navBar/navBar.app.js'), () => true);
registerApplication('home', () => import('./home/home.app.js'), () => location.pathname === "" || location.pathname === "/");
registerApplication('pokedex', () => import('./pokedex/pokedex.app.js'), activityFunction);
registerApplication('huge_apps', () => import('./huge_apps/huge_apps.app.js'), activityFunction);

start();
```

You might notice that our 'Pokedex' and 'Huge_apps' SPAs do not yet contain the `pokedex.app.js` or `huge_apps.app.js` files. These will be the files that will contain the lifecycle functions needed to `bootstrap`, `mount` and `unmount` the application. We will create these in [Step Three](https://single-spa.js.org/docs/migrating-tutorial.html#step-two)

Instead of hard coding the activityFunction, we will create a function that will allow us to dynamically add new SPAs in the future. To do this, write a function that takes a path prefix as string and returns a location whose path name starts with the provided prefix.

```js
// single-spa.config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('./navBar/navBar.app.js'), () => true);
registerApplication('home', () => import('./home/home.app.js'), () => location.pathname === "" || location.pathname === "/");
registerApplication('pokedex', () => import('./pokedex/pokedex.app.js'), pathPrefix('/pokedex'));
registerApplication('huge_apps', () => import('./huge_apps/huge_apps.app.js'), pathPrefix('/huge_apps'));

start();

function pathPrefix(prefix) {
    return function(location) {
        return location.pathname.startsWith(`${prefix}`);
    }
}
```

## Step Three: Convert SPAs into registered Applications

Now that we have all of our applications registered, we need to make some minor adjustments that will allow us to implement the single-spa `lifecycle functions`.

Your existing SPAs, whether they be Angular, React, or something else, probably are not used to unmounting themselves from the DOM. Also, they probably have had the luxury of controlling the entire html page themselves, instead of being purely javascript applications that don't have sole control over `<script>` tags and `<link>` tags. So in order to convert them into single-spa registered applications, they will need to overcome those obstacles while implementing lifecycle functions.

As noted earlier, we have already set up the `NavBar` and `Home` applications so we will be skipping this step for them. Check out the [Starting From Scratch](https://single-spa.js.org/docs/starting-from-scratch.html) tutorial to learn more.

To make this tutorial easier to navigate, we will use the following to separate the two applications we need to convert:

1) a - refers to the Pokedex SPA
2) b - refers to the Huge_Apps SPA

### Installing Dependencies

Since we are migrating existing applications, we have to take a moment to think about how we are going to handle any dependancies each application might rely on. It is also possible for your SPAs to share dependencies. There are a couple of ways to handle this. The first would be to extract dependancies from each application and install them in the master
<!-- NOTE - This is going to be a very short tutorial -->
package.json which contains each of your SPAs. Read more about [handling dependencies]().

Alternatively, to get up and running quickly you could simply move into each of your SPAs and install dependencies separately. For this tutorial we will be doing the later of the two options.

From the root directory run the following code:

```bash
cd pokemon/
yarn
cd ../huge_apps
yarn
```

### a.1) Implement Lifecycle Functions

See the [registered application lifecycle](https://single-spa.js.org/docs/building-applications.html#registered-application-lifecycle) docs to learn more about each lifecycle function. The hardest part will almost certainly be the `unmount` lifecycle, since most SPAs aren't accustomed to going dormant and unmounting themselves from the DOM. When implementing your lifecycle functions, first check out the [ecosystem](https://single-spa.js.org/docs/ecosystem.html) docs before reinventing the wheel yourself. If that doesn't have everything you need, you'll have to make sure that your SPA can clean up its DOM, DOM event listeners (all of them, but especially hashchange and popstate), and memory.

For this tutorial, we will be implenting the required lifecycle functions in a new `appName.app.js` file within each of our existing applications. From the root directory, run the following code to create these files

```bash
touch huge_apps/huge_apps.app.js pokedex/pokedex.app.js
```

Lets start with the Pokedex app. In `pokedex.app.js` we start by importing our dependencies and, using [single-spa-react](https://github.com/CanopyTax/single-spa-react), we can use the generic React lifecycle hooks. During this process, we need to establish a `rootComponent`, which is the top level React component to be rendered. In the case of our Pokedex app, this is the `index.js` file found in `pokedex/src/`.

Finally, we will use the `domElementGetter()` function to return a DOM Element where the application will be bootstrapped, mounted, and unmounted. Recall that we already created our master `index.html` file and included an id for each of the applicaitons we planned to migrate back in [Step One](https://single-spa.js.org/docs/migrating-tutorial.html#step-one).

```js
// pokedex/pokedex.app.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './src/index.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter,
})

export const bootstrap = [
  reactLifecycles.bootstrap,
];

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];

function domElementGetter() {
  return document.getElementById("pokedex")
}
```

### a.2) Converting the root component

To get the Pokedex app converted, we will need to make some minor changes to the current root component. Currently, the root component found in `pokedex/src/index.js` uses the `render` method from `react-dom` to render the applicaiton in its local `index.html`. All we need to do is convert the file to export a function rather than render a DOM element.

Refactor `pokedex/src/index.js`:

```js
import React from 'react'
// We no longer need to import 'render' from react-dom so we will remove this line:
// import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Page from './containers/Page'
import './style/main.css'
import configureStore from './store/configureStore'

const store = configureStore()

// Convert the render() into a function we can export
const Index = () => (
  <Provider store={store}>
    <Page />
  </Provider>
)

export default Index
```

### b.1) Implement Lifecycle Functions

Migrating the second application will be very similar to the process used in the previous step. Refer back to step [a.1]() for more details.

Start by setting up the lifecycle functions in `huge_apps/huge_apps.app.js` to include the application's index.js as the `Root` component:

```js
// huge_apps/huge_apps.apps.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
// We will need to refactor our root component just like we did for our previous SPA
import Root from './index.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter
});

export const bootstrap = [
  reactLifecycles.bootstrap,
];

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];

function domElementGetter() {
  return document.getElementById("huge_apps")
}
```

### b.2) Converting the root component

Just like we did in step [a.2]() we need to refactor the root component of the `Huge_Apps` SPA to export a function instead of rendering a DOM element. Since this application uses react-router, we will also need to modify the 'Root' path by changing it the path we set up in our `single-spa.congif.js`.

```js
// huge_apps/index.js
import React from 'react';
// remove this import since we no longer need it
// import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import './stubs/COURSES';

const rootRoute = {
  childRoutes: [{
    // path: '/',
    path: '/huge_apps',
    component: require('./components/App'),
    childRoutes: [
      require('./routes/Calendar'),
      require('./routes/Course'),
      require('./routes/Grades'),
      require('./routes/Messages'),
      require('./routes/Profile')
    ]
  }]
};

// // Convert the render() into a function we can export
const Root = () => (
  <Router
    history={browserHistory}
    routes={rootRoute}
  />
)

export default Root
```

### b.3) Refactor Routes

Now that we are using single-spa, the routes in our `Huge_apps` SPA need to be refactored to include the `/huge_apps` route prefix we established in our `single-spa.config.js` file. Add the new prefix in the following files:

```js
// huge_apps/components/Dashboard.js
// Line 20
<Link to={`/huge_apps/course/${course.id}`}>{course.name}</Link>
```

```js
// huge_apps/components/GlobalNav.js
// Starting at line 41
return (
  <div style={styles.wrapper}>
    <div style={{ float: 'left' }}>
      <Link to="/huge_apps" style={styles.link}>Home</Link>{' '}
      <Link to="/huge_apps/calendar" style={styles.link} activeStyle={styles.activeLink}>Calendar</Link>{' '}
      <Link to="/huge_apps/grades" style={styles.link} activeStyle={styles.activeLink}>Grades</Link>{' '}
      <Link to="/huge_apps/messages" style={styles.link} activeStyle={styles.activeLink}>Messages</Link>{' '}
    </div>
    <div style={{ float: 'right' }}>
      <Link style={styles.link} to="/huge_apps/profile">{user.name}</Link> <button onClick={this.logOut}>log out</button>
    </div>
  </div>
)
```

```js
// huge_apps/routes/Course/components/Nav.js
// Starting at line 30
return (
  <div style={styles.nav}>
    {pages.map((page, index) => (
      <Link
        key={page[0]}
        activeStyle={index === 0 ? { ...styles.activeLink, paddingLeft: 0 } : styles.activeLink}
        style={index === 0 ? { ...styles.link, paddingLeft: 0 } : styles.link}
        to={`/huge_apps/course/${course.id}/${page[0]}`}
      >{page[1]}</Link>
    ))}
  </div>
)
```

```js
// huge_apps/routes/Course/routes/Announcements/components/Sidebar.js
// Line 15
<Link to={`/huge_apps/course/${this.props.params.courseId}/announcements/${announcement.id}`}>
  {announcement.title}
</Link>
```

```js
// huge_apps/routes/Course/routes/Assignments/components/Sidebar.js
// Line 15
<Link to={`/huge_apps/course/${this.props.params.courseId}/assignments/${assignment.id}`}>
  {assignment.title}
</Link>
```

## Step Three: Adjust your HTML

The final step before we

### a) Create a Master html

### b) Global Styles


