import React, { useEffect } from 'react';
import classnames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { projects, coreMembers } from '@site/src/data/contributors';
import styles from './styles.module.css';

const TITLE = 'Core Team Members';

const getContributors = token => `
  ${JSON.stringify(projects)}.forEach(({user, repo}) => {
    fetch(\`https://api.github.com/repos/\${user}/\${repo}/contributors?access_token=${token}\`)
      .then(res => res.json())
      .then(data => {
        const contributors = data.map(({html_url, login, id, avatar_url}) => (\`  
          <a href="\${html_url}" target="_blank" rel="noopener noreferrer" class="${
            styles.contributorItem
          }" id=\${id}>
            <span class="${
              styles.contributorImg
            }" style="background-image: url('\${avatar_url}')"></span>
            <h3 class="${styles.contributorLogin}">
              \${login}
            </h3>
          </a>  
        \`)).join("")
        document.getElementById(\`\${repo}-contributors\`).innerHTML = contributors;
      })
      .catch(error => console.error("Error:", error))
  })
`;

function Contributors() {
  const { siteConfig = {} } = useDocusaurusContext();

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = getContributors(
      siteConfig.customFields.githubTokenAccess,
    );
    document.head.appendChild(script);
    return () => script.parentNode.removeChild(script);
  });

  return (
    <Layout>
      <div className="container text--center margin-vert--xl">
        <h1 className={styles.contributorHeader}>{TITLE}</h1>

        <div
          className={classnames(
            styles.contributorWrapper,
            styles.contributorWrapperFirst,
          )}
          style={{ paddingBottom: '40px' }}>
          <div className={styles.contributorsList}>
            {coreMembers.map(({ name, login, avatarUrl }, index) => (
              <a
                key={index}
                href={`https://github.com/${login}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contributorItem}>
                <span
                  className={styles.contributorImg}
                  style={{ backgroundImage: `url(${avatarUrl})` }}></span>
                <h3 className={styles.contributorLogin}>{name}</h3>
              </a>
            ))}
          </div>
        </div>

        <span className={styles.contributorHeader}>Contributors</span>

        {projects.map(({ user, repo }, index) => (
          <div
            key={repo}
            className={classnames(
              styles.contributorWrapper,
              index === 0 ? styles.contributorWrapperFirst : '',
            )}>
            <a
              href={`https://github.com/${user}/${repo}`}
              className={styles.repoLink}
              target="_blank"
              rel="noopener noreferrer">
              {repo}
            </a>
            <div
              id={`${repo}-contributors`}
              className={styles.contributorsList}></div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Contributors;
