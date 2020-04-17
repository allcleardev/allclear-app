const { override, useEslintRc, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  useEslintRc(path.resolve(__dirname, '.eslintrc')),
  addWebpackAlias({
    '@root': path.resolve(__dirname, './'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@general': path.resolve(__dirname, 'src/components/general'),
    '@svg': path.resolve(__dirname, 'src/components/svg'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@contexts': path.resolve(__dirname, 'src/contexts'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@styles': path.resolve(__dirname, 'src/styles'),
    '@util': path.resolve(__dirname, 'src/util'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
  })
);
