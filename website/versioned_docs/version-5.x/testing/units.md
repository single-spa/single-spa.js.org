---
id: units
title: Unit testing
sidebar_label: Unit testing
---

:::info

As microfrontends gain widespread adoption, testing tools will catch up and the testing story will improve.

:::

Unit testing a single-spa [application](/docs/module-types#applications), [parcel](/docs/module-types#parcels), or [utility](/docs/module-types/#utilities) is very similar to unit testing in the framework you are using, with two notable exceptions:
- Importing microfrontends
- `System.import`

In general we recommend following the principle of only testing the units that need to be tested and aren't covered by other tests. Testing library code like `single-spa.registerApplication` is usually unnecessary because those are covered by the library's unit tests.

## Importing microfrontends

It is fairly common in microfrontends to have one microfrontend import and rely upon a component from another microfrontend. Reliance on another microfrontend can be challenging to test because unit tests generally run locally and you won't have access to other microfrontends. When this occurs we generally recommend mocking the other microfrontend for the unit test.

An example of this can be found in the `Button` component exported by the `styleguide` in [react.microfrontends.app](https://github.com/react-microfrontends/styleguide/blob/master/src/button.component.js). Because that component is imported and used by the [planets application](https://github.com/react-microfrontends/planets/blob/41ba0aaf9005b5300cc28ad5f4eac024eae06e2b/src/planets-page/planets-page.component.js#L6) you will need to make it available to the test environment by mocking the dependency. This is necessary because the test environment cannot dynamically import other microfrontends, like the browser can. Given the wide variety of unit testing tools you will need to follow the pattern established by the test environment you are using for mocking other microfrontends.

:::note

We suggest mocks over installing microfrontends for local tests (for example via NPM modules) because mocks are easier to maintain and avoid several potential incompatiblity issues such as version mismatch, module format incompatibility, environment differences, and more.

:::

## `System.import`

Occasionally you will choose to interop with another microfrontend asynchronously by explicitly calling `System.import`. Testing in this scenairo may require mocking both SystemJS and the module you're importing. Additionally because `System.import` returns a promise your tests in that area will need to be asynchronous and wait for promises to resolve.

An example of this can be found in `people` and `planets` applications from `react.microfrontends.app`. The [People application](https://github.com/react-microfrontends/people/blob/master/src/react-mf-people.js#L21) exports a function that resolves with a component. The [Planets Application](https://github.com/react-microfrontends/planets/blob/main/src/planets-page/selected-planet/selected-planet.component.js) imports and uses that component asynchronously with `React.lazy`. Testing this component would necessitate mocking both `SystemJS` and `People`.

## Shared Mocks

If each project mocks every other microfrontend it is possible that the mocks will eventually become out of sync with the actual deployed microfrontend. One way to prevent this is to share mocks so that keeping the mocks in sync only requires one change instead of updating mocks in many different repositories.
