import {StoryObj, Meta} from '@storybook/react'
import {ProductAttributes as Attributes} from '~/components/product/ProductAttributes'
import {PRODUCT} from '../constants'

const meta: Meta<typeof Attributes> = {
  title: 'Components/Product/ProductAttributes',
  component: Attributes,
  argTypes: {
    setSelectedAttributes: {action: 'change'},
  },
}

export default meta

export const ProductAttributes: StoryObj<typeof Attributes> = {
  render: args => <Attributes {...args} />,
}

ProductAttributes.args = {
  attributes: PRODUCT.attributes,
}
