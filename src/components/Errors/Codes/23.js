import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode23(props) {
  return (
    <>
      <h1>#23: Application or loading function is required</h1>
      <p>
        You cannot register an application without providing a second argument
        that is an application object or loading function.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { registerApplication } from 'single-spa';

            registerApplication(
              'name',
              // This function is the "loading function" and is required
              () => System.import('name'),
              activityFunction
            )
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api#registerApplication">registerApplication</a> and{" "}
        <a href="/docs/configuration#loading-function-or-application">
          loading function
        </a>{" "}
        documentation.
      </p>
    </>
  );
}
