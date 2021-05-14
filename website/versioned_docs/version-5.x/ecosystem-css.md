---
id: ecosystem-css
title: CSS
sidebar_label: CSS
---

In a microfrontends architecture, it's important to have both shared CSS and microfrontend-specific CSS. There should only be one copy of all shared CSS, and CSS specific to a microfrontend should be scoped so that class names do not collide between microfrontends.

## Shared CSS

It is best for both performance and developer experience to have some shared CSS. Often, the shared CSS is part of a "styleguide" or "design system."

Sometimes the design system is created in-house by a company, and other times it's an open source design system that is available on npm (Material UI, Bootstrap, Semantic UI, etc). For both cases, it's important that there is only a single copy of the CSS on the page at any time. When using [the recommended setup](/docs/recommended-setup), this is accomplished by following [the techniques in this documentation](/docs/recommended-setup#sharing-with-import-maps).

Besides sharing component styles, the styleguide or design system also usually includes CSS resets and utility classes.

### In-House Design System

Our recommendation for in-house design systems is to create a [utility microfrontend](/docs/module-types#utilities) (often named `@your-org-name/styleguide`). Contained within the utility microfrontend are shared CSS and Javascript components that are available for all other microfrontends to use.

Other microfrontends can access shared Javascript components via [cross-microfrontend imports](/docs/recommended-setup#cross-microfrontend-imports), and apply shared, global CSS classes to their components in the normal way (`<div class="bold">`).

Here are some examples:

- https://github.com/react-microfrontends/styleguide
- https://github.com/vue-microfrontends/styleguide
- https://github.com/polyglot-microfrontends/styleguide

The alternative to creating a utility microfrontend for your styleguide is to publish it to npm. The drawback to this approach is that it makes it easier to have duplicate copies of the styleguide, and also easier to have different versions of the styleguide. Npm packages are not independently deployable, nor are they singletons, but for a styleguide it's often desirable to have it centrally managed and can be deployed separately from the microfrontends that use them.

### Third Party Design System

When using a third-party design system, such as Material UI, Bootstrap, Semantic, etc, it is important that only one copy and version of the design system is loaded on the page. To accomplish this, here are two implementation options.

1. Add the design system libraries to your SystemJS import map, then mark them as external ([full documentation](/docs/recommended-setup#sharing-with-import-maps)). Alternatively, do the equivalent with [module federation](/docs/recommended-setup#sharing-with-module-federation).
1. Create a utility microfrontend (often called `@your-org-name/styleguide`) that contains all shared CSS and Javascript components. Re-export the components from the design system so that all other microfrontends can access them via [cross microfrontend imports](/docs/recommended-setup#cross-microfrontend-imports) (`import { Button } from '@your-org-name/styleguide';`).

Once the design system is properly shared, all its CSS and Javascript components will only be included one time on the web page. The code using the design system's components remains unchanged.

### Global CSS versus shared Javascript components

It's possible to share CSS via global CSS classes, Javascript components, or both. No method is clearly superior than others in every way, and you should choose an approach that fits your situation.

Some organizations scope the CSS for their shared Javascript components as a way of ensuring that the look and feel requires that you use the Javascript components. However, other organizations choose to publish global CSS in addition to their Javascript components, to allow for additional flexibility in their look and feel and make it easier to support multiple frameworks.

To share Javascript components, use [cross microfrontend imports](/docs/recommended-setup#cross-microfrontend-imports).

### CSS Custom Properties

Browsers support [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (sometimes called CSS Variables), which facilitate sharing CSS between microfrontends in an easy way. Any CSS variable applied to the `:root` pseudoelement is accessible to any other microfrontend.

```css
/* In your styleguide / design system */
:root {
  --blue: #0000FF;
}
```

```css
/* In an individual microfrontend */
.settings {
  color: var(--blue);
}
```

No extra configuration is needed for this to work, as this is built into the browser.

## Scoped CSS

For all CSS specific to a particular microfrontend or component, it is preferred to scope the CSS. In general, CSS classes are global by default, but "scoping" refers to encapsulating the CSS such that it only applies to one component or microfrontend. The code snippets below demonstrate some ways that this is possible:

```css
/*
  GLOBAL: this css class is not scoped
  NOT RECOMMENDED

  <div class="settings"></div>
*/
.settings {
  color: blue;
}

/*
  Scoped by suffixing all css classes with a unique hash. This is often done by build tools,
  particularly CSS Modules via Webpack's css-loader (https://webpack.js.org/loaders/css-loader/).

  <div class="settings-67f89dd87sf89ds"></div>
*/
.settings-67f89dd87sf89ds {
  color: blue;
}

/*
  Scoped by suffixing all CSS classes with a unique hash, and also adding a unique prefix
  (such as the microfrontend name) to classes. This is a variant of the above, except it
  ensures no collision of generated hashes. See the localIdentName option to css-loader
  https://webpack.js.org/loaders/css-loader/#localidentname

  <div class="app1__settings-67f89dd87sf89ds"></div>
*/
.app1__settings-67f89dd87sf89ds {
  color: blue;
}

/*
  Scoped via data attribute. This can often be done automatically by build tools (including Vue CLI, Angular, Svelte).
  Only one component or microfrontend adds this specific data attribute, effectively
  making the settings class "scoped" to that microfrontend

  <div data-df65s76dfs class="settings"></div>
*/
.settings[data-df65s76dfs] {
  color: blue;
}

/*
  Scoped via container selector. Single-spa applications are generally wrapped in a
  div that looks like this: <div id="single-spa-application:@org-name/project-name"></div>

  We can make our CSS class only apply to one microfrontend by prefixing it with that id.

  Run CSS.escape("single-spa-application:@org-name/project-name"); in the browser console
  to escape any special characters in the ID, to ensure that the container selector works.

  <div id="single-spa-application:@org-name/project-name">
    <div class="settings"></div>
  </div>
*/
#single-spa-application\:\@org-name\/project-name .settings {
  color: blue;
}
```

### UI Frameworks

Many popular UI frameworks have scoping built-in, or large ecosystems of open source libraries that help with scoping:

#### React

React CSS is quite diverse, with hundreds of options. Here are a few popular options that each result in component-scoped CSS:

- [CSS Modules](https://github.com/css-modules/css-modules)
- [Styled Components](https://styled-components.com/)
- [Emotion](https://emotion.sh/docs/introduction)

Also, in the single-spa community created Kremling, which scopes CSS while also unmounting it from the DOM when the React component unmounts:

- [Kremling](https://github.com/CanopyTax/kremling)

#### Angular

[Angular Component Styles](https://angular.io/guide/component-styles) are built into Angular and facilitate scoping CSS to a component (and therefore, to its containing microfrontend).

#### Vue

Vue [Single File Components (SFC)](https://vue-loader.vuejs.org/spec.html) have built-in support for [Scoped CSS](https://vue-loader.vuejs.org/guide/scoped-css.html).

#### Svelte

Svelte scopes CSS classes by default ([Docs](https://svelte.dev/tutorial/styling)).

### PostCSS Prefix Selector

[PostCSS](https://postcss.org/) is a build tool that processes your CSS. It's often used via Webpack with [postcss-loader](https://www.npmjs.com/package/postcss-loader).

A particular PostCSS plugin called [postcss-prefix-selector](https://github.com/RadValentin/postcss-prefix-selector) can be very helpful to scope CSS to a microfrontend.
With single-spa, each application is wrapped in a `<div id="single-spa-application:@org-name/project-name"></div>`, which can be used as a prefix to all CSS classes and selectors.
Run `CSS.escape("single-spa-application:@org-name/project-name")` in the browser console to make sure the HTML id is escaped, then prefix it with `#` so that it matches the id. The resulting string is what you pass into postcss-prefix-selector.

The example code above in the [Scoped CSS](#scoped-css) section shows the mechanics of how selector prefixing can accomplish scoping, and postcss-prefix-selector can do this automatically to
all of your CSS. Below is an example PostCSS configuration file:

```js
// postcss.config.js
const prefixer = require('postcss-prefix-selector');

module.exports = {
  plugins: [
    prefixer({
      prefix: "#single-spa-application\\:\\@org-name\\/project-name"
    })
  ]
}
```

### Shadow DOM

[Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) is a browser API for scoping CSS. It is designed to be used by [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), and is mentioned here as another viable option for scoping CSS.

Below are some notes about Shadow DOM that may be relevant to microfrontends:

- Shadow DOM prevents any global CSS from cascading into the Shadow Root, which means you can't easily have global, shared CSS.
- CSS custom properties from outside the Shadow Root can be used within the Shadow Root.
- The HTML elements within the Shadow DOM are not reachable by CSS selectors outside of the Shadow Root.
- Events that propagate from a Shadow Root are retargeted at each shadow boundary.

## Lazy Loading

"Loading" CSS refers to downloading the CSS by inserting a `<link rel="stylesheet" href="/my-file.css">` element into the DOM, or by downloading a Javascript file that inserts a `<style></style>` element into the DOM.

"Lazy Loading" refers to only inserting the `<link>` or `<style>` elements into the DOM once they are needed, instead of all at once. In single-spa, this is during the [`load`](/docs/building-applications#load) or [`mount`](/docs/building-applications#mount) lifecycle functions.

Each microfrontend should only load its CSS into the DOM after its Javascript is downloaded. Single-spa lazy loads the Javascript for each microfrontend, by default; therefore, the CSS for the microfrontends will only be loaded as needed.

## Unmounting CSS

In large systems with dozens of microfrontends, it can become important for performance to unmount CSS as you navigate between pages. This is accomplished by removing `<style>` and `<link>` elements from the DOM.

By default, most tooling will load and mount the CSS one time and leave it there indefinitely (it never unmounts!). However, some resources exist for unmounting CSS that is no longer being used, and remounting it once it's needed again.

To accomplish this, single-spa applications and parcels should remove `<link>` and `<style>` elements inside of their [unmount lifecycle function](/docs/building-applications#unmount):

```js
// This code is an example of the mechanics of mounting + unmounting + remounting CSS.
// In practice, this is often done via tools like css-loader, style-loader, or
// single-spa-css (rather than manually).
const style = document.createElement('style');
style.textContent = `.settings {color: blue;}`;

export const mount = [
  async () => {
    document.head.appendChild(styleElement);
  },
  reactLifecycles.mount,
]

export const unmount = [
  reactLifecycles.unmount,
  async () => {
    styleElement.remove();
  }
]
```

To help you accomplish this, this [single-spa-css](/docs/ecosystem-css#single-spa-css) library implements mount and unmount functions for you.

## SASS, PostCSS, Less, Stylus, etc

[SASS](https://sass-lang.com/), [PostCSS](https://postcss.org/), [Less](https://lesscss.org/), [Stylus](https://stylus-lang.com/), and other CSS build tools are all compatible with single-spa and microfrontends.

These tools run at build-time to produce vanilla CSS files. All of the documentation on this page applies to the output CSS files created by SASS and other CSS preprocessors.

Since each microfrontend has its own build, this means that there are multiple SASS (or other preprocessor) builds occurring - one per microfrontend. As a result, SASS variables are not shareable via [cross microfrontend imports](/docs/recommended-setup#cross-microfrontend-imports), since cross microfrontend imports occur at runtime. Instead, to share SASS variables, you'll need to publish them to an NPM registry and install them individually into each microfrontend. Since npm packages are not independently deployable (separately from the packages that use them), changes to the variables will need to be updated and deployed in each microfrontend individually. One thing to note is that [the browser's implementation of CSS custom properties](#css-custom-properties) occurs at runtime and so native CSS custom properties are inherently shareable between microfrontends.

SASS and other build tools often produce global CSS rather than [scoped CSS](#scoped-css). This behavior can be undesirable in a microfrontends architecture because it can result in CSS class name collisions between your microfrontends. To avoid this, you can use [SASS modules](https://blog.bitsrc.io/how-to-use-sass-and-css-modules-with-create-react-app-83fa8b805e5e) (or similar) to scope the CSS.

## Webpack CSS resources

Below is a list of commonly used Webpack loaders and plugins that can help with loading CSS:

- [css-loader](https://webpack.js.org/loaders/css-loader/#root) facilitates using CSS Modules and properly handling `@import()` within CSS files.
- [style-loader](https://webpack.js.org/loaders/style-loader/#root) facilitates mounting CSS via `<style>` elements. This is often used in development mode, but not production.
- [postcss-loader](https://webpack.js.org/loaders/postcss-loader/#root) is similar to CSS modules, but for more advanced use cases that require PostCSS.
- [sass-loader](https://webpack.js.org/loaders/sass-loader/#root) can be used to compile SASS to CSS.
- [single-spa-css](#single-spa-css) can be used to automatically detect which CSS files to load during the `mount` lifecycle function of your single-spa application or parcel.

## single-spa-css

The `single-spa-css` npm package implements helper functions for loading, mounting, and unmounting CSS. It does this by adding `<link rel="stylesheet">` elements to the DOM to mount the CSS, and removing the `<link>` from the DOM when it's time to unmount the CSS.

### Installation

```sh
npm install single-spa-css

pnpm install single-spa-css

yarn add single-spa-css
```

### Usage

```js
import singleSpaCss from 'single-spa-css';

const cssLifecycles = singleSpaCss({
  // required: a list of CSS URLs to load
  // can be omitted if webpackExtractedCss is set to true, do not specify Webpack extracted css files here
  cssUrls: ['https://example.com/main.css'],

  // optional: defaults to false. This controls whether extracted CSS files from Webpack
  // will automatically be loaded. This requires using the ExposeRuntimeCssAssetsPlugin,
  // which is documented below.
  webpackExtractedCss: false,

  // optional: defaults to true. Indicates whether the <link> element for the CSS will be
  // unmounted when the single-spa microfrontend is unmounted.
  shouldUnmount: true,

  // optional: defaults to 5000. The number of milliseconds to wait on the <link> to load
  // before failing the mount lifecycle.
  timeout: 5000
})

const reactLifecycles = singleSpaReact({...})

// Export an array of lifecycles to integrate with a framework's
// single-spa lifecycles. The order matters.
export const bootstrap = [
  cssLifecycles.bootstrap,
  reactLifecycles.bootstrap
]

export const mount = [
  // The CSS lifecycles should be before your framework's mount lifecycle,
  // to avoid a Flash of Unstyled Content (FOUC)
  cssLifecycles.mount,
  reactLifecycles.mount
]

export const unmount = [
  // The CSS lifecycles should be after your framework's unmount lifecycle,
  // to avoid a Flash of Unstyled Content (FOUC)
  reactLifecycles.unmount,
  cssLifecycles.unmount
]
```

If you want some CSS files to unmount, but others to stay mounted, use the following syntax:

```js
const cssLifecycles = singleSpaCss({
  cssUrls: [
    {
      href: "https://example.com/main.css",
      shouldUnmount: true,
    },
    {
      href: "https://example.com/other.css",
      shouldUnmount: false,
    },
  ],
});
```

### Webpack Plugin

**This plugin currently only supports webpack 5. See [issue 7](https://github.com/single-spa/single-spa-css/issues/7) to track webpack 4 support.**

single-spa-css includes a Webpack plugin that integrates with [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin), which allows you to load CSS files that are extracted and otherwise would not be loaded. The Webpack plugin exposes the names of the extracted CSS files to your bundle under the `__webpack_require__.cssAssets` and `__webpack_require__.cssAssetFileName` variables. The `cssAssets` variable contains the name of the Webpack chunk, and the `cssAssetFileName` function converts the chunk name into the extracted CSS asset's file name. These can be used manually, or you can specify the `webpackExtractedCss` option in single-spa-css to have it automatically mount and unmount those CSS files.

#### Usage

In your Webpack config, add the following:

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExposeRuntimeCssAssetsPlugin = require("single-spa-css/ExposeRuntimeCssAssetsPlugin.cjs");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ExposeRuntimeCssAssetsPlugin({
      // The filename here must match the filename for the MiniCssExtractPlugin
      filename: "[name].css",
    }),
  ],
};
```
