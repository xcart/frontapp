import {StoryObj, Meta} from '@storybook/react'
import {DiscountedPrice as Price} from '~/components/product/DiscountedPrice'
import {PRODUCT} from '../constants'

const meta: Meta<typeof Price> = {
  title: 'Components/Product/DiscountedPrice',
  component: Price,
}

export default meta

export const DiscountedPrice: StoryObj<typeof Price> = {
  render: args => <Price {...args} />,
}

DiscountedPrice.args = {
  productPrice: PRODUCT.price,
  productMarketPrice: PRODUCT.marketPrice,
  productSalePrice: PRODUCT.salePrice,
}
