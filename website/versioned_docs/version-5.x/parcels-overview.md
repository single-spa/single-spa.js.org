---
id: parcels-overview
title: Parcels
sidebar_label: Overview
---

_Parcels are an advanced feature of single-spa. We recommend that you use applications as the primary type of microfrontend in your architecture. See [this explanation](/docs/module-types) for more details_

A single-spa parcel is a framework agnostic component. It is a chunk of functionality meant to be mounted manually by an application, without having to worry about which framework was used to implement the parcel or application. Parcels use similar methodology as registered applications but are mounted by a manual function call rather than the activity function.
A parcel can be as large as an application or as small as a component and written in
any language as long as it exports the correct lifecycle events. In a single-spa world, your SPA contains
many registered applications and potentially many parcels. Typically we recommend you mount a parcel within
the context of an application because the parcel will be unmounted with the application.

If you are only using one framework, it is recommended to prefer framework components (i.e., React, Vue, and Angular components) over single-spa parcels. This is because framework components interop easier with each other than when there is an intermediate layer of single-spa parcels. You may import components between registered applications via `import` statements. You should only create a single-spa parcel if you need it to work with multiple frameworks. ([More details](/docs/recommended-setup#in-browser-versus-build-time-modules))

## Quick Example

```js
// The parcel implementation
const parcelConfig = {
  // optional
  bootstrap(props) {
    // one time initialization
    return Promise.resolve();
  },
  // required
  mount(props) {
    // use a framework to create dom nodes and mount the parcel
    return Promise.resolve();
  },
  // required
  unmount(props) {
    // use a framework to unmount dom nodes and perform other cleanup
    return Promise.resolve();
  },
  // optional
  update(props) {
    // use a framework to update dom nodes
    return Promise.resolve();
  },
};

// How to mount the parcel
const domElement = document.getElementById('place-in-dom-to-mount-parcel');
const parcelProps = { domElement, customProp1: 'foo' };
const parcel = singleSpa.mountRootParcel(parcelConfig, parcelProps);

// The parcel is being mounted. We can wait for it to finish with the mountPromise.
parcel.mountPromise
  .then(() => {
    console.log('finished mounting parcel!');
    // If we want to re-render the parcel, we can call the update lifecycle method, which returns a promise
    parcelProps.customProp1 = 'bar';
    return parcel.update(parcelProps);
  })
  .then(() => {
    // Call the unmount lifecycle when we need the parcel to unmount. This function also returns a promise
    return parcel.unmount();
  });
```

## Parcel configuration

A parcel is just an object with 3 or 4 functions on it. When mounting a parcel, you can provide either the object itself or a loading function that asynchronously downloads the parcel object.
Each function on a parcel object is a lifecycle method, which is a function that returns a promise. Parcels have two required lifecycle methods (mount and unmount) and two optional lifecycles method (bootstrap and update).
When implementing a parcel, it's strongly recommended that you use the [lifecycle helper methods](/docs/ecosystem/#help-for-frameworks).
An example of a parcel written in React would look like this:

```js title="myParcel.js"
import React from 'react';
import ReactDom from 'react-dom';
import singleSpaReact from 'single-spa-react';
import MyParcelComponent from './my-parcel-component.component.js';
export const MyParcel = singleSpaReact({
  React,
  ReactDom,
  rootComponent: MyParcelComponent,
});

// in this case singleSpaReact is taking our inputs and generating an object with the required lifecycles.
```

Then to use the parcel you just created all you need to do is use the `Parcel` component provided in [single-spa-react](/docs/ecosystem-react/#parcels).

```jsx title="mycomponent.js"
import Parcel from 'single-spa-react/parcel'
import { MyParcel } from './myparcel.js'

export class myComponent extends React.Component {
  render () {
    return (
      <Parcel
        config={MyParcel}
        { /* optional props */ }
        { /* and any extra props you want here */ }
      />
    )
  }
}
```

Note that in some cases the optional props are required [(see additional examples)](/docs/ecosystem-react/#examples).

## Parcel Lifecycles

Start with [applications](/docs/api/#registered-application-lifecycle) to learn more about the functionality of single-spa's lifecycle methods.

### Bootstrap

This lifecycle function will be called once, right before the parcel is
mounted for the first time.

```js
function bootstrap(props) {
  return Promise.resolve().then(() => {
    // This is where you do one-time initialization
    console.log('bootstrapped!');
  });
}
```

### Mount

If the parcel is not mounted this lifecycle function is called when ever `mountParcel` is called. When
called, this function should create DOM elements, DOM event listeners, etc. to render content to the user.

```js
function mount(props) {
  return Promise.resolve().then(() => {
    // This is where you tell a framework (e.g., React) to render some ui to the dom
    console.log('mounted!');
  });
}
```

### Unmount

This lifecycle function will be called whenever the parcel is mounted and one of the following cases is true:

- `unmount()` is called
- The parent parcel or application is unmounted

When called, this function should clean up all DOM elements, DOM event listeners, leaked memory, globals,
observable subscriptions, etc. that were created at any point when the parcel was mounted.

```js
function unmount(props) {
  return Promise.resolve().then(() => {
    // This is where you tell a framework (e.g., React) to unrender some ui from the dom
    console.log('unmounted!');
  });
}
```

### Update (optional)

The update lifecycle function will be called whenever the user of the parcel calls `parcel.update()`.
Since this lifecycle is optional, the user of a parcel needs to check whether the parcel has implemented the update lifecycle before attempting to make the call.

## Example use cases

### Modals

`App1` handles everything related to contacts (highly cohesive) but somewhere in `App2` we need to create a contact.
We could do any number of things to share the functionality between application 1 and 2:

- If both are written in the same framework we could export/import components.
- We could reimplement creating a contact (loss of cohesion)
- We could use single-spa parcels.

Exporting a parcel from `App1` that wraps the createContact modal component gives us the ability to share components and behavior across disparate frameworks, without losing application cohesion.
App1 can export a modal as a single-spa parcel and App2 can import the parcel and use it easily. One major advantage is that in the below example
the parcel/modal from App1 that is being used by App2 will also be unmounted, without unmounting/mounting of App1.

```js
// App1
export const AddContactParcel = {
  bootstrap: bootstrapFn,
  mount: mountFn,
  unmount: unmountFn,
}

// App2
// get the parcel configuration in this case I'm using systemJS and react
...
componentDidMount() {
  SystemJS.import('App1').then(App1 => {
    const domElement = document.body
    App2MountProps.mountParcel(App1.AddContactParcel, {domElement})
  })
}
...
```

## `mountRootParcel` vs `mountParcel`

Single spa exposes two APIs for working with parcels. These API's are differentiated primarily by the context in which the parcel is created and how to access the API's

|                   | mountRootParcel        | mountParcel                  |
| ----------------- | ---------------------- | ---------------------------- |
| context           | singleSpa              | application                  |
| unmount condition | manual only            | manual + application unmount |
| api location      | singleSpa named export | provided in lifecycle prop   |

### Which should I use?

In general we suggest using the application-aware `mountParcel` API. `mountParcel` allows you to treat the parcel just like a component inside your application without considering what framework it was written in and being forced to remember to call unmount.

### How do I get the `mountParcel` API?

In order to keep the function contextually bound to an application it is provided to the application as a [lifecycle prop](/docs/building-applications/#lifecyle-props). You will need to store and manage that function yourself in your application.

Example of storing the application specific `mountParcel` API:

```js
// App1
let mountParcel
export const bootstrap = [
  (props) => {
    mountParcel = props.mountParcel
    return Promise.resolve()
  },
  // more bootstrap lifecycles if necessary
]
...
```

note: some libraries (such as react) support a framework specific context that makes it easy to store/manage. In those cases we've written some helper methods to abstract away the need to manage and store the `mountParcel` method.
