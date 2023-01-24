import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode29(props) {
  return (
    <>
      <h1>#29: A single-spa error handler must be a function</h1>
      <p>
        You must call removeErrorHandler with a function handler as an argument.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { removeErrorHandler } from 'single-spa';

            const wasRemoved = removeErrorHandler(myHandler);

            function myHandler(err) {
              console.error(err);
            }
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api#removeerrorhandler">removeErrorHandler documentation</a>.
      </p>
    </>
  )
}
