'use client'

import {useEffect, useState} from 'react'
import {useAtom, useAtomValue} from 'jotai'
import {useHydrateAtoms} from 'jotai/utils'
import Cookies from 'js-cookie'
import {useRouter} from 'next/navigation'
import {Cart} from '~/components/cart/Cart'
import {cartItemsCount, clearCart} from '~/components/cart/functions/helpers'
import {cartAtom} from '~/components/cart/store'
import {Badge} from '~/components/elements/Badge'
import {Button, ButtonIcon} from '~/components/elements/Button'
import {Drawer, ClearPaneAction} from '~/components/elements/Drawer'
import {DrawerPane} from '~/components/elements/Drawer/DrawerPane'
import {PaneTriggerButton} from '~/components/elements/Drawer/PaneTriggerButton'
import {IconCart} from '~/components/elements/Icons'
import {Price} from '~/components/global/Price'

function CartPane({children}: {children: React.ReactElement}) {
  const [cart, setCart] = useAtom(cartAtom)
  const router = useRouter()

  const removeAllFromCart = () => clearCart(() => setCart({}))

  const renderCartPaneFooter = () => {
    return typeof cart?.subTotal !== 'undefined' ? (
      <div className="py-unit-2 lg:py-0">
        <div className="flex justify-between">
          <div className="font-medium lg:text-lg">Subtotal</div>
          <div className="font-medium lg:text-lg">
            <Price price={cart?.subTotal} />
          </div>
        </div>
        <Button
          onClick={() => router.push('/checkout')}
          buttonTitle="Proceed to Checkout"
          className="mt-unit-4 w-full"
        />
      </div>
    ) : undefined
  }

  return (
    <DrawerPane
      title="Your cart"
      itemsCount={cartItemsCount(cart?.items)}
      drawerSecondaryAction={
        <ClearPaneAction
          count={cartItemsCount(cart?.items)}
          handleAction={removeAllFromCart}
        />
      }
      stickySecondaryAction={
        <ClearPaneAction
          count={cartItemsCount(cart?.items)}
          handleAction={removeAllFromCart}
          withDelimiter
        />
      }
      stickyFooter={renderCartPaneFooter()}
      drawerPaneClasses="md:mb-[200px]"
    >
      {children}
    </DrawerPane>
  )
}

function CartPaneTriggerButton(props: any) {
  const cart = useAtomValue(cartAtom)

  return (
    <PaneTriggerButton
      ariaLabel="Cart"
      count={cartItemsCount(cart?.items)}
      {...props}
    >
      <IconCart />
    </PaneTriggerButton>
  )
}

export function CartDrawer({cart}: {cart?: any}) {
  const [mounted, setMounted] = useState<boolean>(false)
  useHydrateAtoms([[cartAtom, cart]])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (cart?.items?.length) {
      const cartId = Cookies.get('xc-cart')

      if (cartId && cartId !== cart.id) {
        Cookies.set('xc-cart', cart.id)
      }
    }
  }, [cart])

  if (!mounted) {
    return (
      <ButtonIcon
        className="relative ml-unit-3 h-unit-6 w-unit-6"
        aria-label="Cart"
      >
        <IconCart />
        {cart?.items?.length > 0 && <Badge>{cartItemsCount(cart.items)}</Badge>}
      </ButtonIcon>
    )
  }

  return (
    <Drawer triggerElement={<CartPaneTriggerButton />} width="560px">
      <CartPane>
        <Cart />
      </CartPane>
    </Drawer>
  )
}
