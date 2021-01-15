---
id: migrating-angularJS-tutorial
title: Migrating an Existing AngularJS Project
sidebar_label: AngularJS - Migrating to single-spa
---

## Project Setup

You can find the code needed to follow along [here](https://github.com/alocke12992/single-spa-angular-migration-starter). You can find the completed [code for this tutorial here](https://github.com/alocke12992/single-spa-angular-migration).

Since this is an older project, there are a few dependencies you might not currently have installed on your machine. This project requires that you have [Grunt](https://gruntjs.com/getting-started), [Bower](https://bower.io/), and [Sass](https://sass-lang.com/) installed to get up and running.

```bash
npm install -g grunt-cli
npm install -g bower
npm install -g sass
```

With those dependencies installed, you can get started by typing the following command into your terminal:

```bash
git clone git@github.com:alocke12992/single-spa-angular-migration-starter.git
cd single-spa-angular-migration-starter
yarn
cd public/assets
bower install
```

Run `grunt` in the root directory to fire up a server at `http://localhost:8080`.

## Step One: Create a single-spa config

The single spa config consists of all code that is not part of a [registered application](https://single-spa.js.org/docs/configuration.html#registeringapplications). Ideally, this only includes an HTML file and a JavaScript file that registers single-spa applications. It is best practice to keep your single spa config as small as possible and to simply defer to single-spa to manage all of the applications. The single spa config should not be doing client-side HTML rendering nor should it be responding to routing events such as `hashchange` or `popstate`. Instead, all of that functionality should be taken care of either by single-spa itself or by a single-spa application.

It is required to [register applications](https://single-spa.js.org/docs/configuration.html#registering-applications) with single-spa. This enables single-spa to know how and when to bootstrap, mount and unmount an application. We will be creating a `single-spa.config.js` file to house all of our single-spa logic.

Inside the _public/_ folder, create a _single-spa-config.js_ file.

```bash
touch public/single-spa.config.js
```

### a) importing without using import

Since we are using an older version of Angular, and we do not have access to babel, we cannot use `import` or even `require()` to obtain access to the single-spa library. One way around this is to include a `<script>` tag in the project's HTML file which will provide us access to the library. Single-spa is hosted on [https://unpkg.com/](https://unpkg.com/) and when called, creates a global variable.

In `public/index.html`, add the following script tag at the bottom of the `<head>`

```html
<head>
  <!-- ... -->
  <script src="https://unpkg.com/single-spa"></script>
</head>
```

### b) Connect the config file

To get single-spa connected, we will need to include a script tag connecting the HTML file to single-spa.config.js (we will be building the single-spa.config.js file in the next step).

Add the following `<script>` at the bottom of `index.html`

```html
<body>
  <!-- ... -->
  <script src="/assets/js/angular_drums.min.js"></script>
  <script src="single-spa.config.js"></script>
</body>
```

## Step Two: Register the application

Now that our application has access to the single-spa library, we can use `window.singleSpa` to call specific functions within the library. In order to register an application with single-spa we call the `registerApplication()` api and include the application [name](configuration#application-name), a [loadingFunction](configuration#loading-function-or-application) and an [activityFunction](configuration#activity-function).

Finally, the [start()](api.md#start) api **must** be called by your single spa config in order for applications to actually be mounted. Before `start()` is called, applications will be loaded, but not bootstrapped/mounted/unmounted.

_Note that since we are not using Babel, we cannot use the ES6 `const`, `let`, or `arrow functions`._

Start by stubbing out the registration function by adding the following in `public/single-spa.config.js`:

```js title="public/single-spa.config.js"
window.singleSpa.registerApplication(
  'drum-machine',
  loadingFunction,
  function activityFunction() {
    return true;
  },
);

window.singleSpa.start();
```

The second argument in `registerApplication`, `loadingFunction`, must be a function that returns a promise (or an ["async function"](https://ponyfoo.com/articles/understanding-javascript-async-await)). The function will be called with no arguments when it's time to load the application for the first time. The returned promise must be resolved with the application. We will be creating this in the next step.

The third argument, `activityFunction`, must be a pure function. The function is provided `window.location` as the first argument, and returns a truthy value whenever the application should be active. In this case we have set the activity function to return true. This will set our SPA to always be mounted regardless of the location. Later, if we wanted to add other SPAs to our single-spa web application, we can change the activity function to return based on `location.hash.startsWith('#/someRoute')`.

## Step Three: Setup Lifecycle Functions

Since we have registered our application, single-spa will be listening for the application to `bootstrap` and `mount`. We can use the [single-spa-angularjs](ecosystem-angularjs.md) helper library which will handle generic lifecycle hooks (bootstrap, mount and unmount) for registered angularjs applications.

To gain access to the `single-spa-angularjs` library, we will need to include another `<script>` tag in our HTML file.

Add the following in `public/index.html` at the very bottom of the `<head>`.

```html
<head>
  ...
  <script src="https://unpkg.com/single-spa"></script>
  <script src="https://unpkg.com/single-spa-angularjs"></script>
</head>
```

:::info
You may want to read more about [the importance of `<script>` tag order](https://eager.io/blog/everything-I-know-about-the-script-tag/).
:::

Now that our application has access to the `single-spa-angularjs` library, we can set up the [application lifecycle](building-applications.md#registered-application-lifecycle). Add the following code:

```js title="public/single-spa.config.js"
var drumMachineApp = window.singleSpaAngularjs.default({
  angular: window.angular,
  domElementGetter: function() {
    // A div with this id will be added to our index.html later, in step four
    return document.getElementById('drum-machine')
  },
  mainAngularModule: 'AngularDrumMachine',
  uiRouter: false,
  preserveGlobal: true,
  // This template will be built in step four
  template: '<display-machine />',
})
...
```

With our app's lifecycle function defined, we can now include it in our `registerApplication` function.

```js {4} title="public/single-spa.config.js"
...
window.singleSpa.registerApplication(
  'drum-machine',
  drumMachineApp,
  function activityFunction(location) {
    return true;
  }
)

window.singleSpa.start();
```

## Step Four: Adjust your HTML file

Since most existing SPAs are used to having control of an _index.html_ file for their css, fonts, third party script-tags, etc., it's likely that you'll have to do some work to make sure all of those keep on working when your SPA becomes an html-less application.

In this case, we are going to have to make a few adjustments to the current _index.html_ to make sure that the SPA is not mounted until single-spa tells it to.

### a) Prevent auto bootstrapping

Currently, our _index.html_ contains two hurdles we will need to overcome to allow single-spa to control the DOM. The first is the auto-bootstrap directive [`ng-app`](https://docs.angularjs.org/api/ng/directive/ngApp) at the top of the HTML file. If left in the HTML file, `ng-app` will force the entire application to automatically bootstrap and render, overriding the single-spa lifecycle functions. To fix this, we simply need to remove `ng-app` from the HTML file and then allow `single-spa-angularjs` to call the `bootstrap` function instead (recall that we set this up in [Step Three](migrating-angularJS-tutorial.md#step-three-setup-lifecycle-functions)).

In _index.html_ remove `ng-app="AngularDrumMachine`.

```html
<!DOCTYPE html>
<!-- Remove ng-app -->
<html lang="en-us">
  <!-- ... -->
</html>
```

### b) Create a Template

The second challenge is that the _index.html_ currently holds the entire application template. Since HTML will automatically render anything in the file, we will need to pull all of the SPAs logic out of the HTML file and replace it with a new `<div />` containing the `id` single-spa will use to mount the application. To do this, we will create a new template that we can then provide to the `single-spa-angularjs` lifecycle function.

Create a new directory inside of _public/assets_ called _templates/_. Then create a new template called _display-machine.template.html_.

```bash
mkdir public/assets/templates
touch public/assets/templates/display-machine.template.html
```

Then, remove lines 24 - 83 from _index.html_ and paste them inside of _display-machine.template.html_. You will also need to remove the `ng-view` directive in the `<body>` tag. Once removed, add a new `<div>` containing the id single-spa will use to mount the SPA.

_index.html_ should now look like this:

```html
<body>
  <!-- Notice that this id was set when we built the lifecycle functions in step three -->
  <div id="drum-machine" />
  <script src="/assets/js/angular_drums.min.js"></script>
  <script src="single-spa.config.js"></script>
</body>
```

The new template _display-machine.template.html_ should look like this:

```html
<a class="show-for-medium-up" href="https://github.com/dougjohnston/angular-drum-machine">
  <img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
    alt="Fork me on GitHub">
</a>
<div id="container" class="row">
  <div class="large-12 large-centered columns" ng-controller="DrumMachineCtrl as dm">
    <header>
      <h1>Angular Drum Machine</h1>
      <div id="loading-wrap" ng-show="loading">
        <div class="loading loading-outer">
          <div class="loading loading-inner"></div>
        </div>
        <h3>loading...</h3>
      </div>
    </header>

    <div id="controls" ng-hide="loading">
      <button id="play" class="button small success radius" ng-click="playLoop()">Play</button>
      <button id="pause" class="button small alert radius" ng-click="stopLoop()">Stop</button>
      <button id="reset" class="button small radius" ng-click="resetLoop()">Clear</button>
      <div id="readout">
        <span id="tempo">
          <input type="range" min="60" max="180" ng-change="updateTempo()" ng-model="tempo">
          <input id="bpmEdit" type="text" min="60" max="180" ng-change="updateTempo()" ng-blur="CloseEdit()" ng-model="tempo" style="width:50px;display:none;">
          <span id="bpm" ng-click="EditBPM()">{{tempo}} bpm</span>
        </span>
      </div>
    </div>

    <ul id="dm-grid" ng-hide="loading">
      <li class="dm-header">
        <ul>
          <li class='instrument-name'></li>
          <li class='beat-num' data-ng-repeat="i in [] | range:machine.gridLength()">
            <div ng-class="{true: 'current-beat'}[($index + 1) === machine.currentBeat()]">{{$index + 1}}</div>
          </li>
        </ul>
      </li>
      <li class="dm-row" ng-repeat="row in machine.rows()">
        <ul class="instrument">
          <li class='instrument-name'>
            {{row.getInstrument().getName()}}
            <br>
            <span>{{row.getInstrument().getDescription()}}
              <span>
          </li>
          <li data-ng-repeat="beat in row.getBeats()">
            <button class="btn" ng-class="{'btn-on':beat.isActive()}" ng-click="beat.toggle()">
              <div></div>
            </button>
          </li>
        </ul>
      </li>
    </ul>

    <footer ng-hide="loading">
      Developed by
      <a href="http://www.dojosto.com">Doug Johnston</a> using
      <a href="http://angularjs.org/">AngularJS</a>.
      <br>Drum loops provided by
      <a href="http://www.musicradar.com/news/tech/free-music-samples-download-loops-hits-and-multis-217833/65">Music Radar</a>.
    </footer>

    <aside class="msg-play show-for-large-up" ng-class="{'faded': fade_msg_play}" ng-hide="loading"></aside>
  </div>
```

### c) Create a Directive

Per the [AngularJS conventions](https://docs.angularjs.org/guide/directive), we will need to create a directive in order to "compile" our new HTML template. Let's start by creating a new _directives/_ folder inside _public/app_ to house a new _display-machine.directive.js_

```bash
mkdir public/app/directives
touch public/app/directives/display-machine.directive.js
```

Then, inside of `display-machine.directive.js` we will register our new directive on the "AngularDrumMachine" module, restrict the directive to be triggered by a class name using the `E` option, and tell it to load our template using the `templateUrl` option.

Add the following code to _public/app/directives/display-machine.directive.js_`\*:

```js
'use strict';

angular.module('AngularDrumMachine').directive('displayMachine', [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'assets/templates/display-machine.template.html',
    };
  },
]);
```

# That's it

Head back to the console and start up the server on [http://localhost:8080](http://localhost:8080) by running `grunt` from the root directory.

Inspect the page and notice that our drum-machine app is now being rendered inside of the `<div id="drum-machine"/>` we created. Technically, we are back to square one, with a fully functioning SPA. However, now that our SPA is a registered single-spa application we can take advantage of single-spa's functionality by building additional applications to mount side by side with our current AngularJS SPA.

Feel free to start using that new JavaScript framework everyone has been talking about.
