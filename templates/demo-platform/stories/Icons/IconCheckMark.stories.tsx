import {StoryObj, Meta} from '@storybook/react'
import {IconCheckMark as Icon} from '~/components/elements/Icons'

const meta: Meta<typeof Icon> = {
  title: 'Components/Elements/Icons',
  component: Icon,
  argTypes: {
    fill: {control: 'text'},
    className: {control: 'text'},
  },
}

export default meta

export const IconCheckMark: StoryObj<typeof Icon> = {
  render: args => <Icon {...args} />,
}

IconCheckMark.args = {
  className: 'w-[20px]',
}
