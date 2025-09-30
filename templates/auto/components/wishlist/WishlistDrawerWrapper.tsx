import {cookies} from 'next/headers'
import {WishlistDrawer} from '~/components/wishlist/WishlistDrawer'
import {getXCartClient} from '../../app/client'

function getInitWishlistCount() {
  const initWishlist = cookies().get('xc-wishlist')

  const count = Number(initWishlist?.value)

  return Number.isNaN(count) ? 0 : count
}

async function getCustomerWishlist() {
  const client = await getXCartClient()

  if (!client.hasAccessToken()) {
    return null
  }

  const wishlist = await client.wishlist.getWishlist({next: {revalidate: 0}})

  return wishlist instanceof Error ? null : wishlist
}

export async function WishlistDrawerWrapper() {
  const wishlist = await getCustomerWishlist()

  return (
    <WishlistDrawer
      initWishlistCount={getInitWishlistCount()}
      wishlist={wishlist}
    />
  )
}
