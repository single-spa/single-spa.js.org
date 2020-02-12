import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode31(props) {
  return (
    <>
      <h1>#31: Lifecycle function's promise did not resolve or reject</h1>
      <p>
        For {props.getErrorCodeArg(1)} {props.getErrorCodeArg(2)}, the lifecycle function {props.getErrorCodeArg(0)} returned a promise
        that neither resolved or rejected for {props.getErrorCodeArg(3)}.
      </p>
      <p>
        It is possible that this promise resolved after the timeout occurred. Single-spa has a configuration setting called
        the <a href="/docs/api#setbootstrapmaxtime" target="_blank">timeout configuration</a> that controls timeouts for lifecycle functions at both
        a global and per-app level. You may adjust that setting to no longer see this warning, if you'd like to.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            export function mount() {
              return new Promise((resolve, reject) => {
                // Always reject with an Error.
                reject(new Error('hi'));
              });
            }
          `}
        </CodeSnippet>
      </div>
    </>
  )
}
