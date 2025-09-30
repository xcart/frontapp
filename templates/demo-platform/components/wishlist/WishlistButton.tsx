'use client'

import {useEffect, useState} from 'react'
import {useAtom} from 'jotai'
import {Button} from '~/components/elements/Button'
import {IconHeart, IconHeartFilled} from '~/components/elements/Icons'
import {
  addToWishlist,
  deleteFromWishlist,
} from '~/components/wishlist/functions/wishlistActions'
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
  const [mounted, setMounted] = useState<boolean>()
  const [wishlistValues, setWishlistValues] = useAtom(wishlistItems)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="light"
        className={tailwindMerge(
          'absolute right-0 top-0 z-[2] flex h-unit-8 w-unit-8 items-center justify-center rounded-none border-0 p-0 lg:h-unit-12 lg:w-unit-12 lg:py-0',
          buttonClasses,
        )}
        aria-label="Add to Wishlist"
      >
        <IconHeart className="lg:w-[30px]" />
      </Button>
    )
  }

  const handleClick = () => {
    let newWishlistValues = []
    const items = structuredClone(wishlistValues)
    let existing

    if (items.includes(productId)) {
      existing = true
      deleteFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }

    newWishlistValues =
      !existing && productId
        ? [...items, productId]
        : items.filter(
            item =>
              item !== null && typeof item !== undefined && item !== productId,
          )

    setWishlistValues(newWishlistValues)
  }

  const isProductAddedToWishlist: boolean = wishlistValues.includes(productId)

  return (
    <Button
      variant="light"
      className={tailwindMerge(
        'absolute right-0 top-0 z-[2] flex h-unit-8 w-unit-8 items-center justify-center rounded-none border-0 p-0 lg:h-unit-12 lg:w-unit-12 lg:py-0',
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
