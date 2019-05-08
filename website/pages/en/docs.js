const React = require('react')
const CompLibrary = require('../../core/CompLibrary.js'); 
const siteConfig = require(process.cwd() + '/siteConfig.js');

module.exports = function Docs() {
  return (
    <CompLibrary.Container>
      <h1 style={{display: 'flex', justifyContent: 'center'}}></h1>
      <CompLibrary.GridBlock
        align="center"
        layout="fourColumn"
        className="docs-landing-grid"
        contents={[
          {
            title: `single-spa playground (new)`,
            content: `Opinionated and easy interactive tutorial. SystemJS without the pain. <br><br> [Go to Playground](https://single-spa-playground.org)`,
            image: siteConfig.baseUrl + 'img/icons/148705-essential-collection/svg/map-1.svg',
            imageAlt: 'map with path',
            imageLink: siteConfig.baseUrl + 'docs/getting-started-overview.html',
          },
          {
            title: `Examples and starter kits`,
            content: `Github repos ready to clone. For all major frameworks and build systems.<br><br> [Go to Examples](/docs/examples.html)`,
            image: siteConfig.baseUrl + 'img/icons/148705-essential-collection/svg/blueprint.svg',
            imageAlt: 'house blueprint',
            imageLink: siteConfig.baseUrl + 'docs/getting-started-overview.html',
          },
          {
            title: 'Tutorials',
            content: 'Written tutorials with step-by-step instructions for different frameworks.<br><br> [Go to Tutorials](/docs/starting-from-scratch.html)',
            image: siteConfig.baseUrl + 'img/icons/148705-essential-collection/svg/list.svg',
            imageAlt: 'checklist',
            imageLink: siteConfig.baseUrl + 'docs/getting-started-overview.html',
          },
          {
            title: 'API Documentaion',
            content: `Documentation of concepts, exported functions, and interop with frameworks.<br><br> [Go to API Documentation](/docs/api.html)`,
            image: siteConfig.baseUrl + 'img/icons/148705-essential-collection/svg/more-2.svg',
            imageAlt: 'code documentation',
            imageLink: siteConfig.baseUrl + 'docs/getting-started-overview.html',
          },
        ]}
      />
    </CompLibrary.Container>
  )
}