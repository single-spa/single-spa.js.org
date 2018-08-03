---
id: starting-from-scratch
title: Starting From Scratch
sidebar_label: Starting from scratch
---

single-spa allows you to build micro frontends that coexist and can each be written with their own framework. This will allow you and your team to:

1) Use multiple frameworks on the same page. [See the single-spa ecosystem for more info](ecosystem.md#docsNav)
2) Write code using a new framework, without rewriting your existing application
3) [Lazy load](https://en.wikipedia.org/wiki/Lazy_loading) code for improved initial load time.

Single-spa can be used with just about any build system or javascript framework, but this tutorial will focus on creating a web app with [Webpack](https://webpack.js.org/), [React](https://reactjs.org/), and [AngularJS](https://angularjs.org/). Our tutorial puts everything into a single code repository, but it is also possible to have [separate code repositories](separating-applications.md#option-3-dynamic-module-loading) for each of your applications.

You can find the [code for this tutorial here](https://github.com/alocke12992/single-spa-simple-example).

If you'd like to learn how to use single-spa with Angular, Vue, or other frameworks, [checkout this example](https://github.com/CanopyTax/single-spa-examples). And if you'd rather use a different build system instead of webpack, check out [this example](https://github.com/me-12/single-spa-portal-example) Read more about [separating applications](separating-applications.md) using single-spa.

Be sure to read through the [single-spa docs](https://single-spa.js.org/), check the [single-spa github](https://github.com/CanopyTax/single-spa) and the [help section](https://single-spa.js.org/help.html) for more support.

## Step One: Project Set up

Create a new directory to house our project, followed by a `src` folder to hold all of our micro-service applications. Then, the root of our new project, initialize the package manager of your choice and install single-spa. For this tutorial, we will be using [yarn](https://yarnpkg.com/en/).

```bash
mkdir single-spa-simple-example && cd single-spa-simple-example
mkdir src
yarn init              # or npm init
yarn add single-spa    # or npm install --save single-spa
```

### a) Setup Babel

We will be using [Babel](https://babeljs.io/) to compile our code. Run the following command to install the necessary dependencies:

```bash
yarn add babel-core babel-plugin-syntax-dynamic-import babel-plugin-transform-object-rest-spread babel-preset-env babel-preset-latest babel-preset-react --dev
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
      "syntax-dynamic-import",
      "transform-object-rest-spread"
    ]
  }
```

If you would like to learn more about what each of these things are doing, check out the [Babel docs](https://babeljs.io/docs/setup/).

### b) Setup webpack

*Once again, it is important to note that you do not have to use webpack in order to get up and running with single-spa. Checkout the documentation on [Separating Applications](separating-applications.md) to learn more about the different ways you can use single-spa for your specific build.*

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

*Webpack Loaders*

```bash
yarn add style-loader css-loader html-loader babel-loader --dev
```

* [html-Loader](https://webpack.js.org/loaders/html-loader/)
* [style-loader](https://webpack.js.org/loaders/style-loader/)
* [css-loader](https://webpack.js.org/loaders/css-loader/)
* [babel-Loader](https://webpack.js.org/loaders/babel-loader/)

*Webpack.config.js*

In the root directory create your `webpack.config.js` file. Then add the following code to set up your webpack config:

```js
// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
      // Set the single-spa config as the project entry point
        'single-spa.config': 'single-spa.config.js',
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
              // This plugin will allow us to use html templates when we get to the angularJS app
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
    ],
    devtool: 'source-map',
    externals: [],
    devServer: {
        historyApiFallback: true
    }
};
```

### c) Modify the package.json

The last step in our project set up is to include a couple scrips in our package.json so we can take advantage of the webpack-dev-server. Add the following to your `package.json`:

```js
//package.json
"scripts": {
  "start": "webpack-dev-server --open",
  "build": "webpack --config webpack.config.js -p"
},
```

## Step Two: Create the master html file

The next step is to create what single-spa calls your `single-spa config`. Really the single-spa config file is just the stuff that initializes single-spa, but it will require us to start with an html file.

You’ll want to keep your single-spa config as small as possible, since it’s sort of the master controller of everything and could become a bottleneck. You don’t want to be constantly changing both the single-spa config and the child applications.

### a) Create a master html

In order to register two applications simultaneously with single-spa, we will create a `<div id="app-name"></div>` for each app so that they never try to modify the same DOM at the same time.

For this project we will be creating the following micro-applications:

1. Home - *This will be a React app using [React Router](https://reacttraining.com/react-router/)*

2. NavBar - *This will be a React app*

3. AngularJS - *This will be an AngularJS app using [angular-ui-router](https://ui-router.github.io/ng1/)*

 In your root directory create a master html file called `index.js` then add the following:

```html
<!-- index.html -->
<body>
  <div id="navBar"></div>
  <div id="home"></div>
  <div id="angularJS"></div>
</body>
```

### b) Include scripts and stylesheets

For styling, we will be using the [Materialize-css](https://materializecss.com/) framework. To use Materialize we need to include styles and scripts in the root `index.html` file. This will allow all of our separate applications to access the Materialize library.

Additionally, to get single-spa connected, we will need to include a script tag connecting `index.html` to the [single-spa.config.js](single-spa-config.md#indexhtml-file) file (we will be building this in the next step). Since we are using webpack, we use the `/dist/` folder as our entry to the single-spa config.

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
    <div id="angularJS"></div>

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

  It is required to [register applications](single-spa-config.md#registering-applications) with single-spa. This enables single-spa to know how and when to `bootstrap`, `mount` and `unmount` an application.

  As you saw earlier, we have already set up webpack and our master html file to look for registration inside of the single spa config. This will allow hierarchy to be maintained between the applications.

  Create a new file called `single-spa.config.js` in the root directory so we can begin to register our applications. In order to register an application with single-spa we call the `registerApplication()` api and include the application `name`, a `loadingFunction` and an `activityFunction`.

  In `single-spa.config.js`, start by importing the `registerApplication` and `start` functions. The start() api must be called by your single spa config in order for applications to actually be mounted. Before start is called, applications will be loaded, but not bootstrapped/mounted/unmounted. Learn more about the [start()](single-spa-config.md#calling-singlespastart) api here.

  ```js
  // single-spa.config.js
  import {registerApplication, start} from 'single-spa';
```

With our functions imported, we can now register an application with single-spa and call `start()`. Let's start by registering the `Home` application.

```js
// single-spa.config.js
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

The second argument in `registerApplication`, `loadingFunction`, must be a function that returns a promise (or an ["async function"](https://ponyfoo.com/articles/understanding-javascript-async-await)). The function will be called with no arguments when it's time to load the application for the first time. The returned promise must be resolved with the application. We will come back to this in [Step 4.d](starting-from-scratch.md#d-connect-to-single-spa-config) after creating the `Home` application.

The third argument to `registerApplication()`, `activityFunction`, must be a pure function. The function is provided window.location as the first argument, and returns a truthy value whenever the application should be active. Most commonly, the activity function determines if an application is active by looking at window.location/the first param.

Since `home` will be our root component, we can set the `activityFunction` to be our root path.

```js
// single-spa.config.js
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

In the next step we will be using `react-router-dom` to implement routing within our `Home` app. To handle this we need to tell the `activityFunction` to also look for the path prefix `/home`. Add the following to `single-spa.config.js`:

```js
// single-spa.config.js
import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function
  loadingFunction,
  // Our activity function
  () => location.pathname === "" || location.pathname === "/" || location.pathname.startsWith('/home'))
  );

  start()
```

## Step Four: Create the Home application

### a) Folder setup

We will be using React with [this React Router example](https://reacttraining.com/react-router/web/example/animated-transitions) project to create the `Home` SPA. Using your package manager, add `react`, `react-dom`, `react-router-dom` and the single-spa React helper [single-spa-react](ecosystem-react.md).

```bash
yarn add react react-dom single-spa-react react-router-dom react-transition-group
```

At the beginning of the tutorial we created a `src` folder to house all of our applications. It is this folder that will house each of our separate applications. These app folders will each contain an application file to control the bootstrap, mount and unmount functions and a `root` component. Read more about the [registered application lifecycle](building-applications.md#registered-application-lifecycle).

Start by adding a `home` folder inside of our `src` directory to house our home application. Then inside of `home` we will create two files: `home.app.js` and `root.component.js`.

```bash
cd src/home/
touch home.app.js root.component.js
```

Your file tree should look like this:

```bash
single-spa-simple-example

├── node_modules
├── package.json
├── .gitignore
└── src
    ├── home
        ├── home.app.js
        ├── root.component.js
├── .babelrc
├── index.html
├── single-spa.config.js
├── webpack.config.js
├── yarn-error.log
├── yarn.lock
└── README.md
```

### b) Application lifecycles

Since we have registered our application, single-spa will be listening for the `Home` app to bootstrap and mount. We will set this up in `home.app.js`.

We start by importing our dependencies and, using [single-spa-react](ecosystem-react.md), we can use the generic React lifecycle hooks.

Finally, we will use the `domElementGetter()` function to return a DOMElement where the `Home` application will be bootstrapped, mounted, and unmounted.

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

Now that we have our application registered, and hooked up to single-spa with lifecycle methods, we can build our React app. Head to React Router and grab the code from the [Animated Transitions](https://reacttraining.com/react-router/web/example/animated-transitions) example project. To handle routing, we will need to add the path prefix `/home` we set up in our activity function in [Step 3](starting-from-scratch.md#step-three-registering-an-app). After pasting the code into `home/root.component.js`, add the path prefix `/home`:

```js
import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

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
  <Router>
    <Route
      render={({ location }) => (
        <div style={styles.fill}>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/home/hsl/10/90/50" />}
          />

          <ul style={styles.nav}>
            <NavLink to="/home/hsl/10/90/50">Red</NavLink>
            <NavLink to="/home/hsl/120/100/40">Green</NavLink>
            <NavLink to="/home/rgb/33/150/243">Blue</NavLink>
            <NavLink to="/home/rgb/240/98/146">Pink</NavLink>
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
                  <Route exact path="/home/hsl/:h/:s/:l" component={HSL} />
                  <Route exact path="/home/rgb/:r/:g/:b" component={RGB} />
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
    <Link {...props} style={{ color: "inherit" }} />
  </li>
);

const HSL = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.hsl,
      background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
    }}
  >
    hsl({params.h}, {params.s}%, {params.l}%)
  </div>
);

const RGB = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.rgb,
      background: `rgb(${params.r}, ${params.g}, ${params.b})`
    }}
  >
    rgb({params.r}, {params.g}, {params.b})
  </div>
);

const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};

styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};

styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

export default AnimationExample;
```

### d) Connect to single-spa config

Head back to single-spa.config.js we need to add a [loading function](single-spa-config.md#loading-function) for our new home app. It is important to note that you do not have to use a `loading function` and instead can simply pass in the application config object (the lifecycle functions we built in [Step 4.b](starting-from-scratch.md#b-application-lifecycles)) directly to the `registerApplication` function. However, with [webpack 2+](https://webpack.js.org/), we can take advantage of its support for [code splitting](https://webpack.js.org/guides/code-splitting/) with [import()](https://webpack.js.org/api/module-methods/#import) in order to easily lazy-load registered applications when they are needed. Think about your project's build when deciding which route to take.

```js
// single-spa.config.js

import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function
  () => import('./src/home/home.app.js'),
  // Our activity function
  () => location.pathname === "" || location.pathname === "/" || location.pathname.startsWith('/home'));
);

start()
```  

We are now ready to test out our first application.

Run `yarn start` in the root directory to start up the `webpack-dev-server`.

## Step Five: Create a NavBar

Creating and registering our NavBar application will be very similar to the process we used to create our `home` app. However, in this case we are going to demonstrate how you can export your SPA as an object with lifecycle methods, then use the code splitting feature Webpack2+ offers to obtain the application object from the returned promise.

Refer back to [Step Three](starting-from-scratch.md#step-three-registering-an-app) for a more detailed explanation on how to register an application.

### a) Register the Application

Just as we did before, we need to register our navBar using the `registerApplication()` api in our `single-spa.config.js` file. This time we will use `.then()` to obtain the application:

```js
// single-spa.config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('./src/navBar/navBar.app.js').then( module => module.navBar), activityFunction);
registerApplication('home', () => import('./src/home/home.app.js'), () => location.pathname === "" || location.pathname === "/" || location.pathname.startsWith('/home'));

start();
```

Recall that the `activityFunction` is provided `window.location` as the first argument, and returns a truthy value whenever the application should be active.
Since we want our navBar to persist regardless of any other mounted SPAs, we will set the `activityFunction` to return a value of `true`.

```js
// root-application/single-spa.config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('./src/navBar/navBar.app.js').then( module => module.navBar), () => true);
registerApplication('home', () => import('./src/home/home.app.js'), () => location.pathname === "" || location.pathname === "/" || location.pathname.startsWith('/home'));

start();
```

*NOTE: It is important to remember to include your newly registered application as a div in your root html file. We did this already in [Step 2.a](starting-from-scratch.md#a-create-a-master-html). Don't forget to do this when you start adding new applications*

Now that we have registered our applicaiton, we can create a new `navBar` folder in the `src` directory to contain the `navBar.app.js` and `root.component.js` files.

From the root directory:

```bash
mkdir src/navBar
touch src/navBar/navBar.app.js src/navBar/root.component.js
```

### b) Set up the NavBar lifecycles

In `navbar.app.js` add the following application lifecycles. Although we could do the same thing we did back in [Step 4.b](starting-from-scratch.md#b-application-lifecycles), for this application we are going to demonstrate how you can export an object which contains the required lifecycle methods thanks to `single-spa-react`. Then we can use the object by importing the file as we built in the [previous step](starting-from-scratch.md#a-register-the-application)).

```js
// src/navBar/navBar.app.js

import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import NavBar from './root.component.js';

export const navBar = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: NavBar,
  domElementGetter,
})

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
            <li><a>AngularJS</a></li>
          </ul>
        </div>
      </nav>
    )
  }  
}

export default NavBar
```

### d) Set up navigation

With single-spa, there are a number of options that will allow us to navigate between our separate SPAs. One method would be to call `pushState()`. Alternatively, we can call [single-spa.navigateToUrl](api.md#navigatetourl).

To use the function, we simply need to import it and call it with a click event, passing in each Application's url (as designated by the activityFunction set in `single-spa.config.js`) as a string to the anchor tag's `href`.

```js
// src/navBar/root.component.js

import React from 'react'
import {navigateToUrl} from 'single-spa'

const NavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <a href="/" onClick={navigateToUrl} className="brand-logo">single-spa</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/" onClick={navigateToUrl}>Home</a></li>
        {/* Note that we still need to build our AngularJS App before this link will work */}
        <li><a href="/angularJS" onClick={navigateToUrl}>AngularJS</a></li>
      </ul>
    </div>
  </nav>
)

export default NavBar
```

## Step Six: Create an AngularJS app

### a) Install Dependencies

To demonstrate routing within a specific SPA, our AngularJS application will make use of `angular-ui-router`.

Using your package manager, add `angular`, `angular-ui-router`, and the single-spa AngularJS helper [single-spa-angularjs](ecosystem-angularjs.md).

Run the following command to install the necessary dependencies:

```bash
yarn add angular angular-ui-router single-spa-angularjs
```

### b) Register the Application

Just as we did for the Home and NavBar applications, we start by registering the Angular SPA in `src/root-application/single-spa.config.js`

```js
// single-spa.config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('./src/navBar/navBar.app.js').then(mod => mod.navBar), () => true);
registerApplication('home', () => import('./src/home/home.app.js'), () => location.pathname === "" || location.pathname === "/" || location.pathname.startsWith('/home'));
registerApplication('angularJS', () => import ('./src/angularJS/angularJS.app.js'), activityFunction);

start();
```

Instead of hard coding the activityFunction, we will create a function that will allow us to dynamically add new SPAs in the future. To do this, write a function that takes a path prefix as string and returns a location whose path name starts with the provided prefix.

```js
// single-spa.config.js

import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('./src/navBar/navBar.app.js').then(mod => mod.navBar), () => true);
registerApplication('home', () => import('./src/home/home.app.js'), () => location.pathname === "" || location.pathname === "/" || location.pathname.startsWith('/home'));
registerApplication('angularJS', () => import ('./src/angularJS/angularJS.app.js'), pathPrefix('/angularJS'));

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
<div id='angularJS'></div>
```

With the application registered, we can create a new folder in the src directory to contain the AngularJS application files.

From the root directory:

```bash
mkdir src/angularJS
cd src/angularJS
touch angularJS.app.js root.component.js root.template.html routes.js app.module.js gifs.component.js gifs.template.html
```

### c) Set up the Application Lifecycles

Within the [single-spa ecosystem](ecosystem.md) there is a growing number of projects that help you bootstrap, mount, and unmount your applications that are written with popular frameworks. In this case we will use single-spa-angularjs to take advantage of the generic lifecycle hooks. Learn more about the various [options](ecosystem-angularjs.md#options) single-spa-angularjs offers.

Just as we did for our home and navBar SPAs, set up the lifecycle hooks for the AngularJS SPA in the `angularJS.app.js` file.

```js
// src/angularJS/angularJS.app.js

import singleSpaAngularJS from 'single-spa-angularjs';
import angular from 'angular';
import './app.module.js'
import './routes.js';

// domElementGetter is required by single-spa-angularjs
const domElementGetter = () => document.getElementById('angularJS');

const angularLifecycles = singleSpaAngularJS({
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

To start, we will build `app.module.js` followed by `root.component.js` which will set the root of our AngularJS application using a template html file.

*app.module.js*

```js
// src/angularJS/app.module.js
import angular from 'angular';
import 'angular-ui-router';

angular
.module('angularJS-app', ['ui.router']);
```

*root.component.js*

```js
// src/angularJS/root.component.js
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
<!-- src/angularJS/root.template.html -->
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
      <a class="waves-effect waves-light btn-large" href="/angularJS/gifs" style="margin-right: 10px">
        Show me cat gifs
      </a>
      <a class="waves-effect waves-light btn-large" href="/angularJS" style="margin-right: 10px">
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
// src/angularJS/gifs.component.js
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
<!-- src/angularJS/gifs.template.html -->

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

Now that we have each of our components built out, all we have left to do is connect them. We will do this by importing both into `routes.js`.

```js
// src/angularJS/routes.js

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
    url: '/angularJS',
    template: '<root />',
  })

  .state('root.gifs', {
    url: '/gifs',
    template: '<gifs />',
  })
});
```

# And That’s It

From the root directory run `yarn start` to check out your new single-spa project.

Hopefully, this gives you a solid idea of how to build and implement micro frontends using single-spa. If you still have questions about how to use single-spa with your specific build, check out the migrating existing applications tutorials; [AngularJS](migrating-angularJS-tutorial.md) and [React](migrating-react-tutorial.md).
