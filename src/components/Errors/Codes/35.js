import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode35(props) {
  return (
    <>
      <h1>#35: Invalid application - no bootstrap function</h1>
      <p>
        The loading function for {props.getErrorCodeArg(0, "application")} {props.getErrorCodeArg(1)} returned a promise that resolved with
        an invalid application object. The loading function should resolve with an application object that has the
        single-spa lifecycle functions on it. This application did not have a valid bootstrap function.
      </p>
      <p>
        The application object was {props.getErrorCodeArg(2)}
      </p>
      <p>
        This most commonly occurs due to failed webpack or systemjs configuration.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { registerApplication } from 'single-spa';

            registerApplication('name', loadingFn, activityFn);

            function loadingFn() {
              // Make sure the resolved value of the promise is an object!
              return System.import('name');
            }
          `}
        </CodeSnippet>
        <CodeSnippet>
          {`
            // If you're using SystemJS, run the following in the browser console to debug
            System.import('name-of-my-application').then(application => {
              // Verify that this object has the lifecycle functions on it.
              // If compiling with webpack and consuming in-browser with SystemJS, consider
              // setting webpack's output.libraryTarget to "system".
              console.log(application)
            })
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api/#registerapplication">documentation</a>.
      </p>
    </>
  )
}
