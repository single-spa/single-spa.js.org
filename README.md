# single-spa.js.org
[![CircleCI](https://circleci.com/gh/single-spa/es.single-spa.js.org.svg?style=svg)](https://circleci.com/gh/single-spa/es.single-spa.js.org)

This repo contains the source code and documentation powering [single-spa.js.org](https://single-spa.js.org).

## Getting started

### Prerequisites

1. Git
1. Node: install version 8.4 or greater
1. Yarn: See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/)
1. A fork of the repo (for any contributions)
1. A clone of the [single-spa.js.org repo](https://github.com/single-spa/single-spa.js.org) on your local machine

### Installation

1. `git clone git@github.com:single-spa/single-spa.js.org.git`
1. `cd single-spa.js.org/website` to go into the website root
1. `yarn` to install the website's npm dependencies

### Running locally

1. `cd website` then run `yarn start` to start the hot-reloading development server (powered by [Docusaurus](https://docusaurus.io/))
1. `open http://localhost:3000` to open the site in your favorite browser

## Contributing

Want to help improve the `single-spa.js.org` website? Checkout the steps below to learn how.

### Create a branch

1. `git checkout master` from any folder in your local `single-spa.js.org` repository
1. `git pull origin master` to ensure you have the latest main code
1. `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch` with a suitable name) to create a branch

### Make the change

1. Save the files and check in the browser
  1. Changes to files in `website/pages/en` will hot-reload
  1. Changes to markdown files in `docs` will hot-reload
  1. Changes to `siteConfig.js` and `sideBards.json` will not hot-reload

### Test the change

1. If possible, test any visual changes in all latest versions of common browsers, on both desktop and mobile.

### Push it

1. `git add . && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fixed header logo`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the [single-spa.js.org repo](https://github.com/single-spa/single-spa.js.org) and you should see recently pushed branches.
1. Follow GitHub's instructions.
1. If possible, include screenshots of visual changes.
