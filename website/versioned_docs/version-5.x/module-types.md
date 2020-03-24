---
id: module-types
title: single-spa microfrontend types
sidebar_label: Microfrontend Types
---

# Concept: single-spa microfrontend types

Single-spa has [different categories](/docs/microfrontends-concept#types-of-microfrontends) of microfrontends. It is up to you where and how you use each of them. However, the single-spa core team has [recommendations](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules).

Here is how each single-spa microfrontend works conceptually. This information should help you understand our [recommendations](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules).

| Topic                | application                       | parcel                               | utility                              |
| -------------------- | --------------------------------- | ------------------------------------ | ------------------------------------ |
| routing              | has multiple routes               | no routes                            | no routes                            |
| API                  | declarative API                   | imperative API                       | no single-spa api                    |
| renders UI           | renders UI                        | renders UI                           | doesn't directly render UI           |
| lifecycles           | single-spa managed lifecylces     | custom managed lifecycles            | no lifecycles                        |
| When to use          | Core building block               | only needed with multiple frameworks | useful to share common logic         |

Each single-spa microfrontend is an in-browser javascript module ([explaination](/docs/recommended-setup#in-browser-versus-build-time-modules)).

## Applications

### Applications are declarative
Applications use a declarative api. Your single-spa config (also sometimes called root config) defines applications ahead of time, defines the condition at which they are active, but doesn't mount the application directly.

### Applications have managed lifecycles
single-spa manages registered applications and is in charge of all of their lifecycles. This prevents you from writing a bunch of logic about when applications should mount and unmount; single-spa takes care of that for you.
All single spa needs to make this work automatically is for an activity function that describes when your application should be active.

## Parcels

### Parcels are imperative
Parcels exist in many ways as an escape hatch from the normal declarative flow. They exist primarily to allow you to reuse UI across applications when those applications are written in multiple frameworks.

### You manage the lifecycles of Parcels
When you call `mountParcel` or `mountRootParcel` [(see api)](/docs/parcels-api) the parcel is mounted immediately and returns the parcel object. You need to call the `unmount` method on the parcel manually when the component that calls `mountParcel` unmounts.

### Parcels are best suited for sharing UI between frameworks
Creating a parcel is as easy as using the [single-spa helpers](/docs/ecosystem#help-for-frameworks) for that framework on a specific component/UI. This returns an object (`parcelConfig`) that single-spa can use to create and mount a parcel.
Because single-spa can mount a parcel anywhere, this gives you a way to share UI/components across frameworks. It should not be used if the shared UI is being used in another application of the same framework.
For example: `applicationOne` is written in Vue and contains all the UI/Logic to create a user. `application2` is written in React and needs to create a user. Using a single-spa parcel allows you to wrap your `app1` Vue component
in a way that will make it work inside `application2` despite the different frameworks. Even better if `application2` is unmounted by single-spa (per the activity function returning false)
Think of parcels as a single-spa specific implementation of webcomponents.

## Utility modules share common logic
Utility modules are a great place to share common logic. Instead of each application creating their own implementation of common logic, you can use a plain javascript object (single-spa utility) to share that logic.
For example: Authorization. How does each application know which user is logged in? You could have each application ask the server or read a JWT but that creates duplicate work in each application.
Using Utility modules you can implement logic around who is logged in one module (with all the necessary methods exported on the module) and each single-spa application can use the logic by importing the methods from the utilty module.
This approach also works well for data [fetching](/docs/recommended-setup#api-data).
