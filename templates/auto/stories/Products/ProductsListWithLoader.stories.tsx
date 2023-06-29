import {StoryObj, Meta} from '@storybook/react'
import {ProductsListWithLoader as ProductsList} from '~/components/products/ProductsListWithLoader'
import {PRODUCTS} from '../constants'

const meta: Meta<typeof ProductsList> = {
  title: 'Components/Products/ProductsGridWithLoader',
  component: ProductsList,
}

export default meta

export const ProductsGridWithLoader: StoryObj<typeof ProductsList> = {
  render: args => <ProductsList {...args} />,
}

ProductsGridWithLoader.args = {
  products: PRODUCTS,
  hasNextPage: true,
  fetchNextPage: () => {},
  isFetching: false,
}
