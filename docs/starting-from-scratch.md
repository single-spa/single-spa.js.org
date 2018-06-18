---
id: starting-from-scratch
title: Starting From Scratch
sidebar_label: Starting from scratch
---

# Project Overview

single-spa allows you to build micro frontends that coexist and can each be written with their own framework. This will allow you and your team to:

1) Use multiple frameworks on the same page. [see the single-spa ecosystem for more info](ecosystem.md#docsNav)
2) Write code using a new framework, without rewriting your existing application
3) [Lazy load](https://en.wikipedia.org/wiki/Lazy_loading) code for improved initial load time.

Single-spa can be used with just about any build system or javascript framework, but this tutorial will focus on creating a web app with [Webpack](https://webpack.js.org/), [React](https://reactjs.org/), and [AngularJS/Angular1](https://angularjs.org/). Our tutorial puts everything into a single code repository, but it is also possible to have [separate code repositories](separating-applications.md#option-3-dynamic-module-loading) for each of your applications.

If you'd like to learn how to use single-spa with Angular 2+, Vue, or other frameworks, [checkout this example](https://github.com/CanopyTax/single-spa-examples). And if you'd rather use a different build system instead of webpack, check out [this example](https://github.com/me-12/single-spa-portal-example)

You can find the [code for this tutorial](https://github.com/alocke12992/single-spa-simple-example). Read more about [separating applications](separating-applications.md) using single-spa.

Be sure to read through the [single-spa docs](https://single-spa.js.org/), check the [single-spa github](https://github.com/CanopyTax/single-spa) and the [help section](https://single-spa.js.org/help.html) for more support.

## Step One: Project Set up

Create a new directory to house our project, followed by a `src` folder to hold all of our micro-service applications.

```bash
mkdir single-spa-simple-example && cd single-spa-simple-example
mkdir src
```

In the root of our new project, initialize the package manager of your choice and install single-spa. For this tutorial, we will be using [yarn](https://yarnpkg.com/en/).

```bash
yarn init              # or npm init
yarn add single-spa    # or npm install --save single-spa
```

### a) Setup Babel

We will be using [Babel](https://babeljs.io/) to compile our code. Run the following command to install the necessary dependencies:

```bash
yarn add babel-core babel-plugin-syntax-dynamic-import babel-preset-env babel-preset-latest babel-preset-react --dev
```

Then, in your root directory create a `.babelrc` file and include the following:

```js
// .babelrc
{
    "presets": [
      ["env", {
        "targets": {
          "browsers": ["last 2 versions"]
        }
      }],
      ["react"]
    ],
    "plugins": [
      "syntax-dynamic-import"
    ]
  }
```

If you would like to learn more about what each of these things are doing, check out the [Babel docs](https://babeljs.io/docs/setup/).

### b) Setup webpack

*Once again, it is important to note that you do not have to use webpack in order to get up and running with single-spa. Checkout the documention on [Separating Applications](separating-applications.md) to learn more about the different ways you can use single-spa for your specific build.*

Start by adding webpack, webpack plugins and loaders.

*Webpack*

```bash
yarn add webpack webpack-dev-server webpack-cli --dev
```

*Webpack Plugins*

```bash
yarn add clean-webpack-plugin --dev
```

* [CleanWebpackPlugin](https://www.npmjs.com/package/clean-webpack-plugin)
* [ContextReplacementPlugin](https://webpack.js.org/plugins/context-replacement-plugin/)

*Webpack Loaders*

```bash
yarn add style-loader css-loader html-loader babel-loader --dev
```

* [html-Loader](https://webpack.js.org/loaders/html-loader/)
* [style-loader](https://webpack.js.org/loaders/style-loader/)
* [css-loader](https://webpack.js.org/loaders/css-loader/)
* [babel-Loader](https://webpack.js.org/loaders/babel-loader/)

*Webpack.config.js*

In the root directory create your `webpack.config.js` file.

```bash
touch webpack.config.js
```

See the following example of how to set up your config file:

```js
// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
    mode: 'development',
    entry: {
      // Set the single-spa config as the project entry point
        'single-spa.config': 'src/root-application/single-spa.config.js',
    },
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
              // Webpack style loader added so we can use materialize
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
          {
            test: /\.js$/,
            exclude: [path.resolve(__dirname, 'node_modules')],
            loader: 'babel-loader',
          },
            {
              // This plugin will allow us to use html templates when we get to the angular1 app 
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader',
            },
        ],
    },
    node: {
        fs: 'empty'
    }, 
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    plugins: [
      // A webpack plugin to remove/clean the build folder(s) before building
        new CleanWebpackPlugin(['dist']),
        // Webpack plugin that allows you to override the inferred information
        // the angular core context is restricted to files within the src directory
        // I AM HONESTLY NOT SURE IF THIS ^ IS CORRECT 
        new ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.resolve(__dirname, '../src')
        )
    ],
    devtool: 'source-map',
    externals: [],
    devServer: {
        historyApiFallback: true
    }
};
```

### c) Modify the package.json

The last step in our project set up is to include a couple scrips in our package.json so we can take advantage of the webpack-dev-server. Add the following to your package.json:

```js
//package.json
"scripts": {
  "start": "webpack-dev-server --open",
  "build": "webpack --config webpack.config.js -p"
},
```

## Step Two: Create the master html file

The next step is to create what single-spa calls your “root application.” Really your root application is just the stuff that initializes single-spa, and it starts with an html file.

You’ll want to keep your root application as small as possible, since it’s sort of the master controller of everything and could become a bottleneck. You don’t want to be constantly changing both the root application and the child applications.

### a) Create a master html

In your root directory, create a master html file.

```bash
touch index.html
```

In order to register two applications simultaneously, we will create a `<div id="app-name"></div>` for each app so that they never try to modify the same DOM at the same time.
For this project we will be creating the following micro-applications:

1. NavBar - *This will be a React app*

2. Home - *This will be a React app*

3. Angular1 - *This will be an AngularJS app*

In `index.html` add the following:

```html
<!-- index.html -->
<body>
  <div id="navBar"></div>
  <div id="home"></div>
  <div id="angular1"></div>
</body>
```

### b) include scripts and stylesheets

For styling, we will be using the [Materialize-css](https://materializecss.com/) framework. To use Materialize we need to include styles and scripts in the root `index.html` file. This will allow all of our separate applications to access the Materialize library.

Additionally, to get single-spa connected, we will need to include a script tag connecting the html file to the [root-application](single-spa-config.md#indexhtml-file) via `single-spa.config.js` file (we will be building this in the next step).

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
    <div id="navBar"></div>
    <div id="home"></div>
    <div id="angular1"></div>

    <!-- Jquery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <!-- Materialize -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
    <!-- connect to the single-spa config file -->
    <script src="/dist/single-spa.config.js"></script>
  </body>
</html>
```

## Step Three: Registering an App

  It is required to [register your applications](single-spa-config.md#registering-applications) with single-spa. This enables single-spa to know how and when to initiate, load, mount and unmount an application.
  
  As you saw earlier, we have already set up webpack and our master html file to look for registration inside of the single spa config. This will allow hierarchy to be maintained between the applications.

  Inside of the `src` folder, create a new folder called `root-application` then create your `single-spa-config.js` file.

  ```bash
  # from the root directory
  mkdir src/root-application
  touch src/root-application/single-spa-config.js
  ```

  Now that we have our single-spa-config.js file, we can begin to register applications. In order to register an application with single-spa we call the `registerApplication()` api and include the application `name`, a `loadingFunction` and an `activityFunction`.

  In `single-spa-config.js`, start by importing the `registerApplication` and `start` functions.

  ```js
  // single-spa-config.js
  import {registerApplication, start} from 'single-spa';
```

  The start() api must be called by your single spa config in order for applications to actually be mounted. Before start is called, applications will be loaded, but not bootstrapped/mounted/unmounted. Learn more about the [start()](single-spa-config.md#calling-singlespastart) api here.

With our functions imported, we can now register an application with single-spa and call `start()`. Let's start by creating a 'home' application.

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

The third argument to `registerApplication()`, `activityFunction`, must be a pure function. The function is provided window.location as the first argument, and returns a truthy value whenever the application should be active. Most commonly, the activity function determines if an application is active by looking at window.location/the first param.

Since `home` will be our root component, we can set the `activityFunction` to be our root path.

```js
// single-spa-config.js
import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function
  loadingFunction,
  // Our activity function
  () => location.pathname === "" || location.pathname === "/")
  );

  start()
```

## Step Four: Create the Home application

### a) Folder setup

We will be using React to create the home component. Using your package manager, add `react`, `react-dom`, and the single-spa React helper [single-spa-react](ecosystem-react.md).

```bash
yarn add react react-dom single-spa-react
```

At the beginning of the tutorial we created a `src` folder to house all of our applications. It is this folder that will house each of our separate applications. These app folders will each contain an application file to control the bootstrap, mount and unmount functions and a `root` component. Read more about the [registered application lifecycle](building-applications.md#registered-application-lifecycle).

Start by adding a `home` folder inside of our `src` directory to house our home application. Then inside of `home` we will create two files: `home.app.js` and `root.component.js`.

```bash
cd src/home/
touch home.app.js root.component.js
```

Your file tree should look like this:

```bash
|--single-spa-simple-example
    |--node_modules
    |--src
        |--root-application
            |--single-spa-config.js
        |--home
            |--home.app.js
            |--root.component.js
  |--babelrc
  |--index.html
  |--package.json
  |--webpack.config.js
  |--yarn-error.log
  |--yarn.lock
```

### b) Application lifecycles

Since we have registered our application, single-spa will be listening for the `home` app to bootstrap and mount. We will set this up in `home.app.js`.

We start by importing our dependencies and, using [single-spa-react](ecosystem-react.md), we can use the generic React lifecycle hooks.

Finally, we will use the `domElementGetter()` function to return a DOM Element where the Home application will be bootstrapped, mounted, and unmounted.

```js
// home.app.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Home from './root.component.js';



const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Home,
  domElementGetter,
})
```

With our imports established, we can create the required lifecycle functions:

```js
// home.app.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Home from './root.component.js';



const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Home,
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

// Finally, we specify the location we want single-spa to mount our application
function domElementGetter() {
  return document.getElementById("home")
}
```

### c) Build the React app

Now that we have our application registered, and hooked up to single-spa with lifecycle methods, we can build our React app.

Open `home/root.component.js` and add the following:

```js
import React from 'react'

class Home extends React.Component{
  render(){
    return(
      <div style={{ marginTop: '100px' }}>
        <h1>Home Component</h1>
      </div>
    )
  }
}
export default Home
```

### d) Connect to the root application

Head back to the root-application folder and in single-spa-config.js add a [loading function](single-spa-config.md#loading-function) for our new home app.
With [webpack 2+](https://webpack.js.org/), we can take advantage of its support for [code splitting](https://webpack.js.org/guides/code-splitting/) with [import()](https://webpack.js.org/api/module-methods/#import) in order to easily lazy-load registered applications when they are needed.

```js
// root-application/single-spa-config.js

import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function
  () => import('../home/home.app.js'),
  // Our activity function
  () => location.pathname === "" || location.pathname === "/"
);

start()
```  

We are now ready to test out our first application.

From the root directory, start the project by running the following:

```bash
yarn start
```

## Step Five: Create a NavBar

### a) Register the Application

Creating and registering our NavBar application will be very similar to the process we used to create our `home` app. Refer back to [Step Three](starting-from-scratch.md#step-three-registering-an-app) for a more detailed explanation on how to register an application.

Just as we did before, we need to register our navBar using the `registerApplication()` api in our `single-spa-config.js` file:

```js
// src/root-application/single-spa-config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('../navBar/navBar.app.js'), activityFunction);
registerApplication('home', () => import('../home/home.app.js'), () => location.pathname === "" || location.pathname === "/");

start();
```

Recall that the activityFunction is provided window.location as the first argument, and returns a truthy value whenever the application should be active.
Since we want our navBar to persist regardless of any other mounted SPAs, we will set the `activityFunction` to return a value of `true`.

```js
// root-application/single-spa-config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('../navBar/navBar.app.js'), () => true);
registerApplication('home', () => import('../home/home.app.js'), () => location.pathname === "" || location.pathname === "/");

start();
```

*NOTE: It is important to remember to include your newly registered application as a div in your root html file. We did this already in [Step Two](starting-from-scratch.md#a-create-a-master-html). Don't forget to do this when you start adding new applications*

Now that we have registered our applicaiton, we can create a new `navBar` folder in the `src` directory to contain the `navBar.app.js` and `root.component.js` files.

From the root directory:

```bash
mkdir src/navBar
touch src/navBar/navBar.app.js src/navBar/root.component.js
```

### b) Set up the NavBar lifecycles

In `navbar.app.js` add the following application lifecycles. Refer back to [Step Four](starting-from-scratch.md#b-application-lifecycles) for a more detailed explanation.

```js
// src/navBar/navBar.app.js

import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import NavBar from './root.component.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: NavBar,
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
  return document.getElementById("navBar")
}
```

### c) Build the NavBar

Since we included Materialize CSS in our root html file, we can use the library as we begin to build out the navBar Application in `src/navBar/root.component.js`:

```js
// src/navBar/root.component.js

import React from 'react'

class NavBar extends React.Component{

  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <a className="brand-logo">single-spa</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a>Home</a></li>
            <li><a>Angular1</a></li>
          </ul>
        </div>
      </nav>
    )
  }  
}

export default NavBar
```

### d) Set up navigation

With single-spa, there are a number of options that will allow us to navigate between our separate SPAs. One method would be to include a `pushState()` function which will call the specified application's [activity function](single-spa-config.md#activity-function). Alternatively, we can use the single-spa [navigateToUrl()](api.md#navigatetourl)
utility function for convenience.

To use the function, we simply need to import it and call it with a click event, passing in each Application's url (as designated by the activityFunction set in `single-spa.config.js`) as a string.

```js
// src/navBar/root.component.js

import React from 'react'
import {navigateToUrl} from 'single-spa'

const NavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <a onClick={() => navigateToUrl('/')} className="brand-logo">single-spa</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a onClick={() => navigateToUrl('/')}>Home</a></li>
        {/* Note that we still need to build our AngularJS App before this link will work */}
        <li><a onClick={() => navigateToUrl('/angular1')}>Angular1</a></li>
      </ul>
    </div>
  </nav>
)

export default NavBar
```

## Step Six: Create an AngularJS app

### a) Install Dependencies

To demonstrate routing within a specific SPA, our AngularJS application will make use of `angular-ui-router`.

Using your package manager, add `angular`, `angular-ui-router`, and the single-spa AngularJS helper [single-spa-angular1](ecosystem-angular1.md).

Run the following command to install the necessary dependencies:

```bash
yarn add angular angular-ui-router single-spa-angular1
```

### b) Register the Application

Just as we did for the Home and NavBar applications, we start by registering the Angular SPA in `src/root-application/single-spa.config.js`

```js
// src/root-application/single-spa.config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('../navBar/navBar.app.js'), () => true);
registerApplication('home', () => import('../home/home.app.js'), () => location.pathname === "" || location.pathname === "/");
registerApplication('angular1', () => import ('../angular1/angular1.app.js'), activityFunction);

start();
```

Instead of hard coding the activityFunction, we will create a function that will allow us to dynamically add new SPAs in the future. To do this, write a function that takes a path prefix as string and returns a location whose path name starts with the provided prefix.

```js
// src/root-application/single-spa.config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('../navBar/navBar.app.js'), () => true);
registerApplication('home', () => import('../home/home.app.js'), () => location.pathname === "" || location.pathname === "/");
registerApplication('angular1', () => import ('../angular1/angular1.app.js'), pathPrefix('/angular1'));

start();

function pathPrefix(prefix) {
    return function(location) {
        return location.pathname.startsWith(`${prefix}`);
    }
}
```

Don't forget to include the new application in our root html by adding the following:

```html
<!-- index.html -->
<div id='angular1'></div>
```

With the application registered, we can create a new folder in the src directory to contain the Angular1 application files.

From the root directory:

```bash
mkdir src/angular1
cd src/angular1
touch angular1.app.js root.component.js root.template.html routes.js app.module.js gifs.component.js gifs.template.html
```

### c) Set up the Application Lifecycles

Within the single-spa ecosystem there is a growing number of projects that help you bootstrap, mount, and unmount your applications that are written with popular frameworks. In this case we will use single-spa-angular1 to take advantage of the generic lifecycle hooks. Learn more about the various [options](ecosystem-angular1.md#options) single-spa-angular1 offers.

Just as we did for our home and navBar components, set up the lifecycle hooks for the AngularJS SPA in the `angular1.app.js` file.

```js
// src/angular1/angular1.app.js

import singleSpaAngular1 from 'single-spa-angular1';
import angular from 'angular';
import './app.module.js'
import './routes.js';

// domElementGetter is required by single-spa-angular1
const domElementGetter = () => document.getElementById('angular1');

const angularLifecycles = singleSpaAngular1({
  angular,
  domElementGetter,
  mainAngularModule: 'angularJS-app',
  uiRouter: true,
  preserveGlobal: false,
})

export const bootstrap = [
  angularLifecycles.bootstrap,
];

export const mount = [
  angularLifecycles.mount,
];

export const unmount = [
  angularLifecycles.unmount,
];
```

### d) Set up the AngularJS Application

Now that we have registered our application and set up the lifecycle methods pointing to our main angular module, we can begin to build the application.

To start, we will build the app module followed by root.component.js which will set the root of our application using a template html file.

*app.module.js*
```js
// src/angular1/app.module.js
import angular from 'angular';
import 'angular-ui-router';

angular
.module('angularJS-app', ['ui.router']);
```

*root.component.js*

```js
// src/angular1/root.component.js
import angular from 'angular';
import template from './root.template.html';

angular
.module('angularJS-app')
.component('root', {
  template,
})
```

*root.template.html*

```html
<!-- src/angular1/root.template.html -->
<div ng-style='vm.styles'>
  <div class="container">
    <div class="row">
      <h4 class="light">
        Angular 1 example
      </h4>
      <p class="caption">
        This is a sample application written with Angular 1.5 and angular-ui-router.
      </p>
    </div>
    <div>
    <!-- These Routes will be set up in the routes.js file -->
      <a class="waves-effect waves-light btn-large" href="/angular1/gifs" style="margin-right: 10px">
        Show me cat gifs
      </a>
      <a class="waves-effect waves-light btn-large" href="/angular1" style="margin-right: 10px">
        Take me home
      </a>
    </div>
    <div class="row">
      <ui-view />
    </div>
  </div>
</div>
```

Next we will build the Gif Component, which can be access from the AngularJS root component.

*gif.component.js*

```js
// src/angular1/gifs.component.js
import angular from 'angular';
import template from './gifs.template.html';

angular
  .module('angularJS-app')
  .component('gifs', {
    template,
    controllerAs: 'vm',
    controller($http) {
      const vm = this;

      $http
        .get('https://api.giphy.com/v1/gifs/search?q=cat&api_key=dc6zaTOxFJmzC')
        .then(response => {
          vm.gifs = response.data.data;
        })
        .catch(err => {
          setTimeout(() => {
            throw err;
          }, 0)
        });
    },
  });
```

*gif.template.html*

```html
<!-- src/angular1/gifs.template.html -->

<div style="padding-top: 20px">
  <h4 class="light">
    Cat Gifs gifs
  </h4>
  <p>
  </p>
  <div ng-repeat="gif in vm.gifs" style="margin: 5px;">
    <img ng-src="{{gif.images.downsized_medium.url}}" class="col l3">
  </div>
</div>
```

### e) Set up in-app routing

Now that we have each of our components built out, all we have left to do is connect them. We will do this by importing both into the `routes.js` file.

```js
// src/angular1/routes.js

import angular from 'angular';
import './root.component.js';
import './gifs.component.js';

angular
.module('angularJS-app')
.config(($stateProvider, $locationProvider) => {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  $stateProvider
  .state('root', {
    url: '/angular1',
    template: '<root />',
  })

  .state('root.gifs', {
    url: '/gifs',
    template: '<gifs />',
  })
});
```

# And That’s It

In your root directory run `yarn start` to check out your new single-spa project.

Hopefully, this gives you a solid idea of how to build and implement micro frontends using single-spa. If you still have questions about how to use single-spa with your specific build, check out the migrating existing applications tutorials; [angular1](migrating-angular-tutorial.md) and [React](migrating-react-tutorial.md).