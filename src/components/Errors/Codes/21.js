import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode21(props) {
  return (
    <>
      <h1>#21: Duplicate application name</h1>
      <p>
        Cannot register application '{props.getErrorCodeArg(0)}' because an
        application has already been registered with that name.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { registerApplication } from 'single-spa';

            registerApplication(
              'some-other-name',
              loadingFunction,
              activityFunction
            )
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See{" "}
        <a href="/docs/api#registerApplication">
          registerApplication documentation
        </a>
        .
      </p>
    </>
  );
}
