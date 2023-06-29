// Refer to https://github.com/storybookjs/storybook/pull/9775
import path = require('path')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
  ],
  framework: '@storybook/nextjs',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config: {
    resolve: {
      alias: any
    }
    module: {
      rules: {
        test: RegExp
        use: {
          loader: string
          options: {
            postcssOptions: {
              plugins: any[]
            }
          }
        }[]
        include: any
      }[]
    }
  }) => {
    /**
     * Add support for alias-imports
     * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
     */
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@': [path.resolve(__dirname, '../src/'), path.resolve(__dirname, '../')],
    }
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })
    return config
  },
  docs: {
    autodocs: true,
  },
}
