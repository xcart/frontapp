import {Meta, StoryObj} from '@storybook/react'
import {IconTick as Icon} from '~/components/elements/Icons'

const meta: Meta<typeof Icon> = {
  title: 'Components/Elements/Icons',
  component: Icon,
  argTypes: {
    fill: {control: 'text'},
    className: {control: 'text'},
  },
}

export default meta

export const IconTick: StoryObj<typeof Icon> = {
  render: args => <Icon {...args} />,
}
