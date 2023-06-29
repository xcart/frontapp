import {StoryObj, Meta} from '@storybook/react'
import {Input as InputStyled} from '~/components/elements/Input'

const meta: Meta<typeof InputStyled> = {
  title: 'Components/Elements/Input',
  component: InputStyled,
}

export default meta

export const Input: StoryObj<typeof InputStyled> = {
  render: args => <InputStyled {...args} ref={undefined} />,
}

Input.args = {
  label: 'Input field label',
}
