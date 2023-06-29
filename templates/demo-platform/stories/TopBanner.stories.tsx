import {StoryObj, Meta} from '@storybook/react'
import {TopBanner as Banner} from '~/components/global/TopBanner'
import bestellersBanner from '../public/bestsellers.jpeg'

const meta: Meta<typeof Banner> = {
  title: 'Components/Global/TopBanner',
  component: Banner,
}

export default meta

export const TopBanner: StoryObj<typeof Banner> = {
  render: args => <Banner {...args} />,
}

TopBanner.args = {
  image: bestellersBanner,
  alt: 'Bestsellers',
}
