import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import sponsors from '@site/src/data/sponsors';
import styles from './styles.module.css';

export const Sponsors = ({ showAll }) => {
  const { siteConfig = {} } = useDocusaurusContext();

  const sponsorElements = (showAll
    ? sponsors
    : sponsors.filter(user => {
        return user.pinned;
      })
  ).map((user, i) => {
    return (
      <a key={i} className={styles.sponsorLogo} href={user.infoLink}>
        <img src={useBaseUrl(user.image)} title={user.caption} />
      </a>
    );
  });

  return (
    <section
      className={classnames('text--center margin-top--xl', styles.sponsor)}>
      <h2
        className={classnames('sponsorHeading', {
          [styles.sponsorHeadingColored]: !showAll,
        })}>
          Sponsors
      </h2>
      <p>This project is sponsored by these organizations and people</p>
      <div className={styles.sponsorLogos}>{sponsorElements}</div>
      {showAll ? (
        <>
          <p>Are you sponsoring this project?</p>
          <a
            href={`${siteConfig.customFields.repoUrl}/edit/master/website/src/data/sponsors.js`}
            className="button">
            Add your company
          </a>
        </>
      ) : (
        <div className="more-users">
          <a className="button" target="_blank" rel="noopener" href="https://opencollective.com/single-spa">
            Sponsor single-spa
          </a>
        </div>
      )}
    </section>
  );
};

Sponsors.propTypes = { showAll: PropTypes.bool };

Sponsors.defaultProps = { showAll: false };
