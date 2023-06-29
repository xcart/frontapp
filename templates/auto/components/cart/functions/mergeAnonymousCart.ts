import {Cart} from '@xcart/storefront'
import Cookies from 'js-cookie'
import {mergeCart} from '~/components/cart/functions/cartActions'

export async function mergeAnonymousCart(
  cartId: string,
  setCart: (values: Cart) => void,
) {
  if (cartId) {
    const mergedCart = await mergeCart(cartId)

    if (mergedCart && mergedCart.id) {
      Cookies.set('xc-cart', mergedCart.id)
      setCart(mergedCart)
    }
  }
}
