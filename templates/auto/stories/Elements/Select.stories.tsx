import {StoryObj, Meta} from '@storybook/react'
import {Select as SelectStyled} from '~/components/elements/Select'

const meta: Meta<typeof SelectStyled> = {
  title: 'Components/Elements/Select',
  component: SelectStyled,
  argTypes: {
    handleSelectChange: {action: 'change'},
  },
}

export default meta

export const Select: StoryObj<typeof SelectStyled> = {
  render: args => <SelectStyled {...args} />,
}

Select.args = {
  options: [
    {name: 'First', value: '1'},
    {name: 'Second', value: '2'},
    {name: 'Third', value: '3'},
  ],
}
