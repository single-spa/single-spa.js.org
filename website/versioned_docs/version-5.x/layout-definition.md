---
id: layout-definition
title: Layout Definition
sidebar_label: Layout Definition
---

A layout is a combination of HTMLElements, routes, and [single-spa applications](/docs/building-applications/). Layout is defined statically in your [root config](/docs/configuration/) to handle your top level routes and dom elements. Single-spa-layout should not be used outside of the root config; instead, a UI framework (React, Angular, Vue) should handle layouts within the applications.

You may define layouts as either HTML templates or JSON objects. Defining in JSON is supported for organizations who prefer storing their layout definitions in a database instead of code. Both HTML and JSON layouts have the same feature set. However, storing layouts in code is generally preferred and encouraged by default. If you're just getting started with single-spa-layout, we encourage using an HTML template.

Once you define your layout, you should `constructRoutes`, `constructApplications`, and `constructLayoutEngine`.

## HTML Layouts

You may define HTML layouts either within your root config's index.html file, or within a javascript string that is parsed as HTML. We generally encourage defining the layout within your root config's index.html file.

To define a layout within your index.html file, create a `<template id="single-spa-layout">` element that contains your layout. Within the template, add a `<single-spa-router>` element, along with any routes, applications, and dom elements.

Note that HTMLElements defined in your layout are static - there is no way to forcibly re-render or change them.

```html
<!-- index.ejs -->
<html>
  <head>
    <template>
      <single-spa-router>
        <div class="main-content">
          <route path="settings">
            <application name="settings"></application>
          </route>
        </div>
      </single-spa-router>
    </template>
  </head>
</html>
```

```js
// Javascript construction of HTMLElements is also possible
const routerElement = new DOMParser().parseFromString(`
<single-spa-router>
  <div class="main-content">
    <route path="settings">
      <application name="settings"></application>
    </route>
  </div>
</single-spa-router>
`, "text/html").documentElement.querySelector('single-spa-router');
```

## JSON Layouts

You may define your layout as JSON, including routes, applications, and arbitrary dom elements.

```json
{
  "routes": [
    { "type": "route", "path": "settings", "routes": [
      { "type": "application", "name": "settings" }
    ]}
  ]
};
```

## Layout Elements

A layout element is an HTMLElement or JSON object that represents either a dom node, route, or application.

### `<template>`

The [`template` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) is only used when defining the layout as HTML. Its purpose is to prevent its contents from being displayed by the browser, since the layout definition should not be visible to user.

```html
<template>
  <!-- Define your layout here -->
  <single-spa-router></single-spa-router>
</template>
```

Note that `<template>` elements are not fully supported in IE11. However, you do not need to polyfill template elements in order to use them in single-spa-layout. Instead, simply add `style="display: none;"` to the template to prevent its contents from being displayed in IE11.

```html
<template style="display: none;">
  <!-- Define your layout here -->
  <single-spa-router></single-spa-router>
</template>
```

### `<single-spa-router>`

The `single-spa-router` element is required as the top level container of your layout. All attributes are optional.

```html
<single-spa-router mode="hash|history" base="/" disableWarnings></single-spa-router>
```

```json
{
  "mode": "hash|history",
  "base": "/",
  "disableWarnings": false,
  "containerEl": "#container",
  "routes": []
}
```

**Attributes**

