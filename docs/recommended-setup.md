---
id: recommended-setup
title: The Recommended Setup
sidebar_label: Overview
---

Single-spa itself is not opinionated about your build tools, CI process, or local development workflow. However, to implement single-spa you will have to figure all of those things out (and more). To help you decide how to approach these problems, the single-spa core team has put together a "recommended setup" that gives an opinionated approach to solving the practical problems of microfrontends.

## Overview
We recommend a setup that uses in-browser ES modules + import maps (or SystemJS to polyfill these if you need better browser support). This setup has several advantages:

1. Common libraries are easy to manage, and are only downloaded once. If you're using SystemJS, you can also preload them for a speed boost as well.
2. Sharing code / functions / variables is as easy as import/export, just like in a monolithic setup
3. Lazy loading applications is easy, which enables you to speed up initial load times
4. Each application (AKA microservice, AKA ES module) can be independently developed and deployed. Teams are enabled to work at their own speed, experiment (within reason as defined by the organization), QA, and deploy on thier own schedules. This usually also means that release cycles can be decreased to days instead of weeks or months
5. A great developer experience (DX): go to your dev environment and add an import map that points the application's url to your localhost. See sections below for details

## Alternatives

[qiankun](https://github.com/umijs/qiankun) is a popular alternative to this recommended setup.

## In-browser versus build-time modules
[Tutorial video](https://www.youtube.com/watch?v=Jxqiu6pdMSU&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=2)

## Import Maps
[Tutorial video](https://www.youtube.com/watch?v=Lfm2Ge_RUxs&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=3)

## SystemJS

## Lazy loading

## Local development
[Tutorial video](https://www.youtube.com/watch?v=vjjcuIxqIzY&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=4)

## Build tools (Webpack / Rollup)

## Utility modules (styleguide, API, etc)

## Shared dependencies

## Deployment
[Tutorial video](https://www.youtube.com/watch?v=QHunH3MFPZs&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=5)

## Continuous Integration (CI)

## Applications versus parcels

## Inter-app communication

## State management
