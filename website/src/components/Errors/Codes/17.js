
import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode17(props) {
  return (
    <>
      <h1>#17: setMountMaxTime was called with an invalid maxTime</h1>
      <p>
        The setMountMaxTime API must be called with a non-negative integer representing the number of milliseconds to wait before timing out.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { setMountMaxTime } from 'single-spa';

            // Must be called with a non-negative integer
            setMountMaxTime(2000);
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api#setmountmaxtime">setMountMaxTime documentation</a>.
      </p>
    </>
  )
}