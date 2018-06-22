/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
  </h2>
);

const SubHeading = props => (
  <h3 className="subHeader">
    {siteConfig.tagline}
  </h3>
)

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <SubHeading />
          <PromoSection>
            <Button href={docUrl("getting-started-overview.html")}>Get Started</Button>
            <Button href="https://single-spa.surge.sh" target="_blank">See a live example</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="threeColumn" id="features">
    {[
      {
        content: 'Use multiple frameworks in a single-page application, allowing you to split code by functionality and have Angular, React, Vue.js, etc. apps all living in harmony.',
        image: imgUrl('logo-white.svg'),
        imageAlign: 'top',
        title: 'Framework freedom',
      },
      {
        content: `Stand up new apps next to the old one. You write the applications, single-spa makes them work together and won't load them until they're needed.`,
        image: imgUrl('logo-white.svg'),
        imageAlign: 'top',
        title: 'Lazy load applications',
      },
      {
        content: 'Combine many small apps, empowering teams to choose their technology. Stay nimble as your team, product, and tech stack grows and changes over time.',
        image: imgUrl('logo-white.svg'),
        imageAlign: 'top',
        title: 'Front-end microservices',
      },
    ]}
  </Block>
);

const VideoAndText = props => (
  <Block>
    {[
      {
        content: `<iframe width='100%' style="height: 500px"  src="https://www.youtube-nocookie.com/embed/L4jqow7NTVg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
        title: ""
      }
    ]}
  </Block>
)

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>Who's Using This?</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <div className="index-main-video">
            <VideoAndText />
          </div>
          <div className="index-main-features">
            <Features />
          </div>
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
