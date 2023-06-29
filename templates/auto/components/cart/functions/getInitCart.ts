import getSavedCartFromCookies from '~/components/cart/functions/getSavedCartFromCookies'
import {getXCartClient} from '../../../app/client'

export default async function getInitCart() {
  const client = await getXCartClient()
  const savedCartId = getSavedCartFromCookies()

  let cartId: string | null | undefined = savedCartId?.value
  let cart = null

  if (client.hasAccessToken() && !cartId) {
    const user = await client.other.getUserItem()

    cartId = user.cartId
  }

  if (cartId) {
    const existingCart = await client.cart.getCart(cartId, {
      next: {tags: [cartId]},
    })

    if (existingCart) {
      cart = existingCart
    }
  }

  return cart && !(cart instanceof Error) ? cart : undefined
}
