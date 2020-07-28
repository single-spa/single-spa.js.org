---
id: ecosystem-alpinejs
title: single-spa-alpinejs
sidebar_label: AlpineJS
---

[single-spa-alpinejs](https://github.com/single-spa/single-spa-alpinejs) is a helper library for mounting [alpinejs](https://github.com/alpinejs/alpine/) components as
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

- The simplest way where the template contains all the required data and initialization logic (including `x-data` and `x-init`) as part of the dom. The template is provided via the options attribute `template`

### _2 - Template with externally defined `x-data`_

- You could also provide `x-data` externally and the helper will add it to the component.
  - The `x-data` can be provided in the following forms (via the options attribute `xData`)
    - an object
    - a function that returns an object
    - a function that returns a promise which resolves with an object.

### _3 - Template with externally defined `x-data` with `x-init`_

- You can also provide `x-init` externally along with the `x-data` and the helper will add it to the component.

- The `x-init` can be provided in the following forms (via the options attribute `xInit`) and needs to be a function.
- Please note the `xData` attribute _must_ be provided otherwise the `xInit` attribute will be ignored.
- The sample below references the example from the [Alpine Toolbox - Alpine JS and fetch()](https://www.alpinetoolbox.com/examples/) and demonstrates how you can use the `xInit` and `xData` attributes to create an AlpineJS application .

### Usage Examples

#### _1 - Template Only_

```js
import singleSpaAlpinejs from 'single-spa-alpinejs';

const alpinejslifecycles = singleSpaAlpinejs({
  template: `
    <div class="rounded overflow-hidden shadow-lg font-sans p-1 m-1" 
         x-data="{ open: false }">
      <div class="font-bold p-1">Example for x-show attribute</div>
      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
              hover:text-white py-2 px-4 border border-blue-500 
              hover:border-transparent rounded" 
              @click="open = !open">Open/Close</button>
      <div x-show="open" class="text-4xl">
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

- The usage is similar and once the library is loaded it will be available globally and accessed via the `window` object.

```js
const alpinejsApp = window.singleSpaAlpinejs({
  template: `
    <div class="rounded overflow-hidden shadow-lg font-sans p-1 m-1" 
         x-data="{ open: false }">
      <div class="font-bold p-1">Example for x-show attribute</div>
      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
      hover:text-white py-2 px-4 border border-blue-500 
      hover:border-transparent rounded" @click="open = !open">Open/Close</button>
      <div x-show="open" class="text-4xl">
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

#### _2 - Template with externally defined `x-data`_

```js
import singleSpaAlpinejs from 'single-spa-alpinejs';

const alpinejslifecycles = singleSpaAlpinejs({
  template: `
    <div class="rounded overflow-hidden shadow-lg font-sans p-1 m-1">
      <div class="font-bold p-1">Example for x-show attribute</div>
      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
      hover:text-white py-2 px-4 border border-blue-500 
      hover:border-transparent rounded" @click="open = !open">Open/Close</button>
      <div x-show="open" class="text-4xl">
          Hey, I'm open
      </div>
    </div>`,
  xData: { open: false },
});

export const bootstrap = alpinejslifecycles.bootstrap;
export const mount = alpinejslifecycles.mount;
export const unmount = alpinejslifecycles.unmount;
```

#### _3 - Template with externally defined `x-data` with `x-init`_

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
  xInit: appXInitFn,
};

const alpinejslifecycles = singleSpaAlpinejs(opts);

export const bootstrap = alpinejslifecycles.bootstrap;
export const mount = alpinejslifecycles.mount;
export const unmount = alpinejslifecycles.unmount;
```

## API / Options

single-spa-html is called with an object that has the following properties:

- `template` (required): An HTML string or a function that returns a string. The function will be called with the single-spa custom props. The returned string is injected into the DOM during the single-spa mount lifecycle.
- `domElementGetter` (optional): A function that returns the dom element container into which the HTML will be injected. If omitted,
  a default implementation is provided that wraps the template in a `<div>` that is appended to `document.body`.
- `xData` (optional): An object or a function or a function that returns a promise.The returned string is injected into the DOM as the `x-data` attribute during the single-spa mount lifecycle.
- `xInit` (optional): A function or a function that returns a promise. The function provided is added to the global scope and the function initiation along with the root dom element id as a parameter is injected into the DOM as the `x-init` attribute during the single-spa mount lifecycle. Please note the `xData` attribute _must_ be provided otherwise the `xInit` attribute will be ignored. The function you provide `xInit`

### xData and xInit Handling

- This section covers the details of how `xData` and `xInit` option attributes are processed by the single spa helper.

- Consider the example below

```js
const appDataFn = () => { open: false, loading: true }
const appXInitFn = (domId) => {
	console.log('Hello from appXInitFn');
  // domId provides access to the parent dom element where x-data and x-init are defined
	document.querySelector(`#${domId}`).__x.$data.loading = false
}

const opts = {
  template: appTemplate,	          // base template
  xData: (data) => appDataFn(data), // pass props to x-data
  xInit: appXInitFn,		            // x-Init function
};

const alpinejsApp = singleSpaAlpinejs(opts);

singleSpa.registerApplication({
  name: 'myapp',
  app: alpinejsApp,
  activeWhen: () => true,
});

```

- The helper does the following 
  - Adds the template to the dom wrapped in `parent dom element` with and id that has a prefix of `alpine`. In this case it will be `id='alpine-myapp'` 
  - Attaches a resolved `xData` as a string `x-data="{ "name": "myapp" ,"open": false }"` to the `parent dom element`. 
  - It will make the user defined `appXInitFn` available globally as an attribute of `window.singleSpaAlpineXInit` and will be accessible via variable `window.singleSpaAlpineXInit.myapp` 
  - Attaches a resolved `xInit` as a string that calls the globally defined variable `x-init="singleSpaAlpineXInit.myapp('alpine-myapp')"` to the `parent dom element`.
  - **Note** that this also passes `id` of the `parent dom element` which can then be used to access the alpine data elements to update the state as required.

  #### Special characters in the application names

  - You may have special characters in the application name for example `@my/app`. See the example below

  ```js
   	singleSpa.registerApplication({
    	name: '@my/app',
     	app: alpinejsApp,
     	activeWhen: () => true,
   		});
  ```

  - The single spa helper converts these to valid `global` function names by `replacing` `all the special characters` with underscores (`_`). This does not require any special handling from the user as the helper takes care of this internally

  - In the above case the `xInit` dom element would look like the following `x-init="singleSpaAlpineXInit._my_app('alpine-@my/app')"` where the `xInit` function is available as a `global` variable `_my_app`.
