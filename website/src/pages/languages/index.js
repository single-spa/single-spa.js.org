import React from 'react';
import Layout from '@theme/Layout';
import languages from '@site/src/data/languages';

export default function Languages() {
  return (
    <Layout title="Languages">
      <div className="container container--fluid padding-horiz--xl margin-top--lg">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <h1>Languages</h1>
          <p>
            The single-spa documentation is available in the following languages:
          </p>
        </div>
        <div className="row text--center">
          {languages.map(language => (
            <div
              key={language.languageName}
              className="col col--6 margin-vert--md padding-horiz--xl">
              <h3>{language.languageNameEnglish}</h3>
              <div>
                <a href={language.documentationUrl} style={{fontSize: '1.5rem'}}>{language.languageName}</a>
              </div>
              <div>
                <a href={language.githubUrl} style={{fontSize: '.75rem'}}>Contribute</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          Don't see your language above?<a href="https://github.com/single-spa/single-spa/issues/new" style={{marginLeft: '.3rem'}}>Let us know</a>.
        </div>
      </div>
    </Layout>
  );
}
