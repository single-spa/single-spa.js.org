---
id: starting-from-scratch
title: Starting From Scratch
sidebar_label: Starting from scratch
---

## Project Overview
single-spa allows you to build micro frontends that coexist and can each be written with their own framework. This will allow you and your team to: 

1) Use multiple frameworks on the same page. [see the single-spa ecosystem for more info](https://single-spa.js.org/docs/ecosystem.html#docsNav)
2) Write code using a new framework, without rewriting your existing application
3) [Lazy load](https://en.wikipedia.org/wiki/Lazy_loading) code for improved initial load time

For this tutorial, we will be focused on creating a one code repo, one build single-spa application from scratch using React and Angular1(AngularJS) with Webpack. 

It is important to note that you do not need to use webpack to use single-spa. 
<!-- Would love some guidance here -->
It is simply an option that ...........? 

You can find the completed [project repo here](). Read more about [seperating applications](https://single-spa.js.org/docs/separating-applications.html) using single-spa. 

Be sure to read through the [singe-spa docs](https://single-spa.js.org/), check out the other tutorials and the [single-spa github](https://github.com/CanopyTax/single-spa) for more info.

## Step One: Project Set up 

Create a new directory to house our project, followed by a `src` folder to hold all of our micro-service applications.

```bash
mkdir single-spa-simple-example && cd single-spa-simple-example
mkdir src
```

In the root of our new project, initialize the package manager of your choice and install single-spa. For this tutorial, we will be using [yarn](https://yarnpkg.com/en/). 

```bash
yarn init
yarn add single-spa
```


### a) Set up Babel 
In order to take advantage of the latest verion of Javascript, regardless of current browser compatability, we will use [Babel](https://babeljs.io/).

Start by adding the following with your package manager: 

<!-- SHOULD I Explain each of the following babel packages I am adding or just link to the docs? -->

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

### b) Set up webpack

  *Once again, it is important to note that you do not have to use webpack in order to get up an running with single-spa. Checkout the documention on [Separating application](https://single-spa.js.org/docs/separating-applications.html) to learn more about the different ways you can use single-spa for your specific build.*

  Start by adding webpack, webpack plugins and loaders. 

*Webpack*
```bash
yarn add webpack webpack-dev-server webpack-cli --dev
```

*Plugins*
```bash
yarn add clean-webpack-plugin --dev
```

*Loaders*
```bash
yarn add style-loader css-loader html-loader --dev
```

  <!-- Should I walk through the purpose for each of the webpack plugins I am using? Or just link to the docs? -->
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
Read more about the webpack [plugins](https://webpack.js.org/plugins/) and [loaders](https://webpack.js.org/loaders/) we have used here: 

Loaders
<ul>
  <li><a href="https://webpack.js.org/loaders/html-loader/" target="_blank" rel="noopener noreferrer">html-Loader</a></li>
  <li><a href="https://webpack.js.org/loaders/style-loader/" target="_blank" rel="noopener noreferrer">style-Loader</a></li>
  <li><a href="https://webpack.js.org/loaders/css-loader/" target="_blank" rel="noopener noreferrer">css-loader</a></li>
  <li><a href="https://webpack.js.org/loaders/babel-loader/" target="_blank" rel="noopener noreferrer">babel-Loader</a></li>
</ul>

Plugins
<ul>
  <li><a href="https://www.npmjs.com/package/clean-webpack-plugin" target="_blank" rel="noopener noreferrer">CleanWebpackPlugin</a></li>
  <li><a href="https://webpack.js.org/plugins/context-replacement-plugin/" target="_blank" rel="noopener noreferral">ContextReplacementPlugin</a></li>
</ul>

## Step Two: Create the master html file
The next step is to create what single-spa calls your “root application.” Really your root application is just the stuff that initializes single-spa, and it starts with an html file. 

You’ll want to keep your root application as small as possible, since it’s sort of the master controller of everything and could become a bottleneck. You don’t want to be constantly changing both the root application and the child applications.

#### a) Create a master html

In your root directory, create a master html file. 

```bash
touch index.html
```

In order to register two applications simultaneously, we will create a `<div id="app-name"></div>` for each app so that they never try to modify the same DOM at the same time. 
For this project we will be creating the following micro-applications:

1) NavBar - *This will be a React app*

2) Home - *This will be a React app* 

3) Gifs - *This will be an Angular1 app* 

In `index.html` add the following:

```html
<!-- index.html -->
<body>
  <div id="navBar"></div>
  <div id="home"></div>
  <div id="gifs"></div>
</body>
```

### b) include scripts and stylesheets
For styling, we will be using the [Materialize-css](https://materializecss.com/) framework. To use Materialize we need to include styles and scripts in the root `index.html` file. This will allow all of our seperate applications to access the Materialize library. 

Additionally, to get single-spa connected, we will need to include a script tag connecting the html file to the [root-application](https://single-spa.js.org/docs/configuration.html#indexhtml-file) via `single-spa.config.js` file (we will be building this in the next step).

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
    <div id="gifs"></div>

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

  It is required to [register your applications](https://single-spa.js.org/docs/configuration.html#registering-applications) with single-spa. This enables single-spa to know how and when to initiate, load, mount and unmount an application. 
  
  As you saw earlier, we have already set up webpack and our master html file to look for registration inside of the single spa config. This will allow hierarchy to be maintained between the applications.

  From the root directory, create a new folder called `root-application` then create your `single-spa-config.js` file. 
  ```bash
  # from the root directory
  mkdir root-application
  touch root-application/single-spa-config.js
  ```
  Now that we have our single-spa-config.js file, we can begin to register applications. In order to register an application with single-spa we call the `registerApplication()` api and include the application `name`, a `loadingFunction` and an `activityFunction`. 

  In `single-spa-config.js`, start by importing the `registerApplication` and `start` functions. 

  ```js
  // single-spa-config.js
  import {registerApplication, start} from 'single-spa';
```

  The start() api must be called by your single spa config in order for applications to actually be mounted. Before start is called, applications will be loaded, but not bootstrapped/mounted/unmounted. Learn more about the [start()](https://single-spa.js.org/docs/configuration.html#calling-singlespastart) api here.

With our functions imported, we can now register an application with single-spa and call `start()`. Lets start by creating a 'home' application.

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
The third argument to registerApplication, `activityFunction`, must be a pure function. The function is provided window.location as the first argument, and returns a truthy value whenever the application should be active. Most commonly, the activity function determines if an application is active by looking at window.location/the first param.
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
We will be using React to create the home component. Using your package manager, add `react`, `react-dom`, and the sinlge-spa React helper [single-spa-react](https://single-spa.js.org/docs/ecosystem.html).

```bash
yarn add react react-dom single-spa-react
```

At the beginning of the tutorial we created a `src` folder to house all of our applications. It is this folder that we will house each of our seperate applications. These app folders will each contain an application file to control the bootstrap, mount and unmount functions and a `root` component. Read more about the [registered application lifecycle](https://single-spa.js.org/docs/building-applications.html#registered-application-lifecycle). 

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

Since we have registered our applicaiton, single-spa will be listening for the `home` app to bootstrap and mount. We will set this up in `home.app.js`. 

We start by importing our dependencies and, using [single-spa-react](https://github.com/CanopyTax/single-spa-react), we can use the generic React lifecycle hooks. 

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
With our imports estaplished, we can create the required lifecycle functions: 

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
Head back to the root-application folder and in single-spa-config.js we need to add a [loading function](https://single-spa.js.org/docs/configuration.html#loading-function) for our new home app.
With [webpack 2+](https://webpack.js.org/), we can take advantage of its support for [code splitting](https://webpack.js.org/guides/code-splitting/) with [import()](https://webpack.js.org/api/module-methods/#import) in order to easily lazy-load registered applications when they are needed.

```js
// single-spa-config.js
import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home', 
  // Our loading function 
  () => import('../home/home.app.js'),
  // Our activity function
  () => location.pathname === "" || location.pathname === "/")
);

start()
```  

We are now ready to test out our first application. 

From the root directory, start the project by running the following:

```bash
yarn watch
```

