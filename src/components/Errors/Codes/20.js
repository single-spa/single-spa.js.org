import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode20(props) {
  return (
    <>
      <h1>#20: The first argument to registerApplication must be a non-empty string 'appName'</h1>
      <p>
        When calling registerApplication, the first argument must be the string name of the application.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { registerApplication } from 'single-spa';

            registerApplication(
              '@org/name-of-app',
              loadingFunction,
              activityFunction
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