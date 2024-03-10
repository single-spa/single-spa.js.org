import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode3(props) {
  return (
    <>
      <h1>#3: Cannot mount parcel - name is not a string</h1>
      <p>
        Parcel name must be a string, if provided. Was given{" "}
        <code>{props.getErrorCodeArg(0, "unknown")}</code>.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            // The easiest way to avoid this error is let single-spa control the name of your parcel
            const parcelConfig = singleSpaReact({...});
            mountParcel(parcelConfig, {domElement});
          `}
        </CodeSnippet>
        <CodeSnippet>
          {`
            // Alternatively, you can provide a name but it must be a string
            const parcelConfig = singleSpaReact({...});
            parcelConfig.name = 'my-parcel';
            mountParcel(parcelConfig, {domElement});
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        When you call <a href="/docs/parcels-api#mountparcel">mountParcel</a> or{" "}
        <a href="/docs/parcels-api#mountrootparcel">mountRootParcel</a>, you
        must provide a{" "}
        <a href="/docs/parcels-overview#parcel-configuration">parcel config</a>{" "}
        object. That object may optionally have a string property called name.
      </p>
    </>
  );
}
