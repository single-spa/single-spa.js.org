import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode4(props) {
  return (
    <>
      <h1>#4: Cannot mount parcel - customProps must be an object</h1>
      <p>
        Parcel {props.getErrorCodeArg(0, "unknown name")} was not provided a
        customProps object. Was given{" "}
        <code>{props.getErrorCodeArg(1, "unknown customProps")}</code>.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            const parcelConfig = singleSpaReact({...});
            const customProps = {domElement: document.getElementById('some-container')}

            // You must provide a customProps object with a domElement property as the second argument to mountParcel()
            mountParcel(parcelConfig, customProps);
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        The <a href="/docs/parcels-api#mountparcel">mountParcel</a> and{" "}
        <a href="/docs/parcels-api#mountrootparcel">mountRootParcel</a> apis
        require that you pass in a second argument.
      </p>
    </>
  );
}
