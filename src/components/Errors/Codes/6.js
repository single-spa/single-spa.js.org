import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode6(props) {
  return (
    <>
      <h1>#6: Cannot unmount parcel because it is not mounted</h1>
      <p>
        Parcel {props.getErrorCodeArg(0, "unknown name")} cannot be unmounted
        because it is not currently mounted. The parcel is in{" "}
        <code>{props.getErrorCodeArg(1, "unknown")}</code> status.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            const parcelConfig = singleSpaVue({...});
            const customProps = {domElement: document.getElementById('some-container')}
            const parcel = mountParcel(parcelConfig, customProps);

            // Wait for the parcel to mount before attempting to unmount it
            parcel.mountPromise.then(parcel => {
              // Now it is safe to call unmount
              parcel.unmount()
            })

            // Or, check the status before unmounting
            if (parcel.getAppStatus() === 'MOUNTED') {
              parcel.unmount()
            }
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        A parcel has exactly one <a href="/docs/api#getappstatus">status</a>{" "}
        that indicates which stage of mounting and unmounting it is in. You may
        only call parcel.unmount() when the parcel is in MOUNTED status.
      </p>
    </>
  );
}
