# Cross microfrontend imports outside of an MFE architecture

This document aims to highlight problems and explore some solutions related to sharing code between a project that is an MFE and another project that is not an MFE. Sharing code between different projects has been common in the JS ecosystem for years. When sharing code between mixed architectures there are a few challenges that should be examined in depth. Depending on how your MFE code is [divided, built, and delivered](/docs/separating-applications) you will have different challenges in sharing code between projects of different architectures.

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


## Dynamic module loading


// supplimental ?
## Build-time vs run-time dependencies

In an MFE architecture we 