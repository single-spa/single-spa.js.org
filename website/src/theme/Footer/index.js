import React, { Fragment, useContext, useEffect, useState } from 'react';
import classnames from 'classnames';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Footer() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const { themeConfig = {} } = siteConfig;
  const { footer } = themeConfig;
  const [showWorkshopBanner, setShowWorkspaceBanner] = useState(() => typeof localStorage !== 'undefined' ? localStorage.getItem("hide-workshop-banner") !== "true" : false)

  if (!footer) {
    return null;
  }

  useEffect(() => {
    if (!showWorkshopBanner) {
      localStorage.setItem('hide-workshop-banner', true)
    }
  }, [showWorkshopBanner])

  const { copyright, links = [], logo } = footer;

  return (
    <footer
      className={classnames('footer', {
        'footer--dark': footer.style === 'dark',
      })}>
      <div className="container">
        {links && links.length > 0 && (
          <div className="row footer__links">
            {links.map((linkItem, i) => (
              <div key={i} className="col footer__col">
                {linkItem.title != null ? (
                  <h4 className="footer__title">{linkItem.title}</h4>
                ) : null}
                {linkItem.items != null &&
                Array.isArray(linkItem.items) &&
                linkItem.items.length > 0 ? (
                  <ul className="footer__items">
                    {linkItem.items.map((item, idx, arr) => (
                      <Fragment key={idx}>
                        <li key={item.href || item.to} className="footer__item">
                          {item.label && (
                            <Link
                              className="footer__link-item"
                              {...item}
                              {...(item.href
                                ? {
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                    href: item.href,
                                  }
                                : {
                                    to: useBaseUrl(item.to),
                                  })}>
                              {item.label}
                            </Link>
                          )}

                          {item.html && (
                            <div
                              dangerouslySetInnerHTML={{ __html: item.html }}
                            />
                          )}
                        </li>
                        {arr.length - 1 === idx && i === 2 && (
                          <>
                            <li
                              key="gh-star"
                              className="footer__item footer__item--gh">
                              <iframe
                                title="github"
                                src={`https://ghbtns.com/github-btn.html?user=${siteConfig.organizationName}&repo=${siteConfig.projectName}&type=star&count=true&size=small`}
                              />
                            </li>
                            <li key="license" className="footer__item">
                              <a
                                href={useBaseUrl(
                                  'img/icons/148705-essential-collection/license/license.html',
                                )}>
                                License for icons
                              </a>
                            </li>
                          </>
                        )}
                      </Fragment>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        )}
        <div className="text--center">
          {logo && logo.src && (
            <img
              className="footer__logo margin-bottom--sm"
              alt={logo.alt} src={useBaseUrl(logo.src)}
            />
          )}
          <div>
            Originally developed at <a href='https://getcanopy.com'>Canopy</a>
          </div>
          {copyright && copyright}
          {showWorkshopBanner &&
            <div className="footer__banner">
              <div>
                Learn microfrontends from the single-spa core team at single-spa-workshop.com!
              </div>
              <div class="footer__banner--actions">
                <div role="button" tabIndex={0} onClick={() => setShowWorkspaceBanner(false)}>
                  Dismiss
                </div>
                <a href="https://single-spa-workshop.com" target="_blank" rel="noopener">
                  View Courses
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </footer>
  );
}

export default Footer;
