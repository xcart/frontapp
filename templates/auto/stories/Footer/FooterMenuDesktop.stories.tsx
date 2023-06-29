import {StoryObj, Meta} from '@storybook/react'
import {FooterMenuDesktop} from '~/components/global/Footer/FooterMenuDesktop'
import {FOOTER_MENU_ITEMS} from '../constants'

const meta: Meta<typeof FooterMenuDesktop> = {
  title: 'Components/Global/Footer',
  component: FooterMenuDesktop,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const MenuDesktop: StoryObj<typeof FooterMenuDesktop> = {
  render: args => <FooterMenuDesktop {...args} />,
}

MenuDesktop.args = {
  items: FOOTER_MENU_ITEMS,
}
