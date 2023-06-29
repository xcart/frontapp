import {StoryObj, Meta} from '@storybook/react'
import Footer from '~/components/global/Footer'

const meta: Meta<typeof Footer> = {
  title: 'Components/Global/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const StoreFooter: StoryObj<typeof Footer> = {
  render: () => <Footer />,
}
