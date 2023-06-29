import {create} from '@storybook/theming'

export default create({
  base: 'light',

  brandTitle: 'Demo platform',
  brandUrl: process.env.NEXTAUTH_URL,
})
