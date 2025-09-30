import {StoryObj, Meta} from '@storybook/react'
import {DesktopHeader} from './DesktopHeader'
import {ROOT_CATEGORIES} from '../constants'

const meta: Meta<typeof DesktopHeader> = {
  title: 'Components/Global/Header',
  component: DesktopHeader,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const HeaderDesktop: StoryObj<typeof DesktopHeader> = {
  render: args => <DesktopHeader {...args} />,
}

HeaderDesktop.args = {
  categories: ROOT_CATEGORIES,
}
