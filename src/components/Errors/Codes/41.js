import React from 'react';

export default function ErrorCode41(props) {
  return (
    <>
      <h1>#41: single-spa is loaded on the page multiple times</h1>
      <p>
        The single-spa library should be loaded only one time on the page. This is important both for performance and to avoid bugs.
        Any functions you import from single-spa are specific to that instance. This means that functions like navigateToUrl, getAppStatus, etc.
        are specific to the single-spa instance and will not work as expected when you have multiple instances.
      </p>
      <h2>To fix:</h2>
      <p>
        Mark single-spa as a <a href="https://webpack.js.org/configuration/externals/#root" rel="noopener" target="_blank">webpack external</a> in your root config and in each of your microfrontends.
        This will ensure that it will be omitted from the bundle and will be provided at runtime in the browser. If using SystemJS, you will need to add single-spa to
        your <a href="/docs/recommended-setup#import-maps">import map</a>.
      </p>
      <h2>Additional references</h2>
      <p>
        See <a href="/docs/faq/#can-i-have-only-one-version-of-react-vue-angular-etc-loaded">this FAQ</a> and
        also <a href="/docs/recommended-setup#shared-dependencies">this documentation</a> for additional information.
      </p>
    </>
  );
}
