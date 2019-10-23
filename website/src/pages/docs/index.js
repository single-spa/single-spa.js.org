import React from 'react';
import Markdown from 'markdown-to-jsx';
import classnames from 'classnames';
import withBaseUrl from '@docusaurus/withBaseUrl';
import Layout from '@theme/Layout';
import items from '@site/src/data/docs';
import styles from './styles.module.css';

function Docs() {
  return (
    <Layout>
      <div
        className="container container--fluid padding-horiz--xl margin-top--xl"
        style={{ marginBottom: '6.8rem' }} // simulate sticky footer
      >
        <div className="row">
          {items.map(
            ({ title, content, imageUrl, imageAlt, imageLink }, idx) => (
              <div
                key={idx}
                className={classnames('col col--3 text--center', styles.doc)}>
                <div className={styles.docImage}>
                  <a href={imageLink}>
                    <img src={withBaseUrl(imageUrl)} alt={imageAlt} />
                  </a>
                </div>
                <h2 className="margin-top--lg">{title}</h2>
                <p>
                  <Markdown>{content}</Markdown>
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Docs;
