# Cross microfrontend imports outside of an MFE architecture

This document aims to highlight problems and explore some solutions related to sharing code between a project that is an MFE and another project that is not an MFE. Sharing code between different projects has been common in the JS ecosystem for years. When sharing code between mixed architectures there are a few challenges that should be examined in depth. Depending on how your MFE code is [divided, built, and delivered](/docs/separating-applications) you will have different challenges in sharing code between projects of different architectures.

# Decision Tree

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


## Sharing NPM modules between MFEs and non-MFEs

This is probably the easiest way to share code between projects. 
To share code from your MFE NPM package you'll need to:
- leverage the existing NPM modules
- set-up [webpack/rollup externals](#webpack-and-rollup-externals)
- manage [version inconsistency issues](#version-inconsistency-issues)
- you may need to further divide up modules to prevent unnecessary dependencies.

# Reference Items

## Webpack and rollup externals

Many build systems support externals. Externals are used to tell the build system _not_ to include a certain dependency into the final build/bundle. Both Webpack and Rollup also support regular expressions in their externals definition.

## Version inconsistency Issues

When you have many projects using the same module from NPM and have set-up that module as a build-time external. There are several key challenges to manage.

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


// old approach
## Sharing code via NPM modules

In the larger javascript ecosystem, the most common way to share code is by publishing NPM modules. This approach works really well in many scenarios but doesn't work well in others.

### MFE project using NPM

[If you're using NPM packages to separate applications](/docs/separating-applicatons#option:2) you can leverage "build-time dependencies" in every project. This is probably the easiest scenario to share code between different projects. Simplified example:

```js
// non-mfe project - package.json
...
dependencies: {
  "my-authoriziation-module": "2.3.7",
}
```

```js
// mfe root-config - package.json
...
dependencies: {
  "my-authoriziation-module": "2.3.7",
}
```

### MFE project using Dynamic Module Loading


## Dynamic module loading


// supplimental ?
## Build-time vs run-time dependencies

In an MFE architecture we 