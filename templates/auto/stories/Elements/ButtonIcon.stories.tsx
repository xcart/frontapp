import {StoryObj, Meta} from '@storybook/react'
import {ButtonIcon} from '~/components/elements/Button'
import {IconHeart} from '~/components/elements/Icons'

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/Elements/IconButton',
  component: ButtonIcon,
  argTypes: {
    buttonTitle: {table: {disable: true}},
  },
}

export default meta

export const IconButton: StoryObj<typeof ButtonIcon> = {
  render: args => (
    <ButtonIcon {...args}>
      <IconHeart />
    </ButtonIcon>
  ),
}
