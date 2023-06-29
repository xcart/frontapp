import {create} from '@storybook/theming'

export default create({
  base: 'light',

  brandTitle: 'Auto',
  brandUrl: process.env.NEXTAUTH_URL,
})
