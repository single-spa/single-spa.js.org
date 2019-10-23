import React from 'react';
import classnames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import withBaseUrl from '@docusaurus/withBaseUrl';
import users from '@site/src/data/users';
import styles from './styles.module.css';

export const Showcase = ({ showAll }) => {
  const { siteConfig = {} } = useDocusaurusContext();

  const showcase = (showAll
    ? users
    : users.filter(user => {
        return user.pinned;
      })
  ).map((user, i) => {
    return (
      <a href={user.infoLink} key={i}>
        <img
          className={styles.showcaseLogo}
          src={user.image}
          title={user.caption}
        />
      </a>
    );
  });

  return (
    <section
      className={classnames('text--center margin-top--xl', styles.showcase)}>
      <h2
        className={classnames('showcaseHeading', {
          [styles.showcaseHeadingColored]: !showAll,
        })}>
        Who's Using This?
      </h2>
      <p>This project is used by all these organizations</p>
      <div className={styles.showcaseLogos}>{showcase}</div>
      {showAll ? (
        <>
          <p>Are you using this project?</p>
          <a
            href={`${siteConfig.customFields.repoUrl}/edit/master/website/src/data/users.js`}
            className="button">
            Add your company
          </a>
        </>
      ) : (
        <div className="more-users">
          <a className="button" href={withBaseUrl('users')}>
            More {siteConfig.title} Users
          </a>
        </div>
      )}
    </section>
  );
};

Showcase.defaultProps = { showAll: false };