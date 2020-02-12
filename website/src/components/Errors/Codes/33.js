import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode33(props) {
  return (
    <>
      <h1>#33: Loading function did not return a promise</h1>
      <p>
        The loading function for {props.getErrorCodeArg(0)} did not return a promise. This is required as part of the registerApplication API.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { registerApplication } from 'single-spa';

            registerApplication('name', loadingFn, activityFn);

            function loadingFn() {
              // Make sure this returns a promise!
              return System.import('name');
            }
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
