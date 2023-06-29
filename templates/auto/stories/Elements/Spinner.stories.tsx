import {StoryObj, Meta} from '@storybook/react'
import {Spinner as Loader} from '~/components/elements/Spinner'

const meta: Meta<typeof Loader> = {
  title: 'Components/Elements/Spinner',
  component: Loader,
}

export default meta

export const Spinner: StoryObj<typeof Loader> = {
  render: args => <Loader {...args} />,
}

Spinner.args = {
  size: 'h-[30px] w-[30px]',
}
