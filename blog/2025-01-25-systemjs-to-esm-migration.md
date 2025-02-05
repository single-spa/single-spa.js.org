---
title: SystemJS to ESM migration
---

As of the following versions of single-spa npm packages, single-spa now defaults to native ES modules rather than SystemJS modules:

- [create-single-spa@5](https://github.com/single-spa/create-single-spa/blob/main/packages/create-single-spa/CHANGELOG.md)
- [webpack-config-single-spa@6](https://github.com/single-spa/create-single-spa/blob/main/packages/webpack-config-single-spa/CHANGELOG.md)
- [webpack-config-single-spa-ts@5](https://github.com/single-spa/create-single-spa/blob/main/packages/webpack-config-single-spa-ts/CHANGELOG.md)
- [webpack-config-single-spa-react@5](https://github.com/single-spa/create-single-spa/blob/main/packages/webpack-config-single-spa-react/CHANGELOG.md)
- [webpack-config-single-spa-react-ts@5](https://github.com/single-spa/create-single-spa/blob/main/packages/webpack-config-single-spa-react-ts/CHANGELOG.md)
- [vue-cli-plugin-single-spa@4](https://github.com/single-spa/vue-cli-plugin-single-spa/releases/tag/v4.0.0)

# Migrating individual microfrontends

## React

To upgrade an individual microfrontend to output native browser modules rather than SystemJS modules, first identify which [single-spa shared webpack config](https://single-spa.js.org/docs/shared-webpack-configs) is being used, by opening the `webpack.config.js` file. You will see code like the following:

```sh
# Option 1
const singleSpaDefaults = require("webpack-config-single-spa");

# Option 2
const singleSpaDefaults = require("webpack-config-single-spa-react");

# Option 3
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

# Option 4
const singleSpaDefaults = require("webpack-config-single-spa-ts");
```

Next, upgrade the dependency by running one of the following commands inside of the project directory:

```sh
npm install <shared-webpack-package-name>@latest
pnpm install <shared-webpack-package-name>@latest
yarn add <shared-webpack-package-name>@latest

# example
npm install webpack-config-single-spa@latest
pnpm install webpack-config-single-spa@latest
yarn add webpack-config-single-spa@latest
```

Now when you run the `start` or `build` commands, the output bundles will be in ES module format.

## Angular

See [single-spa-angular tracking issue](https://github.com/single-spa/single-spa-angular/issues/534)

## Vue

### With Vue CLI

vue-cli-plugin-single-spa@4 defaults to outputting esm bundles rather than SystemJS bundles. Upgrade the dependency in your package.json with one of the following commands:

```sh
npm install -D vue-cli-plugin-single-spa@latest
pnpm install -D vue-cli-plugin-single-spa@latest
yarn add --dev vue-cli-plugin-single-spa@latest
```

The microfrontend will now output native browser modules rather than UMD/SystemJS-compatible bundles. For backwards compatibility with systemjs, see the `outputSystemJS` option in the [vue ecosystem docs](/docs/ecosystem-vue/#vue-cli-plugin-single-spa-configuration).

### With Vite

Better single-spa + vite support may be implemented and documented in the future, but as of now the Vite documentation was not authored by the single-spa core team.

# Migrating the root config

[Example migration pull request](https://github.com/react-microfrontends/root-config/pull/46/files)

First, follow the instructions to migrate an individual microfrontend, since single-spa root configs often contain a javascript microfrontend within them.

Then, modify the index.ejs or index.html file, with the following changes:

- Change all `<script type="systemjs-importmap">` elements to `<script type="injector-importmap">`
- Replace the `<script>` elements that load systemjs with a `<script>` element that loads [import-map-injector](https://github.com/single-spa/import-map-injector). To self host import-map-injector, see [section below](#migrating-the-shared-dependencies). Otherwise, use jsdelivr, esm.sh, unpkg, or similar
- Replace the `System.import('@org-name/root-config')` with `import('@org-name/root-config')`

Then, modify the entry file for the root config (often named `org-name-root-config.js`), to replace any `System.import()` calls with `import(/* webpackIgnore: true */)`. Usually these are found within calls to single-spa's `constructAppplications` or `registerApplication` functions

# Migrating shared dependencies

Shared dependencies are managed in various ways, but all import map dependencies need to be altered from their SystemJS to ESM versions. Shared dependencies are often managed in root configs, a separate repository, manually on a CDN, and/or via `import-map-deployer`.

If using jsdelivr to host your shared dependencies, use the urls with `+esm` to get the esm version. [Example](https://www.jsdelivr.com/package/npm/@single-spa/import-map-injector?tab=files). JSPM, esm.sh, unpkg.com, and other third party hosting services are ok to use, too.

## Self hosting

The recommended approach to self hosting shared dependencies is to use `create-single-spa` CLI to generate a repository with two source files:

1. `global-scripts.json`
1. `importmap-template.json`

The CI/CD configuration files generated by create-single-spa allow for automatic deployment when pull requests to those two files are merged.

See [recommended setup](https://single-spa.js.org/docs/recommended-setup) for more details