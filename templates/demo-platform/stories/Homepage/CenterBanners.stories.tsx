import {Meta, StoryObj} from '@storybook/react'
import {CenterBanners as Banners} from '~/components/homepage/CenterBanners'

const meta: Meta<typeof Banners> = {
  title: 'Components/Homepage/CenterBanners',
  component: Banners,
}

export default meta

export const CenterBanners: StoryObj<typeof Banners> = {
  render: () => <Banners />,
}
