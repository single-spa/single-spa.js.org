import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode32(props) {
  return (
    <>
      <h1>#32: Cannot update a parcel that is not mounted</h1>
      <p>
        You may not update parcel {props.getErrorCodeArg(0)} because it is not
        currently in MOUNTED status.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { mountRootParcel } from 'single-spa';

            const parcel = mountRootParcel(parcelConfig, { domElement });
            parcel.mountPromise.then(() => {
              // Wait for the parcel to mount before updating it
              parcel.update();
            });
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        See <a href="/docs/parcels-api#getstatus">documentation</a>.
      </p>
    </>
  );
}
