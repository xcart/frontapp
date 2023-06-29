import {StoryObj, Meta} from '@storybook/react'
import {ProductImagesDesktop as Images} from '~/components/product/ProductImagesDesktop'
import {IMAGES} from '../constants'

const meta: Meta<typeof Images> = {
  title: 'Components/Product/ProductImagesDesktop',
  component: Images,
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const ProductImagesDesktop: StoryObj<typeof Images> = {
  render: args => <Images {...args} />,
}

ProductImagesDesktop.args = {
  images: IMAGES,
}
