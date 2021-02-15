import styles from './styles.module.css';
import React from 'react';
import classnames from 'classnames';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const HomeSplash = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <header className={classnames('hero hero--light', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroProjectTitle}>{siteConfig.title}</h1>
        <p className={styles.heroProjectTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link
            className="button"
            to={useBaseUrl('docs/getting-started-overview')}>
            Get Started
          </Link>

          <Link
            className="button"
            to="https://vue.microfrontends.app/rate-doggos">
            See a live example
          </Link>

          <Link
            className="button"
            to="https://join.slack.com/t/single-spa/shared_invite/zt-mafdeybq-0v1aIm3KKaqyVCT2xeny3Q">
            Join Slack Chat
          </Link>
        </div>
      </div>
    </header>
  );
};
