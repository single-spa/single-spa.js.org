---
id: contributing-overview
title: Contributing to Single-spa
sidebar_label: Overview
---

Thanks for checking out single-spa! We're excited to hear and learn from you.

We've put together the following guidelines to help you figure out where you can best be helpful.

## Table of Contents

1. [Types of contributions we're looking for](#types-of-contributions-were-looking-for)
1. [Ground rules & expectations](#ground-rules-expectations)
1. [How to contribute](#how-to-contribute)
1. [Setting up your environment](#setting-up-your-environment)
1. [Community](#community)

## Types of contributions we're looking for

There are many ways you can directly contribute to the guides (in descending order of need):

- Examples
- Helper Libraries (like single-spa-react) for missing frameworks
- Bug fixes
- Answering questions in the slack channel
- new helper packages for frameworks

Interested in making a contribution? Read on!

## Ground rules & expectations

Before we get started, here are a few things we expect from you (and that you should expect from others):

- Be kind and thoughtful in your conversations around this project. We all come from different backgrounds and projects, which means we likely have different perspectives on "how open source is done." Try to listen to others rather than convince them that your way is correct.
- Please read the single-spa [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.
- If you open a pull request, please ensure that your contribution passes all tests. If there are test failures, you will need to address them before we can merge your contribution.
- When adding content, please consider if it is widely valuable. Please don't add references or links to things you or your employer have created as others will do so if they appreciate it.

## How to contribute

If you'd like to contribute, start by searching through the [issues](https://github.com/single-spa/single-spa/issues) and [pull requests](https://github.com/single-spa/single-spa/pulls) to see whether someone else has raised a similar idea or question.

If you don't see your idea listed, and you think it fits into the goals of this guide, do one of the following:

- **If your contribution is minor,** such as a small typo or bug fix, open a pull request.
- **If your contribution is major,** such as a new feature, start by opening an issue first. That way, other people can weigh in on the discussion before you do any work.

## Setting up your environment

### Prerequisites

1. Git
1. Node: install version 8.4 or greater
1. Yarn: See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/)
1. A fork of the [single-spa repo](https://github.com/single-spa/single-spa)
1. A clone of the repo on your local machine

### Installation

1. `cd single-spa` to go into the project root
1. `yarn` to install single-spa's dependencies

### Create a branch

1. `git checkout master` from any folder in your local `single-spa` repository
1. `git pull origin master` to ensure you have the latest main code
1. `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch` with a suitable name) to create a branch

### Test the change

1. Run `yarn test` from the project root.

### Push it

1. `git add . && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fixed application lifecycles`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the [single-spa repo](https://github.com/single-spa/single-spa) and you should see recently pushed branches.
1. Follow GitHub's instructions to submit a new Pull Request.

## Community

Discussions about single-spa take place on the single-spa repository's [Issues](https://github.com/single-spa/single-spa/issues) and [Pull Requests](https://github.com/single-spa/single-spa/pulls) sections. Anybody is welcome to join these conversations. There is also a [slack community](https://join.slack.com/t/single-spa/shared_invite/zt-l2iljnpv-pW_o92mMpMR8RWfIOI6pTQ) for regular updates.

Wherever possible, do not take these conversations to private channels, including contacting the maintainers directly. Keeping communication public means everybody can benefit and learn from the conversation.
