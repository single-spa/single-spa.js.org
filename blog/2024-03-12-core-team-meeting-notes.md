# March 2024 Core Team Meeting

Attendees: Joel Denning, Milan Kovacic

Date: 2024-03-14

## Meeting Agenda

- Typescript migration: single-spa@7 - typescript, IE11, navigation cancelation
- Migration from SystemJS to native modules - use es-module-shims??
- Discuss creation of single-spa CLI
- Getting started documentation being updated by Milan
- Discuss future of shared dependency management

### TypeScript Migration

Fifth typescript PR has been merged (https://github.com/single-spa/single-spa/pull/1202). Sixth one on the way

### Migration to native modules

Discuss the limitations of native modules and import maps (external import maps, external import maps, etc). Discuss whether to use [import-map-injector](https://github.com/single-spa/import-map-injector) or [es-module-shims](https://github.com/guybedford/es-module-shims) or neither. Joel expressed concern about runtime parsing of modules, but Milan pointed out that Ruby on Rails as adopted es-module-shims. We looked at the performance benchmarks for es-module-shims, which show it's only a 5ms difference compared to native modules.

We also discussed possible collaboration with Zack Jackson on module federation's new runtime (called MFP) and whether that could help. Also discuss whether a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) would be necessary or helpful to hook into the browser's loading of modules.

### single-spa CLI

See [single-spa issue 1205](https://github.com/single-spa/single-spa/issues/1205) for Milan's proposal. Joel has hesitations about abstracting away bundler config and configuration files, but we decided to proceed with Milan's proposal, since developer experience is one of the main barriers to entry for developers and corporations who are used to managed configuration in other projects (NextJS, Vite, etc etc). The main concern is how to do it in a way where single-spa users don't have to go digging in node_modules regularly to be able to do what they need to do to their projects.

### Shared dependencies management

Baseplate Cloud plans to use [JSPM CDN](https://jspm.org/cdn/jspm-io) for native ES module shared dependencies. Managing the dependencies in the import map over time is important to do in a sensible way that avoids accidentally breaking production, while still allowing for incremental migration of dependencies on microfrontend at a time.

We didn't decide on anything concrete - just brainstormed solutions. Ideally the open source ecosystem can self-host shared dependencies as well.