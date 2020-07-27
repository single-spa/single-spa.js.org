---
id: ecosystem-alpinejs
title: single-spa-alpinejs
sidebar_label: AlpineJS
---

[single-spa-alpinejs](https://github.com/single-spa/single-spa-alpinejs) is a helper library for mounting alpinejs components as
single-spa applications or parcels.

## Installation

```sh
npm install --save single-spa-alpinejs

# or
yarn add single-spa-alpinejs
```

Alternatively, you can use single-spa-alpinejs from a CDN as a global variable:

```html
<script src="https://cdn.jsdelivr.net/npm/single-spa-alpinejs"></script>
```

Note that you might want to lock down the package to a specific version. See [here](https://cdn.jsdelivr.net/npm/single-spa-alpinejs) for
how to do that.

## Usage

- There are three ways the you can define AlpineJS components as single-spa applications or parcels.

### _1 - Template Only_

- The simplest way were the template contains all the required data and initialization logic (including `x-data` and `x-init`) as part of the dom. The template is provided via the options attribute `template`

#### Via npm

```js
import singleSpaAlpinejs from 'single-spa-alpinejs';
const alpinejslifecycles = singleSpaAlpinejs({
  template: `
    <div class="mui-panel" x-data="{ open: false }">
      <div class="mui--test-display1">Test x-show</div>
      <button class="mui-btn mui-btn--primary" @click="open = !open">Open/Close</button>
      <div x-show="open" class="mui--text-display4">
          Hey, I'm open
      </div>
    </div>`,
});

export const bootstrap = alpinejslifecycles.bootstrap;
export const mount = alpinejslifecycles.mount;
export const unmount = alpinejslifecycles.unmount;
```

#### Via cdn

Example usage when installed via CDN:

```js
const alpinejsApp = window.singleSpaAlpinejs.default({
  template: `
    <div class="mui-panel" x-data="{ open: false }">
      <div class="mui--test-display1">Test x-show</div>
      <button class="mui-btn mui-btn--primary" @click="open = !open">Open/Close</button>
      <div x-show="open" class="mui--text-display4">
          Hey, I'm open
      </div>
    </div>`,
});

singleSpa.registerApplication({
  name: 'name',
  app: alpinejsApp,
  activeWhen: () => true,
});
```

### _2 - Template with externally defined `x-data`_

- You could also provide `x-data` externally and the helper will add it to the component.
  - The `x-data` can be provided in the following forms (via the options attribute `xData`)
    - an object
    - a function
    - a function returning a promise.

#### Via npm

```js
import singleSpaAlpinejs from 'single-spa-alpinejs';
const alpinejslifecycles = singleSpaAlpinejs({
  template: `
    <div class="mui-panel">
      <div class="mui--test-display1"> Test x-show</div>
      <button class="mui-btn mui-btn--primary" @click="open = !open">Open/Close</button>
      <div x-show="open" class="mui--text-display4">
          Hey, I'm open
      </div>
    </div>`,
  xData: { open: false },
});

export const bootstrap = alpinejslifecycles.bootstrap;
export const mount = alpinejslifecycles.mount;
export const unmount = alpinejslifecycles.unmount;
```

#### Via cdn

Example usage when installed via CDN:

```js
const alpinejsApp = window.singleSpaAlpinejs.default({
  template: `
    <div class="mui-panel">
      <div class="mui--test-display1"> Test x-show</div>
      <button class="mui-btn mui-btn--primary" @click="open = !open">Open/Close</button>
      <div x-show="open" class="mui--text-display4">
          Hey, I'm open
      </div>
    </div>`,
  xData: { open: false },
});

singleSpa.registerApplication({
  name: 'name',
  app: alpinejsApp,
  activeWhen: () => true,
});
```

### _3 - Template with externally defined `x-data` with `x-init`_

- You can also provide `x-init` externally along with the `x-data` and the helper will add it to the component.

- The `x-init` can be provided in the following forms (via the options attribute `xInit`)
  - a function
  - a function returning a promise
- Please note the `xData` attribute _must_ be provided otherwise the `xInit` attribute will be ignored.
- The sample below references the example from the [Alpine Toolbox - Alpine JS and fetch()](https://codepen.io/eddieebeling/pen/dyoZOBX) and demonstrates how you can use the `xInit` and `xData` attributes to create an AlpineJS application .

#### Via npm

```js
import singleSpaAlpinejs from 'single-spa-alpinejs';
const appTemplate = `
    <div class="w-full h-full text-gray-800">
        <h1 class="mt-0 mb-3 font-light text-3xl" x-text="title"><!-- title text --></h1>
        <p class="text-xl text-gray-600 font-light mb-4" x-html="intro"><!-- intro text --></p>
        <div class="flex flex-wrap -mx-2 pb-8">
        <!-- begin: user card -->
        <template x-for="user in users" :key="user.id">
            <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto font-light">
            <div class="flex bg-white rounded-lg shadow-md m-2 border-l-4 
                        border-white hover:shadow-2xl hover:border-pink-500 
                        cursor-pointer relative">
                <div class="p-4 pr-6 leading-normal">
                <div class="font-medium text-xl truncate" x-text="user.name"></div>
                <div class="truncate uppercase text-xs text-gray-500 font-semibold 
                pb-2 tracking-widest" x-text="user.company.name"></div>
                <div class="" x-text="user.phone"></div>
                <a class="text-blue-600 hover:text-blue-700 mr-4 block"     
                    x-bind:href="'mailto:' + user.email" x-text="user.email"></a>     
                <a class="text-blue-600 hover:text-blue-700 block" 
                x-bind:href="'https://' + user.website" x-text="user.website"></a>
                </div>
            </div>
            </div>
        </template>
        <!-- end: user card -->
        </div>
    </div>
  `;

const appDataFn = ({ title, name }) => ({
  title,
  intro:
    'Implement a simple <code class="text-md text-pink-600">fetch()</code> request to render a list of items using Alpine.js :)',
  users: [],
  open: false,
  name,
});

const appXInitFn = (id) => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => (document.querySelector(`#${id}`).__x.$data.users = data));
};

const opts = {
  template: appTemplate,
  xData: (data) => appDataFn(data), // pass props to x-data
  xInit: appXInitFn
};

const alpinejslifecycles = singleSpaAlpinejs(opts);

export const bootstrap = alpinejslifecycles.bootstrap;
export const mount = alpinejslifecycles.mount;
export const unmount = alpinejslifecycles.unmount;
```

#### Via cdn

Example usage when installed via CDN:

```js
const alpinejsApp = window.singleSpaAlpinejs.default(opts);

singleSpa.registerApplication({
  name: 'name',
  app: alpinejsApp,
  activeWhen: () => true,
});
```

## API / Options

single-spa-html is called with an object that has the following properties:

- `template` (required): An HTML string or a function that returns a string. The function will be called with the single-spa custom props. The returned string is injected into the DOM during the single-spa mount lifecycle.
- `domElementGetter` (optional): A function that returns the dom element container into which the HTML will be injected. If omitted,
  a default implementation is provided that wraps the template in a `<div>` that is appended to `document.body`.
- `xData` (optional): An object or a function or a function that returns a promise.The returned string is injected into the DOM as the `x-data` attribute during the single-spa mount lifecycle.
- `xInit` (optional): A function or a function that returns a promise.The function provided is added to the global scope and the function initiation along with the root dom element id as a parameter is injected into the DOM as the `x-init` attribute during the single-spa mount lifecycle.Please note the `xData` attribute _must_ be provided otherwise the `xInit` attribute will be ignored.
