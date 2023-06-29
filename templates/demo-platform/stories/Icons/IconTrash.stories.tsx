import {Meta, StoryObj} from '@storybook/react'
import {IconTrash as Icon} from '~/components/elements/Icons'

const meta: Meta<typeof Icon> = {
  title: 'Components/Elements/Icons',
  component: Icon,
  argTypes: {
    fill: {control: 'text'},
    className: {control: 'text'},
  },
}

export default meta

export const IconTrash: StoryObj<typeof Icon> = {
  render: args => <Icon {...args} />,
}
