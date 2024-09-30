# Sepetember 2024 Core Team Meeting

*Held via Slack*

Attendees: Joel Denning, Ian Bacher, Milan Kovacic

Date: 2024-09-14 through 2024-09-20

## Meeting Agenda

- Discuss the new #paid-support channel in Slack
- Discuss release plan for single-spa@7. single-spa@7.0.0-beta.0 was released!
- Discuss recommendations from Milan:
  - Market positioning by touting support for multiple frameworks
  - single-spa helper libraries need more maintainers
  - suggestion to move from Slack to Discord, to avoid disappearing messages
  - proposal to move to native modules
  - improve documentation for common use cases, such as migrations, maintenance of import maps, caching, common deployment stacks, etc
- Discuss recommendations from Joel:
  - Possibly support module federation in create-single-spa (back-and-forth discussion about whether to support both module federation and native modules, or only native modules)
  - Modify create-single-spa to have an ESM/SystemJS toggle and change it to ESM by default
  - Develop [import-map-externals-webpack-plugin](https://github.com/single-spa/import-map-externals-webpack-plugin) that automatically externalizes all dependencies in an import map that’s either on disk or over network.
  - Develop a new project or extend and existing one (like jspm) that assembles the files needed for self-hosting esm shared dependencies, and create all the CI/CD tooling necessary to upload the files to a corporate CDN.