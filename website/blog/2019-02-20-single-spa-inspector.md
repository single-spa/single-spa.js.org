---
title: single-spa Inspector and 4.1
author: Anthony Frehner
authorURL: https://twitter.com/aahfrena
authorImageURL: https://pbs.twimg.com/profile_images/1037162092963348480/1XLEV4MK_400x400.jpg
---

## Background

For a long time, Canopy has had the benefit of using a tool called [sofe inspector](https://github.com/CanopyTax/sofe-inspector) (note: this is an out-of-date version of it) to list, override, and interact with single-spa applications. There has always been a desire to [figure out how to share this tool so others can benefit as well](https://github.com/single-spa/single-spa/issues/151).

With that in mind, I'm proud to announce an initial release for **[single-spa Inspector](https://github.com/CanopyTax/single-spa-inspector)**! single-spa Inspector is a Firefox and Chrome extension, much like React/Vue devtools, that allows you see and interact with your single-spa applications and configuration.

## Current Inspector Features

- List registered applications
- Show application status
- Force an app to mount or unmount
- Hover over an app name to have an "inspect element"-like view of your apps (Overlays)

(Note: Overlays require a small update to your code, but should hopefully be simple! See [how to configure app overlays](https://github.com/single-spa/single-spa-inspector#configuring-app-overlays))

**The single-spa Inspector will only work with single-spa versions 4.1 and higher**, since we had to expose and add some functionality to the single-spa library itself in order to implement these features.

## single-spa 4.1

single-spa 4.1 was released, which includes a couple of key updates:

1. Support for single-spa Inspector
1. ESM bundle output
1. Simpmlified test configuration for developers/contributors to single-spa

For most people, ESM (EcmaScript Module) support shouldn't affect how you use single-spa, but for those looking to play around with modules or other advanced Javascript things, it's a welcome addition.

We also changed our test suite to purely use Jest instead of Saucelabs, and hopefully false positive "failing" tests on pull requests will be a thing of the past.

## Help Wanted!

If you would like to suggest a new feature for single-spa Inspector, report a bug, improve our (admittedly horrible and hopefully temporary) UI/UX, or add features, please see the [github repo](https://github.com/single-spa/single-spa-inspector) and hack away!

We also hope to update some of our example repos to the lastest single-spa so that anyone with the extension installed can test out the features and see how to implement overlays. But this process will go faster if someone wants to help out. :)

Thank you!
