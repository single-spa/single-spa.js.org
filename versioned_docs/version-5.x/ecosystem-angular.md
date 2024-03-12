---
id: ecosystem-angular
title: single-spa-angular
sidebar_label: Angular
---

### Project Status

The single-spa-angular project is overseen by the single-spa core team, but largely maintained by the community using it. This is because the single-spa core team is stronger in other frameworks and often doesn't have the expertise to fix bugs in a timely manner. There are a few community members who help us actively maintain the project, which we greatly appreciate. If you have Angular experience, we'd appreciate your help in maintaining the repo. To do so, set up notifications by watching the single-spa-angular Github repository. Also, please join the `#maintainers` and `#angular` channels in Slack.

## Introduction

[single-spa-angular](https://github.com/single-spa/single-spa-angular/) is a library for creating Angular microfrontends.

Each microfrontend ([single-spa application](/docs/building-applications)) is an Angular CLI project that can
use its own version of Angular and be deployed separately from any other. They all come together into a single
web page where one or more single-spa applications is active at any time.

The documentation here is extensive, so use the sidenav on the right. 👉👉👉

### Community

Join the `#angular` channel in [single-spa's Slack workspace](https://join.slack.com/t/single-spa/shared_invite/zt-2efw13fg4-oJgemeyCUJv4~JrQlYttnA).

### Demo

https://coexisting-angular-microfrontends.surge.sh

### Starter repo

https://github.com/joeldenning/coexisting-angular-microfrontends

### Contributing

For instructions on how to test this locally before creating a pull request, see the [Contributing docs](https://github.com/single-spa/single-spa-angular/blob/master/CONTRIBUTING.md).

## Angular versions

### Angular 1 (AngularJS)

AngularJS is supported by [single-spa-angularjs](https://github.com/single-spa/single-spa-angularjs), instead of single-spa-angular.
See [AngularJS docs](/docs/ecosystem-angularjs).

### Angular 2

Angular 2 is supported by single-spa-angular@3.

The [single-spa-angular schematics](#schematics) are not supported by Angular 2, so you'll have to
follow the [steps for manual installation](#manual-installation). The
[single-spa helpers](#the-single-spa-helpers) work with Angular 2.

### Angular 3

Angular 3 [never existed](https://www.infoworld.com/article/3150716/forget-angular-3-google-skips-straight-to-angular-4.html).

### Angular 4

Angular 4 is supported by single-spa-angular@3.

The [single-spa-angular schematics](#schematics) are not supported by Angular 4, so you'll have to
follow the [steps for manual installation](#manual-installation). The
[single-spa helpers](#the-single-spa-helpers) work with Angular 4.

### Angular 5

Angular 5 is supported by single-spa-angular@3.

The [single-spa-angular schematics](#schematics) are not supported by Angular 5, so you'll have to
follow the [steps for manual installation](#manual-installation). The
[single-spa helpers](#the-single-spa-helpers) work with Angular 5.

### Angular 6

Angular 6 is supported by single-spa-angular@3.

The [single-spa-angular schematics](#schematics) are not supported by Angular 6, so you'll have to
follow the [steps for manual installation](#manual-installation). The
[single-spa helpers](#the-single-spa-helpers) work with Angular 6.

### Angular 7

Angular 7 is supported by single-spa-angular@3.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 7. Follow the [Angular CLI instructions](#angular-cli).

Note that the schematics for Angular 7 use an [Angular Builder](#use-angular-builder) that is no longer
used in the Angular 8 schematics.

### Angular 8

Angular 8 is supported by single-spa-angular@3.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 8. Follow the [Angular CLI instructions](#angular-cli).

Note that the schematics for Angular 8 [do not use the custom Angular builder](#angular-builder), but instead use
[@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack).

### Angular 9

Angular 9 is supported by single-spa-angular@4.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 9. Follow the [Angular CLI instructions](#angular-cli).

Note that the schematics for Angular 9 [do not use the custom Angular builder](#angular-builder), but instead use
[@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack).

### Angular 10

Angular 10 is supported by single-spa-angular@4.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 10. Follow the [Angular CLI instructions](#angular-cli).

Note that the schematics for Angular 10 [do not use the custom Angular builder](#angular-builder), but instead use
[@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack).

### Angular 11

Angular 11 is supported by single-spa-angular@4.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 11. Follow the [Angular CLI instructions](#angular-cli).

Note that the schematics for Angular 11 [do not use the custom Angular builder](#angular-builder), but instead use
[@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack).

### Angular 12

Angular 12 is supported by single-spa-angular@5.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 12. Follow the [Angular CLI instructions](#angular-cli).

### Angular 13

Angular 13 is supported by single-spa-angular@6.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 13. Follow the [Angular CLI instructions](#angular-cli).

### Angular 14

Angular 14 is supported by single-spa-angular@7.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 14. Follow the [Angular CLI instructions](#angular-cli).

### Angular 15

Angular 15 is supported by single-spa-angular@8.

Both the [single-spa-angular schematics](#schematics) and the [single-spa helpers](#the-single-spa-helpers)
work with Angular 15. Follow the [Angular CLI instructions](#angular-cli).

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
# If you use any Angular version lower than 14.
ng add single-spa-angular
# If you use Angular 14 you have to specify the project name.
# This is because the `defaultProject` option has been deprecated by Angular CLI.
ng add single-spa-angular --project my-cool-app
```

### Schematics

[Angular schematics](https://angular.io/guide/schematics) are processed when you run `ng add single-spa-angular` or `ng add single-spa-angular --project my-cool-app`.

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

```sh
npm install single-spa-angular
# Or if you're using yarn
yarn add single-spa-angular
# Or if you're using pnpm
pnpm install single-spa-angular
```

### Manually apply schematics

Since the single-spa-angular schematics didn't run, you'll need to make the following changes:

1. Create all of the files that would have been created by the schematic.
   [See schematics files](https://github.com/single-spa/single-spa-angular/tree/master/schematics/ng-add/_files).
   Be sure to get the files in the subdirectories, too.
2. Add `build:single-spa` and `serve:single-spa` to the [scripts](https://docs.npmjs.com/misc/scripts) in your package.json.
   [See `addNPMScripts` function](https://github.com/single-spa/single-spa-angular/blob/master/schematics/ng-add/index.ts#L161).
3. Use the angular builder, as described in the next section.

### Use Angular Builder

**Note that this only applies to Angular versions pre Angular 8**. Up until Angular 8, we maintained an angular builder
that allowed us to control the webpack config, but since Angular 8 we use
[@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack) instead. See [documentation](#use-custom-webpack) for
using the custom webpack builder with single-spa-angular and Angular 8+.

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

### Use Custom Webpack

Starting with Angular 8, single-spa-angular's schematics install and use [`@angular-builders/custom-webpack`](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack) to modify the webpack config. The schematics also create an `extra-webpack.config.js` file in your project where you can modify the configuration further.

The extra-webpack.config.js file should include the following:

```js
const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
```

Older versions of single-spa-angular@3 and single-spa-angular@4 created extra-webpack.config.js files that did not pass `options` into `singleSpaAngularWebpack`. When you upgrade to newer versions, you'll need to pass in the options as shown above.

In addition to modifying the webpack config directly, you may alter some of single-spa-angular's behavior by changing the angular.json. Configuration options are provided to the `architect.build.options.customWebpackConfig` section of your angular.json.

| Name                       | Description                                                                                                                                            | Default Value            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| path                       | (required) Path to the the above `extra-webpack.config.js` file.                                                                                       | N/A                      |
| libraryName                | (optional) Specify the name of the module                                                                                                              | Angular CLI project name |
| libraryTarget              | (optional) The type of library to build [see available options](https://github.com/webpack/webpack/blob/master/declarations/WebpackOptions.d.ts#L1111) | "UMD"                    |
| excludeAngularDependencies | (optional) Excludes Angular dependencies from the bundle by adding them to Webpack `externals`                                                         | false                    |

If you're using SystemJS, you may want to consider changing the [webpack output.libraryTarget](https://webpack.js.org/configuration/output/#outputlibrarytarget) to be `"system"`, for better interop with SystemJS.

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
<a routerLink="/other-app"> Link to other app </a>
```

### Nested routes

Nested routes work exactly the same as they normally do. To create a nested route, add it to your app-routing.module.ts.
To link to a nested route, use [`routerLink`](https://angular.io/api/router/RouterLink) the same way you normally do.

```html
<a routerLink="/my-app/nested-route"> Link to nested route </a>
```

### Enabling hash mode

You need to firstly enable hash mode in root-config.

If you are using layout html with `single-spa-router`, add `mode="hash"`

```html
<single-spa-router mode="hash"> ... </single-spa-router>
```

If you are registering each route manually, use `location.hash`

```js
registerApplication({
  name: "@orgName/app1",
  app: () => System.import("@orgName/app1"),
  activeWhen: (location) => location.hash.startsWith("#/app1"),
});
```

Then, enable hash mode in your routing module of angular micro frontend application.

```ts
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
```

## Serving

Run the following:

```sh
npm run serve:single-spa
```

This **will not** open up an HTML file, since single-spa applications all [share one html file](/docs/configuration). Instead, go to
http://single-spa-playground.org and follow the instructions there to verify everything is working and for instructions on creating the shared HTML file.

## Building

Run `npm run build:single-spa`, which will create a `dist` directory with your compiled code.

In order for the [webpack public path](https://webpack.js.org/guides/public-path/#root) to be correctly set for your assets, you should use Angular CLI's `--deploy-url` option. For more information, see [this Stack Overflow answer](https://stackoverflow.com/questions/47885451/angular-cli-build-using-base-href-and-deploy-url-to-access-assets-on-cdn) which shows a few options for how to do that.

## The single-spa helpers

### Introduction

"single-spa helpers" refers to the in-browser portion of single-spa-angular. The helpers are used by all versions of Angular and
regardless of whether you are using Angular CLI or not. This is the core of the single-spa-angular library that makes it possible
for Angular applications to bootstrap, mount, and unmount. See
[single-spa lifecycles](/docs/building-applications#registered-application-lifecycle) for more information.

### Migrating from single-spa-angular@3.x to single-spa-angular@4.x

​
Migrating from 3.x to 4.x requires only few API updates.
​

#### Packages

​

```sh
npm install single-spa-angular@4.0.0
# Or if you're using yarn
yarn add single-spa-angular@4.0.0
# Or if you're using pnpm
pnpm install single-spa-angular@4.0.0
```

​

#### API Updates

​
`single-spa-angular` doesn't have a default export anymore, instead you have to import a named `singleSpaAngular` function. Given the following code:
​

```js
import singleSpaAngular from "single-spa-angular"; // single-spa-angular@3.x
import { singleSpaAngular } from "single-spa-angular"; // single-spa-angular@4.x
```

​
Also, if your application uses routing then you have to import the `getSingleSpaExtraProviders` function. Let's look at the following example, this is how it was in `single-spa-angular@3.x`:
​

```js
import { NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import singleSpaAngular, { getSingleSpaExtraProviders } from 'single-spa-angular';
​
const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});
```

​
And this is how it should be in `single-spa-angular@4.x`:
​

```js
import { NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
​
const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});
```

## Basic usage

```ts
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgZone } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from "single-spa-angular";

import { AppModule } from "./app/app.module";

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      AppModule,
    );
  },
  template: "<app-root />",
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
```

### Full Example

See [this schematic file](https://github.com/single-spa/single-spa-angular/blob/master/schematics/ng-add/_files/src/main.single-spa.ts.template#L16)
for a good example of how to use the single-spa helpers.

### Options

Options are passed to single-spa-angular via the `opts` parameter when calling `singleSpaAngular(opts)`. This happens inside of your `main.single-spa.ts` file.

The following options are available:

- `bootstrapFunction`: (required) A function that is given custom props as an argument and returns a promise that resolves with a resolved Angular module that is bootstrapped. Usually, your implementation will look like this: `bootstrapFunction: (customProps) => platformBrowserDynamic().bootstrapModule()`.
  See [custom props documentation](https://single-spa.js.org/docs/building-applications#custom-props) for more info on the argument passed to the function.
- `template`: (required) An HTML string that will be put into the DOM Element returned by `domElementGetter`. This template can be anything,
  but it is recommended that you keeping it simple by making it only one Angular component. For example, `<app-root />` is recommended,
  but `<div><app-root /><span>Hello</span><another-component /></div>` is allowed. Note that `innerHTML` is used to put the template
  onto the DOM. Also note that when using multiple angular applications simultaneously, you will want to make sure that the component
  selectors provided are unique to avoid collisions. When migrating to single-spa, this template is what is inside of your index.html file's
  `<body>` element.
- `Router`: (optional) The angular router class. This is required when you are using `@angular/router`.
- `AnimationModule`: (optional) The animation module class. This is required when you are using BrowserAnimationsModule.
  Example way to import this: `import { eAnimationEngine as AnimationModule } from '@angular/animations/browser';`.
  See [Issue 48](https://github.com/single-spa/single-spa-angular/issues/48) for more details. Note that AnimationModule is no longer needed in Angular 12, so this option can be ignored in Angular >= 12.
- `domElementGetter`: (optional) A function that takes in no arguments and returns a DOMElement. This dom element is where the Angular
  application will be bootstrapped, mounted, and unmounted. It's recommended to omit this and let single-spa-angular's defaults create and use
  a container div.

## Concepts

### ZoneJS

[ZoneJS](https://github.com/angular/zone.js/) is the library that Angular uses for change detection. You absolutely must have exactly
one instance of the ZoneJS library on the page. ZoneJS will throw errors if you have more than one instance of ZoneJS on the page.

The preferred way to ensure only one instance of ZoneJS is loaded on your page is with a script tag in your root-config's HTML file. You should load ZoneJS upfront a single time, before loading SystemJS or any of your microfrontends.

```html
<script src="https://cdn.jsdelivr.net/npm/zone.js@0.10.3/dist/zone.min.js"></script>
```

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

[Custom props](https://single-spa.js.org/docs/building-applications#custom-props) are a way of passing auth or other data to your single-spa
applications. The custom props are available inside of the [bootstrapFunction](#options) passed to singleSpaAngular(). Additionally, if you use the
angular cli schematic, you may subscribe to the singleSpaPropsSubject in your component, as shown below:

```ts
// An example showing where you get access to the single-spa props:
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { singleSpaAngular } from "single-spa-angular";

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
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import {
  singleSpaPropsSubject,
  SingleSpaProps,
} from "src/single-spa/single-spa-props";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  singleSpaProps: SingleSpaProps;
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe(
      (props) => (this.singleSpaProps = props),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // OR if you don't need to access `singleSpaProps` inside the component
  // then create `Observable` property and use it in template with `async` pipe.
  singleSpaProps$ = singleSpaPropsSubject.asObservable();
}
```

### Angular assets

[Angular assets](https://angular.io/guide/file-structure#application-source-files) are handled differently within single-spa than within
other Angular applications. The schematics file called `asset-url.ts` helps you do load assets in a way that works both ways.

**This won't work**

```ts
// Doesn't work with single-spa
const imageUrl = "/assets/yoshi.png";
```

**Do this instead**

```js
import { assetUrl } from "src/single-spa/asset-url";

// Works great with single-spa
const imageUrl = assetUrl("yoshi.png");
```

#### Within HTML templates

##### Option 1

Add the asset url to your component's class and reference it from the template.
See [here](https://github.com/joeldenning/coexisting-angular-microfrontends/blob/0fb9a557705b46349deae5c71b393b71d887e18d/app1/src/app/app.component.ts#L11)
and [here](https://github.com/joeldenning/coexisting-angular-microfrontends/blob/master/app1/src/app/app.component.html#L9).

##### Option 2

Create an [Angular Pipe](https://angular.io/guide/pipes) that lets you calculate the asset url inside of an HTML template:

```ts
import { Pipe, PipeTransform } from "@angular/core";
import { assetUrl } from "src/single-spa/public-path";

@Pipe({ name: "assetUrl" })
export class AssetUrlPipe implements PipeTransform {
  transform(value: string): string {
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
[bootstrap lifecycle](/docs/building-applications#bootstrap) to your code.

Note that lazy loading these scripts can actually be worse for performance _if you always need them_, since
they will start downloading later than if you put them right into the root HTML file.

```ts
// main.single-spa.ts

// Modify the bootstrap function like so
export const bootstrap = [
  () =>
    Promise.all([
      loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js",
      ),
      loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.6.5/datepicker.min.js",
      ),
    ]),
  lifecycles.bootstrap,
];

function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;

    function onLoad() {
      resolve();
      cleanup();
    }

    function onError(event: Event) {
      reject(event);
      cleanup();
    }

    function cleanup() {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    }

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    document.head.appendChild(script);
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

To correct the error `It looks like your application or one of its dependencies is using i18n`.

Install `@angular/localize` in your root-config module

```sh
npm install @angular/localize
# Or if you're using yarn
yarn add @angular/localize
# Or if you're using pnpm
pnpm install @angular/localize

```

Add following import to your root-config.js

```ts
import "@angular/localize/init";
```

### Internet Explorer

If you need to support IE11 or older, do the following:

- [Add core-js polyfill](#polyfills)
- Remove arrow functions from index.html ([example](https://github.com/joeldenning/coexisting-angular-microfrontends/commit/22cbb2dc1c15165c39b10aa4019fe517fa88af32#diff-07a3141209aa56f89a0f47490866f94eR34))
- Change angular.json `target` to `es5` ([example](https://github.com/joeldenning/coexisting-angular-microfrontends/commit/22cbb2dc1c15165c39b10aa4019fe517fa88af32#diff-acbfc718bf309f27dd3699a4ad80a2d1R13))

[Full example commit to get IE11 support](https://github.com/joeldenning/coexisting-angular-microfrontends/commit/22cbb2dc1c15165c39b10aa4019fe517fa88af32)

## Shared Angular

Sharing one or more instances of Angular between microfrontends provides the following benefits:

1. Performance improvement, due to reduced amount of javascript to load.
1. [Cross-microfrontend imports](/docs/recommended-setup#cross-microfrontend-imports) of angular components are possible. (Without a shared instance of Angular, you can still use cross-microfrontend imports of [single-spa parcels](#parcels))

There are two techniques for sharing Angular: [SystemJS in-browser modules](/docs/recommended-setup#systemjs) and [Module Federation](/docs/recommended-setup#module-federation).

The below guide uses SystemJS for sharing dependencies.

> :warning: Angular 13 has few breaking changes. It dropped View Engine support, and this means there's a single template compiler right now (Ivy). They also introduced changes to the Angular Package Format. UMD bundles are no longer generated when building libraries. The `ng-packagr` now emits only ES2015 and ES2020 bundles. See this article for more info: https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296.

You can use the following esm-bundle packages, which provide Ivy-compatible versions that can be shared via SystemJS:

- https://github.com/esm-bundle/angular__core
- https://github.com/esm-bundle/angular__common
- https://github.com/esm-bundle/angular__compiler
- https://github.com/esm-bundle/angular__platform-browser
- https://github.com/esm-bundle/angular__platform-browser-dynamic
- https://github.com/esm-bundle/angular__animations
- https://github.com/esm-bundle/angular__router
- https://github.com/esm-bundle/angular__forms
- https://github.com/esm-bundle/angular__elements
- https://github.com/esm-bundle/angular__upgrade
- https://github.com/esm-bundle/angular__service-worker
- https://github.com/esm-bundle/angular__localize

The single-spa-angular is also available in SystemJS format:

- https://github.com/esm-bundle/single-spa-angular

Let's imagine that we have 2 Angular applications and the root-config application. Angular applications want to share dependencies. First of all, we need to exclude Angular dependencies from their bundles, this can be done via Webpack `externals` property, but `single-spa-angular@6.2.0+` has an option that will exclude `rxjs`, `@angular/*` and `single-spa-angular/*` packages:

```json
"build": {
  "builder": "@angular-builders/custom-webpack:browser",
  "options": {
    "customWebpackConfig": {
      "libraryTarget": "system",
      "excludeAngularDependencies": true,
      "path": "..."
    }
  }
}
```

Note that we set the `libraryTarget` to `system` and `excludeAngularDependencies` to `true`.

Next we need to replace `enableProdMode` from `@angular/core` with `enableProdMode` from `single-spa-angular` in our applications:

```js
import { enableProdMode } from "single-spa-angular";

if (environment.production) {
  enableProdMode();
}
```

This is because Angular's `enableProdMode` throws an error when it's called multiple times, but it will be called multiple times when dependencies are shared. `single-spa-angular` calls the original `enableProdMode` but swallows the error.

We also have to consider the platform injector that will be re-used between applications. Angular creates a platform injector when it bootstraps an application; it creates it only once and then re-uses it. Each Angular application has its own platform injector when dependencies are NOT shared and will have a single one when dependencies are shared. This means that `providedIn: 'platform'` services will be a part of the single injector and will be shared between applications.

`single-spa-angular` exports the `getSingleSpaExtraProviders` function that adds `SingleSpaPlatformLocation` to the platform injector. This function should be called in each application (even if that application doesn't use routing). We also have to share the `single-spa-angular` package because applications should reference the same `SingleSpaPlatformLocation` class. Assume that `app1` is created earlier than `app2`, `app1` doesn't call `getSingleSpaExtraProviders()` when bootstrapping the root module, but `app2` does. The platform injector is created eagerly when the `platformBrowser()` is called for the first time. The `app2` will then try to retrieve the `SingleSpaPlatformLocation`, but there's no such injectee within the platform injector since `app1` didn't declare this dependency.

The root-config should have a SystemJS import map with all of the required packages:

```json
{
  "imports": {
    "app1": "http://localhost:4200/main.js",
    "app2": "http://localhost:4201/main.js",

    "single-spa": "https://cdnjs.cloudflare.com/ajax/libs/single-spa/5.9.3/system/single-spa.dev.js",
    "rxjs": "https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/es2015/rxjs.min.js",
    "rxjs/operators": "https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/es2015/rxjs-operators.min.js",
    "@angular/compiler": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__compiler/system/es2020/ivy/angular-compiler.js",
    "@angular/core": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__core/system/es2020/ivy/angular-core.js",
    "@angular/common": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__common/system/es2020/ivy/angular-common.js",
    "@angular/common/http": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__common/system/es2020/ivy/angular-http.js",
    "@angular/animations": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__animations/system/es2020/ivy/angular-animations.js",
    "@angular/animations/browser": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__animations/system/es2020/ivy/angular-browser.js",
    "@angular/platform-browser": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__platform-browser/system/es2020/ivy/angular-platform-browser.js",
    "@angular/platform-browser/animations": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__platform-browser/system/es2020/ivy/angular-animations.js",
    "@angular/platform-browser-dynamic": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__platform-browser-dynamic/system/es2020/ivy/angular-platform-browser-dynamic.js",
    "@angular/router": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular__router/system/es2020/ivy/angular-router.js",
    "single-spa-angular/internals": "https://cdn.jsdelivr.net/npm/@esm-bundle/single-spa-angular@6.2.0/system/es2020/ivy/angular-single-spa-angular-internals.js",
    "single-spa-angular": "https://cdn.jsdelivr.net/npm/@esm-bundle/single-spa-angular@6.2.0/system/es2020/ivy/angular-single-spa-angular.js"
  }
}
```

Production bundles also don't use `@angular/compiler` and `@angular/platform-browser-dynamic` packages. You would want to use minified packages when the root-config is built in production mode. One approach could be to use `if-else` conditions within the root-config `.ejs` template:

```html
<% if (htmlWebpackPlugin.options.isDevelopment) { %>
<script type="systemjs-importmap">
  {
    "imports": {
      "@angular/compiler": "..."
    }
  }
</script>
<%} else { %>
<script type="systemjs-importmap">
  {
    "imports": {
      "@angular/core": "angular-core.min.js"
    }
  }
</script>
<% } %>
```

Note: the `isDevelopment` can be provided when creating the `HtmlWebpackPlugin`:

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, { mode }) => {
  const isDevelopment = mode !== "production";

  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: "...",
        isDevelopment,
      }),
    ],
  };
};
```

The `mode` will equal production when you run `webpack --mode production`.

The root-config then can load `single-spa`, register applications and start the `single-spa` in order for applications to be mounted:

```js
System.import("single-spa").then(({ registerApplication, start }) => {
  registerApplication({
    name: "app1",
    app: () => System.import("app1"),
    activeWhen: (location) => location.pathname.startsWith("/app1"),
  });

  registerApplication({
    name: "app2",
    app: () => System.import("app2"),
    activeWhen: (location) => location.pathname.startsWith("/app2"),
  });

  start();
});
```

## Angular Elements

:::info
This feature is available starting from `single-spa-angular@4.4.0`. You also may need to become familiar with [Angular Elements documentation](https://angular.io/guide/elements).
:::

Let's start with installing the `@angular/elements`:

```sh
npm install @angular/elements
# Or if you're using yarn
yarn add @angular/elements
# Or if you're using pnpm
pnpm install @angular/elements
```

The next step is to edit `main.single-spa.ts`:

```ts
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { singleSpaAngularElements } from "single-spa-angular/elements";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngularElements({
  template: "<app-custom-element />",
  // We can actually not rely on the `zone.js` library, our custom element
  // will behave itself as a zone-less application.
  bootstrapFunction: () =>
    platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: "noop" }),
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
```

Note that the `app-custom-element` selector will be used when defining our [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

After that, you'll have to edit `app.module.ts` and define a custom tag:

```ts
import { NgModule, Injector, DoBootstrap } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { createCustomElement } from "@angular/elements";

import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    customElements.define(
      // This tag we've have provided in `options.template` when called `singleSpaAngularElements`.
      "app-custom-element",
      createCustomElement(AppComponent, { injector: this.injector }),
    );
  }
}
```

The following options are available to be passed when calling `singleSpaAngularElements`:

- `bootstrapFunction` (required)
- `template` (required)
- `domElementGetter` (optional)

See [options](#options) for detailed explanation.

## Parcels

We encourage you to get familiar with the documentation, namely [Parcels overview](/docs/parcels-overview) and [Parcels API](/docs/parcels-api). This documentation will give you a basic understanding of what parcels are.

Additionally, single-spa-angular provides a `<parcel>` component to make using framework agnostic single-spa parcels easier. This allows you to put the parcel into your component's template, instead of calling `mountRootParcel()` by yourselves.

`single-spa-angular/parcel` package exports the `ParcelModule` which exports the `<parcel>` component:

```ts
// Inside of src/app/app.module.ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ParcelModule } from "single-spa-angular/parcel";

import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, ParcelModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

The example below shows how you can render React parcels:

```ts
// Inside of src/app/app.component.ts
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { mountRootParcel } from "single-spa";

import { config } from "./ReactWidget/ReactWidget";

@Component({
  selector: "app-root",
  template:
    '<parcel [config]="config" [mountParcel]="mountRootParcel"></parcel>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  config = config;
  mountRootParcel = mountRootParcel;
}
```

For React, you will need to create a file with the extension `.tsx`:

```tsx
// Inside of src/app/ReactWidget/ReactWidget.tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

const ReactWidget = () => <div>Hello from React!</div>;

export const config = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ReactWidget,
});
```

### Loading External Components Asynchronously

If your code is part of an import map and you include a global reference to
systemjs, you can dynamically import the code using an `async` method.

For example, if your import map includes the `ReactComponent`.

```javascript
{
  imports: {
    "@org/react-component": '/org-react-component.js'
  }
}
```

You can dynamically load the component by setting the `config` as an
asynchronous method that fetches the component.

Since some versions of webpack use SystemJS under the hood, you'll need to
reference the global version.

```ts
// Inside of src/app/app.component.ts
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { mountRootParcel } from "single-spa";

@Component({
  selector: "app-root",
  template:
    '<parcel [config]="config" [mountParcel]="mountRootParcel"></parcel>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  async config() {
    return window.System.import("@org/react-component");
  }
  mountRootParcel = mountRootParcel;
}
```

### Passing Custom Props

You can pass any custom props to the parcel by passing an object of props using
the `customProps` attribute.

For example, if you're rendering a React parcel from an Angular component, you can pass a click handler from Angular into the React parcel:

```tsx
// Inside of src/app/ReactWidget/ReactWidget.tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

const ReactWidget = ({ handleClick }) => (
  <button onClick={handleClick}>Click Me!</button>
);

export const parcelConfig = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ReactWidget,
});
```

You can pass a function (or any other value) as a custom prop. To ensure that the functions you pass to the parcel are bound with the correct javascript context, use the `handleClick = () => {` syntax when defining your functions.

```ts
// Inside of src/app/app.component.ts
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { mountRootParcel } from "single-spa";

import { config } from "./ReactWidget/ReactWidget";

@Component({
  selector: "app-root",
  template:
    '<parcel [config]="config" [customProps]="parcelProps" [mountParcel]="mountRootParcel"></parcel>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  config = config;
  mountRootParcel = mountRootParcel;

  handleClick = () => {
    alert("Hello World");
  };

  parcelProps = {
    handleClick = this.handleClick,
  };
}
```

## Zone-less applications

:::info
This feature is available starting from `single-spa-angular@4.1`.
:::

It's possible to develop Angular applications that don't rely on `zone.js` library, these applications are called _zone-less_. You have to run change detection manually in _zone-less_ applications through `ApplicationRef.tick()` or `ChangeDetectorRef.detectChanges()`. You can find more info in [Angular NoopZone docs](https://angular.io/guide/zone#noopzone).

The point is that you do not need to load `zone.js` library in your root HTML file. As Angular docs mention that you should have a comprehensive knowledge of change detection to develop such applications. Let's start by _nooping_ zone when bootstrapping module:

```ts
import { singleSpaAngular } from "single-spa-angular";

const lifecycles = singleSpaAngular({
  bootstrapFunction: () =>
    platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: "noop" }),
  template: "<app-root />",
  NgZone: "noop",
});
```

:::caution
We must specify `noop` _twice_: when bootstrapping `AppModule`, and setting `NgZone` property to `noop`. This tells Angular and single-spa-angular that we're not going to use zones.
:::

### Routing in zone-less applications

Since routing is managed by single-spa and there is no zone that tells Angular that some asynchronous event has occured, then we need to tell Angular when to run change detection if routing occurs. Let's look at the below code:

```js
import { ApplicationRef } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { singleSpaAngular } from "single-spa-angular";

const lifecycles = singleSpaAngular({
  bootstrapFunction: async () => {
    const ngModuleRef = await platformBrowserDynamic().bootstrapModule(
      AppModule,
      { ngZone: "noop" },
    );

    const appRef = ngModuleRef.injector.get(ApplicationRef);
    const listener = () => appRef.tick();
    window.addEventListener("popstate", listener);

    ngModuleRef.onDestroy(() => {
      window.removeEventListener("popstate", listener);
    });

    return ngModuleRef;
  },
  template: "<app-root />",
  NgZone: "noop",
  Router,
  NavigationStart,
});
```

:::caution
`single-spa-angular@4.x` **requires** calling `getSingleSpaExtraProviders` function in applications that have routing. Do not call this function in _zone-less_ application.
:::

## Inter-app communication via RxJS

First of all, check out this [Inter-app communication guide](/docs/recommended-setup#inter-app-communication).

It's possible to setup a communication between microfrontends via RxJS using [cross microfrontend imports](/docs/recommended-setup#cross-microfrontend-imports).

We can not create complex abstractions, but simply export the `Subject`:

```ts
// Inside of @org/api
import { ReplaySubject } from "rxjs";
import { User } from "@org/models";

// `1` means that we want to buffer the last emitted value
export const userSubject$ = new ReplaySubject<User>(1);
```

And then you just need to import this `Subject` into the microfrontend application:

```ts
// Inside of @org/app1 single-spa application
import { userSubject$ } from "@org/api";
import { User } from "@org/models";

userSubject$.subscribe((user) => {
  // ...
});

userSubject$.next(newUser);
```

Also, you should remember that `@org/api` should be an "isolated" dependency, for example the Nrwl Nx library, where each library is in the "libs" folder and you import it via TypeScript paths.

Every application that uses this library should add it to its Webpack config as an external dependency:

```js
const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);
  singleSpaWebpackConfig.externals = [/^@org\/api$/];
  return singleSpaWebpackConfig;
};
```

But this library should be part of root application bundle and [shared with import maps](/docs/recommended-setup/#sharing-with-import-maps), for example:

```json
{
  "imports": {
    "@org/api": "http://localhost:8080/api.js"
  }
}
```
