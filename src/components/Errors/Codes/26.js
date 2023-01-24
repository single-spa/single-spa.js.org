import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode26(props) {
  return (
    <>
      <h1>#26: unloadApplication requires a string 'appName'</h1>
      <p>
        You cannot unload an application without providing a string 'appName' argument.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { unloadApplication } from 'single-spa';

            // Make sure that name-of-app is a registered application
            unloadApplication('name-of-app');
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api#unloadApplication">unloadApplication documentation</a>.
      </p>
    </>
  )
}
