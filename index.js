'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const Webpack = require('broccoli-webpack');

module.exports = {
  name: 'ember-lodash-fp',

  included(app) {
    this._super.included.apply(this, arguments);

    while (typeof app.import !== 'function' && app.app) {
      console.log("app.import does not equal a function!");
      app = app.app
    }

    this.app = app;

    const vendor = this.treePaths.vendor;

    app.import(vendor + '/lodash/fp.js', {
      using: [
        {
          transformation: 'amd',
          as: 'lodash/fp'
        }
      ]
    });

    return app;
  },

  treeForVendor(vendorTree) {
    const lodashFP = new Funnel(path.dirname(require.resolve('lodash/fp')), {
      destDir: 'lodash',
      files: ['fp.js']
    });

    const lodashFPTree = new Webpack([lodashFP], {
      entry: 'lodash/fp.js',
      output: {
        filename: 'lodash/fp.js',
        library: 'lodash/fp',
        libraryTarget: 'umd'
      }
    });

    const trees = [lodashFPTree];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    return new MergeTrees(trees);
  }
};
