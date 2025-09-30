import {redirect} from 'next/navigation'
import {getXCartClient} from 'app/client'
import {PaymentMethodForm} from './PaymentMethodForm'
import {getCartAddresses, getCartId} from '../../helpers'

async function fetchData() {
  const client = await getXCartClient()
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('no cart')
  }

  const [cart, paymentMethods, {shippingAddress, billingAddress}] =
    await Promise.all([
      await client.cart.getCart(cartId, {
        next: {tags: [cartId]},
        cache: 'no-store',
      }),
      client.other.getPaymentmethodCollection(cartId),
      getCartAddresses(),
    ])

  return {cart, paymentMethods, shippingAddress, billingAddress}
}

export default async function Page() {
  const {cart, paymentMethods, shippingAddress, billingAddress} =
    await fetchData()

  if (!shippingAddress?.id || !billingAddress?.id) {
    redirect('/checkout/addresses')
  }

  if (!cart.shipping) {
    redirect('/checkout/shipping')
  }

  return (
    <PaymentMethodForm methods={paymentMethods['hydra:member']} cart={cart} />
  )
}
