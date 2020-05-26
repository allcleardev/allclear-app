const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './src/components'),
      '@general': path.resolve(__dirname, './src/components/general'),
      '@hocs': path.resolve(__dirname, './src/components/higher-order-components'),
      '@svg': path.resolve(__dirname, './src/components/svg'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@util': path.resolve(__dirname, './src/util'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
};
