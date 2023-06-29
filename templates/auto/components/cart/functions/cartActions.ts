import Cookies from 'js-cookie'
import {getClient} from '../../../lib/getClient'
import {client as unauthenticated} from '../../../utils/unauthenticated-client'

let cartId: string | null = null

const clientAuth = async () => {
  let client = await getClient()

  if (!client.hasAccessToken()) {
    client = unauthenticated
  }

  return client
}

export const createCart = async () => {
  const client = await clientAuth()

  const cart = await client.cart.createCart({})

  if (cart.id) {
    cartId = cart.id
  }

  return cart
}

export const getCartId = async () => {
  if (cartId) {
    return cartId
  }

  const client = await clientAuth()

  if (client.hasAccessToken()) {
    const user = await client.other.getUserItem()

    if (user.cartId) {
      cartId = user.cartId
    }
  }

  if (!cartId) {
    await createCart()
  }

  return cartId as string
}

export const getCart = async (currentCartId?: string) => {
  const client = await clientAuth()

  const id = currentCartId || (await getCartId())

  const cart = await client.cart.getCart(id, {
    next: {tags: [id]},
  })

  return cart
}

export const deleteCart = async (id: string) => {
  const client = await clientAuth()

  cartId = null

  const response = await client.cart.deleteCart(id)

  return response
}

export const mergeCart = async (anonymousCartId: string) => {
  const client = await getClient()

  if (!client.hasAccessToken()) {
    return false
  }

  const user = await client.other.getUserItem()

  const userCartId = user.cartId || (await getCartId())

  const mergedCart = await client.cart.mergeCart(userCartId, {
    anonymousCartId,
  })

  if (mergedCart && mergedCart.id) {
    const updatedCart = await getCart(mergedCart.id)

    return updatedCart
  }

  return null
}

export const addToCart = async (
  currentCartId: string,
  productId: number,
  amount: number,
  attributes: any,
) => {
  const client = await clientAuth()

  const id = currentCartId || (await getCartId())

  const response = await client.cart.addProduct(id, {
    productId,
    amount,
    attributes,
  })

  return response
}

export const updateProductInCart = async (
  currentCartId: string,
  cartItemId: number,
  amount: number,
) => {
  const client = await clientAuth()

  const id = currentCartId || (await getCartId())

  // @ts-ignore
  const response = await client.cart.updateProduct(String(cartItemId), id, {
    amount,
  })

  return response
}

export const deleteProductFromCart = async (
  currentCartId: string,
  cartItemId: number,
) => {
  const client = await clientAuth()

  const id = currentCartId || (await getCartId())

  const response = await client.cart.deleteProduct(String(cartItemId), id)

  return response
}

export const clearCartId = () => {
  cartId = null

  Cookies.remove('xc-cart')

  return false
}
