'use strict';

const path = require('path');
const MergeTrees = require('broccoli-merge-trees');
const Rollup = require('broccoli-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

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
    let lodashPath = path.dirname(require.resolve('lodash'));

    let rollupTree = new Rollup(lodashPath, {
      rollup: {
        input: 'fp.js',
        plugins: [
          resolve(),
          commonjs()
        ],
        output: {
          file: 'lodash/fp.js',
          format: 'amd',
          name: 'lodash/fp'
        }
      }
    });

    let trees = [rollupTree];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    return new MergeTrees(trees);
  },
};
