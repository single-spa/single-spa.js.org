---
id: cross-microfrontend-imports-outside-of-an-mfe-architecture
title: Cross microfrontend imports outside of an MFE architecture
sidebar_label: Mixed architectures 
---

This document aims to highlight problems and explore some solutions related to sharing code between a project that is built with single-spa and another project that is not. Sharing code between different projects has been common in the JS ecosystem for years. When sharing code between mixed architectures there are a few challenges that should be examined in depth. Depending on how your MFE code is [divided, built, and delivered](/docs/separating-applications) you will have different challenges in sharing code between projects of different architectures.

This document is structured as a decision tree using your [MFE application structure as the top level decision](/docs/separating-applications).

## How is your MFE Application structured?
- [One Code Repo, one build](#one-code-repo-one-build)
- [NPM packages](#mfes-through-npm-packages)
- [MonoRepo](#monorepo)
- [Recommended/Dynamic Module Loading](#recommended-dynamic-module-loading)

## One Code Repo One build

How do you plan on or how are you publishing the code you wish to share from your MFE repo/project to be reused in another project?
- [As an NPM module](#sharing-npm-modules-between-mfes-and-non-mfes)
- [Code Duplication](#code-duplication)

## MFES through NPM packages

This situation is the easiest to share code, but it comes with many different tradeoffs. It is easy to share code between MFEs and non-MFEs because each project leveraging the same "build-time" approach. [Check out sharing npm modules](#sharing-npm-modules-between-mfes-and-non-mfes) for an overview.


## MonoRepo

How are you building your MFE application?
- [Each application is published as an NPM module and one build combines everything together](#sharing-npm-modules-between-mfes-and-non-mfes)
- [Each application is published following the recommended set-up and is combined at run-time via import-maps](#recommended-dynamic-module-loading)

## Recommended: Dynamic Module Loading

If you are following the [recommended setup](/docs/recommended-setup) or using [create-single-spa](/docs/create-single-spa) you unlock some [spectacular benefits](/docs/separating-applications#comparison) in your application. One disadvantage of this approach is that your MFE code is typically not bundled as an NPM module, so sharing code between an MFE architected in this way and a traditional NPM/build-time setup is more complex.

In this structure be aware of the following limitations when trying to share code between MFEs and NPM modules:
- An NPM module used in a non-mfe context cannot directly interop with MFEs without modifications
- [A MFE module cannot execute in another environment without modifications](#running-mfes-in-another-environment)


# Reference Items

## NPM and microfrontend interop

An NPM module that wants to use microfrontends and still work in multiple environments will need to choose a path forward for interoperability.
- [Indirect/Abstract interop](indirect-interop-with-microfrontends)
- [Don't use code that isn't published to NPM](#npm-all-the-way-down)
- [Publish all microfrontends to NPM as well as dynamic environment](#running-mfes-in-another-environment)
- [Fork the project](forking-for-interop)

## Forking for interop

If you must be able to use MFEs in a dynamic module environment and want to keep your builds as simple as possible forking the project may be a good solution. This could be an especially valuable approach in a situation where you're migrating from a NPM/build-time centric solution to a microfrontend/run-time specific solution. The cost of maintaining abstract interop code or publishing microfrontends to NPM and complicating the migration may needs to be weighed against the cost of "maintaining" two separate projects.

## Indirect interop with microfrontends

Instead of having an NPM module use microfrontends and limit itself to only microfrontend envrionments it could use abstract methods to interop with microfrontends. Specifically instead of directly importing a microfrontend it could rely upon a wrapper module to map different module of different types, resolved in different ways, to a common API.

A good example of this is a shared component library currently published exclusively to NPM. If you want that shared component library to work as both an NPM module in a standard node environment and a microfrontend in an environment with dynamic module resolution you will need to change how the component library works. Instead of creating a component library and publishing it to NPM you'd create an abstract component library and publish that to NPM. Then create/publish an NPM specific implementation of that abstract component library to NPM and create/deploy an MFE specific implementation of the abstract component library using `import-map-deployer`.

### Example of abstract react component
```js
export default function CancelButton({translationFn, onClick}) {
  return <Button onClick={onClick}>{translationFn('Cancel')}</Button>
}
```
Instead of exporting a `CancelButton` component that directly relies upon `npm-translation-method` you would need to export a component that could use a provided translation method so that the NPM specific implementation could provide `npm-translation-method` and the microfrontend specific implementaton could provide `mfe-translation-method`. Both methods would have to have to map the same signature which may create tight coupling issues.

Disadvantages:
- coupling issues
- complex
- difficult to manage
- potential performance issues
## Running MFEs in another environment

If you wish to execute a microfrontend in a different environment the microfrontend must conform to the expectations of the environment in which they are running.

### Node/NPM environment

Node/NPM by default expect that modules are present at build-time. If you wish to use a single-spa microfrontend in node you will need to [ensure that the microfrontend is present at build time](#modifying-dynamic-microfrontends-to-work-in-node) or [the node environment can be modified to dynamically resolve the microfrontend](#dyanmic-module-loading-in-node).

## Modifying dynamic microfrontends to work in node

Microfrontends designed for an environment with dynamic module loading (SystemJS) can be modified to work in node by changing the webpack/rollup config. If you wish to continue to build for SystemJS the build configuration can be changed to create multiple build outputs. One for SystemJS and one for a Node/NPM environment.

You'll need to change the build for the microfrontend you wish to publish to NPM [as well as all of its dependencies that are also microfrontends](#npm-all-the-way-down).

### Example

`mfe-auth` uses `mfe-fetch` to make network requests, both are built to function in an environment with SystemJS for dynamic module resolution. Both would need to be pubished to NPM to use `mfe-auth`

## Dynamic module loading in node

You can modify the node environment to understand dynamic module resolution by using a [dynamic module loader designed for Node](https://github.com/systemjs/systemjs#3-system-nodecjs-loader). This is very useful in situations where you want to reuse code designed for an environment with dynamic module loading.

## Code duplication

If you are duplicating code as a method of sharing code between different projects you will have to address:
- Updating duplicated code
- Total application size
## Sharing NPM modules between MFEs and non-MFEs

This is probably the easiest way to share code between projects. 
To share code from your MFE NPM package you'll need to:
- leverage the existing NPM modules
- set-up [webpack/rollup externals](#webpack-and-rollup-externals)
- manage [version inconsistency issues](#version-inconsistency-issues)
- you may need to further divide up modules to prevent unnecessary dependencies.
- requires [NPM modules "all the way down"](#npm-all-the-way-down)

## NPM all the way down

Modules shared via NPM should only leverage NPM if you expect them to work in a standard node environment. In practice this means that any NPM modules that must work in a browser environment with SystemJS and a node environment without SystemJS should rely on each dependent module being present at build time/published to NPM.
### Scenario

`npm-mod-1` is running on a node server and it uses `npm-mod-2`. `npm-mod-2` was built to function in a dynamic module resolution environment and uses `mfe-mod-1` that isn't published to NPM. There won't be any build errors when building/publishing `npm-mod-2` [because it uses build externals for `mfe-mod-1`](#webpack-and-rollup-externals) but there will be errors during the build or execution of `npm-mod-1` in a node environment. The node environment does not have the capacity to dynamically resolve the missing `mfe-mod-1` so it must be present at run-time without relying upon dynamic module resolution.

## Webpack and rollup externals

Many build systems support externals. Externals are used to tell the build system _not_ to include a certain dependency into the final build/bundle. Both Webpack and Rollup also support regular expressions in their externals definition.

## Version inconsistency Issues

When you have many projects using the same module from NPM and have set-up that module as a [build-time external](#webpack-and-rollup-externals). There are several key challenges to manage.

### Externals are used for unit tests but not bundled into the code

Unit tests typically run locally and rely upon local modules to do so. Each project's package.json will need to have a local copy of libraries that will not be bundled when the equivalent of `npm run build` executes. So each bundle of code will not include the external and will expect it to be provided later. In dyanmic module resolution or a run-time dependency resolution setup the module will be provided by code executing in the browser (SystemJS or Module Federation). In a build-time set-up the external module is provided by the module bundler (Webpack or Rollup).

This complex behavior can result in bugs. If a project uses an older version of a dependecy and lists that dependency as an external then the unit tests are running on a different version of that dependency than will be provided at a later point.

Consider the following example:

`my-shared-npm-module` uses lodash `v3.10.1` internally uses the `pluck` method. It also lists lodash as an external module. When `my-shared-npm-module` runs it's unit tests using `pluck` will succeed because `v3.10.1` contains that method.

`my-application` uses `my-shared-npm-module`. When `my-application` builds it provides lodash to `my-shared-npm-module`.

If `my-application` specifies lodash `v4.0.0`+ in `package.json` a bug will be introduced where the `pluck` method does not exist. This bug _could_ be completely missed by unit tests in _both_ projects.

|                | unit-tests-pass    | 
| my-application | :white_check_mark: | 
| my-shared-npm..| :white_check_mark: |

Managing this can be a tricky problem. Tools like rennovate can help keep every package updated and highlight issues, but won't catch everything. Not using build-tool externals at all is also an option but it will bloat total code size especially for large dependencies as they could be included into the final code bundle(s) multiple times.