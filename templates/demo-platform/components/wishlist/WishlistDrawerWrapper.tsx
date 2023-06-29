import {cookies} from 'next/headers'
import {WishlistDrawer} from '~/components/wishlist/WishlistDrawer'

function getInitWishlistCount() {
  const initWishlist = cookies().get('xc-wishlist')

  const count = Number(initWishlist?.value)

  return Number.isNaN(count) ? 0 : count
}

export async function WishlistDrawerWrapper() {
  return <WishlistDrawer initWishlistCount={getInitWishlistCount()} />
}
