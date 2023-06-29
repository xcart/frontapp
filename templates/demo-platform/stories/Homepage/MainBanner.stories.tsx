import {Meta, StoryObj} from '@storybook/react'
import {MainBanner as Banner} from '~/components/homepage/MainBanner'

const meta: Meta<typeof Banner> = {
  title: 'Components/Homepage/MainBanner',
  component: Banner,
}

export default meta

export const MainBanner: StoryObj<typeof Banner> = {
  render: () => <Banner />,
}
