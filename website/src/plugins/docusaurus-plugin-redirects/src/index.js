const path = require('path');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  excludedPaths: [],
};

module.exports = function(context, opts) {
  const options = { ...DEFAULT_OPTIONS, ...opts };

  return {
    name: 'custom-docusaurus-plugin-redirects',

    async postBuild({ siteConfig = {}, routesPaths = [], outDir }) {
      routesPaths.map(routesPath => {
        if (!path.isAbsolute(routesPath)) {
          return;
        }

        if (options.excludedPaths.includes(routesPath)) {
          return;
        }

        const newLink = `${siteConfig.url}${routesPath}${
          routesPath.endsWith('/') ? '' : '/'
        }`;
        const fileName = path.basename(routesPath);
        const filePath = path.dirname(routesPath);
        const htmlContent = `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${newLink}">
    <link rel="canonical" href="${newLink}" />
    <title>Redirecting to ${newLink}</title>
  </head>
  <script>
    window.location.href = '${newLink}';
  </script>
</html>
        `;

        const oldPagePath = path.join(
          outDir.concat(filePath),
          `${fileName}.html`,
        );
        fs.writeFile(oldPagePath, htmlContent, err => {
          if (err) {
            throw new Error(`File creating error: ${err}`);
          }
        });
      });
    },
  };
};
