import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import Cookies from 'js-cookie'

export const wishlistItemsAtom = atomWithStorage<number[]>('xc-wishlist', [])
export const wishlistItems = atom(
  get => get(wishlistItemsAtom),
  (get, set, itemIds: number[]) => {
    const items = itemIds?.length

    if (items === 0) {
      Cookies.remove('xc-wishlist')
    }

    set(wishlistItemsAtom, itemIds)

    if (items > 0) {
      Cookies.set('xc-wishlist', `${items}`, {expires: 7})
    }
  },
)
