import React from 'react';
import withBaseUrl from '@docusaurus/withBaseUrl';
import styles from './styles.module.css';
import classnames from 'classnames';

const data = [
  {
    content:
      'Use multiple frameworks in a single-page application, allowing you to split code by functionality and have Angular, React, Vue.js, etc. apps all living in harmony.',
    imageUrl: 'img/icons/148705-essential-collection/svg/paper-plane.svg',
    title: 'Framework freedom',
  },
  {
    content: `Stand up new apps next to the old one. You write the applications, single-spa makes them work together and won't load them until they're needed.`,
    imageUrl: 'img/icons/148705-essential-collection/svg/download.svg',
    title: 'Lazy load applications',
  },
  {
    content:
      'Combine many small apps, empowering teams to choose their technology. Stay nimble as your team, product, and tech stack grows and changes over time.',
    imageUrl: 'img/icons/148705-essential-collection/svg/settings-1.svg',
    title: 'Front-end microservices',
  },
];

export const Features = () => {
  return (
    <section className={styles.features}>
      <div className="container text--center">
        <div className="row">
          {data.map(({title, content, imageUrl}, idx) => (
            <div key={idx} className={classnames('col col--4', styles.feature)}>
              {imageUrl && (
                <div className="margin-bottom--lg">
                  <img
                    className={styles.featureImage}
                    src={withBaseUrl(imageUrl)}
                    alt={title}
                  />
                </div>
              )}
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
