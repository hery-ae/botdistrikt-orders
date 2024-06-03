'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');

  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css.map', {
    destDir: 'assets',
  });

  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', {
    destDir: 'assets',
  });

  return app.toTree();
};
