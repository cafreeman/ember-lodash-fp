'use strict';

const path = require('path');
// const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
// const Webpack = require('broccoli-webpack');
const Rollup = require('broccoli-rollup');
const BabelTranspiler = require('broccoli-babel-transpiler');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
// const babel = require('rollup-plugin-babel');

module.exports = {
  name: 'ember-lodash-fp',

  included(app) {
    console.log("INCLUDED");
    this._super.included.apply(this, arguments);

    while (typeof app.import !== 'function' && app.app) {
      console.log("app.import does not equal a function!");
      app = app.app
    }

    this.app = app;

    const vendor = this.treePaths.vendor;

    app.import(vendor + '/fp.js', {
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
          file: 'fp.js',
          format: 'umd',
          name: 'lodash/fp'
        }
      }
    });

    // let babel = this.parent.findAddonByName('ember-cli-babel');
    // let babelOptions = babel.buildBabelOptions();



    let trees = [rollupTree];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    return new MergeTrees(trees);
  },
};
