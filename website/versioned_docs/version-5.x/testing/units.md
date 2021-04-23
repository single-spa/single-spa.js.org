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

## Testing examples

### Jest
In the above examples I showed how `People` imports a component from `styleguide`. In order to unit test the component in people with Jest you will need to [configure](https://jestjs.io/docs/configuration) jest and mock the `styleguide` MFE. In jest configuration is done via multiple areas.
1. [Create a jest config file](#jest-config)
1. [Setup a mocks directory at the root](#mocks-directory)
1. [Add a setupFile](#setup-file)

#### Jest config
Jest is configured with a configuration file. Below is an example configuration using some of the options. See [more options on Jest's official documentation site](https://jestjs.io/docs/configuration).
````js
module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  modulePathIgnorePatterns: ['/cache', '/dist'],
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    // Note this is only needed if you don't match the module name directly
    // an alternative would be to place the mock in 
    // <rootDir>/__mocks__/@react-mf/styleguide.js and it would be autodetected
    '@react-mf/styleguide': '<rootDir>/__mocks__/styleguide.js',
  },
}
````

#### mocks directory
Jest will detect folders named `__mocks__` and if the naming convention is exact or the modules have been mapped using `moduleNameMapper` then Jest will use those mocks in place of an import. This structure is essential for other microfrontends where you don't have the code locally. [See more information on jest's official documentation](https://jestjs.io/docs/manual-mocks)
```
.
├── __mocks__
│   └── styleguide.js
├── src
│   ├── react-mf-people.js
│   └── ...
├── node_modules
├── jest.setup.js
├── ...
└── jest.config.js
```

#### setup file
Jest uses a setup file to create globals mocks that can be utilized by every test or otherwise configure the test environment. If you were mocking `localStorage` or `SystemJS` this is a good place to configure those mocks. [See more use-cases for a set-up file on Jest's offical documentation](https://jestjs.io/docs/configuration#setupfilesafterenv-array)
```js
// jest.setup.js
// import Mocks for SystemJS mock below
import peopleApplication from '@react-mf/people'
// Mock SystemJS
global.System = {
  import: jest.fn(mockImport)
}

function mockImport (importName) {
  // What you do in mock import will depend a lot on how you use SystemJS in the project and components you wish to test

  /* If I had already created a mock for `@react-mf/people` and I wanted to test this component:
  *  https://github.com/react-microfrontends/planets/blob/main/src/planets-page/selected-planet/selected-planet.component.js#L5
  * I would want `System.import('@react-mf/people')` to resovle to my mock one way to accomplish this would be the following
  */
  if (importName === '@react-mf/people') {
    return Promise.resolve(peopleApplication)
  } else {
    console.warn('No mock module found')
    return Promise.resolve({})
  }
}

```
