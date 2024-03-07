import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode24(props) {
  return (
    <>
      <h1>#24: The activityFunction argument must be a function</h1>
      <p>
        You cannot register an application without providing a third argument
        that is an application's activity function.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { registerApplication } from 'single-spa';

            registerApplication(
              'name',
              () => System.import('name'),
              // The function below is the "activity function", which must be provided
              location => location.pathname.startsWith('/name')
            )
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api#registerApplication">registerApplication</a> and{" "}
        <a href="/docs/configuration#activity-function">activity function</a>{" "}
        documentation.
      </p>
    </>
  );
}
