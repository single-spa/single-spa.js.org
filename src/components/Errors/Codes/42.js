import React from "react";

export default function ErrorCode42(props) {
  return (
    <>
      <h1>#42: The given logger does not conform to the ILogger interface</h1>
      <p>
        The <code>configureLogger()</code> function was called with an argument that does not
        conform to the <code>ILogger</code> interface. An <code>ILogger</code> must have the
        following members: <code>debug()</code>, <code>info()</code>, <code>warn()</code> and
        <code>error()</code>.
      </p>
      <h2>To fix:</h2>
      <p>
        There are 3 possible arguments that are acceptable for <code>configureLogger()</code>:
      </p>
      <ol>
        <li>
          The value <code>null</code>, that silences all log messages coming from single-spa.
        </li>
        <li>
          The <code>console</code> object, which causes single-spa to log all messages directly to the console.
        </li>
        <li>
          A custom implementation that can be used for pretty much anyting:  From selective 
          silencing of specific errors to forwarding logs to a central logging service.
        </li>
      </ol>
      <h2>Additional references</h2>
      <p>
        See{" "}
        <a href="/docs/api#configurelogger">
          the API documentation
        </a>{" "}
        for information and the details of the <code>ILogger</code> interface.
      </p>
    </>
  );
}