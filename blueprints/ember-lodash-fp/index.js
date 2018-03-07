/* eslint-env node */
module.exports = {
  description: '',

  afterInstall() {
    return this.addPackagesToProject([
      {name: 'lodash', target: '^4.0.0'}
    ]);
  }
};
