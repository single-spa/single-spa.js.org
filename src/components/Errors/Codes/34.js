import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode34(props) {
  return (
    <>
      <h1>#34: Application must be an object</h1>
      <p>
        The loading function for {props.getErrorCodeArg(0, "application")}{" "}
        {props.getErrorCodeArg(1)} returned a promise that resolved with
        something that is not an object. The loading function should resolve
        with an application object that has the single-spa lifecycle functions
        on it.
      </p>
      <p>
        The resolved value for the application was was{" "}
        {props.getErrorCodeArg(2)}
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { registerApplication } from 'single-spa';

            registerApplication('name', loadingFn, activityFn);

            function loadingFn() {
              // Make sure the resolved value of the promise is an object!
              return System.import('name');
            }
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/api/#registerapplication">documentation</a>.
      </p>
    </>
  );
}
