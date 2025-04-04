import React from "react";
import Layout from "@theme/Layout";

const r = require.context("../../components/Errors/Codes/", false, /\.js$/);

function Error(props) {
  const params = new URLSearchParams(props.location.search);
  const requireKey = `./${params.get("code")}.js`;

  if (!r.keys().includes(requireKey)) {
    return (
      <Layout>
        <div
          className="container container--fluid padding-horiz--xl"
          style={{ marginTop: "8px" }}
        >
          {params.get("code")
            ? `We could not find an explanation page for the error code ${params.get(
                "code",
              )}`
            : "No code query param specified. Could not show error page."}
        </div>
      </Layout>
    );
  }

  const Comp = r(`./${params.get("code")}.js`).default;

  const errorCodeArgs = params.getAll("arg");

  return (
    <Layout>
      <div
        className="container container--fluid padding-horiz--xl margin-top--xl"
        style={{ marginBottom: "6.8rem" }} // simulate sticky footer
      >
        <Comp
          errorCodeArgs={errorCodeArgs}
          getErrorCodeArg={getErrorCodeArg}
          errorCode={params.get("code")}
        />
        <a
          href={`https://github.com/single-spa/single-spa.js.org/edit/master/src/components/Errors/Codes/${params.get(
            "code",
          )}.js`}
        >
          Edit this page
        </a>
      </div>
    </Layout>
  );

  function getErrorCodeArg(index, argName) {
    const missingArg = argName ? `(${argName})` : `(unknown)`;
    return errorCodeArgs.length > index ? errorCodeArgs[index] : missingArg;
  }
}

export default Error;
