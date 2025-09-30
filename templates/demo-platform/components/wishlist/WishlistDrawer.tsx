'use client'

import {useEffect, useState} from 'react'
import {CustomerWishlist} from '@xcart/storefront'
import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import {Badge} from '~/components/elements/Badge'
import {ButtonIcon} from '~/components/elements/Button'
import {Drawer, ClearPaneAction} from '~/components/elements/Drawer'
import {DrawerPane} from '~/components/elements/Drawer/DrawerPane'
import {PaneTriggerButton} from '~/components/elements/Drawer/PaneTriggerButton'
import {IconHeart} from '~/components/elements/Icons'
import {clearCustomerWishlist} from '~/components/wishlist/functions/helpers'
import {wishlistItems} from '~/components/wishlist/store'
import {Wishlist} from '~/components/wishlist/Wishlist'

function WishlistPane({children}: {children: React.ReactElement}) {
  const [wishlistIds, setWishlistIds] = useAtom(wishlistItems)

  const clearWishlist = () => clearCustomerWishlist(() => setWishlistIds([]))

  return (
    <DrawerPane
      title="Wishlist"
      itemsCount={wishlistIds.length}
      stickySecondaryAction={
        <ClearPaneAction
          count={wishlistIds.length}
          handleAction={clearWishlist}
          withDelimiter
        />
      }
      drawerSecondaryAction={
        <ClearPaneAction
          count={wishlistIds.length}
          handleAction={clearWishlist}
        />
      }
    >
      {children}
    </DrawerPane>
  )
}

function WishlistPaneTriggerButton(props: any) {
  const wishlistIds = useAtomValue(wishlistItems)

  return (
    <PaneTriggerButton
      count={wishlistIds.length}
      ariaLabel="Wishlist"
      {...props}
    >
      <IconHeart />
    </PaneTriggerButton>
  )
}

function useInitWishlist(wishlistIds: number[]) {
  const setWishlist = useSetAtom(wishlistItems)

  useEffect(() => {
    if (wishlistIds.length) {
      setWishlist(wishlistIds)
    }
  }, [setWishlist, wishlistIds])
}

export function WishlistDrawer({
  initWishlistCount,
  wishlist,
}: {
  initWishlistCount: number
  wishlist: CustomerWishlist | null
}) {
  const [mounted, setMounted] = useState<boolean>(false)

  useInitWishlist(wishlist?.productIds || [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <ButtonIcon
        className="relative ml-unit-3 h-unit-6 w-unit-6"
        aria-label="Wishlist"
      >
        <IconHeart />
        {initWishlistCount > 0 && <Badge>{initWishlistCount}</Badge>}
      </ButtonIcon>
    )
  }

  return (
    <Drawer triggerElement={<WishlistPaneTriggerButton />} width="560px">
      <WishlistPane>
        <Wishlist />
      </WishlistPane>
    </Drawer>
  )
}
