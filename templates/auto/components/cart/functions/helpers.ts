import {CartItem} from '@xcart/storefront'
import Cookies from 'js-cookie'
import _ from 'lodash'
import {ProductToAdd} from '~/components/cart/interface'
import {deleteCart} from './cartActions'

export function clearCart(handleClearAction: () => void) {
  const hasSavedCartId = Cookies.get('xc-cart')

  if (hasSavedCartId) {
    deleteCart(hasSavedCartId).then(() => {
      Cookies.remove('xc-cart')
      handleClearAction()
    })
  }
}

export function cartItemsCount(cartItems: CartItem[]) {
  let amount = 0

  cartItems?.forEach((item: CartItem) => {
    if (item.amount) {
      amount += item.amount
    }
  })

  return amount
}

export function hasSameAttributesByValueId(attributes1: any, attributes2: any) {
  return (
    _.differenceBy(attributes1, attributes2, 'attributeValueId').length === 0
  )
}

export function currentProductInCartCount(
  product: ProductToAdd,
  cartItems: CartItem[],
) {
  let amount = 0

  cartItems?.forEach((item: CartItem) => {
    if (
      item.productId === product.id &&
      item.amount &&
      hasSameAttributesByValueId(item.attributes, product.attributes)
    ) {
      amount = item.amount
    }
  })

  return amount
}
