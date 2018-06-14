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
```

Run `yarn` to install `Bower`, `Grunt` and other local dependencies. From `public/assets`, run `bower install` to install runtime dependencies.

Run `grunt` to fire up a server at `http://localhost:8080`.

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

## Step One: Create a single-spa config

