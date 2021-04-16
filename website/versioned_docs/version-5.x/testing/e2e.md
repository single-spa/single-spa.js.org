---
id: e2e
title: E2E testing
sidebar_label: E2E testing
---

:::info

As microfrontends gain widespread adoption, testing tools will catch up and the testing story will improve.

:::

End to End (E2E) testing a single-spa [application](/docs/module-types#applications), [parcel](/docs/module-types#parcels), or [utility](/docs/module-types/#utilities) is very similar to E2E testing in other architectures. Because you are testing in the browser you can even use tools like [import-map-overrides](https://github.com/joeldenning/import-map-overrides) to run your tests in a production or production like environment with an override _before_ deloying to that environment. 

In general we suggest only using E2E tests to test integration points between microfrontends and core functionality following principles of either the [testing pryamid](https://www.browserstack.com/guide/testing-pyramid-for-test-automation) or the [testing trophy](https://kentcdodds.com/blog/write-tests).

## Testing Options

In single spa there are more ways to test your code in a browser using tools like [cypress](https://www.cypress.io/). Two common approachs are to test individual applications by using 'standalone' mode and testing everything together, both provide value in different ways.

### "E2E" testing with "standalone" mode

While not perfect "standalone" mode offers a way to run individual single-spa applications, it can also be used to test a single-spa application. There are several limitations to take into account though, if the microfrontend relies upon configuration or initialization happening in your single-spa `root-config` you cannot test those areas in standalone mode without mocking. Standalone mode works by creating a custom single-spa root-config on the fly that will just render the one application, so the code is the same as if it were running in production but the configuration is different.

### Testing everything together

Much like E2E tests run in traditional SPA applications you can open a brower and run assertions using tools like [Cypress](https://www.cypress.io/). Taking this approach is mirroring a full end to end test. You are running the exact same code that is in the environment. With some configuration and tools like [import-map-overrides](https://github.com/joeldenning/import-map-overrides) you can set-up your testing environment to work with overrides to the import map and can run end-to-end tests before deploying your code changes to an environment.

#### Configuring E2E tests to work with overrides

At a high level you will need to do the following before your environment can utilize overrides in E2E tests

1. Use a tool like [import-map-overrides](https://github.com/joeldenning/import-map-overrides)
1. Get the built code on a publically accessible domain. Similar to a "review app"
1. Configure your E2E testing environment to set the override
1. Run the E2E tests