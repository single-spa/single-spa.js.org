import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import { Features } from '@site/src/components/Features';
import { HomeSplash } from '@site/src/components/HomeSplash';
import { Video } from '@site/src/components/Video';
import { Showcase } from '@site/src/components/Showcase';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      permalink={'/'}
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomeSplash />
      <main>
        <Video />
        <Features />
        <Showcase />
      </main>
    </Layout>
  );
}

export default Home;
