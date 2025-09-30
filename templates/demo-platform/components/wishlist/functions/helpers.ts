import Cookies from 'js-cookie'
import {clearWishlist} from '~/components/wishlist/functions/wishlistActions'

export function clearCustomerWishlist(handleClearAction: () => void) {
  const hasWishlist = Cookies.get('xc-wishlist')

  if (hasWishlist) {
    clearWishlist().then(() => {
      Cookies.remove('xc-wishlist')
      handleClearAction()
    })
  }
}
