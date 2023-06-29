import {StoryObj, Meta} from '@storybook/react'
import {FooterMenuMobile} from '~/components/global/Footer/FooterMenuMobile'
import {FOOTER_MENU_ITEMS} from '../constants'

const meta: Meta<typeof FooterMenuMobile> = {
  title: 'Components/Global/Footer',
  component: FooterMenuMobile,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

export default meta

export const MenuMobile: StoryObj<typeof FooterMenuMobile> = {
  render: args => <FooterMenuMobile {...args} />,
}

MenuMobile.args = {
  items: FOOTER_MENU_ITEMS,
}
