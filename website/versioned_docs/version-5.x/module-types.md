---
id: module-types
title: single-spa Microfrontend Types
sidebar_label: Microfrontend Types
---

# Concept: single-spa Microfrontend Types

Single-spa has [different categories](/docs/microfrontends-concept/#types-of-microfrontends) of microfrontends. It is up to you where and how you use each of them. However, the single-spa core team has [recommendations](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules).

Here is how each single-spa microfrontend works conceptually. This information should help you understand our [recommendations](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules).

| Topic       | Application                   | Parcel                               | Utility                                           |
| ----------- | ----------------------------- | ------------------------------------ | ------------------------------------------------- |
| Routing     | has multiple routes           | has no routes                        | has no routes                                     |
| API         | declarative API               | imperative API                       | exports a public interface                        |
| Renders UI  | renders UI                    | renders UI                           | may or may not render UI                          |
| Lifecycles  | single-spa managed lifecycles | custom managed lifecycles            | external module: no direct single-spa lifecycles  |
| When to use | core building block           | only needed with multiple frameworks | useful to share common logic, or create a service |

Each single-spa microfrontend is an in-browser JavaScript module ([explanation](/docs/recommended-setup#in-browser-versus-build-time-modules)).

## Applications

### Applications are declarative

Applications use a declarative API called `registerApplication`. Your single-spa config (also sometimes called the root config) defines applications ahead of time and defines the conditions for when each application is active, but it doesn't mount the applications directly.

### Applications have managed lifecycles

single-spa manages registered applications and is in charge of all of their lifecycles. This prevents you from needing to write a bunch of logic about when applications should mount and unmount; single-spa takes care of that for you.
All that single-spa needs to make this work automatically is an activity function that describes when your application should be active.

### Applications and their public interface

Applications [_must_ export their lifecycles](/docs/building-applications#registered-application-lifecycle) so they can be managed by single-spa, but they can also export additional methods, values, components, parcels, or more as part of their public interface. It is common to use these exports inside another application so you can create highly cohesive modules with low coupling.

## Parcels

### Parcels are imperative

Parcels exist in many ways as an escape hatch from the normal declarative flow. They exist primarily to allow you to reuse pieces of UI across applications when those applications are written in multiple frameworks.

### You manage the lifecycles of parcels

When you call `mountParcel` or `mountRootParcel` [(see API)](/docs/parcels-api) the parcel is mounted immediately and returns the parcel object. You need to call the `unmount` method on the parcel manually when the component that calls `mountParcel` unmounts.

### Parcels are best suited for sharing pieces of UI between frameworks

Creating a parcel is as easy as using the [single-spa helpers](/docs/ecosystem#help-for-frameworks) for that framework on a specific component/UI. This returns an object (`parcelConfig`) that single-spa can use to create and mount a parcel.
Because single-spa can mount a parcel anywhere, this gives you a way to share UI/components across frameworks. It should not be used if the shared UI is being used in another application of the same framework.
For example: `application1` is written in Vue and contains all the UI and logic to create a user. `application2` is written in React and needs to create a user. Using a single-spa parcel allows you to wrap your `application1` Vue component
in a way that will make it work inside `application2` despite the different frameworks.
Think of parcels as a single-spa specific implementation of webcomponents.

## Utilities

### How do Utilites relate to single-spa?

A utility is an in-browser module that (generally) has it's own repository and CI process. It exports a public interface of functions and variables that any other microfrontend can import and use. A utility microfrontend is just like any other microfrontend, except it doesn't serve as a single-spa application or parcel.

### Utility modules share common logic

Utility modules are a great place to share common logic. Instead of each application creating their own implementation of common logic, you can use a plain JavaScript object (single-spa utility) to share that logic.
For example: Authorization. How does each application know which user is logged in? You could have each application ask the server or read a JWT but that creates duplicate work in each application.
Using the utility module pattern would allow you to create one module that implements the authorization logic. This module would export any needed methods, and then your other single-spa applications could use those authorization methods by importing them.
This approach also works well for data [fetching](/docs/recommended-setup#api-data).

### Examples of Utility MFEs

The following are commonly implemented as a Utility MFE:

- Notification service
- Styleguide/component library
- Error tracking service
- Authorization service
- Data fetching
