'use client'

import type {Cart} from '@xcart/storefront'
import {CartItemImage} from '~/components/cart/CartItemImage'
import {cartItemsCount} from '~/components/cart/functions/helpers'
import {Drawer} from '~/components/elements/Drawer'
import {DrawerPane} from '~/components/elements/Drawer/DrawerPane'
import {Link} from '~/components/navigation/link'
import {DiscountedPrice} from '~/components/product/DiscountedPrice'
import {Label} from '~/components/product/Label'

export function CartItems({cart}: {cart: Cart}) {
  if (!cart?.items?.length) {
    return null
  }

  return (
    <div>
      {cart.items.map(item => (
        <div
          key={item.id}
          className="mb-unit-8 grid grid-cols-[65px_minmax(calc(100%-85px),_1fr)] gap-unit-4 last:mb-0 lg:grid-cols-[80px_minmax(320px,_1fr)] lg:gap-unit-8"
        >
          <div className="flex flex-col justify-between">
            <div className="h-unit-13 w-unit-13 lg:h-unit-16 lg:w-unit-16">
              <Link
                href={`/${item.cleanUrl}`}
                className="relative block h-full w-full"
              >
                <CartItemImage item={item} />
              </Link>
            </div>
          </div>

          <div>
            <Label
              productPrice={item.clear_price}
              productSalePrice={item.display_price}
            />
            <div className="mb-unit-2 text-sm font-medium lg:text-base">
              <Link href={`/${item.cleanUrl}`} className="no-underline">
                {item.name}
              </Link>
            </div>
            {item.attributes && (
              <div className="mb-unit-2 flex gap-unit-4 text-sm">
                {item.attributes.map(attribute => {
                  return (
                    <div key={attribute.attributeValueId}>
                      {attribute.name}: {attribute.attributeValue}
                    </div>
                  )
                })}
              </div>
            )}
            <div className="mb-unit-2 flex items-center">
              <span>
                {`${item.amount} ${item.amount === 1 ? 'item' : 'items'}`}{' '}
                x&nbsp;
              </span>
              <DiscountedPrice
                productPrice={item.clear_price}
                productSalePrice={item.display_price}
                baseStyles="lg:text-lg"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CartPaneTriggerButton({cart, ...props}: {cart: Cart}) {
  return (
    <button className="underline" {...props}>{`${
      cart?.items ? cartItemsCount(cart.items) : 0
    } items in cart`}</button>
  )
}

export function CartItemsDrawer({cart}: {cart: Cart}) {
  return (
    <Drawer
      triggerElement={<CartPaneTriggerButton cart={cart} />}
      width="560px"
    >
      <DrawerPane
        title="Items in Your Cart"
        itemsCount={cart?.items ? cartItemsCount(cart.items) : 0}
      >
        <CartItems cart={cart} />
      </DrawerPane>
    </Drawer>
  )
}
