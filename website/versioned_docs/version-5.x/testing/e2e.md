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