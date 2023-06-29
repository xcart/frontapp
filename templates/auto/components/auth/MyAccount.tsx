import {useSetAtom} from 'jotai'
import {useRouter} from 'next/navigation'
import {signOut} from 'next-auth/react'
import {cartAtom} from '~/components/cart/store'
import {myGarageItemsAtom, selectedVehicleAtom} from '~/components/mmy/store'
import {Link} from '~/components/navigation/link'
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
  const router = useRouter()

  async function logout() {
    instantLogout()
    await signOut({redirect: false})
    clearCartId()
    clearClient()
    setCart({})
    setGarage([])
    setSelectedVehicle({})
    router.refresh()
  }

  return (
    <div>
      <ul className="flex flex-col gap-unit-2">
        <li>
          <Link href="/" className="no-underline">
            Orders History
          </Link>
        </li>
        <li>
          <Link href="/" className="no-underline">
            Address Book
          </Link>
        </li>
        <li>
          <Link href="/" className="no-underline">
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
