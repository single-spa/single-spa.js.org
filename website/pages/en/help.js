/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content:
          `Learn more about single-spa using the [official docs](${docUrl('building-applications.html')}).`,
        title: 'Browse Docs',
      },
      {
        content: 'You can join the conversation on [Slack](https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ) on one of our channels: #general for user help and #maintainers for contributing help .',
        title: 'Slack',
      },
      {
        content: "At our [GitHub repo](https://github.com/CanopyTax/single-spa) Browse and [submit issues](https://github.com/CanopyTax/single-spa/issues) or [pull requests](https://github.com/CanopyTax/single-spa/pulls) for bugs you find or any new features you may want implemented. Be sure to also check out our [contributing information]().",
        title: 'Github'
      },
      {
        content: "Paid, hands-on consulting with a single-spa core team member is available. Our [core team members](/contributors.html) have done this before and can help you set up single-spa. Services range from a one hour debugging session to an ongoing relationship while you're seeing your project to completion. Inquire at singlespa.info@gmail.com.",
        title: 'Phone call / Consulting'
      },
      {
        content: "Use the [single-spa tag](http://stackoverflow.com/questions/tagged/single-spa) on StackOverflow.",
        title: "Stack Overflow"
      },
      {
        content: "You can follow and contact us on [Twitter](https://twitter.com/Single_spa).",
        title: 'Twitter',
      },
    ];
    
    return (
      <div className="docMainWrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <h2>Need help?</h2>
            <p>If you need help with single-spa, you can try one of the mechanisms below.</p>
            <GridBlock contents={supportLinks} layout="twoColumn" align="center" className="single-spa-help-options" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;
