import {CartDrawer} from '~/components/cart/CartDrawer'
import getInitCart from '~/components/cart/functions/getInitCart'

export async function CartDrawerWrapper() {
  const cart = await getInitCart()

  return <CartDrawer cart={cart} />
}
