import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode18(props) {
  return (
    <>
      <h1>#18: setUnmountMaxTime was called with an invalid maxTime</h1>
      <p>
        The setUnmountMaxTime API must be called with a non-negative integer
        representing the number of milliseconds to wait before timing out.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { setUnmountMaxTime } from 'single-spa';

            // Must be called with a non-negative integer
            setUnmountMaxTime(2000);
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See{" "}
        <a href="/docs/api#setunmountmaxtime">
          setUnmountMaxTime documentation
        </a>
        .
      </p>
    </>
  );
}
