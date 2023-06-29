import {StoryObj, Meta} from '@storybook/react'
import {NotFoundPage as NotFound} from '~/components/global/404'

const meta: Meta<typeof NotFound> = {
  title: 'Components/Global/NotFoundPage',
  component: NotFound,
}

export default meta

export const NotFoundPage: StoryObj<typeof NotFound> = {
  render: () => <NotFound />,
}
