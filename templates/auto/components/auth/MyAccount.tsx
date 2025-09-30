import {useSetAtom} from 'jotai'
import {useRouter, usePathname} from 'next/navigation'
import {signOut} from 'next-auth/react'
import {cartAtom} from '~/components/cart/store'
import {myGarageItemsAtom, selectedVehicleAtom} from '~/components/mmy/store'
import {Link} from '~/components/navigation/link'
import {wishlistItems} from '~/components/wishlist/store'
import {clearClient} from '../../lib/getClient'
import {clearCartId} from '../cart/functions/cartActions'

export function MyAccount({
  instantLogout = () => {},
}: {
  instantLogout: () => void
}) {
  const setCart = useSetAtom(cartAtom)
  const setGarage = useSetAtom(myGarageItemsAtom)
  const setSelectedVehicle = useSetAtom(selectedVehicleAtom)
  const setWishlist = useSetAtom(wishlistItems)
  const router = useRouter()
  const pathname = usePathname()

  async function logout() {
    instantLogout()
    await signOut({redirect: false})
    clearCartId()
    clearClient()
    setCart({})
    setGarage([])
    setSelectedVehicle({})
    setWishlist([])
    router.refresh()

    if (pathname?.substring(1) === 'profile') {
      router.push('/')
    }
  }

  return (
    <div>
      <ul className="flex flex-col gap-unit-2">
        <li>
          <Link href="/profile" className="no-underline">
            Profile Details
          </Link>
        </li>
      </ul>
      <hr className="my-unit-4" />
      <button type="submit" onClick={logout} aria-label="Sign out">
        Sign out
      </button>
    </div>
  )
}
