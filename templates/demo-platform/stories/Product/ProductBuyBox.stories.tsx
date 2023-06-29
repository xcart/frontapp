import {StoryObj, Meta} from '@storybook/react'
import {ProductBuyBox as BuyBox} from '~/components/product/ProductBuyBox'
import {PRODUCT_NO_ATTRIBUTES} from '../constants'

const meta: Meta<typeof BuyBox> = {
  title: 'Components/Product/ProductBuyBox',
  component: BuyBox,
}

export default meta

export const ProductBuyBox: StoryObj<typeof BuyBox> = {
  render: args => <BuyBox {...args} />,
}

ProductBuyBox.args = {
  product: PRODUCT_NO_ATTRIBUTES,
  selectedAttributes: {},
  setSelectedAttributes: () => {},
}
