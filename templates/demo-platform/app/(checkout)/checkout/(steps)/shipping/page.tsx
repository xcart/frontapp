import {redirect} from 'next/navigation'
import {getXCartClient} from 'app/client'
import {Form} from './Form'
import {getCartAddresses, getCartId} from '../../helpers'

async function fetchData() {
  const client = await getXCartClient()
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('no cart')
  }

  const [cart, rates, {shippingAddress, billingAddress}] = await Promise.all([
    client.cart.getCart(cartId, {
      next: {tags: [cartId]},
    }),
    client.other.postCalculatedshippingratesCollection(
      cartId,
      {},
      {
        next: {revalidate: 0},
      },
    ),
    getCartAddresses(),
  ])

  return {
    rates,
    shippingMethodId: cart.shipping?.id,
    shippingAddress,
    billingAddress,
  }
}

export default async function Page() {
  const {rates, shippingMethodId, shippingAddress, billingAddress} =
    await fetchData()

  if (!shippingAddress?.id || !billingAddress?.id) {
    redirect('/checkout/addresses')
  }

  return (
    <section>
      <h2 className="pb-unit-3">Delivery Method</h2>
      <form id="shipping_method">
        {rates.rates ? (
          <Form rates={rates.rates} shippingMethodId={shippingMethodId} />
        ) : (
          'No shipping methods available'
        )}
      </form>
    </section>
  )
}
