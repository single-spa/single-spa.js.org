---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ - Questions
---

## What is the recommended single-spa setup?
We recommend a setup that uses ES modules + [import maps](https://github.com/WICG/import-maps) (or [SystemJS](https://github.com/systemjs/systemjs) to polyfill these if you need better browser support).  This setup has several advantages:
1. Common libraries are easy to manage, and are only downloaded once. You can also preload these for a small speed boost as well using the standard preload spec.
2. Sharing code / functions / variables is as easy as an import statement, just like in a monothlithic setup
3. Lazy loading applications is easy, which enables you to speed up initial load times
4. Each application (AKA microservice, AKA ES module) can be independently developed and deployed. Teams are enabled to work at their own speed, experiment (within reason as defined by the organization), deploy, and QA on thier own schedules.
5. Working on one area of an app doesn’t require you to download the entire frontend codebase — you just run your microservice locally and the other ones are automatically pulled from what’s on your dev/stage/prod environment

## Is there a performance hit to doing microservices this way?
When setup in the [recommended way](#what-is-the-recommended-single-spa-setup), your code performance and bundle size will be nearly identical to a single application that has been code-split. The major differences will be the addition of the single-spa library (and SystemJS if you chose to use it). Other differences mainly just come down to the difference between one (webpack / rollup / etc.) code bundle and ES modules.

## I don’t quite understand what single-spa does?
Another way to think of single-spa is that it is just a top level router. When one route is active, it downloads and executes the code for that route.

## How can I have only one version of (React, Vue, Angular, etc.) on the page?
Using the recommended setup, you setup your import map to download that once. Then, tell each application to _not_ bundle that application code; instead, it will given to you at runtime in the browser. See webpack’s “externals” docs for how to do this.

You do have the option of _not_ excluding those libraries (for example if you want to experiment with a newer version of a different library alltogether) but be aware of the effect that will have on user's bundle sizes and application speed.

## What are import maps?
[Import maps](https://github.com/WICG/import-maps) improve the developer experience of ES modules by allowing you to write something like `import React from "react"` instead of needing to use an absolute or relative URL for your import statement. The same is also true of importing from other single-spa applications, e.g. `import {MyButton} from "styleguide"`. The import-map spec is currently in the process of being accepted as a web standard and at the time of writing has been implemented in Chrome.

## How can I share application state between two or more applications?
In general, we recommend trying to avoid this — it couples those apps together. If you find yourself doing this frequently between apps, you may want to consider that those separate apps should actually just be one app.

Generally, it’s better to just make an API request for the data that each app needs, even if parts of it have been requested by other apps. In practice, if you’ve designed your application boundaries correctly, there will end up being very little application state that is truly shared — your friends list has different data requirements than your social feed.

However, that doesn’t mean it can’t be done. Here are several ways:
1. Create a shared API request library that can cache requests and their responses. If somone hits an API, and then that API is hit again by another application, it just uses the cache
2. Expose the shared state as an export, and other libraries can import it. Observables (like [RxJS](https://rxjs-dev.firebaseapp.com/)) are useful here since they can stream new values to subscribers
3. Use [custom browser events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#Creating_custom_events) to communicate

## Should I use microservices on the frontend?
If you’ve ran into some of the headaches a monolithic repo has, then you should really consider it.

In addition, if your organization is setup in a Spotify-type model (e.g. where there are autonomous squads that own full-stack features) then microservices on the frontend will fit very well into your setup.

However, if you’re just starting off and have a small project or a small team, we would recommend you stick with a monolith (i.e. not microservices) until you get to the point that scaling is getting hard. (Don’t worry, we’ll be here to help you migrate)

## Can I use more than one library or framework?
Yes. However, it’s something you’ll want to consider hard because it splits your front-end organization into specialities that aren’t compatible (e.g. a React specialist may have problems working in an Angular app).

However, it is great for migrations _away_ from an older or unwanted library, which allows you to slowly rip out the code in the old application and replace it with new code in the new library (see Google results for [the strangler pattern](https://www.google.com/search?q=the+strangler+pattern&oq=the+strangler+pattern)).

It also is a way to allow large organizations to experiment on different libraries without a strong commitment to them.

**Just be conscious of the effect it has on your users and their experience using your app.**