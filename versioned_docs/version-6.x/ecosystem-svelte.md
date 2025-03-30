---
id: ecosystem-svelte
title: Svelte
sidebar_label: Svelte
---

## Svelte v5

[@wjfe/single-spa-svelte](https://github.com/WJSoftware/wjfe-single-spa-svelte) is a helper library that helps implement [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for use with [svelte v5](https://svelte.dev/).

### Quickstart

```typescript
import { singleSpaSvelte } from '@wjfe/single-spa-svelte';
import App from './App.svelte';

const lc = singeSpaSvelte(App,
  () => document.getElementById('id'), // Generally unneeded
  {
    mountOptions: { // Svelte's MountOptions
      props { a: 'b' }
    }
  }
);

export const bootstrap = lc.bootstrap;
export const mount = lc.mount;
export const unmount = lc.unmount;
export const update = lc.update;
```

The DOM element-getter function is generally not needed.  Pass `undefined` to skip it.  If you don't need to pass any options, just simplify to `const lc = singleSpaSvelte(App);`.

### Options

These are the possible options:

- `preMount`:  Used to specify a callback function to execute before the MFE/parcel is mounted.  It receives the target HTML element as its only argument.
- `postUnmount`:  Used to specify a callback function to execute right after the MFE/parcel is unmounted.  It receives the target HTML element as its only argument.
- `mountOptions`:  Svelte's mounting options as accepted by [Svelte's mount()](https://svelte.dev/docs/svelte/svelte#mount) function.  The documentation is quite lacking, unfortunately.  Search for the `MountOptions` type directly [in the source code](https://github.com/sveltejs/svelte/blob/main/packages/svelte/types/index.d.ts).  The `target` option is unsupported.

:::info More Information
`@wjfe/single-spa-svelte` is a third-party library.  Find more detailed information on the options in [its README](https://github.com/WJSoftware/wjfe-single-spa-svelte#the-options-parameter).
:::

### Mounting Parcels

`@wjfe/single-spa-svelte` provides the `SspaParcel` Svelte component that can be used to mount any `single-spa` parcel inside a Svelte v5 project.  Follow [the library's README](https://github.com/WJSoftware/wjfe-single-spa-svelte#the-sspaparcel-component) on the topic to understand how to use it properly.

## Svelte v4 and Below

single-spa-svelte is a helper library that helps implement [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for use with [svelte](https://svelte.dev/). Check out the [single-spa-svelte github](https://github.com/single-spa/single-spa-svelte).

### Quickstart

First, in the [single-spa application](https://github.com/single-spa/single-spa/blob/master/docs/applications.md#registered-applications), run `npm install --save single-spa-svelte`. Then, create an entry file with the following.

```js
import singleSpaSvelte from "single-spa-svelte";
import myRootSvelteComponent from "my-root-svelte-component.js";

const svelteLifecycles = singleSpaSvelte({
  component: myRootSvelteComponent,
  domElementGetter: () => document.getElementById("svelte-app"),
  props: { someData: "data" },
});

export const bootstrap = svelteLifecycles.bootstrap;
export const mount = svelteLifecycles.mount;
export const unmount = svelteLifecycles.unmount;
```

### Options

All options are passed to single-spa-svelte via the `opts` parameter when calling `singleSpaSvelte(opts)`. The following options are available:

- `component`: (required) The root component that will be rendered. This component should be compiled by svelte and **not** an IIFE.
- `domElementGetter`: (optional) A function which will return a dom element. The root component will be mounted in this element. If not provided, a default dom element will be provided.

Svelte-specific options

- `anchor`: (optional) A child of the dom element identified by `domElementGetter` to render the component immediately before
- `hydrate`: (optional) See the svelte [Creating a component](https://svelte.dev/docs#Creating_a_component) documentation
- `intro`: (optional) If `true`, will play transitions on initial render, rather than waiting for subsequent state changes
- `props`: (optional) An object of properties to supply to the component

## single-spa props

All [single-spa props](/docs/api/#registerapplication) are passed to the svelte component as props. The props provided to `singleSpaSvelte({props: {...}})` (for **Svelte v4** or lower) or `singleSpaSvelte(App, undefined, { mountOptions: { props: {...}}})` (for **Svelte v5**) are merged with the single-spa props.
