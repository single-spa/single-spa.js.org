
import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode19(props) {
  return (
    <>
      <h1>#19: setUnloadMaxTime was called with an invalid maxTime</h1>
      <p>
        The setUnloadMaxTime API must be called with a non-negative integer representing the number of milliseconds to wait before timing out.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { setUnloadMaxTime } from 'single-spa';

            // Must be called with a non-negative integer
            setUnloadMaxTime(2000);
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api#setunloadmaxtime">setUnloadMaxTime documentation</a>.
      </p>
    </>
  )
}