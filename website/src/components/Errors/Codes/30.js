import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode30(props) {
  return (
    <>
      <h1>#30: Lifecycle function rejected its promise with a non-Error</h1>
      <p>
        For application or parcel {props.getErrorCodeArg(0)}, the lifecycle function {props.getErrorCodeArg(0)} rejected its promise
        with something that is not an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" target="_blank">Error</a> object.
      </p>
      <p>
        This problem is logged as a warning to the console, but is not thrown as an additional error. The reason it is logged is that
        only JavaScript Error objects will provide a good stacktrace for you to debug the cause of the Error.
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
