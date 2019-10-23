import React from 'react';
import styles from './styles.module.css';

export const Video = () => {
  return (
    <section className={styles.video}>
      <div className="container">
        <div className="row">
          <iframe
            width="100%"
            style={{ height: '500px' }}
            src="https://www.youtube-nocookie.com/embed/L4jqow7NTVg?rel=0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};
