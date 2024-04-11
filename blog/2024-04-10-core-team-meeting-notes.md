# April 2024 Core Team Meeting

Attendees: Ian, Milan Kovacic

Date: 2024-04-10

## Meeting Agenda

- Discussed [create-single-spa PR 402](https://github.com/single-spa/create-single-spa/pull/402)
- Milan plans to introduce `nx` to create-single-spa
- Ian will look into fixing the types in single-spa-layout
- Joel will push towards single-spa@7

## Note from single-spa's creator

After releasing single-spa@7, I think my next priority for single-spa will be to push for native ES modules and native import maps.

I lean against es-module-shims because I don't think we need those additional features, and am hesitant about in-browser parsing of the Javascript language being something that is encouraged in production (despite the performance metrics on the readme suggesting that it's negligible). I want single-spa to be as native to the browser as possible.

The recommendation should be to use a single inline import map, rather than multiple import maps or an external import map, for performance reasons. For cases where that isn't possible, I think https://github.com/single-spa/import-map-injector should be used, since it doesn't parse JS in the browser.

Regarding shared dependencies, I think we should discuss whether to support self hosting or just JSPM proxies. I imagine some users will insist on self-hosting, which means we could check if JSPM is open source or if there is a similar tool for converting npm packages to ES modules.

Regarding module federation, I discussed it with Zack and module federation is still moving towards a runtime rather than native import maps. There might be possible collaboration on a service worker for module federation + native modules. I personally prefer no runtime whatsoever - just what the browser natively supports.