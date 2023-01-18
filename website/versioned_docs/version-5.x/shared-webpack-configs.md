---
title: Shared Webpack configs
---

single-spa also publishes a few shared Webpack config packages that include basics needed for creating single-spa applications. These configs are used by applications generated with [create-single-spa](/docs/create-single-spa), and can be used as a starting point to extend/modify a custom configuration for your organization/team.

These packages are housed within the [create-single-spa repository](https://github.com/single-spa/create-single-spa/tree/main/packages).

## webpack-config-single-spa

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/webpack-config-single-spa)

A shareable, customizable webpack config that is used for single-spa modules.

### Installation

```sh
npm install --save-dev webpack-config-single-spa webpack-merge

# or
yarn add --dev webpack-config-single-spa webpack-merge
```

### Usage

```js
const singleSpaDefaults = require('webpack-config-single-spa');
const { merge } = require('webpack-merge'); // webpack-merge@5.0.3+

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',
    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',
    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,
    // The CLI commands in the package.json script that triggered this build
    argv,
    // optional
    // This changes whether package names that start with @your-org-name are
    // treated as webpack externals or not. Defaults to true
    orgPackagesAsExternal: true,

    // optional, defaults to 1
    // This is the rootDirectoryLevel that is passed to https://github.com/joeldenning/systemjs-webpack-interop
    rootDirectoryLevel: 1,

    // optional, defaults to false
    // Disable html-webpack-plugin (and standalone-single-spa-webpack-plugin) entirely
    // This is intended for root configs, but can be used in other cases, too
    disableHtmlGeneration: false,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
```

## webpack-config-single-spa-react

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/webpack-config-single-spa-react)

A shareable, customizable webpack config that adds react-specific configuration to `webpack-config-single-spa`.

### Installation

```sh
npm install --save-dev webpack-config-single-spa-react webpack-merge

# or
yarn add --dev webpack-config-single-spa-react webpack-merge
```

### Usage

```js
const singleSpaDefaults = require('webpack-config-single-spa-react');
const webpackMerge = require('webpack-merge');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',
    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',
    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,
    // The CLI commands in the package.json script that triggered this build
    argv,
    // optional
    // This changes whether package names that start with @your-org-name are
    // treated as webpack externals or not. Defaults to true
    orgPackagesAsExternal: true,

    // optional, defaults to 1
    // This is the rootDirectoryLevel that is passed to https://github.com/joeldenning/systemjs-webpack-interop
    rootDirectoryLevel: 1,

    // optional, defaults to {}
    // This controls the options given to standalone-single-spa-webpack-plugin
    // See https://github.com/single-spa/standalone-single-spa-webpack-plugin#usage
    standaloneOptions: {},
  });

     // modify the webpack config however you'd like to by adding to this object
  });
};
```

## webpack-config-single-spa-ts

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/webpack-config-single-spa-ts)

A shareable, customizable webpack config that adds typescript-specific configuration to `webpack-config-single-spa`. Note that webpack-config-single-spa-ts has a peerDependency on `typescript`.

### Installation

```sh
npm install --save-dev webpack-config-single-spa-ts webpack-merge

# or
yarn add --dev webpack-config-single-spa-ts webpack-merge
```

### Usage

```js
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',
    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',
    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,
    // The CLI commands in the package.json script that triggered this build
    argv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
```

```js
const singleSpaTs = require('webpack-config-single-spa-ts');

// Alternatively, you may modify a webpack config directly
const myOtherWebpackConfig = {
  /* ... */
};
const finalConfig = singleSpaDefaults.modifyConfig(myOtherWebpackConfig);
```

## webpack-config-single-spa-react-ts

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/webpack-config-single-spa-react-ts)

A shareable, customizable webpack config that creates a webpack config that works with both react and typescript. Note that webpack-config-single-spa-react-ts simply merges the config from webpack-config-single-spa-react with that of webpack-config-single-spa-ts.

### Installation

```sh
npm install --save-dev webpack-config-single-spa-react-ts webpack-merge

# or
yarn add --dev webpack-config-single-spa-react-ts webpack-merge
```

### Usage

```js
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',

    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',

    // optional
    // This changes whether package names that start with @your-org-name are
    // treated as webpack externals or not. Defaults to true
    orgPackagesAsExternal: true,

    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,

    // The CLI commands in the package.json script that triggered this build
    argv,

    // optional, defaults to 1
    // This is the rootDirectoryLevel that is passed to https://github.com/joeldenning/systemjs-webpack-interop
    rootDirectoryLevel: 1,

    // optional, defaults to false.
    // When true, this removes html-webpack-plugin and standalone-single-spa-webpack-plugin
    disableHtmlGeneration: false,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
```
