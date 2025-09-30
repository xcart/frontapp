import {getClient} from '../../../lib/getClient'
import {client as unauthenticated} from '../../../utils/unauthenticated-client'

const clientAuth = async () => {
  let client = await getClient()

  if (!client.hasAccessToken()) {
    client = unauthenticated
  }

  return client
}

export const getWishlist = async () => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return false
  }

  const response = await client.wishlist.getWishlist()

  return response
}

export const mergeWishlist = async (productIds: number[]) => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return false
  }

  const wishlist = await client.wishlist.mergeWishlist({productIds})

  if (wishlist) {
    const updatedWishlist = await client.wishlist.getWishlist()

    return updatedWishlist
  }

  return null
}

export const addToWishlist = async (productId: number) => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return false
  }

  const response = await client.wishlist.addToWishlist({productId})

  return response
}

export const deleteFromWishlist = async (productId: number) => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return false
  }

  const response = await client.wishlist.deleteFromWishlist(String(productId))

  return response
}

export const clearWishlist = async () => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return false
  }

  const response = client.wishlist.clearWishlist({})

  return response
}
