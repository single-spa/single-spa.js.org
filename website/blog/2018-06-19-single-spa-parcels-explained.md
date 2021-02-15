---
title: single-spa parcels, explained
author: Joel Denning
authorURL: https://twitter.com/joelbdenning
authorImageURL: https://avatars2.githubusercontent.com/u/5524384?s=400&u=ff145fcb2ae5305555628a446e9f725d4e145aaa&v=4
---

Ever since single-spa@1.0.0, the single-spa team has been dedicated to bringing microservices to the frontend. We have made it possible for AngularJS, React, Angular, Vue, and other frameworks to coexist side by side in the same page.

And with the release of [version 4](https://github.com/single-spa/single-spa/releases/tag/v4.0.0), I’m pleased to announce that [single-spa](https://github.com/single-spa/single-spa) is expanding that effort so that **_individual components_** written with different frameworks can interoperate. It is new terrain for the single-spa community, which previously had focused on getting large applications to interoperate with each other, instead of the individual components.

## Another way to do framework agnostic components?

For those familiar with [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), you may be wondering why a JavaScript library would try to do what browsers are starting natively to do.

And as one of the contributors to the custom elements polyfill, let me be the first one to say that we did not make this decision lightly.

If you’re interested in diving into the details, check out [One Company’s Relationship With Custom Elements](https://medium.com/canopy-tax/one-companys-relationship-with-custom-elements-d360baf3b253), which explains some of the difficulties we’ve been through with web components and custom elements.

TLDR: React and some other frameworks don’t interop with custom elements very well. Additionally dealing with inner HTML, attributes vs properties, and customized builtins can be a pain.

## Okay but you haven’t told me what a single-spa parcel is

A parcel is single-spa’s way of building a component in one framework and using it in another.

To implement a parcel, just create a JavaScript object that has 3–4 functions on it. We call this JavaScript object a _parcel config_ and there are three required functions to implement: bootstrap, mount, and unmount. A fourth function, update, is optional.

Each of the functions will be called by single-spa at the right time, but the parcel config will control what happens. In other words, single-spa controls the “when,” but the parcel config controls the “what” and the “how.”

Once you’ve implemented the parcel config, simply call singleSpa.mountRootParcel(parcelConfig, parcelProps) to mount it. This is the key to what makes parcels framework agnostic — regardless of whether the parcel config is implemented with React, Angular, Vue, or anything else, to use the parcel you always just call mountRootParcel().

## A few more specifics

We’ve glossed over a few things that I want to touch on real quick:

- **How do you implement the lifecycle functions on the parcel config?**

      		Use a helper library for your framework of choice. [single-spa-react](https://github.com/single-spa/single-spa-react), [single-spa-angular](https://github.com/single-spa/single-spa-angular) (for angular@2+), [single-spa-angularjs](https://github.com/single-spa/single-spa-angularjs), [single-spa-vue](https://github.com/single-spa/single-spa-vue), and [others](https://github.com/single-spa/single-spa/blob/master/docs/single-spa-ecosystem.md) will implement the entire parcel config for you.

- **What are the props you pass to mountRootParcel()?**

      		The props passed as the second argument to singleSpa.mountRootParcel(parcelConfig, parcelProps) are an object with one required prop and as many custom props as you’d like. The required prop is domElement, which tells the parcel where to mount. And the custom props get passed through to the parcel config lifecycle functions.

- **How do you re-render and unmount a parcel?**

      		The singleSpa.mountRootParcel() function returns a parcel object that lets you re-render and unmount the parcel whenever you’d like to.

      		<iframe src="https://medium.com/media/b2d981b380b937009f7ce84e1cc2d753" frameBorder="0" />

## Syntactic sugar makes this easier

Calling all of those functions manually might get annoying. So let’s make it easier. Here’s an example of some syntactic sugar for React. Similar features will be added soon for Angular, Vue, and other frameworks.

<iframe src="https://medium.com/media/9b5904d3423359cb2eef410f9ee35648" frameBorder="0" />

## How hard is it to try this out?

You can get started with parcels immediately, without using the rest of single-spa. To do so, either npm install or script tag single-spa, then call mountRootParcel with your first parcel config.

You can also check out [this codepen example](https://codepen.io/joeldenning/pen/qKVoQg?editors=0010#0) to start out.

And if you are already a user of [single-spa applications](https://github.com/single-spa/single-spa/blob/master/docs/applications.md), parcels mean that your applications can mount and unmount shared functionality whenever you want them to. Since parcels don’t have [activity functions](https://github.com/single-spa/single-spa/blob/master/docs/configuration#activity-function), you don’t have to set up routes for them.

## Let us know what you think!

We’d love to get your feedback on parcels. What do you think of this new way of framework interop? Is the implementation easy to understand? Are parcels useful for you or do they not quite fit into what you’re trying to accomplish?How hard was it for you to try out?

Check out the [official docs](https://github.com/single-spa/single-spa/blob/master/docs/parcels.md) for more examples, explanations, and [api documentation](https://github.com/single-spa/single-spa/blob/master/docs/parcels-api.md).

And let us know your thoughts in the [single-spa Slack channel](https://join.slack.com/t/single-spa/shared_invite/zt-mafdeybq-0v1aIm3KKaqyVCT2xeny3Q), a [Github issue](https://github.com/single-spa/single-spa/issues), or [on Twitter](https://twitter.com/Single_spa)!
