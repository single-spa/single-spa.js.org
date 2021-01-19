---
id: ecosystem-angular
title: single-spa-angular
sidebar_label: Angular
---

## Introduction

[single-spa-angular](https://github.com/single-spa/single-spa-angular/) is a library for creating Angular microfrontends.

Each microfrontend ([single-spa application](/docs/building-applications.html)) is an Angular CLI project that can
use its own version of Angular and be deployed separately from any other. They all come together into a single
web page where one or more single-spa applications is active at any time.

The documentation here is extensive, so use the sidenav on the right. 👉👉👉

### Community

Join the `#angular` channel in [single-spa's slack workspace](https://join.slack.com/t/single-spa/shared_invite/zt-l2iljnpv-pW_o92mMpMR8RWfIOI6pTQ).

### Demo

https://coexisting-angular-microfrontends.surge.sh

### Starter repo

https://github.com/joeldenning/coexisting-angular-microfrontends

### Contributing

For instructions on how to test this locally before creating a pull request, see the [Contributing docs](https://github.com/single-spa/single-spa-angular/blob/master/CONTRIBUTING.md).

## Angular versions

### Angular 1 (AngularJS)

AngularJS is supported by [single-spa-angularjs](https://github.com/single-spa/single-spa-angularjs), instead of single-spa-angular.
See [AngularJS docs](/docs/ecosystem-angularjs.html).

### Angular 2

Angular 2 is supported by single-spa-angular.

The [single-spa-angular schematics](#schematics) are not supported by Angular 2, so you'll have to
follow the [steps for manual installation](#manual-installation). The
[single-spa helpers](#the-single-spa-helpers) work with Angular 2.

### Angular 3

Angular 3 [never existed](https://www.infoworld.com/article/3150716/forget-angular-3-google-skips-straight-to-angular-4.html).

### Angular 4

Angular 4 is supported by single-spa-angular.

The [single-spa-angular schematics](#schematics) are not supported by Angular 4, so you'll have to
follow the [steps for manual installation](#manual-installation). The
[single-spa helpers](#the-single-spa-helpers) work with Angular 4.

### Angular 5

Angular 5 is supported by single-spa-angular.

The [single-spa-angular schematics](#schematics) are not supported by Angular 5, so you'll have to
follow the [steps for manual installation](#manual-installation). The
[single-spa helpers](#the-single-spa-helpers) work with Angular 5.

### Angular 6

Angular 6 is supported by single-spa-angular.

The [single-spa-angular schematics](#schematics) are not supported by Angular 6, so you'll have to
follow the [steps for manual installation](#manual-installation). The
[single-spa helpers](#the-single-spa-helpers) work with Angular 6.

### Angular 7

Angular 7 is supported by single-spa-angular.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 7. Follow the [Angular CLI instructions](#angular-cli).

Note that the schematics for Angular 7 use an [Angular Builder](#angular-builder) that is no longer
used in the Angular 8 schematics.

### Angular 8

Angular 8 is supported by single-spa-angular.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 8. Follow the [Angular CLI instructions](#angular-cli).

Note that the schematics for Angular 8 [do not use the custom Angular builder](#angular-builder), but instead use
[@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack).

## Angular CLI

You may use Angular CLI and single-spa together with any version of Angular. However, the [Angular CLI schematics](#schematics)
only work if you're using Angular >= 7. If you're using an older version of Angular, follow
the [manual installation instructions](#manual-installation).

### Installation

First, create an angular application. This requires installing [Angular CLI](https://cli.angular.io/). Note that the `--prefix`
is important so that when you have multiple angular applications their component selectors won't have the same names.

```sh
ng new my-app --routing --prefix my-app
cd my-app
```

In the root of your Angular CLI application run the following:

```sh
ng add single-spa-angular
```

### Schematics

[Angular schematics](https://angular.io/guide/schematics) are processed when you run `ng add single-spa-angular`.

The single-spa-angular schematics perform the following tasks:

- Install single-spa-angular.
- Generate a `main.single-spa.ts` in your project `src/`.
- Generate `single-spa-props.ts` in `src/single-spa/`
- Generate `asset-url.ts` in `src/single-spa/`
- Generate an EmptyRouteComponent in `src/app/empty-route/`, to be used in app-routing.module.ts.
- Add an npm script `npm run build:single-spa`.
- Add an npm script `npm run serve:single-spa`.
- For Angular 7 only, create a new entry in the project's architect called `single-spa`, which is
  a preconfigured [Angular Builder](#angular-builder).

### Finish installation

Now you must [configure routes](#configure-routes). Then you can [serve](#serving) and [build](#building).

## Manual Installation

The manual installation instructions should be used if you are not using Angular CLI or if you are using Angular 6 or older.

### Installation

```bash
npm install --save single-spa-angular
```

### Manually apply schematics

Since the single-spa-angular schematics didn't run, you'll need to make the following changes:

1. Create all of the files that would have been created by the schematic.
   [See schematics files](https://github.com/single-spa/single-spa-angular/tree/master/src/schematics/ng-add/_files).
   Be sure to get the files in the subdirectories, too.
2. Add `build:single-spa` and `serve:single-spa` to the [scripts](https://docs.npmjs.com/misc/scripts) in your package.json.
   [See `addNPMScripts` function](https://github.com/single-spa/single-spa-angular/blob/master/src/schematics/ng-add/index.ts#L122).
3. Use the angular builder, as described in the next section.

### Use Angular Builder

**Note that this only applies to Angular versions pre Angular 8**. Up until Angular 8, we maintained an angular builder
that allowed us to control the webpack config, but since Angular 8 we use
[@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack) instead.

**If you installed this library with Angular 7 using the Angular Schematic, this is already configured and
you don't need to change it. Otherwise, you might need to do this manually.**

**If you don't use Angular CLI, skip this section.**

To build your Angular CLI application as a single-spa app do the following.

- Open `angular.json`
- Locate the project you wish to update.
- Navigate to the `architect > build` property.
- Set the `builder` property to `single-spa-angular:build`.
- Run `ng build` and verify your dist contains one asset, `main.js`.

Example Configuration:

```json
{
  "architect": {
    "build": {
      "builder": "single-spa-angular:build",
      "options": {
        "libraryName": "hello"
      }
    },
    "serve": {
      "builder": "single-spa-angular:dev-server",
      "options": {}
    }
  }
}
```

##### ng build options

Configuration options are provided to the `architect.build.options` section of your angular.json.

| Name                       | Description                                                                                                                                            | Default Value            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| libraryName                | (optional) Specify the name of the module                                                                                                              | Angular CLI project name |
| libraryTarget              | (optional) The type of library to build [see available options](https://github.com/webpack/webpack/blob/master/declarations/WebpackOptions.d.ts#L1111) | "UMD"                    |
| singleSpaWebpackConfigPath | (optional) Path to partial webpack config to be merged with angular's config. Example: `extra-webpack.config.js`                                       | undefined                |

##### ng serve options

Configuration options are provided to the `architect.serve.options` section of your angular.json.

| Name                       | Description                                                                                                      | Default Value |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------- |
| singleSpaWebpackConfigPath | (optional) Path to partial webpack config to be merged with angular's config. Example: `extra-webpack.config.js` | undefined     |

## Routing

### Configure routes

To get single-spa working, you'll need to manually modify a few files.

1. Add `providers: [{ provide: APP_BASE_HREF, useValue: '/' }]` to `app-routing.module.ts`. See
   [angular docs](https://angular.io/api/common/APP_BASE_HREF) for more details about APP_BASE_HREF.
2. Add `{ path: '**', component: EmptyRouteComponent }` to your `app-routing.module.ts` routes. The EmptyRouteComponent is part of the
   single-spa-angular schematics. This route makes sure that when single-spa is transitioning between routes that your Angular application
   doesn't try to show a 404 page or throw an error. See [angular docs](https://angular.io/guide/router#configuration) for more details about routes.
3. Add a declaration for EmptyRouteComponent in `app.module.ts`. See [angular docs](https://angular.io/guide/ngmodules#the-basic-ngmodule) for
   more details about app.module.ts.

:::caution
**APP_BASE_HREF** should have the same value that the used url for mount the Angular app defined in the single-spa root application. But doing this causes strange behaviours in Angular Router when navigate between registered apps.

In order to avoid this is recommended using **'/'** as **APP_BASE_HREF** and repeat the url prefix for your Angular app in every route component and router links. If you set **/angular** in your Angular app activity function for mount when the url starts with this value you'll have to add **/angular** prefix in all links.

You can see several discussions about this issue in **single-spa-angular** GitHub repo: [Router not working without APP_BASE_HREF](https://github.com/single-spa/single-spa-angular/issues/64) and [How to handle router links between different single-spa application subrouters](https://github.com/single-spa/single-spa-angular/issues/62)
:::

### Linking between applications

To link between applications, simply use [`routerLink`](https://angular.io/api/router/RouterLink) like normal.

```html
<a routerLink="/other-app">
  Link to other app
</a>
```

### Nested routes

Nested routes work exactly the same as they normally do. To create a nested route, add it to your app-routing.module.ts.
To link to a nested route, use [`routerLink`](https://angular.io/api/router/RouterLink) the same way you normally do.

```html
<a routerLink="/my-app/nested-route">
  Link to nested route
</a>
```

## Serving

Run the following:

```sh
npm run serve:single-spa
```

This **will not** open up an HTML file, since single-spa applications all [share one HTML file](/docs/configuration.html). Instead, go to
http://single-spa-playground.org and follow the instructions there to verify everything is working and for instructions on creating the shared HTML file.

## Building

Run `npm run build:single-spa`, which will create a `dist` directory with your compiled code.

In order for the [webpack public path](https://webpack.js.org/guides/public-path/#root) to be correctly set for your assets, you should use Angular CLI's `--deploy-url` option. For more information, see [this Stack Overflow answer](https://stackoverflow.com/questions/47885451/angular-cli-build-using-base-href-and-deploy-url-to-access-assets-on-cdn) which shows a few options for how to do that.

## The single-spa helpers

### Introduction

"single-spa helpers" refers to the in-browser portion of single-spa-angular. The helpers are used by all versions of Angular and
regardless of whether you are using Angular CLI or not. This is the core of the single-spa-angular library that makes it possible
for Angular applications to bootstrap, mount, and unmount. See
[single-spa lifecycles](/docs/building-applications.html#registered-application-lifecycle) for more information.

## Basic usage

```ts
import singleSpaAngular from 'single-spa-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from './app/app.module';

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    return platformBrowserDynamic().bootstrapModule(AppModule);
  },
  template: '<app-root />',
  Router,
  NgZone: NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
```

### Full Example

See [this schematic file](https://github.com/single-spa/single-spa-angular/blob/master/src/schematics/ng-add/_files/src/main.single-spa.ts.template#L16)
for a good example of how to use the single-spa helpers.

### Options

Options are passed to single-spa-angular via the `opts` parameter when calling `singleSpaAngular(opts)`. This happens inside of your `main.single-spa.ts` file.

The following options are available:

- `bootstrapFunction`: (required) A function that is given custom props as an argument and returns a promise that resolves with a resolved Angular module that is bootstrapped. Usually, your implementation will look like this: `bootstrapFunction: (customProps) => platformBrowserDynamic().bootstrapModule()`.
  See [custom props documentation](https://single-spa.js.org/docs/building-applications.html#custom-props) for more info on the argument passed to the function.
- `template`: (required) An HTML string that will be put into the DOM Element returned by `domElementGetter`. This template can be anything,
  but it is recommended that you keeping it simple by making it only one Angular component. For example, `<app-root />` is recommended,
  but `<div><app-root /><span>Hello</span><another-component /></div>` is allowed. Note that `innerHTML` is used to put the template
  onto the DOM. Also note that when using multiple angular applications simultaneously, you will want to make sure that the component
  selectors provided are unique to avoid collisions. When migrating to single-spa, this template is what is inside of your index.html file's
  `<body>` element.
- `Router`: (optional) The angular router class. This is required when you are using `@angular/router`.
- `AnimationModule`: (optional) The animation module class. This is required when you are using BrowserAnimationsModule.
  Example way to import this: `import { eAnimationEngine as AnimationModule } from '@angular/animations/browser';`.
  See [Issue 48](https://github.com/single-spa/single-spa-angular/issues/48) for more details.
- `domElementGetter`: (optional) A function that takes in no arguments and returns a DOMElement. This dom element is where the Angular
  application will be bootstrapped, mounted, and unmounted. It's recommended to omit this and let single-spa-angular's defaults create and use
  a container div.

## Concepts

### ZoneJS

[ZoneJS](https://github.com/angular/zone.js/) is the library that Angular uses for change detection. You absolutely must have exactly
one instance of the ZoneJS library on the page. ZoneJS will throw errors if you have more than one instance of ZoneJS on the page.

The preferred way to do ensure only one instance of ZoneJS is with an
[import map](http://single-spa-playground.org/playground/html-file) and [webpack externals](https://webpack.js.org/configuration/externals/#root).
Use the latest version of ZoneJS, even if your Angular applications use an older version. The latest version is backwards compatible all the
way back to Angular 4 and will let you write new Angular applications with newer versions of Angular.

If you have followed the installation instructions correctly, your code is already set up to do all of this.

Note that having only one instance of ZoneJS is different than having only one zone within that instance. single-spa-angular
automatically will ensure that each of your Angular applications has its own isolated, separate zone.

### Multiple applications

When you have multiple apps running side by side, you'll need to make sure that their
[component selectors](https://angular.io/api/core/Directive#selector) are unique. When creating a new
project, you can have angular-cli do this for you by passing in the `--prefix` option:

```sh
ng new --prefix app2
```

If you did not use the `--prefix` option, you should set the prefix manually:

1. For an application called app2, add `"prefix": "app2"` to `projects.app2` inside of the angular.json.
2. Go to `app.component.ts`. Modify `selector` to be `app2-root`.
3. Go to `main.single-spa.ts`. Modify `template` to be `<app2-root>`.

Additionally, make sure that `reflect-metadata` is only imported once in the root application and is not imported again in the child applications.
Otherwise, you might see an `No NgModule metadata found` error.
See [issue thread](https://github.com/single-spa/single-spa-angular/issues/2#issuecomment-347864894) for more details.

### Custom Props

[Custom props](https://single-spa.js.org/docs/building-applications.html#custom-props) are a way of passing auth or other data to your single-spa
applications. The custom props are available inside of the [bootstrapFunction](#options) passed to singleSpaAngular(). Additionally, if you use the
angular cli schematic, you may subscribe to the singleSpaPropsSubject in your component, as shown below:

```ts
// An example showing where you get access to the single-spa props:
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import singleSpaAngular from 'single-spa-angular';

const lifecycles = singleSpaAngular({
  bootstrapFunction(singleSpaProps) {
    // Here are the custom props
    console.log(singleSpaProps);
    return platformBrowserDynamic().bootstrapModule(AppModule);
  },
  // add the other options to singleSpaAngular, too. See "Basic usage" for more info
});
```

```ts
// If you're using the singleSpaPropsSubject generated by the single-spa-angular schematics,
// here's an example component that uses the custom props
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  singleSpaPropsSubject,
  SingleSpaProps,
} from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  singleSpaProps: SingleSpaProps = null;
  subscription: Subscription = null;
  ngOnInit() {
    this.subscription = singleSpaPropsSubject.subscribe(
      props => (this.singleSpaProps = props),
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

### Angular assets

[Angular assets](https://angular.io/guide/file-structure#application-source-files) are handled differently within single-spa than within
other Angular applications. The schematics file called `asset-url.ts` helps you do load assets in a way that works both ways.

**This won't work**

```ts
// Doesn't work with single-spa
const imageUrl = '/assets/yoshi.png';
```

**Do this instead**

```js
import { assetUrl } from 'src/single-spa/asset-url';

// Works great with single-spa
const imageUrl = assetUrl('yoshi.png');
```

#### Within HTML templates

##### Option 1

Add the asset url to your component's class and reference it from the template.
See [here](https://github.com/joeldenning/coexisting-angular-microfrontends/blob/0fb9a557705b46349deae5c71b393b71d887e18d/app1/src/app/app.component.ts#L11)
and [here](https://github.com/joeldenning/coexisting-angular-microfrontends/blob/master/app1/src/app/app.component.html#L9).

##### Option 2

Create an [Angular Pipe](https://angular.io/guide/pipes) that lets you calculate the asset url inside of an HTML template:

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { assetUrl } from 'src/single-spa/public-path';

@Pipe({
  name: 'assetUrl',
})
export class AssetUrlPipe implements PipeTransform {
  public transform(value: any, args?: any): any {
    return assetUrl(value);
  }
}
```

Then use it in your template:

```html
<img [src]="'yoshi.png' | assetUrl" />
```

### Scripts

[Scripts in your angular.json](https://angular.io/guide/workspace-config#additional-build-and-test-options) are not loaded by single-spa.
This is because single-spa applications have to all share an HTML file.
([read more](http://single-spa-playground.org/playground/html-file)). You can remove the scripts from your angular.json because they
have no impact on your single-spa build.

#### Option 1

Add the script tags directly into your [root HTML file](http://single-spa-playground.org/playground/html-file). This way is easiest.
The downside is that all of the scripts get loaded even for routes that don't need them. However, that is generally okay and this
is the preferred way to do it.

#### Option 2

If you want the scripts to only be loaded when needed, you can add a custom
[bootstrap lifecycle](/docs/building-applications.html#bootstrap) to your code.

Note that lazy loading these scripts can actually be worse for performance _if you always need them_, since
they will start downloading later than if you put them right into the root HTML file.

```ts
// main.single-spa.ts

// Modify the bootstrap function like so
export const bootstrap = [
  () =>
    Promise.all([
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.6.5/datepicker.min.js',
      ),
    ]),
  lifecycles.bootstrap,
];

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const scriptEl = document.createElement('script');
    scriptEl.src = url;
    scriptEl.addEventListener('error', errEvt => {
      reject(errEvt.error);
    });
    scriptEl.addEventListener('load', () => {
      resolve();
    });
    document.head.appendChild(scriptEl);
  });
}
```

### Styles

[Styles in your angular.json](https://angular.io/guide/workspace-config#additional-build-and-test-options) will automatically
be loaded by single-spa-angular's webpack config, without you having to configure anything.

Your component styles will also be loaded like normal without you having to configure anything.

### Polyfills

[Polyfills in your angular.json](https://angular.io/guide/browser-support) are JavaScript code that make your project work in older browsers,
such as IE11.

**The polyfills that you specify in your angular.json file will not be loaded automatically**. This is because we should only load
polyfills once in the root HTML file, instead of once per application.

To load polyfills, you'll need to follow the instructions in the [Angular documentation for non-CLI users](https://angular.io/guide/browser-support#polyfills-for-non-cli-users).
Even if you are using Angular CLI, you will need to follow those instructions, since your [single-spa root HTML file](https://single-spa-playground.org/playground/html-file)
is not using Angular CLI and that's where the polyfills need to go.

If you're looking for a quick one-liner, try adding this line near the top of your index.html.

```html
<script src="https://unpkg.com/core-js-bundle/minified.js"></script>
```

### Internet Explorer

If you need to support IE11 or older, do the following:

- [Add core-js polyfill](#polyfills)
- Remove arrow functions from index.html ([example](https://github.com/joeldenning/coexisting-angular-microfrontends/commit/22cbb2dc1c15165c39b10aa4019fe517fa88af32#diff-07a3141209aa56f89a0f47490866f94eR34))
- Change angular.json `target` to `es5` ([example](https://github.com/joeldenning/coexisting-angular-microfrontends/commit/22cbb2dc1c15165c39b10aa4019fe517fa88af32#diff-acbfc718bf309f27dd3699a4ad80a2d1R13))

[Full example commit to get IE11 support](https://github.com/joeldenning/coexisting-angular-microfrontends/commit/22cbb2dc1c15165c39b10aa4019fe517fa88af32)
