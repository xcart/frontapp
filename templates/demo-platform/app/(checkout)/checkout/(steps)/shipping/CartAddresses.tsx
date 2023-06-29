'use client'

import {EditAddressDrawer} from '../EditAddressDrawer'

function formatCountry(code: string, countries: any) {
  return countries[code].name
}

function formatState(code: string, stateId: string, countries: any) {
  return countries[code].states.find((s: any) => String(s.id) === stateId).name
}

export function CartAddresses({
  shippingAddress,
  billingAddress,
  countries,
  addresses,
}: {
  shippingAddress: any
  billingAddress: any
  countries: any
  addresses: any
}) {
  return (
    <div className="text-sm">
      <div className="mb-unit font-medium">Shipping Address</div>
      <p>
        {shippingAddress.fields.firstname}&nbsp;
        {shippingAddress.fields.lastname}
      </p>
      <address className="relative not-italic">
        {shippingAddress.fields.address1} {shippingAddress.fields.city}{' '}
        {shippingAddress.fields.state_id
          ? formatState(
              shippingAddress.fields.country_code,
              shippingAddress.fields.state_id,
              countries,
            )
          : ''}
        {shippingAddress.fields.custom_state} {shippingAddress.fields.zipcode}
        <br />
        {formatCountry(shippingAddress.fields.country_code, countries)}
        <EditAddressDrawer
          type="shipping"
          address={shippingAddress}
          addresses={addresses}
          countries={countries}
          sameAddress={shippingAddress?.id === billingAddress?.id}
        />
      </address>

      <div className="mb-unit mt-unit-3 font-medium">Billing Address</div>
      <address className="relative not-italic">
        {shippingAddress.id === billingAddress.id ? (
          <span>Same as shipping address</span>
        ) : (
          <>
            <p>
              {billingAddress.fields.firstname}&nbsp;
              {billingAddress.fields.lastname}
            </p>
            {billingAddress.fields.address1} {billingAddress.fields.city}{' '}
            {billingAddress.fields.state_id
              ? formatState(
                  billingAddress.fields.country_code,
                  billingAddress.fields.state_id,
                  countries,
                )
              : ''}
            {billingAddress.fields.custom_state} {billingAddress.fields.zipcode}
            <br />
            {formatCountry(billingAddress.fields.country_code, countries)}
          </>
        )}
        <EditAddressDrawer
          type="billing"
          address={billingAddress}
          addresses={addresses}
          countries={countries}
          sameAddress={shippingAddress?.id === billingAddress?.id}
        />
      </address>
    </div>
  )
}
