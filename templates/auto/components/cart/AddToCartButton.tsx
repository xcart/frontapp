'use client'

import {useState} from 'react'
import {CartItem} from '@xcart/storefront'
import {useAtom, useAtomValue} from 'jotai'
import Cookies from 'js-cookie'
import {
  clearCart,
  hasSameAttributesByValueId,
} from '~/components/cart/functions/helpers'
import {ProductToAdd} from '~/components/cart/interface'
import {cartAtom} from '~/components/cart/store'
import {Button, ButtonWithSpinner} from '~/components/elements/Button'
import {IconMinus, IconPlus} from '~/components/elements/Icons'
import {Spinner} from '~/components/elements/Spinner'
import {attributeTextareaAtom} from '~/components/product/AttributeTextarea/store'
import {tailwindMerge} from '~/helpers'
import {
  addToCart,
  deleteProductFromCart,
  getCart,
  getCartId,
  updateProductInCart,
} from './functions/cartActions'

async function processProductInCart(
  id: string,
  data: ProductToAdd,
  remove: boolean,
  update: boolean,
  cartItemId: number | null,
) {
  const cartId = id || (await getCartId())

  if (!update) {
    Cookies.set('xc-cart', cartId, {expires: 7})
    await addToCart(cartId, data.id, 1, data.attributes)
  } else if (cartItemId) {
    if (data.amount === 0) {
      return deleteProductFromCart(cartId, cartItemId)
    }

    await updateProductInCart(cartId, cartItemId, data.amount)
  }
}

export function AddToCartButton({
  cartId,
  amount,
  productToAdd,
  buttonClasses,
  buttonActionsClasses,
  isCart,
  hasEnoughQty,
}: {
  cartId?: string
  amount: number
  productToAdd: ProductToAdd
  buttonClasses?: string
  buttonActionsClasses?: string
  isCart?: boolean
  hasEnoughQty: boolean
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [cart, setCart] = useAtom(cartAtom)
  const textAttributeValue = useAtomValue(attributeTextareaAtom)

  const handleProduct = ({
    remove,
    update,
  }: {
    remove: boolean
    update: boolean
  }) => {
    setLoading(true)

    let cartItemId: number | null | undefined = null

    let allProductsInCartCount: number = 0

    const updatedProductAttributes = Object.keys(textAttributeValue).length
      ? [...productToAdd.attributes, textAttributeValue]
      : productToAdd.attributes

    const updatedProductToAdd: ProductToAdd = {
      id: productToAdd.id,
      amount: productToAdd.amount,
      attributes: updatedProductAttributes,
    }

    if (cart?.items?.length) {
      cart.items.forEach((item: CartItem) => {
        if (item.amount) {
          allProductsInCartCount += item.amount
        }

        if (
          item.productId === updatedProductToAdd.id &&
          update &&
          item.amount &&
          hasSameAttributesByValueId(
            item.attributes,
            updatedProductToAdd.attributes,
          )
        ) {
          cartItemId = item.id

          if (remove) {
            allProductsInCartCount -= 1
          }

          updatedProductToAdd.amount = remove
            ? item.amount - 1
            : item.amount + 1
        }
      })

      if (allProductsInCartCount === 0) {
        return clearCart(() => {
          setCart({})
          setLoading(false)
        })
      }
    }

    processProductInCart(
      cart?.id || cartId,
      updatedProductToAdd,
      remove,
      update,
      cartItemId,
    ).then(async () => {
      const updatedCart = await getCart(cart?.id)

      if (updatedCart) {
        setCart(updatedCart)
        setLoading(false)
      }
    })
  }

  return amount && amount > 0 ? (
    <div
      className={tailwindMerge(
        'flex items-center justify-between overflow-hidden rounded bg-gray-300 lg:text-lg',
        buttonClasses,
      )}
    >
      <Button
        onClick={() => handleProduct({remove: true, update: true})}
        variant="light"
        className={tailwindMerge(
          'flex h-unit-8 w-unit-12 items-center justify-center rounded-none px-unit-2 lg:h-unit-12',
          buttonActionsClasses,
        )}
      >
        <IconMinus />
      </Button>
      <span className="flex justify-center text-center">
        {loading ? (
          <Spinner size="w-[14px] h-[14px] lg:w-[22px] lg:h-[22px]" />
        ) : (
          amount
        )}
        {!isCart && !loading && (
          <span className="hidden lg:inline">
            &nbsp;item{amount > 1 ? 's' : ''} in your cart
          </span>
        )}
      </span>
      <Button
        onClick={() => handleProduct({remove: false, update: true})}
        variant="light"
        className={tailwindMerge(
          'flex h-unit-8 w-unit-12 items-center justify-center rounded-none px-unit-2 lg:h-unit-12',
          buttonActionsClasses,
        )}
        disabled={!hasEnoughQty}
      >
        <IconPlus />
      </Button>
    </div>
  ) : (
    <ButtonWithSpinner
      showSpinner={loading}
      buttonTitle="Add to Cart"
      className="w-full whitespace-nowrap"
      onClick={() => handleProduct({remove: false, update: false})}
    />
  )
}
