---
id: migrating-angular-tutorial
title: Migrating an Existing Angular Project
sidebar_label: Angular - Migrating an Existing Project
---

# Project Overview

single-spa allows you to build micro frontends that coexist and can each be written with their own framework. This will allow you and your team to:

1. Use multiple frameworks on the same page. see the single-spa ecosystem for more info

2. Write code using a new framework, without rewriting your existing application

3. Lazy load code for improved initial load time.

Single-spa can be used with just about any build system or javascript framework, but this tutorial will focus on migrating an existing legacy AngularJS into a single-spa registered application. Once completed, you'll be able to take advantage of the flexibility and freedmon that single-spa can offer by adding new SPAs in what ever build system or Javascript framework you'd like.

If you'd like to learn how to build a single-spa web application from scratch, check out [this tutorial](https://single-spa.js.org/docs/starting-from-scratch.html). If you'd like to learn how to use single-spa with Angular 2+, Vue, or other frameworks, [try these tutorials](https://github.com/CanopyTax/single-spa-examples).

Be sure to read through the [single-spa docs](https://single-spa.js.org/), check the [single-spa github](https://github.com/CanopyTax/single-spa) and the [help section](https://single-spa.js.org/help.html) for more support.

## Project Setup

You can find the code needed to follow along [here](https://github.com/alocke12992/single-spa-angular-migration-starter). You can find the completed [code for this tutorial here](https://github.com/alocke12992/single-spa-angular-migration). Read more about [separating applications](https://single-spa.js.org/docs/separating-applications.html) using single-spa.

Since this is an older project, there are a few dependancies you might not currently have installed on your machine. This project requires that you have [Grunt](https://gruntjs.com/getting-started), [Bower](https://bower.io/), and [Sass](https://sass-lang.com/) installed to get up and running.

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

The single spa config consists of all code that is not part of a [registered application](https://single-spa.js.org/docs/configuration.html#registeringapplications). Ideally, this only includes an html file and a javascript file that registers single-spa applications. It is best practice to keep your single spa config as small as possible and to simply defer to single-spa to manage all of the applications. The single spa config should not be doing client-side html rendering nor should it be responding to routing events such as `hashchange` or `popstate`. Instead, all of that functionality should be taken care of either by single-spa itself or by a single-spa application.

It is required to [register your applications](https://single-spa.js.org/docs/configuration.html#registering-applications) with single-spa. This enables single-spa to know how and when to initiate, load, mount and unmount an application. We will be creating a `single-spa.config.js` file to house all of our single-spa logic.

Inside the `public` folder, create a `single-spa-config.js` file.

```bash
touch public/single-spa.config.js
```

### a) importing without using import

Since we are using an older version of Angular, and we do not have access to babel, we cannot use `import` or even `require()` to obtain access to the single-spa library. One way around this is to include a `<script>` tag in the project's html file which will provide us access to the library. Single-spa is hosted on [https://unpkg.com/](https://unpkg.com/) and when called, creates a global variable.

In `public/index.html`, add the following script tag at the bottom of the `<head>`

```html
<head>
<!-- ... -->
<script src="https://unpkg.com/single-spa"></script>
</head>
```

### b) Connect the config file

To get single-spa connected, we will need to include a script tag connecting the html file to the single-spa.config.js file (we will be building this in the next step).

Add the following `<script>` at the bottom of `index.html`

```html
<body>
  <!-- ... -->
  <script src="/assets/js/angular_drums.min.js"></script>
  <script src="single-spa.config.js"></script>
</body>
```

## Step Two: Register the application

With our project now having access to the `single-spa` library, we can now register our application by using `window.singleSpa`. In order to register an application with single-spa we call the `registerApplication()` api and include the application [name](https://single-spa.js.org/docs/configuration.html#application-name), a [loadingFunction](https://single-spa.js.org/docs/configuration.html#loading-function-or-application) and an [activityFunction](https://single-spa.js.org/docs/configuration.html#activity-function).

Note that since we are not using babel, we cannot use the ES6 `const`, `let`, or `arrow functions`.

Start by stubbing out the registration function by adding the following in `public/single-spa.config.js`:

```js
// public/single-spa.config.js
window.singleSpa.registerApplication('drum-machine', loadingFunction, function activityFunction(location) {
  return true;
})

window.singleSpa.start();
```

The second argument in `registerApplication`, `loadingFunction`, is the function we will write in the next step when we create the application's `lifecycles`.

The third argument, `activityFunction`, takes a parameter of location and returns true. This will set our SPA to always be mounted regardless of the location. Later, if we wanted to add other SPAs to our single-spa web application, we can change the activity function to return based on `location.hash.startsWith('#/someroute').

The [start() api](https://single-spa.js.org/docs/api.html#start) **must** be called by your single spa config in order for applications to actually be mounted. Before start is called, applications will be loaded, but not bootstrapped/mounted/unmounted.

## Step Three: Setup Lifecycle Functions

Since we have registered our applicaiton, single-spa will be listening for the application to `bootstrap` and `mount`. We can use the [single-spa-angular1](https://single-spa.js.org/docs/ecosystem-angular1.html) helper library which will handle generic lifecycle hooks (bootstrap, mount and unmount) for registered angular1 applications.

To gain access to the `single-spa-angular1` library, we will need to include another `<script>` tag in our html file.

Add the following in `public/index.html` at the very bottom of the `<head>`.

```html
<head>
<!-- ... -->
<script src="https://unpkg.com/single-spa"></script>
<script src="https://unpkg.com/single-spa-angular1"></script>
</head>
```

*[Read more](https://eager.io/blog/everything-I-know-about-the-script-tag/) about the importance of `<script>` tag order.

Now that our application has access to the `single-spa-angular1` library, we can set up the application lifecycle function.

Add the following to `public/single-spa.config.js`

```js
// public/single-spa.config.js
var drumMachineApp = window.singleSpaAngular1.default({
  angular: window.angular,
  domElementGetter: function () {
    // Note that we will need to add a div with this id to our index.html, we will do this in step four
    return document.getElementById('drum-machine')
  },
  mainAngularModule: 'AngularDrumMachine',
  uiRouter: false,
  preserveGlobal: true,
  // We will be building this template in step four
  template: '<display-machine />',
})

window.singleSpa.registerApplication('drum-machine', loadingFunction, function activityFunction(location) {
  return true;
  })

window.singleSpa.start();  
```

With our lifecycle function defined, we can now include it in our `registerApplication` function.

```js
// public/single-spa.config.js
var drumMachineApp = window.singleSpaAngular1.default({
  angular: window.angular,
  domElementGetter: function () {
    // Note that we will need to add a div with this id to our index.html, we will do this in step four
    return document.getElementById('drum-machine')
  },
  mainAngularModule: 'AngularDrumMachine',
  uiRouter: false,
  preserveGlobal: true,
  // We will be building this template in step four
  template: '<display-machine />',
})

window.singleSpa.registerApplication('drum-machine', drumMachineApp, function activityFunction(location) {
  return true;
  })

window.singleSpa.start();
```

## Step Four: Adjust your html file

Since most existing SPAs are used to having an index.html file for their css, fonts, third party script-tags, etc., it's likely that you'll have to do some work to make sure all of those keep on working when your SPA becomes an html-less application. In this case, we are going to have to make a few adjustments to the current index.html to make sure that the SPA is not mounted until single-spa tells it to.

### a) Prevent auto bootstrapping

Currently, our index.html contains two large hurdles we will need to overcome to allow single-spa to control the DOM. The first is the auto-bootstrap directive [ng-app](https://docs.angularjs.org/api/ng/directive/ngApp) at the top of the html file. If left in the html file, `ng-app` will force the entire applicaiton will be automatically bootstrapped and rendered, overriding the single-spa lifecycle functions. To fix this, we simply need to remove `ng-app` from the html file and then allow `single-spa-angular1` to call the `bootstrap` function instead (recall that we set this up in step three).

In `index.html` remove `ng-app="AngularDrumMachine`.

```html
<!DOCTYPE html>
<!-- Remove ng-app -->
<html lang="en-us">
<!-- ... -->
</html>
```

### b) Create a Template

The second challenge is that the `index.html` currently holds the entire application template. Since html will automatically render anything left in the file, we will need to pull all of the SPAs logic out of the html file and replace it with a new `<div />` containing the `id` single-spa will use to mount the application. To do this, we will create a new template that we can then provide to the single-spa-angular1 lifecycle function.

Create a new directory inside of `public/assets` called `templates`. Then create a new template called `display-machine.template.html`.

```bash
mkdir public/assets/templates
touch public/assets/templates/display-machine.template.html
```

Then, remove lines 24 - 83 from `index.html` and paste them inside of `display-machine.template.html`. You will also need to remove the `ng-view` directive in the `<body>` tag. Once removed, add a new `<div>` containing the id single-spa will use to mount the SPA.

the `<body>` of index.html` should now look like this:

```html
<body>
  <!-- Notice that this id was set when we built the lifecycle functions in step three -->
  <div id="drum-machine" />
  <script src="/assets/js/angular_drums.min.js"></script>
  <script src="single-spa.config.js"></script>
</body>
```

### c) Create a Directive

Per [angularJS conventions](https://docs.angularjs.org/guide/directive), we will need to create a directive in order to "compile" our new html template. Lets start by creating a new `directives` folder inside `public/app` to house a new `display-machine.directive.js`

```bash
mkdir public/app/directives
touch public/app/directives/display-machine.directive.js`
```

Then, inside of `display-machine.directive.js` we will register our new directive on the "AngularDrumMachine" module, restrict the directive to be triggered by a class name using the `E` option, and tell it to load our template using the `templateUrl` option.

```js
// public/app/directives/display-machine.directive.js
'use strict';

angular
.module('AngularDrumMachine')
.directive('displayMachine', [function() {
  return {
    restrict: 'E',
    templateUrl: 'assets/templates/display-machine.template.html',
  }
}])
```

# That's it

Head back to the console and start up the server on `localhost:8080` by running `grunt`.

Inspect the page and notice that our drum-machine app is now being rendered inside of the `<div />` we created. Technically, we are back to square one, with a fully functioning SPA. However, now that our SPA is a registered single-spa application we can take advantage of single-spa by building additional applicartions to mount side by side with our current AngularJS SPA. Feel free to start using that new Javascript framework everyone has been talking about.
