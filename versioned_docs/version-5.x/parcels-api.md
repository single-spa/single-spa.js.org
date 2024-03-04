---
id: parcels-api
title: Parcels API
sidebar_label: Parcels API
---

Most parcel methods will be called on the parcel itself, with the exception being around mounting.

## mounting

Both mount methods take a [parcelConfig](parcels-overview.md#parcel-configuration) and [additional props](parcels-api.md#parcel-props).
They both return a [parcel object](parcels-api.md#parcel-object). The parcel object contains all additional exposed methods.

### Parcel Props

When mounting a parcel the second argument is props, a JavaScript object of properties to be passed to the parcel. This object must have a domElement prop, which is the dom node that the parcel will mount into.

```js
const parcelProps = {
  customerId: 7,
  numberOfTasks: 42,
  domElement: document.createElement("div"),
};
```

### mountParcel

`applicationProps.mountParcel(parcelConfig, parcelProps)`. Each application is provided a mountParcel function.
The main advantage to using an applications `mountParcel` function is that parcels mounted via an
applications `mountParcel` will be automatically unmounted when the application is unmounted.

The first argument may be either an object or a function that returns a promise that resolves with the object (a loading function).

```js
// Synchronous mounting
const parcel1 = applicationProps.mountParcel(parcelConfig, parcelProps);

// Asynchronous mounting. Feel free to use webpack code splits or SystemJS dynamic loading
const parcel2 = applicationProps.mountParcel(
  () => import("./some-parcel"),
  parcelProps,
);
```

### mountRootParcel

The [mountRootParcel](api.md#mountrootparcel) method will mount the parcel but `unmount` must be called manually.

## Parcel Object

The parcel object contains the following functions and methods:

- [mount](parcels-api.md#mount)
- [unmount](parcels-api.md#unmount)
- [update](parcels-api.md#update)
- [getStatus](parcels-api.md#getstatus)
- [loadPromise](parcels-api.md#loadpromise)
- [bootstrapPromise](parcels-api.md#bootstrappromise)
- [mountPromise](parcels-api.md#mountpromise)
- [unmountPromise](parcels-api.md#unmountpromise)

### unmount

`parcel.unmount()` returns a promise that resolves once the parcel is successfully unmounted. The promise may throw an error which needs to be handled.

### mount

`parcel.mount()` returns a promise that resolves once the parcel is successfully mounted. The promise can throw an error which needs to be handled.

### update

`parcel.update(props)` allows you to change the props passed into a parcel. Note that not all parcels support being updated. The `update` function returns a promise that resolves when the parcel is finished updating. See [other documentation](parcels-overview.md#update-optional) and [example](https://single-spa.js.org/docs/parcels-overview.html#quick-example) for more information.

```js
const parcel = singleSpa.mountRootParcel(parcelConfig, parcelProps);
parcel.update(newParcelProps);
```

### getStatus

`parcel.getStatus()` returns a string of that parcels status. The string status is one of the following:

- `NOT_BOOTSTRAPPED`: The parcel has not been bootstrapped
- `BOOTSTRAPPING`: The parcel is bootstrapping but has not finished
- `NOT_MOUNTED`: The parcel has bootstrapped, but is not mounted
- `MOUNTED`: The parcel is currently active and mounted to the DOM
- `UNMOUNTING`: The parcel is unmounting, but has not finished
- `UPDATING`: The parcel is currently being updated, but has not finished
- `SKIP_BECAUSE_BROKEN`: The parcel threw an error during bootstrap, mount, unmount, or update. Other parcels may continue normally, but this one will be skipped.

### loadPromise

`parcel.loadPromise()` returns a promise that will resolve once the parcel has been loaded.

### bootstrapPromise

`parcel.bootstrapPromise()` returns a promise that will resolve once the parcel has been bootstrapped.

### mountPromise

`parcel.mountPromise()` returns a promise that will resolve once the parcel has been mounted. This is helpful for knowing exactly when a parcel has been appended to the DOM

### unmountPromise

`parcel.unmountPromise()` returns a promise that will resolve once the parcel has been unmounted.
