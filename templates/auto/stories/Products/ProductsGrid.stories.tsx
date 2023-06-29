import {StoryObj, Meta} from '@storybook/react'
import {ProductsGrid as Grid} from '~/components/products/ProductsGrid'
import {PRODUCTS} from '../constants'

const meta: Meta<typeof Grid> = {
  title: 'Components/Products/ProductsGrid',
  component: Grid,
}

export default meta

export const ProductsGrid: StoryObj<typeof Grid> = {
  render: args => <Grid {...args} />,
}

ProductsGrid.args = {
  products: PRODUCTS,
}
