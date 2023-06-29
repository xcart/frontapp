import {StoryObj, Meta} from '@storybook/react'
import {MobileMenu} from '~/components/global/Header/MobileMenu'
import {ROOT_CATEGORIES} from '../constants'

const meta: Meta<typeof MobileMenu> = {
  title: 'Components/Global/Header',
  component: MobileMenu,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

export default meta

export const MobileNavigation: StoryObj<typeof MobileMenu> = {
  render: args => <MobileMenu {...args} />,
}

MobileNavigation.args = {
  categories: ROOT_CATEGORIES,
}
