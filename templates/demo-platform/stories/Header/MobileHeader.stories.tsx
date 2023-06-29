import {StoryObj, Meta} from '@storybook/react'
import {MobileHeader} from './MobileHeader'
import {ROOT_CATEGORIES} from '../constants'

const meta: Meta<typeof MobileHeader> = {
  title: 'Components/Global/Header',
  component: MobileHeader,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

export default meta

export const HeaderMobile: StoryObj<typeof MobileHeader> = {
  render: args => <MobileHeader {...args} />,
}

HeaderMobile.args = {
  categories: ROOT_CATEGORIES,
}
