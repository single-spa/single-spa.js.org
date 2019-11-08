const path = require('path');
const repoUrl = 'https://github.com/CanopyTax/single-spa.js.org';
const libRepoUrl = 'https://github.com/CanopyTax/single-spa';

module.exports = {
  title: 'single-spa',
  tagline: 'a javascript framework for front-end microservices',
  url: 'https://canopytax.github.io/single-spa.js.org',
  baseUrl: '/',
  projectName: 'single-spa',
  favicon: 'img/logo-blue-favicon.ico',
  organizationName: 'CanopyTax',
  customFields: {
    repoUrl,
    libRepoUrl,
    // replace this with own!
    githubTokenAccess: '57317aeaa31d4221296b9252c61b355bb2a98f6c',
  },
  scripts: [
    'https://unpkg.com/vanilla-back-to-top@7.2.1/dist/vanilla-back-to-top.min.js',
    '/js/index.js',
  ],
  themeConfig: {
    algolia: {
      apiKey: '113e711177d63ab1ff28ef858cbcffa5',
      indexName: 'single_spa',
      algoliaOptions: {},
    },
    footer: {
      logo: {
        alt: 'CanopyTax',
        src: 'img/canopy-logo-icon.svg',
      },
      copyright: `Copyright © ${new Date().getFullYear()} CanopyTax.`,
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'FAQ',
              to: 'docs/faq/',
            },
            {
              label: 'Getting Started',
              to: 'docs/getting-started-overview/',
            },
            {
              label: 'API Reference',
              to: 'docs/api/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'User Showcase',
              to: 'users/',
            },
            {
              label: 'Contributors',
              to: 'contributors/',
            },
            {
              label: 'Chat in Slack',
              href:
                'https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/Single_spa/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: libRepoUrl,
            },
            {
              label: 'Donate',
              href: 'https://opencollective.com/single-spa',
            },
            {
              label: 'Blog',
              to: 'blog/',
            },
          ],
        },
      ],
    },
    image: 'img/docusaurus.png',
    navbar: {
      title: 'single-spa',
      logo: {
        alt: 'single-spa Logo',
        src: 'img/logo-white-bgblue.svg',
      },
      links: [
        { to: 'docs/faq/', label: 'FAQ' },
        { to: 'docs/', label: 'Docs' },
        { to: 'help/', label: 'Help' },
        { to: 'blog/', label: 'Blog' },
        { href: 'https://opencollective.com/single-spa', label: 'Donate' },
        { href: 'https://github.com/CanopyTax/single-spa', label: 'GitHub' },
      ],
    },
    googleAnalytics: {
      trackingID: 'UA-138683004-1',
    },
    prismTheme: require('prism-react-renderer/themes/vsDark'),
  },
  plugins: [
    [
      path.resolve(__dirname, './src/plugins/docusaurus-plugin-redirects'),
      {
        excludedPaths: ['/'],
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editUrl: `${repoUrl}/blob/master/docs/`,
          // sidebarCollapsible: false,
        },
        theme: {
          customCss: require.resolve('./static/css/custom.css'),
        },
      },
    ],
  ],
};
