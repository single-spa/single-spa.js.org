---
id: ecosystem-svelte
title: single-spa-svelte
sidebar_label: Svelte
---

single-spa-svelte is a helper library that helps implement [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount) for for use with [svelte](https://svelte.technology/). Check out the [single-spa-svelte github](https://github.com/single-spa/single-spa-svelte).

## Quickstart

First, in the [single-spa application](https://github.com/single-spa/single-spa/blob/master/docs/applications.md#registered-applications), run `npm install --save single-spa-svelte`. Then, create an entry file with the following.

```js
import singleSpaSvelte from 'single-spa-svelte';
import myRootSvelteComponent from 'my-root-svelte-component.js';

const svelteLifecycles = singleSpaSvelte({
  component: myRootSvelteComponent,
  domElementGetter: () => document.getElementById('svelte-app'),
  props: { someData: 'data' }
});

export const bootstrap = svelteLifecycles.bootstrap;
export const mount = svelteLifecycles.mount;
export const unmount = svelteLifecycles.unmount;
```

## Options

All options are passed to single-spa-svelte via the `opts` parameter when calling `singleSpaSvelte(opts)`. The following options are available:

- `component`: (required) The root component that will be rendered. This component should be compiled by svelte and **not** an iife.
- `domElementGetter`: (optional) A function which will return a dom element. The root component will be mounted in this element. If not provided, a default dom element will be provided.

Svelte-specific options

- `anchor`: (optional) A child of the dom element identified by `domElementGetter` to render the component immediately before
- `hydrate`: (optional) See the svelte [Creating a component](https://svelte.dev/docs#Creating_a_component) documentation
- `intro`: (optional) If `true`, will play transitions on initial render, rather than waiting for subsequent state changes
- `props`: (optional) An object of properties to supply to the component

## single-spa props

All [single-spa props](/docs/api/#registerapplication) are passed to the svelte component as props. The props provided to `singleSpaSvelte({props: {...}})` are merged with the single-spa props.
