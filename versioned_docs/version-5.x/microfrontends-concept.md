---
id: microfrontends-concept
title: Microfrontends Overview
sidebar_label: Overview
---

# Concept: Microfrontends

Tutorial video: [Youtube](https://www.youtube.com/watch?v=3EUfbnHi6Wg&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=1) / [Bilibili](https://www.bilibili.com/video/av83619684)

A microfrontend is a microservice that exists within a browser.

Microfrontends are sections of your UI, often consisting of dozens of components, that use frameworks like React, Vue, and Angular to render their components. Each microfrontend can be managed by a different team and may be implemented using its own framework. It is practical and suggested to use just one framework for all your microfrontends, although you may add additional frameworks when migrating or when experimenting.

Each microfrontend has its own git repository, its own `package.json` file, and its own build tool configuration. As a result, each microfrontend has **an independent build process** and **an independent deploy / CI**. This generally means that each repo has fast build times.

## Comparison to Microservices

Microservices are backend services that run in their own operating system process, control their own databases, and communicate with each other over the network.

Compare that to microfrontends that all exist within a single browser tab: all browser JavaScript within a tab exists in a single operating system process (and even thread!). Browser JavaScript generally does not directly access databases, and communication within a browser tab happens in-memory instead of over the network.

So what do they have in common???

Independent builds and deployments. Think of the DOM as the shared resource that your microfrontends are owning. One microfrontend's DOM should not be touched by another microfrontend, similar to how one backend microservice's database should not be touched by any microservice except the one that owns/controls it.

## Concrete Technical Definition

In the context of single-spa, a microfrontend is often an in-browser JavaScript module. You can read more about this [in the recommended setup](/docs/recommended-setup#in-browser-versus-build-time-modules).

## Types of Microfrontends

In the context of single-spa, there are three kinds of microfrontends:

1. [single-spa applications](/docs/building-applications): Microfrontends that render components for a set of specific routes.
2. [single-spa parcels](/docs/parcels-overview): Microfrontends that render components without controlling routes.
3. [utility modules](/docs/recommended-setup#utility-modules-styleguide-api-etc): Microfrontends that export shared JavaScript logic without rendering components.

A web app may include one or more types of microfrontends. See [an in-depth comparison](/docs/module-types) and our recommendations for [choosing between microfrontend types](/docs/recommended-setup#applications-versus-parcels-versus-utility-modules).

## Communication between Microfrontends

`import { thing } from 'other-microfrontend'` is the preferred way to communicate between microfrontends. [Here is some documentation](/docs/recommended-setup#inter-app-communication) that goes over this in more detail.

## Relationship to single-spa

single-spa is a small, 5kb (gzipped) npm package that orchestrates the mounting and unmounting of your microfrontends. It knows when to mount the applications based on [activity functions](/docs/api/#registerapplication) and can do so in a framework agnostic way with the help of small [adapter libraries](/docs/ecosystem).

## Performance

Microfrontends are often more performant than the monoliths from which they originate. This is due to built-in lazy loading (via [loading functions](/docs/api/#registerapplication)) and other performance-related best practices. Your monolith likely has "skeletons in its closet" - microfrontends gives you a migration path that will expose and resolve the problems caused by those skeletons. One important performance consideration is to share a single instance of large libraries (such as React, Vue, or Angular), which is highly encouraged. To do so, see our [recommended setup](/docs/recommended-setup#shared-dependencies).
