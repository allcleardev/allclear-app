const { override, useEslintRc, addWebpackAlias } = require('customize-cra');
const webpackConfig = require('./webpack.config');
const path = require('path');

module.exports = override(
  useEslintRc(path.resolve(__dirname, '.eslintrc')),
  addWebpackAlias(webpackConfig.resolve.alias),
);
