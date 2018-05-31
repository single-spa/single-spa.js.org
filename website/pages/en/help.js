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

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content:
          `Learn more about [single-spa](${siteConfig.baseUrl}) using the [official docs](${docUrl('building-applications.html')}).`,
        title: 'Browse Docs',
      },
      {
        content: 'You can join the conversation on [Slack](https://join.slack.com/t/single-spa/shared_invite/enQtMzIwMTcxNTU3ODQyLTM1Y2U1OWMzNTNjOWYyZDBlMDJhN2VkYzk3MDI2NzQ2Nzg0MzMzNjVhNWE2YjVhMTcxNjFkOWYzMjllMmUxMjk) on one of our channels: [#general]() for user help and [#maintainers]() for contributing help .',
        title: 'Slack',
      },
      {
        content: "You can follow and contact us on [Twitter](https://twitter.com/Single_spa).",
        title: 'Twitter',
      },
      {
        content: "At our [GitHub repo](https://github.com/CanopyTax/single-spa) Browse and [submit issues](https://github.com/CanopyTax/single-spa/issues) or [pull requests](https://github.com/CanopyTax/single-spa/pulls) for bugs you find or any new features you may want implemented. Be sure to also check out our [contributing information]().",
        title: 'Github'
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>Need help?</h2>
            </header>
            <p>This project is maintained by a dedicated group of people.</p>
            <GridBlock contents={supportLinks} layout="fourColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;
