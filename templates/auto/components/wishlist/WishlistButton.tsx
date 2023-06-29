'use client'

import {useAtom} from 'jotai'
import {Button} from '~/components/elements/Button'
import {IconHeart, IconHeartFilled} from '~/components/elements/Icons'
import {wishlistItems} from '~/components/wishlist/store'
import {tailwindMerge} from '~/helpers'

export function WishlistButton({
  productId,
  buttonClasses,
  isDrawer,
}: {
  productId: number
  buttonClasses?: string
  isDrawer?: boolean
}) {
  const [wishlistValues, setWishlistValues] = useAtom(wishlistItems)

  const handleClick = () => {
    let newWishlistValues = []
    const items = structuredClone(wishlistValues)
    let existing

    items.forEach((item, index) => {
      if (item === productId) {
        // eslint-disable-next-line no-param-reassign
        delete items[index]
        existing = true
      }
    })

    newWishlistValues =
      !existing && productId
        ? [...items, productId]
        : items.filter(item => item !== null && typeof item !== undefined)

    setWishlistValues(newWishlistValues)
  }

  const isProductAddedToWishlist: boolean = wishlistValues.some(
    n => n === productId,
  )

  return (
    <Button
      variant="light"
      className={tailwindMerge(
        'absolute top-0 right-0 z-[2] flex h-unit-8 w-unit-8 items-center justify-center rounded-none border-0 p-0 lg:h-unit-12 lg:w-unit-12 lg:py-0',
        buttonClasses,
        isDrawer ? 'lg:h-unit-8 lg:w-unit-8' : '',
      )}
      aria-label="Add to Wishlist"
      onClick={handleClick}
    >
      {isProductAddedToWishlist ? (
        <IconHeartFilled
          className={tailwindMerge(
            'fill-error lg:w-[30px]',
            isDrawer ? 'lg:w-[18px]' : '',
          )}
        />
      ) : (
        <IconHeart
          className={tailwindMerge(
            'lg:w-[30px]',
            isDrawer ? 'lg:w-[18px]' : '',
          )}
        />
      )}
    </Button>
  )
}
