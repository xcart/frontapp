import {StoryObj, Meta} from '@storybook/react'
import {Button} from '~/components/elements/Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Elements/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: () => <Button variant="primary" buttonTitle="Button" />,
}

export const Secondary: Story = {
  render: () => <Button variant="secondary" buttonTitle="Button" />,
}

export const Light: Story = {
  render: () => <Button variant="light" buttonTitle="Button" />,
}
