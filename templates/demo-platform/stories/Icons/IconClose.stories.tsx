import {Meta, StoryObj} from '@storybook/react'
import {IconClose as Icon} from '~/components/elements/Icons'

const meta: Meta<typeof Icon> = {
  title: 'Components/Elements/Icons',
  component: Icon,
  argTypes: {
    fill: {control: 'text'},
    className: {control: 'text'},
  },
}

export default meta

export const IconClose: StoryObj<typeof Icon> = {
  render: args => <Icon {...args} />,
}
