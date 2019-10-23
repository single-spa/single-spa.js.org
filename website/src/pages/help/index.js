import React from 'react';
import Markdown from 'markdown-to-jsx';
import Layout from '@theme/Layout';
import supportLinks from '@site/src/data/help';

function Help() {
  return (
    <Layout title="Help">
      <div className="container container--fluid padding-horiz--xl margin-top--lg">
        <h1>Need help?</h1>
        <p>
          If you need help with single-spa, you can try one of the mechanisms
          below.
        </p>

        <div className="row text--center">
          {supportLinks.map(({ title, content }, idx) => (
            <div
              key={idx}
              className="col col--6 margin-vert--md padding-horiz--xl">
              <h2>{title}</h2>
              <p>
                <Markdown>{content}</Markdown>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Help;
