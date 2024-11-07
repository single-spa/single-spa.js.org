import React from "react";
import CodeSnippet from "../CodeSnippet";

export default function ErrorCode13(props) {
  return (
    <>
      <h1>#13: Parcel is not mountable.</h1>
      <p>
        Parcel {props.getErrorCodeArg(0, "unknown name")} is currently in{" "}
        {props.getErrorCodeArg(1)} status. You may only call parcel.mount()
        when the parcel is in NOT_MOUNTED status.
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            const customProps = {domElement: document.getElementById('some-container')}
            const parcel = mountParcel(() => import('./some-parcel.js'), customProps);

            parcel.unmount().then(() => {
              // Now the parcel is guaranteed to be in NOT_MOUNTED status, and you can call parcel.mount()
              parcel.mount()
            })
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        Single-spa parcels have a <a href="/docs/api/#getappstatus">status</a>{" "}
        (same as single-spa applications). You may only attempt to mount a
        parcel if it is not currently mounted, but parcel.mount() was called
        when the parcel was in {props.getErrorCodeArg(1)} status. Note that you
        normally do not have to call{" "}
        <a href="/docs/parcels-api/#mount">parcel.mount()</a> at all, since
        parcel objects will always be mounted the first time by calling{" "}
        <a href="/docs/parcels-api/#mountparcel">mountParcel()</a>.
      </p>
    </>
  );
}
