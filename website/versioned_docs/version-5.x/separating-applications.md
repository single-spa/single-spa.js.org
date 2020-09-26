---
id: separating-applications
title: Splitting up applications
sidebar_label: Splitting applications
---

In a large, microserviced system, your root single-spa configuration and each of the applications should probably have its own git repository. How to do that in a JavaScript project isn't necessarily clear, so some options are listed below.

Since single-spa is a framework that helps with organizational scaling, it is important to figure out how to split out and separate applications from each other so that developers and teams can work on the applications without interfering one another.

Most interpretations of microservice architecture encourage separate code repositories, builds, and deployments. Although **single-spa does not solve how code is hosted, built, or deployed**, these are relevant to many users of single-spa, so some strategies for doing so are discussed here.

#### Option 1: One code repo, one build

The simplest approach for using single-spa is to have one code repository with everything in it. Typically, you would have a single package.json with a single webpack config that produces a bundle that can be included in an HTML file with a `<script>` tag.

Advantages:

- Simplest to set up
- [monolithic version control has some advantages](https://danluu.com/monorepo/)

Disadvantages:
- One master Webpack config and package.json means less flexibility and freedom for each individual project
- Slow build times once your project gets large
- Builds and deployments are all tied together, which can necessitate fixed release schedules instead of ad hoc releases.

#### Option 2: NPM packages

Create a root application that npm installs each of the single-spa applications. Each child application is in a separate code repository and is responsible for publishing a new version everytime that it updates. The root application should reinstall, rebuild, and redeploy whenever a single-spa application changes.

Typically, the single-spa applications compile themselves separately with babel and/or webpack.

Advantages:

- npm install is familiar and easy to set up
- Separate npm packages means each application can build itself separately before publishing to npm

Disadvantages:

- The root application must reinstall the child applications in order to rebuild/redeploy
- Medium difficulty to set up

#### Option 3: Monorepos

Create a [monorepo](https://medium.com/netscape/the-case-for-monorepos-907c1361708a) with multiple SPAs in a single (mono) repo. 
This allows for separate builds and deployment without having separate code repositories.


#### Option 4: Dynamic Module Loading

Create a root application which can allow single-spa applications to deploy themselves separately. To do so,
create a manifest file that the single-spa applications update during their deployment process, which controls
which versions of the single-spa applications are "live". Then change which JavaScript file is loaded based on the manifest.

Changing which JavaScript file is loaded for each child application can be done in many ways.

1. Web server: have your webserver create a dynamic script tag for the "live" version of each single-spa application.
2. Use a [module loader](https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/) such as [SystemJS](https://github.com/systemjs/systemjs) that can download and execute JavaScript code in the browser from dynamic urls.

#### Comparison

|   | Separate code repositories possible | Independent CI builds | Separate deployments | Examples |
| - | ----------------------------------- | --------------- | -------------------- | -------- |
| NPM Packages | :white_check_mark: | :white_check_mark: | :x: | [1](https://github.com/jualoppaz/single-spa-login-example-with-npm-packages) |
| Monorepo | :x: | :white_check_mark: [1](https://medium.com/labs42/monorepo-with-circleci-conditional-workflows-69e65d3f1bd0) | :white_check_mark: [1](https://medium.com/labs42/monorepo-with-circleci-conditional-workflows-69e65d3f1bd0) | &mdash; |
| Module loading | :white_check_mark: | :white_check_mark: | :white_check_mark: | [1](https://github.com/react-microfrontends/) [2](https://github.com/vue-microfrontends/) [3](https://github.com/polyglot-microfrontends/) |
