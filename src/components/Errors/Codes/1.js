import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode1() {
  return (
    <>
      <h1>#1: singleSpa.start() was not called</h1>
      <p>
        <a href="/docs/api#start">singleSpa.start()</a> has not been called,
        5000ms after single-spa was loaded. Before start() is called, apps can
        be declared and loaded, but not bootstrapped or mounted.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            // Insert this into your single-spa root config
            singleSpa.start();
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        The single-spa start() API exists to give you fine-grained control over
        performance. In the majority of use cases, you should call
        singleSpa.start() immediately after{" "}
        <a href="/docs/api#registerapplication">
          registering your applications
        </a>
        . It was designed for situations where you want to start downloading a
        single-spa application's code while you're waiting for initial user data
        or context. To do that, call registerApplication() immediately but delay
        calling start until the data is loaded.
      </p>
    </>
  );
}
