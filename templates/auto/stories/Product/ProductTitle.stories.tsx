import {StoryObj, Meta} from '@storybook/react'
import {ProductTitle as Title} from '~/components/product/ProductTitle'

const meta: Meta<typeof Title> = {
  title: 'Components/Product/ProductTitle',
  component: Title,
}

export default meta

export const ProductTitle: StoryObj<typeof Title> = {
  render: args => <Title {...args} />,
}

ProductTitle.args = {
  title: 'Test product',
}
