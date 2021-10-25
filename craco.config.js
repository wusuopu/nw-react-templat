const CracoAntDesignPlugin = require('craco-antd');
const theme = require('./src/theme')

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': theme.colors.primary,
        },
      },
    },
  ],
}
