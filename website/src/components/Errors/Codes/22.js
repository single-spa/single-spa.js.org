import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode22(props) {
  return (
    <>
      <h1>#22: Custom props must be an object</h1>
      <p>
        Cannot register application '{props.getErrorCodeArg(0)}' because the customProps are not a plain JavaScript object.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { registerApplication } from 'single-spa';

            // customProps must be a plain object (not an Array)
            const customProps = {foo: 'bar'};

            registerApplication(
              'name',
              loadingFunction,
              activityFunction,
              customProps
            )
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api#registerApplication">registerApplication documentation</a>.
      </p>
    </>
  )
}