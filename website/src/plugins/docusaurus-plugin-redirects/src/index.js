const path = require('path');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  excludedPaths: [],
};

module.exports = function(context, opts) {
  const options = { ...DEFAULT_OPTIONS, ...opts };

  return {
    name: 'docusaurus-plugin-redirects',

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
    <script>
      const redirectLink = '${newLink}' + location.search;
      document.write('<link rel="canonical" href="' + redirectLink + '">');
      document.write('<title>Redirecting to ' + redirectLink + '</title>');
      document.write('</head>')
      document.write('<body>')
      document.write('If you are not redirected automatically, follow this <a href="' + redirectLink + '">link</a>.')
      document.write('</body>')
      setTimeout(() => {
        window.location.assign(redirectLink)
      })
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
