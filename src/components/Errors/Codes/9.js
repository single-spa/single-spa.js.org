import React from "react";
import InvalidLifecycle from "../InvalidLifecycle";

export default function ErrorCode9(props) {
  return (
    <InvalidLifecycle
      {...props}
      isParcel
      appOrParcelName={props.getErrorCodeArg(0, "unknown name")}
      lifecycleName="bootstrap"
    />
  );
}
