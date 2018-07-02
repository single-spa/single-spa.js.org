---
id: contributing-overview
title: Contributing to Single-spa
sidebar_label: Overview
---

Thanks for checking out single-spa! We're excited to hear and learn from you.

We've put together the following guidelines to help you figure out where you can best be helpful.

## Table of Contents

0. [Types of contributions we're looking for](#types-of-contributions-were-looking-for)
0. [Ground rules & expectations](#ground-rules-expectations)
0. [How to contribute](#how-to-contribute)
0. [Setting up your environment](#setting-up-your-environment)
0. [Contribution review process](#contribution-review-process)
0. [Community](#community)

## Types of contributions we're looking for

There are many ways you can directly contribute to the guides (in descending order of need):

* Examples
* Helper Libraries (like single-spa-react) for missing frameworks
* Bug fixes
* Answering questions in the slack channel
* Entirely new helper projects like [single-spa-angular-cli](https://github.com/PlaceMe-SAS/single-spa-angular-cli)

Interested in making a contribution? Read on!

## Ground rules & expectations

Before we get started, here are a few things we expect from you (and that you should expect from others):

* Be kind and thoughtful in your conversations around this project. We all come from different backgrounds and projects, which means we likely have different perspectives on "how open source is done." Try to listen to others rather than convince them that your way is correct.
* Please read the single-spa [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.
* If you open a pull request, please ensure that your contribution passes all tests. If there are test failures, you will need to address them before we can merge your contribution.
* When adding content, please consider if it is widely valuable. Please don't add references or links to things you or your employer have created as others will do so if they appreciate it.

## How to contribute

If you'd like to contribute, start by searching through the [issues](https://github.com/CanopyTax/single-spa/issues) and [pull requests](https://github.com/CanopyTax/single-spa/pulls) to see whether someone else has raised a similar idea or question.

If you don't see your idea listed, and you think it fits into the goals of this guide, do one of the following:

* **If your contribution is minor,** such as a small typo or bug fix, open a pull request.
* **If your contribution is major,** such as a new feature, start by opening an issue first. That way, other people can weigh in on the discussion before you do any work.

## Setting up your environment

single-spa requires a working version of [Node](https://nodejs.org/en/) with either [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/lang/en/) as a package manager.

steps to install and run single-spa locally

* clone the [single-spa repo](https://github.com/CanopyTax/single-spa)
* navigate to the newly created single spa directory
* use `yarn` or `npm i` and wait for dependencies to install
* run `yarn watch` or `npm run watch` to start the local build in watch mode
* Single spa is up and running locally.

To run the tests run `yarn test` or `npm run test`


## Community

Discussions about single-spa take place on the single-spa repository's [Issues](https://github.com/CanopyTax/single-spa/issues) and [Pull Requests](https://github.com/CanopyTax/single-spa/pulls) sections. Anybody is welcome to join these conversations. There is also a [slack community](https://join.slack.com/t/single-spa/shared_invite/enQtMzIwMTcxNTU3ODQyLTM1Y2U1OWMzNTNjOWYyZDBlMDJhN2VkYzk3MDI2NzQ2Nzg0MzMzNjVhNWE2YjVhMTcxNjFkOWYzMjllMmUxMjk) for regular updates.

Wherever possible, do not take these conversations to private channels, including contacting the maintainers directly. Keeping communication public means everybody can benefit and learn from the conversation.
