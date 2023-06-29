import {cache} from 'react'
import {cookies} from 'next/headers'
import {getXCartClient} from 'app/client'
import {client as unauthenticatedClient} from 'utils/unauthenticated-client'

export const getCartId = async () => {
  if (cookies().get('xc-cart')?.value) {
    return cookies().get('xc-cart')?.value
  }

  const client = await getXCartClient()

  if (client.hasAccessToken()) {
    const user = await client.other.getUserItem()

    return user.cartId
  }

  return null
}

export async function getCartAddresses() {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('no cart')
  }

  let addresses: any[] = []

  const addressesRaw = await client.other.getCartAddressCollection(
    cartId,
    {},
    {
      next: {revalidate: 0},
    },
  )
  if (addressesRaw['hydra:totalItems']) {
    addresses = addressesRaw['hydra:member']
  }

  addresses.map((a: any) => {
    const normalizedFields: Record<string, unknown> = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const f of a.fields) {
      normalizedFields[f.serviceName as string] = f.value
    }
    // eslint-disable-next-line no-param-reassign
    a.fields = normalizedFields
    return a
  })

  const shippingAddress = addresses.filter(a => a.isShipping)[0]
  const billingAddress = addresses.filter(a => a.isBilling)[0]

  return {shippingAddress, billingAddress, allAddresses: addresses}
}

export const getAllCountries = cache(async () => {
  const countries = {}
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 4; i++) {
    // eslint-disable-next-line no-await-in-loop
    const data = await unauthenticatedClient.other.getCountryCollection(
      {page: i, itemsPerPage: 100},
      {next: {revalidate: false}},
    )
    // eslint-disable-next-line no-restricted-syntax
    for (const c of data['hydra:member']) {
      // @ts-ignore
      countries[c.code as string] = c
    }
  }
  return countries
})

export const getAddressFields = cache(async () => {
  const fields = await unauthenticatedClient.other.getAddressFieldCollection(
    {},
    {next: {revalidate: false}},
  )
  return fields['hydra:member']
})
