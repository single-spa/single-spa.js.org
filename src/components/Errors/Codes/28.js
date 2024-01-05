import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode28(props) {
  return (
    <>
      <h1>#28: A single-spa error handler must be a function</h1>
      <p>
        You must call addErrorHandler with a function handler as an argument.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { addErrorHandler } from 'single-spa';

            addErrorHandler(myHandler);

            function myHandler(err) {
              console.error(err);
            }
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api#adderrorhandler">addErrorHandler documentation</a>.
      </p>
    </>
  )
}
