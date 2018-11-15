/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('getting-started-overview.html', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('examples.html', this.props.language)}>
              Examples
            </a>
            <a href={this.docUrl('api.html', this.props.language)}>
              API Reference
            </a>
            <a href={this.docUrl('contributing-overview.html', this.props.language)}>
              Contribution Guide
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.pageUrl('users.html', this.props.language)}>
              User Showcase
            </a>
            <a href={this.pageUrl('contributors.html', this.props.language)}>
              Contributors
            </a>
            <a
              href="http://stackoverflow.com/questions/tagged/single-spa"
              target="_blank"
              rel='noopener'
            >
              Stack Overflow
            </a>
            <a href="https://join.slack.com/t/single-spa/shared_invite/enQtMzIwMTcxNTU3ODQyLTM1Y2U1OWMzNTNjOWYyZDBlMDJhN2VkYzk3MDI2NzQ2Nzg0MzMzNjVhNWE2YjVhMTcxNjFkOWYzMjllMmUxMjk" target='_blank' rel='noopener'>Chat in Slack</a>
            <a href="https://twitter.com/" target="_blank" rel='noopener'>
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.baseUrl + 'blog'}>Blog</a>
            <a href={this.props.config.repoUrl}>GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              target="_blank"
              rel='noopener'
              data-icon="octicon-star"
              data-count-href="/CanopyTax/single-spa/stargazers"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>

        <a
          href="https://www.canopytax.com/"
          target="_blank"
          rel='noopener'
          className="cpOpenSource">
          <img
            src="/img/canopy-logo-icon.svg"
            alt="CanopyTax Open Source"
            height="45"
          />
        </a>
        <section className="copyright">
          Copyright &copy; {currentYear} CanopyTax
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
