'use client'

import type {Cart, ShippingRate} from '@xcart/storefront'
import {useHydrateAtoms} from 'jotai/utils'
import {useSelectedLayoutSegment} from 'next/navigation'
import {IAccordionItems} from '~/components/global/Accordion/AccordionBase'
import {AccordionMultiple} from '~/components/global/Accordion/AccordionMultiple'
import {ShippingMethod} from './payment/ShippingMethod'
import {CartAddresses} from './shipping/CartAddresses'
import {
  addressFieldsAtom,
  formValuesAtom,
  isAddressesValidAtom,
  isRegisteredAtom,
  isSameAddressAtom,
} from '../store'

export function CartState({
  cart,
  rates,
  shippingAddress,
  billingAddress,
  addressFields,
  countries,
  addresses,
  isRegistered,
}: {
  cart: Cart
  rates: ShippingRate[] | undefined
  shippingAddress: any
  billingAddress: any
  addressFields: any
  countries: any
  addresses: any
  isRegistered: boolean
}) {
  const segment = useSelectedLayoutSegment()

  const email = cart.email || ''
  const defaultValues: {[key: string]: any} = {email}

  addressFields.forEach((af: any) => {
    defaultValues[`shipping_${af.serviceName}`] =
      shippingAddress?.fields[af.serviceName] ||
      (af.serviceName === 'country_code' ? 'US' : '')
    defaultValues[`billing_${af.serviceName}`] =
      billingAddress?.fields[af.serviceName] ||
      (af.serviceName === 'country_code' ? 'US' : '')
  })

  useHydrateAtoms([
    [formValuesAtom, defaultValues],
    [addressFieldsAtom, addressFields],
    [addressFieldsAtom, []],
    [isSameAddressAtom, shippingAddress?.id === billingAddress?.id],
    [isAddressesValidAtom, shippingAddress?.id && billingAddress?.id],
    [isRegisteredAtom, isRegistered],
  ])

  if (segment === 'addresses') {
    return null
  }

  const items: IAccordionItems[] = [
    {
      name: 'Shipping & Billing Addresses',
      content: (
        <CartAddresses
          shippingAddress={shippingAddress}
          billingAddress={billingAddress}
          countries={countries}
          addresses={addresses}
        />
      ),
    },
  ]

  if (segment === 'payment') {
    items.push({
      name: 'Delivery Method',
      content: <ShippingMethod cart={cart} rates={rates} />,
    })
  }

  return (
    <AccordionMultiple
      accordionRootClasses="border rounded mb-unit-3 lg:mb-unit-8"
      accordionItemClasses="last:border-0 px-unit-4"
      accordionItems={items}
    />
  )
}
