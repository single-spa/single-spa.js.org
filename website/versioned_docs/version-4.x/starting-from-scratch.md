---
id: starting-from-scratch
title: Starting From Scratch
sidebar_label: Starting from scratch
---

single-spa allows you to build micro frontends that coexist and can each be written with their own framework. This will allow you and your team to:

1. Use multiple frameworks on the same page. [See the single-spa ecosystem for more info](ecosystem.md#docsNav)
2. Write code using a new framework, without rewriting your existing application
3. [Lazy load](https://en.wikipedia.org/wiki/Lazy_loading) code for improved initial load time.

**Single-spa can be used with just about any build system or JavaScript framework**, but this tutorial will focus on creating a web app with [Webpack](https://webpack.js.org/), [React](https://reactjs.org/), and [AngularJS](https://angularjs.org/). Our tutorial puts everything into a single code repository, but it is also possible to have [separate code repositories](separating-applications.md#option-3-dynamic-module-loading) for each of your applications.

For this tutorial we will be creating the following applications to showcase the power and usefulness of single-spa:

1. home: a React app using [React Router](https://reacttraining.com/react-router/)
2. navBar: a React app that always displays top-level navigation
3. angularJS: an AngularJS app using [angular-ui-router](https://ui-router.github.io/ng1/)

The complete code for this example is in the [`single-spa-simple-example`](https://github.com/alocke12992/single-spa-simple-example) repository.

:::note
We encourage you to read through all the [single-spa docs](/) to become familiar with the entire single-spa setup. Visit the [single-spa Github](https://github.com/single-spa/single-spa), the [help section](https://single-spa.js.org/help.html), or our community [Slack](https://join.slack.com/t/single-spa/shared_invite/zt-l2iljnpv-pW_o92mMpMR8RWfIOI6pTQ) channel for more support.
:::

## 1. Initial setup

:::info
For this tutorial, we will be using [yarn](https://yarnpkg.com/en/) but npm has its own equivalent commands and can be used almost interchangibly.
:::

Create a new folder for this project and navigate into it. Initialize a new project using your package manager, and then install single-spa as a dependency. Then create a _src/_ folder to hold all of our micro-service applications, with each in their own folder.

```sh
mkdir single-spa-simple-example && cd single-spa-simple-example
yarn init              # or npm init
yarn add single-spa    # or npm install --save single-spa
mkdir src
```

### 1.a Setup Babel

We will be using [Babel](https://babeljs.io/) to compile our code. Install it and some additional dependencies using:

```bash
yarn add --dev @babel/core @babel/preset-env @babel/preset-react @babel/plugin-syntax-dynamic-import @babel/plugin-proposal-object-rest-spread
```

Next create a _.babelrc_ file and paste in the following:

```js title=".babelrc"
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }],
    ["@babel/preset-react"]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```

Learn more about what each of these packages do by visiting the [Babel docs](https://babeljs.io/docs/setup/).

### 1.b Setup Webpack

:::note
It is important to point out that **you do not have to use Webpack in order use single-spa**. Learn more about [Separating applications](separating-applications.md) and the different ways you can use single-spa for your specific build.
:::

Run the following commands to add Webpack, Webpack plugins, and loaders.

```sh
# Webpack core
yarn add webpack webpack-dev-server webpack-cli --dev
# Webpack plugins
yarn add clean-webpack-plugin --dev
# Webpack loaders
yarn add style-loader css-loader html-loader babel-loader --dev
```

Learn more about these Webpack plugins and loaders at their respective documentation pages.

- [CleanWebpackPlugin](https://www.npmjs.com/package/clean-webpack-plugin)
- [style-loader](https://webpack.js.org/loaders/style-loader/)
- [css-loader](https://webpack.js.org/loaders/css-loader/)
- [html-Loader](https://webpack.js.org/loaders/html-loader/)
- [babel-Loader](https://webpack.js.org/loaders/babel-loader/)

In the root of your project create a new file name _webpack.config.js_ and paste in the following code:

```js title="webpack.config.js"
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // Set the single-spa config as the project entry point
    'single-spa.config': './single-spa.config.js',
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        // This plugin will allow us to use AngularJS HTML templates
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    // A webpack plugin to remove/clean the output folder before building
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true,
  },
};
```

### 1.c Add npm scripts

The last step in our project set up is to include a couple scripts in our package.json to run webpack-dev-server and to create a production build. Add the following to your _package.json_:

```js title="package.json"
"scripts": {
  "start": "webpack-dev-server --open",
  "build": "webpack --config webpack.config.js -p"
},
```

## 2. Create the HTML file

Our goal in this step will be to create a **single-spa config**. The single-spa config file is where your applications are initialized, and an HTML page will request this config.

You’ll want to keep your single-spa config as small as possible since it is the master controller and could easily become a maintenance bottleneck. You don’t want to be constantly changing both the single-spa config and the child applications.

### 2.a Create _index.html_

Create an _index.html_ file the root directory. Inside this file, we'll be adding a `div` element for each application, each with a unique ID. Mounting each application to a different point allows us to maintain them completely separated and so that they never try to modify the same DOM.

Paste in the following HTML markup:

```html title="index.html"
<html>
  <head></head>
  <body>
    <div id="navBar"></div>
    <div id="home"></div>
    <div id="angularJS"></div>
  </body>
</html>
```

### 2.b Include scripts and stylesheets

For styling, we will be using the [Materialize](https://materializecss.com/) framework. We can enable all of our applications to access the Materialize library by including the styles and scripts in _index.html_.

Additionally, to enable single-spa, we will need to include a script tag that references [_single-spa.config.js_](configuration#indexhtml-file) in _index.html_. We will be adding and populating this file in the next step. Webpack outputs our built code to _dist/_ so that will be the path of _single-spa.config.js_.

```html title="index.html"
<html>
  <head>
    <!-- Materialize -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css"
    />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="navBar"></div>
    <div id="home"></div>
    <div id="angularJS"></div>

    <!-- jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <!-- Materialize -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
    <!-- import the single-spa config file -->
    <script src="/dist/single-spa.config.js"></script>
  </body>
</html>
```

## 3. Registering applications

[Registering applications](configuration#registering-applications) is how we tell single-spa when and how to `bootstrap`, `mount`, and `unmount` an application.

Create a new file called _single-spa.config.js_ in the root directory. Let's start by registering the `home` application.

```js title="single-spa.config.js"
import { registerApplication, start } from 'single-spa';

registerApplication(
  // Name of our single-spa application
  'home',
  // loadingFunction
  () => {},
  // activityFunction
  location =>
    location.pathname === '' ||
    location.pathname === '/' ||
    location.pathname.startsWith('/home'),
);

start();
```

The above code needs explanation. In order to register an application with single-spa, import and call the `registerApplication` function; and include the application `name`, a `loadingFunction`, and an `activityFunction` as parameters.

`loadingFunction` must be a function that returns a Promise (or an [`async` function](https://ponyfoo.com/articles/understanding-javascript-async-await)). The function will be called with no arguments when loading the application for the first time. The returned promise must resolve with the application code. We will come back to this in [Step 4.d](starting-from-scratch.md#4d-connect-to-single-spa-config) after creating the **home** application.

`activityFunction` must be a function that returns a truthy value that represents whether the application should be active, and must be a pure function. The function is provided `window.location` as the first argument. The most common scenario is to determine if an application is active by looking at window.location, but not always. In this case, `home` will be our root application so it will be shown at the root url paths as well as and url pathname that begins with `/home`.

Lastly, we also import the `start` function from the single-spa package and call it in order for applications be mounted. Before `start` is called, applications will be loaded into the browser but not bootstrapped/mounted/unmounted. Learn more about the [start()](configuration#calling-singlespastart) api here.

## 4. Create the home application

### 4.a Setup home

Start by adding a _home/_ folder inside of the _src/_ directory. Then inside of _home/_ we will create two files: _home.app.js_ and _root.component.js_.

```sh
mkdir src/home && cd src/home
touch home.app.js root.component.js
```

The **home** application will use React with [React Router animated transitions](https://reacttraining.com/react-router/web/example/animated-transitions). Using your package manager, add `react`, `react-dom`, `react-router-dom`, and [`single-spa-react`](ecosystem-react.md) as dependencies.

`single-spa-react` is a helper library that already implements single-spa lifecycle functions for React, so you don't have to implement these yourself.

```sh
yarn add react react-dom single-spa-react react-router-dom react-transition-group
```

Your file tree should now look similar to this:

```bash
.
├── node_modules
├── package.json
├── .gitignore
├── src
│  └── home
│       ├── home.app.js
│       └── root.component.js
├── .babelrc
├── index.html
├── single-spa.config.js
├── webpack.config.js
├── yarn-error.log
├── yarn.lock
└── README.md
```

### 4.b Define home application lifecycles

Since we have registered our application, single-spa will be listening for the **home** application to bootstrap and mount. **home** app will be responsible for this. We will set this up in _home.app.js_.

[single-spa-react](ecosystem-react.md) provides the generic React lifecycle hooks for registering a singe-spa application, which we'll import as `singleSpaReact`.

`singleSpaReact` requires 4 parameters: the instance of React, the instance of ReactDOM, the rootComponent to be rendered (in this case, the `Home` component), and a `domElementGetter` function that return a DOMElement where the Home application will be bootstrapped, mounted, and unmounted by single-spa.

```js title="home.app.js"
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Home from './root.component.js';

function domElementGetter() {
  return document.getElementById('home');
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Home,
  domElementGetter,
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [reactLifecycles.mount];

export const unmount = [reactLifecycles.unmount];
```

### 4.c Build the React app

Now that we have the **home** application registered, let us build the React app. We've reproduced the code from [react-router's Animated Transitions](https://reacttraining.com/react-router/web/example/animated-transitions) below with two modifications, which are highlighted below. The first change is to add `/home` as the basename prop for `Router`, since in [Step 3](starting-from-scratch.md#step-three-registering-an-app) we had configured this application to handle routing at the `/home` path. The second change is to the top-most div's styles so that **home** appears beneath the **navBar** that we'll create later.

```js {24,27} title="root.component.js"
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

/* you'll need this CSS somewhere
.fade-enter {
  opacity: 0;
  z-index: 1;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 250ms ease-in;
}
*/

const AnimationExample = () => (
  <Router basename="/home">
    <Route
      render={({ location }) => (
        <div style={{ position: 'relative', height: '100%' }}>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/hsl/10/90/50" />}
          />

          <ul style={styles.nav}>
            <NavLink to="/hsl/10/90/50">Red</NavLink>
            <NavLink to="/hsl/120/100/40">Green</NavLink>
            <NavLink to="/rgb/33/150/243">Blue</NavLink>
            <NavLink to="/rgb/240/98/146">Pink</NavLink>
          </ul>

          <div style={styles.content}>
            <TransitionGroup>
              {/* no different than other usage of
                CSSTransition, just make sure to pass
                `location` to `Switch` so it can match
                the old location as it animates out
              */}
              <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Switch location={location}>
                  <Route exact path="/hsl/:h/:s/:l" component={HSL} />
                  <Route exact path="/rgb/:r/:g/:b" component={RGB} />
                  {/* Without this `Route`, we would get errors during
                    the initial transition from `/` to `/hsl/10/90/50`
                  */}
                  <Route render={() => <div>Not Found</div>} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      )}
    />
  </Router>
);

const NavLink = props => (
  <li style={styles.navItem}>
    <Link {...props} style={{ color: 'inherit' }} />
  </li>
);

const HSL = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.hsl,
      background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`,
    }}>
    hsl({params.h}, {params.s}%, {params.l}%)
  </div>
);

const RGB = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.rgb,
      background: `rgb(${params.r}, ${params.g}, ${params.b})`,
    }}>
    rgb({params.r}, {params.g}, {params.b})
  </div>
);

const styles = {};

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center',
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex',
};

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px',
};

styles.hsl = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px',
};

styles.rgb = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px',
};

export default AnimationExample;
```

### 4.d Define the loading function

We will now define the [loading function](configuration#loading-function) for **home** in _single-spa.config.js_.

One way of doing this is by simply passing in an _application config object_ (the `reactLifecycles` functions we built in [Step 4.b](starting-from-scratch.md#b-application-lifecycles) are an example of this) directly to the `registerApplication` function.

However, to encourage best practices, we will leverage [code splitting using Webpack](https://webpack.js.org/guides/code-splitting/) to easily lazy-load registered applications on-demand. Think about your project's needs when deciding which route to take.

```js {7} title="single-spa.config.js"
import { registerApplication, start } from 'single-spa';

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function
  () => import('./src/home/home.app.js'),
  // Our activity function
  () =>
    location.pathname === '' ||
    location.pathname === '/' ||
    location.pathname.startsWith('/home'),
);

start();
```

We are now ready to test out our first application.

Run `yarn start` in the root directory to start up the `webpack-dev-server`.

## 5. Create the navBar application

Creating and registering our **navBar** application will be very similar to the process we used to create our **home** application. The main difference is that **navBar** will export as an object with lifecycle methods and use [dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) (a Webpack 2+ feature) to obtain the application object.

:::note
You may wish to revisit [Step 3](starting-from-scratch.md#3-registering-applications) for a more detailed explanation on how to register an application.
:::

### 5.a Register navBar

Just as before, register the **navBar** application using the `registerApplication` in _single-spa.config.js_. Two items should be called out here:

- Notice that we are using `.then()` after our import in the loadingFunction. This is because this application is returning an application config object, and we access the actual **navBar** application as a property and return it.
- Recall that the activityFunction should return a truthy value when the application should be active. Since we want our **navBar** to be always be displayed, regardless of any other displayed applications, we define a function that will always return `true`.

```js {3-7} title="single-spa.config.js"
import {registerApplication, start} from 'single-spa'

registerApplication(
  'navBar',
  () => import('./src/navBar/navBar.app.js').then(module => module.navBar),
  () => true
);

...
```

:::caution
Don't forget to define a corresponding mount point for _every newly registered application_ in your root HTML file. We did this already in [Step 2.a](starting-from-scratch.md#2a-create-indexhtml) so just remember to do so for each new application in the future.
:::

### 5.b Setup NavBar

Now that we have registered our application, let's create a new _navBar/_ folder in the _src/_ directory to contain _navBar.app.js_ and _root.component.js_ files.

From the root directory:

```sh
mkdir src/navBar
touch src/navBar/navBar.app.js src/navBar/root.component.js
```

### 5.c Define NavBar application lifecycles

In _navbar.app.js_ add the following application lifecycles. This is slightly different from how we accomplished this in [Step 4.b](starting-from-scratch.md#b-application-lifecycles). For this application we are going to demonstrate how you can export an object which contains the required lifecycle methods using `single-spa-react`.

```js title="navbar.app.js"
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import NavBar from './root.component.js';

function domElementGetter() {
  return document.getElementById('navBar');
}

export const navBar = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: NavBar,
  domElementGetter,
});
```

### 5.d Build the navBar

Recall that Materialize is included so we can use the class names it provides inside of the **navBar** component. Include the following in _root.component.js_:

```js title="root.component.js"
import React from 'react';

const NavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <a className="brand-logo">single-spa</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>AngularJS</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
```

### 5.e Set up navigation

With single-spa, there are a number of options that will allow us to navigate between our separate SPAs. single-spa provides [`navigateToUrl`](api.md#navigatetourl), a utility function that allows for easy url navigation between registered applications.

:::tip
An alternative method would be to call `pushState()`, which `navigateToUrl` does internally. This method could be used in conjunction with other client-side libraries but there are some [additional considerations when using `pushState`](https://github.com/single-spa/single-spa-examples/issues/54#issuecomment-424384123).
:::

To use the function, we simply need to import it and call it with a click event, passing in each application's url (as designated by the activityFunction set in _single-spa.config.js_) as a string to the anchor tag's `href`.

```js {2,7,9,10} title="root.component.js"
import React from 'react';
import { navigateToUrl } from 'single-spa';

const NavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <a href="/" onClick={navigateToUrl} className="brand-logo">
        single-spa
      </a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <a href="/" onClick={navigateToUrl}>
            Home
          </a>
        </li>
        <li>
          <a href="/angularJS" onClick={navigateToUrl}>
            AngularJS
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
```

:::info
We have yet to build the AngularJS application that corresponds to the `/angularJS` URL so navigating to it at this point will fail.
:::

## 6. Create the angularJS application

### 6.a Setup angularJS

Create a new folder in the src directory to contain the **angularJS** application files. There are quite a few to create.

```bash
mkdir src/angularJS
cd src/angularJS
touch angularJS.app.js root.component.js root.template.html routes.js app.module.js gifs.component.js gifs.template.html
```

To demonstrate the ability to use client-side routing within applications, our AngularJS application will make use of `angular-ui-router`.

Using your package manager, add `angular`, `angular-ui-router`, and [`single-spa-angularjs`](ecosystem-angularjs.md) (the single-spa AngularJS helper) as dependencies, like so:

```sh
yarn add angular angular-ui-router single-spa-angularjs
```

:::info
Within the [single-spa ecosystem](ecosystem.md) there is a growing number of projects that help you bootstrap, mount, and unmount your applications that are written with popular frameworks.
:::

### 6.b Register angularJS as an application

Just as we did for the **home** and **navBar** applications, we start by registering the **angularJS** application in _single-spa.config.js_. Add the following:

```js title="single-spa.config.js"
registerApplication(
  'angularJS',
  () => import('./src/angularJS/angularJS.app.js'),
  () => {},
);
```

Hard-coding the activityFunction begins to get tedious so let us add a function that will simplify the matching logic for our application configuration. To do this, we've created a function that takes a string that represents the path prefix and returns a function that accepts `location` and matches whether the `location` starts with the path prefix.

```js {3-7,12} title="single-spa.config.js"
...

function pathPrefix(prefix) {
    return function(location) {
        return location.pathname.startsWith(prefix);
    }
}

registerApplication(
  'angularJS',
  () => import ('./src/angularJS/angularJS.app.js'),
  pathPrefix('/angularJS')
));

start();
```

### 6.c Set up Application Lifecycles

single-spa-angularjs another helper library that implements the necessary lifecycle hooks, which simplifies the configuration. Learn more about the [single-spa-angularjs options](ecosystem-angularjs.md#options).

Just as we did for our **home** and **navBar** applications, set up the lifecycle hooks for the **angularJS** in the _angularJS.app.js_ file.

```js title="angularJS.app.js"
import singleSpaAngularJS from 'single-spa-angularjs';
import angular from 'angular';
import './app.module.js';
import './routes.js';

const domElementGetter = () => document.getElementById('angularJS');

const angularLifecycles = singleSpaAngularJS({
  angular,
  domElementGetter,
  mainAngularModule: 'angularJS-app',
  uiRouter: true,
  preserveGlobal: false,
});

export const bootstrap = [angularLifecycles.bootstrap];

export const mount = [angularLifecycles.mount];

export const unmount = [angularLifecycles.unmount];
```

### 6.d Set up the AngularJS application

Now that we have registered our application and set up the lifecycle methods pointing to our main Angular module, we can begin to flesh out the application.

To start, we will build _app.module.js_ followed by _root.component.js_ which will set the root of the **angularJS** application using _root.template.html_ as the template.

```js title="app.module.js"
import angular from 'angular';
import 'angular-ui-router';

angular.module('angularJS-app', ['ui.router']);
```

```js title="root.component.js"
import angular from 'angular';
import template from './root.template.html';

angular.module('angularJS-app').component('root', {
  template,
});
```

```html title="root.template.html"
<div ng-style="vm.styles">
  <div class="container">
    <div class="row">
      <h4 class="light">
        Angular 1 example
      </h4>
      <p class="caption">
        This is a sample application written with Angular 1.5 and
        angular-ui-router.
      </p>
    </div>
    <div>
      <!-- These Routes will be set up in the routes.js file -->
      <a
        class="waves-effect waves-light btn-large"
        href="/angularJS/gifs"
        style="margin-right: 10px"
      >
        Show me cat gifs
      </a>
      <a
        class="waves-effect waves-light btn-large"
        href="/angularJS"
        style="margin-right: 10px"
      >
        Take me home
      </a>
    </div>
    <div class="row">
      <ui-view />
    </div>
  </div>
</div>
```

Next we will add a basic Gif Component and import it in the root component.

```js title="gifs.component.js"
import angular from 'angular';
import template from './gifs.template.html';

angular.module('angularJS-app').component('gifs', {
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
        }, 0);
      });
  },
});
```

```html title="gifs.template.html"
<div style="padding-top: 20px">
  <h4 class="light">
    Cat Gifs gifs
  </h4>
  <p></p>
  <div ng-repeat="gif in vm.gifs" style="margin: 5px;">
    <img ng-src="{{gif.images.downsized_medium.url}}" class="col l3" />
  </div>
</div>
```

### 6.e Set up in-app routing

Now that we have each of our components built out, all we have left to do is connect them. We will do this by importing both into _routes.js_.

```js title="routes.js"
import angular from 'angular';
import './root.component.js';
import './gifs.component.js';

angular.module('angularJS-app').config(($stateProvider, $locationProvider) => {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  $stateProvider
    .state('root', {
      url: '/angularJS',
      template: '<root />',
    })

    .state('root.gifs', {
      url: '/gifs',
      template: '<gifs />',
    });
});
```

## Finished!

From the root directory run `yarn start` to check out your new single-spa project.

We hope this tutorial gives you experience building and implementing micro frontends using single-spa. Review this guide periodically and use it as a reference in your projects. If you still have questions about how to use single-spa with your specific build, check out the migration tutorials: for [AngularJS](migrating-angularJS-tutorial.md) and [React](migrating-react-tutorial.md).

As always, there is more to be learned. If you want to learn how to use single-spa with Angular, Vue, or other frameworks/build systems, checkout the [`single-spa-examples`](https://github.com/single-spa/single-spa-examples) repo. Lastly, you may also want to study how to [separate applications](separating-applications.md) using single-spa.
