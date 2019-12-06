import React from 'react';
import Layout from '@theme/Layout';
// import styles from './styles.module.css';

const r = require.context("../../components/Errors/Codes/", false, /\.js$/)

function Error(props) {
  const params = new URLSearchParams(props.location.search)
  const requireKey = `./${params.get("code")}.js`
  
  if (!r.keys().includes(requireKey)) {
    return (
      <Layout>
        <div className="container container--fluid padding-horiz--xl" style={{marginTop: '8px'}}>
          {params.get("code") ? `We could not find an explanation page for the error code ${params.get("code")}` : "No code query param specified. Could not show error page."}
        </div>
      </Layout>
    )
  }

  const Comp = r(`./${params.get("code")}.js`).default

  return (
    <Layout>
      <div
        className="container container--fluid padding-horiz--xl margin-top--xl"
        style={{ marginBottom: '6.8rem' }} // simulate sticky footer
      >
        <Comp errorCodeArgs={params.getAll("arg")} />
      </div>
    </Layout>
  );
}

export default Error;
