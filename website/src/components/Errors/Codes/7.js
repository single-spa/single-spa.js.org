import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode6(props) {
  return (
    <>
      <h1>#7: Loading function resolved with invalid parcel config</h1>
      <p>
        When mounting a parcel, the config loading function must return a promise that resolves with the parcel config
      </p>
      <h2>To fix:</h2>
      <div>
        <div>Framework agnostic code:</div>
        <CodeSnippet>
          {`
            const customProps = {domElement: document.getElementById('some-container')}
            
            // You need to ensure that the System.import() or import() promise resolves with a valid parcel config object
            const parcel = mountParcel(() => import('./some-parcel.js'), customProps);
          `}
        </CodeSnippet>
        <div>React code:</div>
        <CodeSnippet>
          {`
            // You need to ensure that the System.import() or import() promise resolves with a valid parcel config object
            <Parcel config={() => System.import('@org-name/some-parcel')} />
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        You can call <a href="/docs/parcels-api#mountparcel">mountParcel</a> and <a href="/docs/parcels-api#mountrootparcel">mountRootParcel</a> with a
        <a href="">loading function</a> as the first argument. When doing so, the loading function must return a promise that resolves with a valid
        <a href="">parcel config object</a>.
      </p>
    </>
  )
}