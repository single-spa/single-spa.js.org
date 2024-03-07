import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode25(props) {
  return (
    <>
      <h1>#25: Cannot unregister application - does not exist</h1>
      <p>
        You cannot unregister application {props.getErrorCodeArg(0)} because no
        application with that name was registered.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            __SINGLE_SPA_DEVTOOLS__.exposedMethods.unregisterApplication(
              'name-of-an-application',
            )
          `}
        </CodeSnippet>
      </div>
    </>
  );
}
