'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ['images/dishes/'],
    },
  });

  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');

  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css.map', {
    destDir: 'assets',
  });

  return app.toTree();
};
