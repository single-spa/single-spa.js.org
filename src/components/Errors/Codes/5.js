import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode5(props) {
  return (
    <>
      <h1>#5: Cannot mount parcel - customProps.domElement not provided</h1>
      <p>
        Parcel {props.getErrorCodeArg(0, "unknown name")} was not provided
        customProps.domElement. The domElement must be a DOMElement container in
        which the parcel will be mounted.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            const parcelConfig = singleSpaReact({...});

            // You must provide a domElement in your customProps provided to mountParcel
            const customProps = {domElement: document.getElementById('some-container')}

            mountParcel(parcelConfig, customProps);
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        The <a href="/docs/parcels-api#mountparcel">mountParcel</a> and{" "}
        <a href="/docs/parcels-api#mountrootparcel">mountRootParcel</a> apis
        require that you pass in customProps that have a property called{" "}
        <code>domElement</code> that is a DOMElement.
      </p>
    </>
  );
}
