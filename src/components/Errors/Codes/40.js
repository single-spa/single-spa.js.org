import React from "react";

export default function ErrorCode40(props) {
  return (
    <>
      <h1>#40: Invalid custom props returned from function</h1>
      <p>
        The single-spa application {props.getErrorCodeArg(0)} was registered
        with a function for its customProps. That function must return an object
        of custom props, but instead returned {props.getErrorCodeArg(1)}.
      </p>
      <p>
        See the{" "}
        <a href="/docs/configuration#custom-props">
          custom props documentation
        </a>{" "}
        for more information.
      </p>
    </>
  );
}
