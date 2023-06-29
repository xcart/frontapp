'use client'

import type {Address as AddressType} from '@xcart/storefront'
import {Drawer} from '~/components/elements/Drawer'
import {DrawerPane} from '~/components/elements/Drawer/DrawerPane'
import {IconTick} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'
import {useCheckoutActions} from '../hooks'

function TriggerButton(props: any) {
  return (
    <button className="underline" {...props}>
      Address Book
    </button>
  )
}

function Address({
  onSelect,
  address,
  selected,
  index,
  addressFields,
  countries,
}: {
  onSelect: () => void
  address: any
  selected: boolean
  index: number
  addressFields: any
  countries: any
}) {
  let extra = ''
  switch (
    String(Number(address.isShipping)) + String(Number(address.isBilling))
  ) {
    case '11':
      extra = `${index} (Shipping & Billing)`
      break
    case '10':
      extra = `${index} (Shipping)`
      break
    case '01':
      extra = `${index} (Billing)`
      break
    default:
      extra = String(index)
  }

  return (
    <button
      onClick={onSelect}
      className={tailwindMerge(
        'relative appearance-none rounded border border-gray-500 p-unit-4 text-left hover:cursor-pointer hover:border-gray-300',
        selected
          ? 'bg-primary text-contrast hover:cursor-default hover:border-gray-500'
          : '',
      )}
    >
      <div className="mb-unit-3 text-sm font-medium">Address {extra}</div>
      <table className="text-sm">
        <tbody>
          {addressFields.map((f: any) => {
            let value
            if (
              f.serviceName === 'country_code' &&
              address.fields[f.serviceName]
            ) {
              value = countries[address.fields[f.serviceName]].name
            } else if (
              f.serviceName === 'state_id' &&
              address.fields[f.serviceName]
            ) {
              value = countries[address.fields.country_code].states.find(
                (s: any) => String(s.id) === address.fields[f.serviceName],
              ).name
            } else {
              value = address.fields[f.serviceName]
            }
            return address.fields[f.serviceName] ? (
              <tr key={f.serviceName}>
                <td className="pr-unit-2 font-medium">{f.label}:</td>
                <td>{value}</td>
              </tr>
            ) : null
          })}
        </tbody>
      </table>
      {selected ? (
        <IconTick className="absolute right-unit-4 top-unit-4" />
      ) : null}
    </button>
  )
}

export function AddressBookDrawer({
  type,
  addresses,
  addressFields,
  countries,
}: {
  type: 'shipping' | 'billing'
  addresses: AddressType[]
  addressFields: any
  countries: any
}) {
  const {selectShippingAddress, selectBillingAddress} = useCheckoutActions()

  const handleSelect = (addressId: number) => {
    return () => {
      if (type === 'shipping') {
        selectShippingAddress(addressId)
      } else {
        selectBillingAddress(addressId)
      }
    }
  }

  return (
    <Drawer triggerElement={<TriggerButton />} width="560px">
      <DrawerPane title="Address Book">
        <div className="mt-unit-2 flex flex-col gap-unit-3">
          {addresses.map((addr, index) => {
            const selected = Boolean(
              (type === 'shipping' && addr.isShipping) ||
                (type === 'billing' && addr.isBilling),
            )
            return (
              <Address
                onSelect={handleSelect(addr.id as number)}
                key={addr.id}
                selected={selected}
                index={index + 1}
                address={addr}
                addressFields={addressFields}
                countries={countries}
              />
            )
          })}
        </div>
      </DrawerPane>
    </Drawer>
  )
}
