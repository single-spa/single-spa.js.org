# single-spa.js.org

This repo contains the source code and documentation powering [single-spa.js.org](https://single-spa.js.org). Powered by [Docusaurus](https://docusaurus.io/).

## Prerequisites

1. git
1. node >=16.14
1. [your fork](https://github.com/single-spa/single-spa.js.org/fork) of this repo

## Installation

1. `git clone git@github.com:<your-fork-of>/single-spa.js.org.git`
1. `cd single-spa.js.org` to go into the website root
1. `npm i` to install dependencies

## Running locally

1. run `npm start` to start the hot-reloading development server
1. `open http://localhost:3000` to open the site in your favorite browser
   - Changes to files in `src/` will hot-reload
   - Changes to markdown files in `docs/` will hot-reload
   - Changes to `docusaurus.config.js` and `sidebars.json` will not hot-reload

## Contributing

Want to help improve the `single-spa.js.org` website? Checkout the steps below to learn how.

### Create a branch

1. `git pull origin master` to ensure you have the latest main code
1. `git switch -c descriptive-branch-name`

Test visual changes using any number of latest versions of common browsers, on both desktop and mobile

### Contribute!

1. `git add . && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fixed header logo`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the upstream [single-spa.js.org repo](https://github.com/single-spa/single-spa.js.org) and you should see recently pushed branches.
1. Create a pull request describing the changes
   - If possible, include screenshots of visual changes.
1. (Optional) Post your PR in the #maintainers channel of the Slack workspace