- `mode` (optional): A string that must be `hash` or `history` that defaults to `history`. This indicates whether the routes should be matched against the Location [pathname](https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname) or [hash](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash).
- `base` (optional): A string URL prefix that will be considered when matching route paths.
- `disableWarnings` (optional): A boolean that turns of single-spa-layout's console warnings when the elements provided are incorrect.
- `containerEl` (optional): A string [CSS Selector](https://developer.mozilla.org/en-US/docs/Glossary/CSS_Selector) or [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) that is used as the container for all single-spa dom elements. Defaults to `body`.

### `<route>`

The `route` element is used to control which applications and dom elements are shown for a top-level URL route. It may contain HTMLElements, applications, or other routes. Note that the route path is a URL prefix, not an exact match.

```html
<route path="clients">
  <application name="clients"></application>
</route>

<route default>
  <application name="clients"></application>
</route>
```

```json
{
  "type": "route",
  "path": "clients",
  "routes": [
    { "type": "application", "name": "clients" }
  ],
  "default": false
}
```

**Attributes**

Routes must either have a path or be a default route.

- `routes` (required): An array of children elements that will be displayed when the route is active
- `path` (optional): A path that will be matched against the browser's URL. The path is relative to its parent route (or the base URL). Leading and trailing `/` characters are unnecessary and are automatically applied. Paths may contain "dynamic segments" by using the `:` character (`"clients/:id/reports"`). Single-spa-layout uses single-spa's [`pathToActiveWhen` function](/docs/api/#pathtoactivewhen) to convert the path string to an [activity function](/docs/configuration/#activity-function). By default, the path is a prefix because it will match when any subroutes of the path match. See the `exact` attribute for exact matching.
- `default` (optional): A boolean that determines whether this route will match all remaining URLs that have not been defined by sibling routes. This is useful for 404 Not Found pages. A sibling route is defined as any route with the same nearest-parent-route.
- `exact` (optional, defaults to `false`): A boolean that determines whether the `path` should be treated as a prefix or exact match. When `true` the route does not activate if there are trailing characters in the URL path that are not specified in the `path` attribute.
- `props`: An object of [single-spa custom props](/docs/building-applications/#lifecycle-props) that will be provided to the application when it is mounted. Note that these can be defined differently for the same application on different routes. You can read more about defining props within your HTML [in the docs below](#props).

### `<application>`

The `application` element is used to render a [single-spa application](/docs/building-applications/). Applications may be contained within route elements, or may exist at the top level as applications that will always be rendered. A container HTMLElement will be created by single-spa-layout when the application is rendered. The container HTMLElement is created with an `id` attribute of `single-spa-application:appName` such that your [framework helpers](/docs/ecosystem/) will automatically use it when [mounting](/docs/building-applications/#mount) the application.

The same application may appear multiple times in your layout, under different routes. However, each application can only be defined once per-route.

```html
<!-- Basic usage -->
<application name="appName"></application>

<!-- Use a named loader that is defined in javascript -->
<application name="appName" loader="mainContentLoader"></application>

<!-- Add single-spa custom props to the application. The value of the prop is defined in javascript -->
<application name="appName" props="myProp,authToken"></application>
```

```js
// Basic usage
{
  "type": "application",
  "name": "appName"
}

// Use a single-spa parcel as a loading UI
// You may also use Angular, Vue, etc.
const parcelConfig = singleSpaReact({...})
{
  "type": "application",
  "name": "appName",
  "loader": parcelConfig
}

// Use an HTML string as a loading UI
{
  "type": "application",
  "name": "appName",
  "loader": "<img src='loading.gif'>"
}

// Add single-spa custom props
{
  "type": "application",
  "name": "appName",
  "props": {
    "myProp": "some-value"
  }
}
```

**Attributes**

- `name` (required): The string [application name](/docs/api/#configuration-object).
- `loader` (optional): An HTML string or [single-spa parcel config object](/docs/parcels-overview/#parcel-configuration). The loader will be mounted to the DOM while waiting for the application's [loading function](/docs/configuration/#loading-function-or-application) to resolve. You can read more about defining loaders [in the docs below](#loading-uis)
- `props`: An object of [single-spa custom props](/docs/building-applications/#lifecycle-props) that will be provided to the application when it is mounted. Note that these can be defined differently for the same application on different routes. You can read more about defining props within your HTML [in the docs below](#props).

### `<fragment>`

The `fragment` element is used to specify a dynamic server-rendered portion of the template. Fragments are commonly used to inline import maps, add dynamic CSS / fonts, or customize the HTML `<head>` metadata. See [sendLayoutHTTPResponse](/docs/layout-api#sendlayouthttpresponse) for more information about how fragments are rendered. Note that `<fragment>` elements only have meaning in server templates, not browser-only templates.

```html
<fragment name="importmap"></fragment>

<fragment name="head-metadata"></fragment>
```

### `<assets>`

The `<assets>` element is used to specify the location of server-rendered application assets, including CSS and fonts. When server-side rendered, the `<assets>` element is replaced by all the assets from the active applications on the page. Applications specify their assets as part of the `renderApplication` function provided to [the `sendLayoutHTTPResponse` function](/docs/layout-api#sendLayoutHTTPResponse).

```html
<assets></assets>
```

### `<redirect>`

The `<redirect>` element is used to specify route redirects. On the server side, this is done with `res.redirect()`, which results in an HTTP 302 being sent to the browser. Within the browser, this is done by [canceling navigation](/docs/api#canceling-navigation) and then calling [`navigateToUrl()`](/docs/api#navigatetourl).

Redirects are always defined with **absolute paths.** This means that nesting a `<redirect>` inside of a route will not behave any differently than placing the redirect at the top level. All redirects should have full paths, including a leading slash.

```html
<redirect from="/" to="/login"></redirect>
<redirect from="/old-settings" to="/login-settings"></redirect>
```

In JSON, redirects are defined as a top-level property:

```json
{
  "routes": [],
  "redirects": {
    "/": "/login",
    "/old-settings": "/settings"
  }
}
```

### DOM elements

Arbitrary HTMLElements may be placed anywhere in your layout. You may define arbirary dom elements in both HTML and JSON.

single-spa-layout only supports updating DOM elements during route transitions. Arbitrary re-renders and updates are not supported.

DOM elements defined within a route will be mounted/unmounted as the route becomes active/inactive. If you define the same DOM element twice under different routes, it will be destroyed and recreated when navigating between the routes.

```html
<nav class="topnav"></nav>
<div class="main-content">
  <button>A button</button>
</div>
```

#### JSON DOM Nodes

The format of dom nodes in JSON is largely based on the [parse5](https://github.com/inikulin/parse5) format.

##### HTMLElement

Elements are defined with their `nodeName` as the `type`. HTML attributes are specified as the `attrs` array, where each item is an object with `name` and `value` properties.

```json
{
  "type": "div",
  "attrs": [
    {
      "name": "class",
      "value": "blue"
    }
  ]
}
```

Child nodes are specified via the `"routes"` property.

```json
{
  "type": "div",
  "routes": [
    {
      "type": "button"
    }
  ]
}
```

##### Text Nodes

Text Nodes are defined separately from the parent containers, as separate objects with `type` set to `#text`:

```json
{
  "type": "#text",
  "value": "The displayed text"
}
```

Button with text:

```json
{
  "type": "button",
  "routes": [
    {
      "type": "#text",
      "value": "The button text"
    }
  ]
}
```

Note that text nodes may not have `routes` (children).

##### Comment Nodes

Comment Nodes are defined as objects whose `type` is `#comment`:

```json
{
  "type": "#comment",
  "value": "The comment text"
}
```

Note that comments may not have `routes` (children).


## Props

[Single-spa custom props](/docs/building-applications/#lifecycle-props) may be defined on both `route` and `application` elements. Any route props will be merged together with the application props to create the final props that are passed to [the single-spa lifecycle functions](/docs/building-applications/#registered-application-lifecycle).

### JSON

In a JSON layout definition, you can define props with the `props` property on your applications and routes:

```js
import { constructRoutes } from 'single-spa-layout';

constructRoutes({
  routes: [
    { type: "application", name: "nav", props: { title: "Title" } },
    { type: "route", path: "settings", props: { otherProp: "Some value" } },
  ]
})
```

### HTML

Defining props on JSON objects is straightforward, as they are an object that can contain strings, numbers, booleans, objects, arrays, etc. However, defining complex data types in HTML is not as straightforward, since HTML attributes are always strings. To work around this, single-spa-layout allows you to name your props in the HTML, but define their values in javascript.

```html
<application name="settings" props="authToken,loggedInUser"></application>
```

```js
import { constructRoutes } from 'single-spa-layout';

const data = {
  props: {
    authToken: "fds789dsfyuiosodusfd",
    loggedInUser: fetch('/api/logged-in-user').then(r => r.json())
  }
}

const routes = constructRoutes(document.querySelector('#single-spa-template'), data)
```

The full API documentation for the `constructRoutes` API explains the `data` object in detail.

## Loading UIs

It is often desireable to show a loading UI when waiting for an application's code to download and execute. Single-spa-layout allows you to define per-application loaders that will be mounted to the DOM while the application's [loading function](/docs/configuration/#loading-function-or-application) is pending. It is possible to share the same loading UI for multiple applications.

A loading UI is defined as either an HTML string or as a [parcel config object](/docs/parcels-overview/#parcel-configuration). HTML strings are best for static, non-interactive loaders, whereas parcels are best when you want to use a framework (Vue, React, Angular, etc) to dynamically render the loader.

Defining loaders via javascript objects is straightforward, as they are an object that can contain strings, numbers, booleans, objects, arrays, etc. However, defining complex data types in HTML is not as straightforward, since HTML attributes are always strings. To work around this, single-spa-layout allows you to name your loaders in the HTML, but define their values in javascript.

```html
<application name="topnav" loader="topNav"></application>
<application name="topnav" loader="settings"></application>
```

```js
import { constructRoutes } from 'single-spa-layout';

// You may also use Angular, Vue, etc.
const settingsLoader = singleSpaReact({...})

const data = {
  loaders: {
    topNav: `<nav class="placeholder"></nav>`,
    settings: settingsLoader
  }
}

const routes = constructRoutes(document.querySelector('#single-spa-template'), data)
```

The full API documentation for the `constructRoutes` API explains the `data` object in detail.

## Transitions

Support for route transitions is planned, but not yet implemented. If you have interest in this feature, please provide use cases, upvotes, and feedback in [this tracking issue](https://github.com/single-spa/single-spa-layout/issues/11).

## Default Routes (404 Not Found)

Default routes are routes that activate when no other sibling routes match the current URL. They do not have a URL path and may contain any combination of DOM elements and single-spa applications.

```html
<single-spa-router>
  <route path="cart"></route>
  <route path="product-detail"></route>
  <route default>
    <h1>404 Not Found</h1>
  </route>
</single-spa-router>
```

Default routes are matched against their **sibling** routes, which allows for nesting:

```html
<single-spa-router>
  <route path="cart"></route>
  <route path="product-detail/:productId">
    <route path="reviews"></route>
    <route path="images"></route>
    <route default>
      <h1>Unknown product page</h1>
    </route>
  </route>
  <route default>
    <h1>404 Not Found</h1>
  </route>
</single-spa-router>
```

Sibling routes are defined as those that share a "nearest parent route." This means that they do not have to be direct siblings in your HTML/JSON, but can be nested within DOM elements:

```html
<single-spa-router>
  <route path="product-detail/:productId">
    <div class="product-content">
      <route path="reviews"></route>
      <route path="images"></route>
    </div>
    <!-- The reviews and images routes are siblings, since they share a nearest parent route -->
    <!-- The default route will activate when the URL does not match reviews or images -->
    <route default>
      <h1>Unknown product page</h1>
    </route>
  </route>
</single-spa-router>
```

## Error UIs

When a single-spa application fails to load, mount, or unmount, it moves to [SKIP_BECAUSE_BROKEN or LOAD_ERROR](/docs/api#getappstatus) status. When in SKIP_BECAUSE_BROKEN status, often nothing is visible to the user and they won't understand why the application is not showing. You can call [unloadApplication](/docs/api#unloadapplication) to move the application back to NOT_LOADED status, which will cause single-spa to re-attempt downloading and mounting it. However, it is often desireable to show an error state when the application errors.

An error UI is defined as either an HTML string or as a [parcel config object](/docs/parcels-overview/#parcel-configuration). HTML strings are best for static, non-interactive error states, whereas parcels are best when you want to use a framework (Vue, React, Angular, etc) to dynamically render the error state. The error UI will be shown whenever the application's status is SKIP_BECAUSE_BROKEN or LOAD_ERROR.

Defining error uis via javascript objects is straightforward, as the string or parcel can be defined in an application object via the `error` property:

```js
{
  "type": "application",
  "name": "nav",
  "error": "<h1>Oops! The navbar isn't working right now</h1>"
}
```

```js
const myErrorParcel = singleSpaReact({...})

{
  "type": "application",
  "name": "nav",
  "error": myErrorParcel
}
```

However, defining error uis in HTML is less straightforward, since HTML attributes are always strings and therefore can't be a parcel config object. To work around this, error UIs are named in the HTML, but defined in javascript:

```html
<template id="single-spa-layout">
  <single-spa-router>
    <application name="nav" error="navError"></application>
  </single-spa-router>
</template>
```

```js
const myErrorParcel = singleSpaReact({...})

const routes = constructRoutes(document.querySelector('#single-spa-layout'), {
  errors: {
    navError: myErrorParcel
    // alternatively:
    // navError: "<h1>Oops! The navbar isn't working right now</h1>"
  }
})
```
