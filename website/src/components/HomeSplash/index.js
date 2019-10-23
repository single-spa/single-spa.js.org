import styles from './styles.module.css';
import React from 'react';
import classnames from 'classnames';
import Link from '@docusaurus/Link';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import withBaseUrl from '@docusaurus/withBaseUrl';

export const HomeSplash = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <header className={classnames('hero hero--light', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroProjectTitle}>{siteConfig.title}</h1>
        <p className={styles.heroProjectTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link className="button" to={withBaseUrl('docs/getting-started')}>
            Get Started
          </Link>

          <Link className="button" to="https://single-spa.surge.sh">
            See a live example
          </Link>
        </div>
      </div>
    </header>
  );
};
