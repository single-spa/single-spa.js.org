const path = require('path');
const repoUrl = 'https://github.com/single-spa/single-spa.js.org';
const libRepoUrl = 'https://github.com/single-spa/single-spa';

const versions = require('./versions.json');

module.exports = {
  title: 'single-spa',
  tagline: 'A javascript router for front-end microservices',
  url: 'https://single-spa.js.org',
  baseUrl: '/',
  projectName: 'single-spa',
  favicon: 'img/single-spa-mark-magenta.svg',
  organizationName: 'single-spa',
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
      appId: 'FWAC4N89WA',
      apiKey: 'e9a2995a76ba1949a12513c566b0d87a',
      indexName: 'single-spa-js',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
      startUrls: ['https://single-spa.js.org/'],
    },
    footer: {
      logo: {
        alt: 'single-spa',
        src: 'img/single-spa-logo-magenta.svg',
      },
      copyright: `Copyright © ${new Date().getFullYear()} single-spa.`,
      style: 'dark',
      links: [
        {
          title: 'Courses',
          items: [
            {
              label: 'Single-Spa Workshop',
              to: 'https://single-spa-workshop.com',
            },
            {
              label: 'Microfrontend Fundamentals',
              to: 'https://single-spa-workshop.com',
            },
          ],
        },
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
              label: 'Sponsors',
              to: 'sponsors/',
            },
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
                'https://join.slack.com/t/single-spa/shared_invite/zt-15a59134l-ytK9bWMD1z3vGTC9LwPREg',
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
        src: 'img/single-spa-mark-magenta.svg',
      },
      items: [
        {
          to: 'versions',
          label: versions[0],
          style: {
            whiteSpace: 'nowrap',
            padding: '0.25rem 0.5rem 0.2rem 0.25rem',
            fontSize: 'calc(0.9 * var(--ifm-font-size-base))',
            textDecoration: 'underline',
          },
        },
        { to: 'docs/faq/', label: 'FAQ' },
        { to: 'docs/', label: 'Docs' },
        { to: 'https://single-spa-workshop.com', label: 'Courses' },
        { to: 'help/', label: 'Help' },
        { to: 'blog/', label: 'Blog' },
        { href: 'https://opencollective.com/single-spa', label: 'Donate' },
        { href: 'https://github.com/single-spa/single-spa', label: 'GitHub' },
        { to: 'languages', label: '简Жहि Languages' },
      ],
    },
    prismTheme: require('prism-react-renderer/themes/vsDark'),
  },
  plugins: [],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editUrl: `${repoUrl}/blob/master/website/`,
          // sidebarCollapsible: false,
        },
        theme: {
          customCss: require.resolve('./static/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-138683004-1',
        },
      },
    ],
  ],
};
