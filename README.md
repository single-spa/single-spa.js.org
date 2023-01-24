# single-spa.js.org

This repo contains the source code and documentation powering [single-spa.js.org](https://single-spa.js.org).

## Getting started

### Prerequisites

1. git
1. node >=16.14
1. [your fork](https://github.com/single-spa/single-spa.js.org/fork) this repo

### Installation

1. `git clone git@github.com:<your-fork-of>/single-spa.js.org.git`
1. `cd single-spa.js.org` to go into the website root
1. `npm i` to install the website's dependencies

### Running locally

1. `cd website` then run `yarn start` to start the hot-reloading development server (powered by [Docusaurus](https://docusaurus.io/))
1. `open http://localhost:3000` to open the site in your favorite browser

## Contributing

Want to help improve the `single-spa.js.org` website? Checkout the steps below to learn how.

### Create a branch

1. `git checkout master` from any folder in your local `single-spa.js.org` repository
1. `git pull origin master` to ensure you have the latest main code
1. `git switch -c descriptive-branch-name`

### Make the change

1. Save the files and check in the browser
1. Changes to files in `pages/en` will hot-reload
1. Changes to markdown files in `docs` will hot-reload
1. Changes to `docusaurus.config.js` and `sidebars.json` will not hot-reload
1. Test visual changes using any number of latest versions of common browsers, on both desktop and mobile

### Contribute!

1. `git add . && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fixed header logo`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the [single-spa.js.org repo](https://github.com/single-spa/single-spa.js.org) and you should see recently pushed branches.
1. Create a pull request describing the changes
   - If possible, include screenshots of visual changes.
