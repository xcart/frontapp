import {getXCartClient} from 'app/client'
import {CartProvider} from './CartProvider'
import {CartState} from './CartState'
import Navigation from './Navigation'
import {Summary} from './Summary'
import {
  getAddressFields,
  getAllCountries,
  getCartAddresses,
  getCartId,
} from '../helpers'

async function fetchData() {
  const client = await getXCartClient()
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('no cart')
  }

  const [
    cart,
    addressFields,
    rates,
    countries,
    {shippingAddress, billingAddress, allAddresses},
  ] = await Promise.all([
    client.cart.getCart(cartId, {
      next: {tags: [cartId]},
    }),
    getAddressFields(),
    client.other.postCalculatedshippingratesCollection(
      cartId,
      {},
      {
        next: {revalidate: 0},
      },
    ),
    getAllCountries(),
    getCartAddresses(),
  ])

  return {
    cart,
    shippingAddress,
    billingAddress,
    addressFields,
    rates: rates?.rates,
    countries,
    addresses: allAddresses,
    isRegistered: client.hasAccessToken(),
  }
}

export default async function Layout({children}: {children: React.ReactNode}) {
  const {
    cart,
    shippingAddress,
    billingAddress,
    addressFields,
    rates,
    countries,
    addresses,
    isRegistered,
  } = await fetchData()

  return (
    <div className="relative flex flex-col gap-unit-3 md:gap-unit-8">
      <Navigation />
      <CartProvider>
        <div className="flex flex-col gap-unit-8 lg:flex-row">
          <section className="w-full lg:w-2/3">
            <CartState
              cart={cart}
              rates={rates}
              shippingAddress={shippingAddress}
              billingAddress={billingAddress}
              addressFields={addressFields}
              countries={countries}
              addresses={addresses}
              isRegistered={isRegistered}
            />
            {children}
          </section>
          <Summary cart={cart} />
        </div>
      </CartProvider>
    </div>
  )
}
