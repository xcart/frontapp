import {StoryObj, Meta} from '@storybook/react'
import {MyGarageDrawer} from '~/components/mmy/garage/MyGarageDrawer'
import {LEVELS_SETUP, ROOT_LEVEL} from '../constants'

const meta: Meta<typeof MyGarageDrawer> = {
  title: 'Components/Garage/MyGarageDrawer',
  component: MyGarageDrawer,
}

export default meta

export const MyGarage: StoryObj<typeof MyGarageDrawer> = {
  render: args => <MyGarageDrawer {...args} />,
}

MyGarage.args = {
  levels: LEVELS_SETUP,
  rootLevel: ROOT_LEVEL,
}
