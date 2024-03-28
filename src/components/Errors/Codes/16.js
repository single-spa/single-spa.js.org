import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode16(props) {
  return (
    <>
      <h1>#16: setBootstrapMaxTime was called with an invalid maxTime</h1>
      <p>
        The setBootstrapMaxTime API must be called with a non-negative integer
        representing the number of milliseconds to wait before timing out.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { setBootstrapMaxTime } from 'single-spa';

            // Must be called with a non-negative integer
            setBootstrapMaxTime(2000);
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See{" "}
        <a href="/docs/api#setbootstrapmaxtime">
          setBootstrapMaxTime documentation
        </a>
        .
      </p>
    </>
  );
}
