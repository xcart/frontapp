import {useState} from 'react'
import {useSetAtom} from 'jotai'
import {clearCart} from '~/components/cart/functions/helpers'
import {cartAtom} from '~/components/cart/store'
import {ButtonIcon} from '~/components/elements/Button'
import {IconTrash} from '~/components/elements/Icons'
import {Spinner} from '~/components/elements/Spinner'
import {deleteProductFromCart, getCart} from './functions/cartActions'

export function DeleteProductFromCart({
  cartId,
  cartItemId,
}: {
  cartId: string
  cartItemId: number
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const setCart = useSetAtom(cartAtom)

  const handleRemoveProduct = async () => {
    setLoading(true)
    await deleteProductFromCart(cartId, cartItemId).then(async () => {
      const updatedCart = await getCart(cartId)

      if (updatedCart) {
        if (!updatedCart?.items?.length) {
          clearCart(() => {
            setCart({})
          })
        } else {
          setCart(updatedCart)
        }
      }

      setLoading(false)
    })
  }

  return (
    <ButtonIcon
      onClick={handleRemoveProduct}
      className="flex h-unit-8 w-unit-8 items-center justify-center border-0 bg-gray-300 p-0 hover:bg-gray-500 lg:h-unit-12 lg:w-unit-12 lg:py-0"
    >
      {!loading ? (
        <IconTrash className="w-[13px] fill-primary lg:w-[22px]" />
      ) : (
        <Spinner size="w-[14px] h-[14px] lg:w-[22px] lg:h-[22px]" />
      )}
    </ButtonIcon>
  )
}
