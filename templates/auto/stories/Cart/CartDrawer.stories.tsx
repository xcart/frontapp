import {StoryObj, Meta} from '@storybook/react'
import {CartDrawer as Cart} from '~/components/cart/CartDrawer'

const meta: Meta<typeof Cart> = {
  title: 'Components/Cart/CartDrawer',
  component: Cart,
}

export default meta

export const CartDrawer: StoryObj<typeof Cart> = {
  render: args => <Cart {...args} />,
}
