import React from "react";

export default function ErrorCode38(props) {
  return (
    <>
      <h1>#38: Invalid registerApplication configuration object</h1>
      <p>
        The configuration object in registerApplication accepts only the
        following keys: "{props.getErrorCodeArg(0)}"
      </p>
      <p>
        You provided the following invalid keys: "{props.getErrorCodeArg(1)}"
      </p>
      <p>
        See{" "}
        <a href="/docs/configuration">registerApplication API documentation</a>{" "}
        for more information.
      </p>
    </>
  );
}
