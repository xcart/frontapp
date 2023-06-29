import {StoryObj, Meta} from '@storybook/react'
import {ProductImagesMobile as Images} from '~/components/product/ProductImagesMobile'
import {IMAGES} from '../constants'

const meta: Meta<typeof Images> = {
  title: 'Components/Product/ProductImagesMobile',
  component: Images,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}

export default meta

export const ProductImagesMobile: StoryObj<typeof Images> = {
  render: args => <Images {...args} />,
}

ProductImagesMobile.args = {
  images: IMAGES,
}
