import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode15(props) {
  return (
    <>
      <h1>
        #15: lifecycle function {props.getErrorCodeArg(2)} did not return a
        promise
      </h1>
      <p>
        For {props.getErrorCodeArg(0, "microfrontend")}{" "}
        {props.getErrorCodeArg(1)}, the lifecycle function{" "}
        {props.getErrorCodeArg(2)} at array index {props.getErrorCodeArg(3)} did
        not return a promise.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            // Similar flow applies for other frameworks
            import singleSpaReact from 'single-spa-react';
            import React from 'react';
            import ReactDOM from 'react-dom';
            import Root from './root.component';

            const lifecycles = singleSpaReact({
              React,
              ReactDOM,
              rootComponent: Root,
            })

            export const bootstrap = lifecycles.bootstrap;
            export const mount = lifecycles.mount;
            export const unmount = lifecycles.unmount;
          `}
        </CodeSnippet>
        <CodeSnippet>
          {`
            // If you're implementing your own lifecycle functions, make sure they are async or return a promise.
            export const bootstrap = async () => {
              // do something
            }

            export const mount = () => Promise.resolve().then(() => {
              // do something
            })

            export const unmount = async () => {
              // do something
            }
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        <a href="/docs/building-applications#registered-application-lifecycle">
          Lifecycle functions
        </a>{" "}
        are the framework agnostic API that single-spa uses to mount and unmount
        microfrontends. A lifecycle function is a function that returns a
        Promise (or an async function). The promise should resolve once the
        lifecycle has completed bootstrapping, mounting, or unmounting. The most
        common implementation for lifecycle functions is to use a{" "}
        <a href="/docs/ecosystem">helper library</a> for your component
        framework. If you do that, you won't have to implement the lifecycle
        functions yourself.
      </p>
    </>
  );
}
