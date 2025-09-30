import {Meta, StoryObj} from '@storybook/react'
import {IconHidden as Icon} from '~/components/elements/Icons'

const meta: Meta<typeof Icon> = {
  title: 'Components/Elements/Icons',
  component: Icon,
  argTypes: {
    fill: {control: 'text'},
    className: {control: 'text'},
  },
}

export default meta

export const IconHidden: StoryObj<typeof Icon> = {
  render: args => <Icon {...args} />,
}
