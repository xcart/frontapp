import {getXCartClient} from 'app/client'
import AddressForm from './AddressForm'
import {
  getAddressFields,
  getAllCountries,
  getCartAddresses,
  getCartId,
} from '../../helpers'

async function fetchData() {
  const client = await getXCartClient()
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('no cart')
  }

  const [
    cart,
    addressFields,
    countries,
    {shippingAddress, billingAddress, allAddresses},
  ] = await Promise.all([
    client.cart.getCart(cartId, {
      next: {tags: [cartId]},
    }),
    getAddressFields(),
    getAllCountries(),
    getCartAddresses(),
  ])

  return {
    addressFields,
    countries,
    shippingAddress,
    billingAddress,
    cart,
    addresses: allAddresses,
    isRegistered: client.hasAccessToken(),
  }
}

export default async function Page() {
  const {
    addressFields,
    countries,
    shippingAddress,
    billingAddress,
    cart,
    addresses,
    isRegistered,
  } = await fetchData()

  return (
    <AddressForm
      cart={cart}
      countries={countries}
      addressFields={addressFields}
      shippingAddress={shippingAddress}
      billingAddress={billingAddress}
      addresses={addresses}
      isRegistered={isRegistered}
    />
  )
}
