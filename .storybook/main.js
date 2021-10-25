module.exports = {
  stories: [
    '../src/components/**/*.stories.@(tsx|jsx)'
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-backgrounds',
    // '@storybook/addon-info',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    {
      name: "storybook-preset-craco",
      // options: {
      //   cracoConfigFile: "../craco.config.js",
      // },
    },
  ],
}
