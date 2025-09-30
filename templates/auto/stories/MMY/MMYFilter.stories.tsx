import {StoryObj, Meta} from '@storybook/react'
import {prepareLevels} from '~/components/mmy/functions/helpers'
import {MMYFilter as Filter} from '~/components/mmy/MMYFilter/MMYFilter'
import {LEVELS_SETUP, ROOT_LEVEL} from '../constants'

const meta: Meta<typeof Filter> = {
  title: 'Components/MMY/MMYFilter',
  component: Filter,
}

export default meta

export const MMYFilter: StoryObj<typeof Filter> = {
  render: args => <Filter {...args} />,
}

const MMYLevels = prepareLevels(LEVELS_SETUP, ROOT_LEVEL)

MMYFilter.args = {
  levels: MMYLevels,
  selected: {},
}
