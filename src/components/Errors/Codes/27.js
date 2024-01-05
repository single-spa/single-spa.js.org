import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode27(props) {
  return (
    <>
      <h1>#27: Cannot unload application - no such application</h1>
      <p>
        There is no such application '{props.getErrorCodeArg(0)}', so it cannot be unloaded.
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
