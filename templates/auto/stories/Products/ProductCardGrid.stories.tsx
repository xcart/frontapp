import {StoryObj, Meta} from '@storybook/react'
import {ProductCardGrid as ProductCard} from '~/components/products/ProductCardGrid'
import {PRODUCTS} from '../constants'

const meta: Meta<typeof ProductCard> = {
  title: 'Components/Products/ProductCardGrid',
  component: ProductCard,
}

export default meta

export const ProductCardGrid: StoryObj<typeof ProductCard> = {
  render: args => (
    <div className="w-[400px]">
      <ProductCard {...args} />
    </div>
  ),
}

ProductCardGrid.args = {
  product: PRODUCTS[0],
}
