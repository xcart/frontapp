import {Meta, StoryObj} from '@storybook/react'
import {IconArrowDown as Icon} from '~/components/elements/Icons'

const meta: Meta<typeof Icon> = {
  title: 'Components/Elements/Icons',
  component: Icon,
  argTypes: {
    fill: {control: 'text'},
    className: {control: 'text'},
  },
}

export default meta

export const IconArrowDown: StoryObj<typeof Icon> = {
  render: args => <Icon {...args} />,
}
