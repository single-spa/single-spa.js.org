/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'CanopyTax',
    image: 'img/canopy-logo-icon.svg',
    infoLink: 'https://www.canopytax.com',
    pinned: true,
  },
  {
    caption: 'DealerSocket',
    image: 'img/dealersocket.png',
    infoLink: 'https://dealersocket.com/',
    pinned: true,
  },
  {
    caption: 'Beamery',
    image: 'img/beamery.svg',
    infoLink: 'https://beamery.com/',
    pinned: true,
  },
];

const siteConfig = {
  title: 'single-spa' /* title for your website */,
  tagline: 'a javascript framework for front-end microservices',
  url: 'https://canopytax.github.io/single-spa.js.org' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  cname: 'single-spa.js.org',
  projectName: 'single-spa',
  headerLinks: [
    {doc: 'getting-started-overview', label: 'Docs'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
    { href: "https://github.com/CanopyTax/single-spa", label: "GitHub" },
    {search: true}
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/logo-white-bgblue.svg',
  footerIcon: 'img/logo-white-bgblue.svg',
  favicon: 'img/logo-blue-favicon.ico',
  /* colors for website */
  colors: {
    primaryColor: '#0011FF',
    secondaryColor: '#f9f9f9',
    subText: '#889aaa',
    accentWhite: '#fff'
  },
  /* custom fonts for website */
  fonts: {
    mainFont: [
      '-apple-system',
      'system-ui',
      'sans-serif'
    ],
    secondaryFont: [
      'sans-serif'
    ],
    accentFont: [
      '-apple-system',
      'system-ui',
    ],
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' CanopyTax',
  organizationName: 'CanopyTax', // or set an env variable ORGANIZATION_NAME
  projectName: 'single-spa.js.org', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  // Adds secondary on-page navigation for doc sub-topics
  onPageNav: 'separate',
  scripts: ['https://buttons.github.io/buttons.js', 'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js', '/js/index.js'],
  stylesheets: ["https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/CanopyTax/single-spa',
  editUrl: 'https://github.com/CanopyTax/single-spa.js.org/blob/master/docs/',
  algolia: {
    apiKey: '113e711177d63ab1ff28ef858cbcffa5',
    indexName: 'single_spa',
    algoliaOptions: {} // Optional, if provided by Algolia
  },
  scrollToTop: true,
  markdownPlugins: [
    require('remarkable-highlight-lines')
  ],
  gaTrackingId: 'UA-121119786-1'
};

module.exports = siteConfig;
