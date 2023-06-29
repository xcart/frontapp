'use client'

import {useEffect} from 'react'
import {UseFormReset, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import type {Cart} from '@xcart/storefront'
import {useAtom, useSetAtom} from 'jotai'
import {debounce} from 'lodash'
import {useRouter} from 'next/navigation'
import * as yup from 'yup'
import {Checkbox} from '~/components/elements/Checkbox'
import {Input} from '~/components/elements/Input'
import {SelectNative} from '~/components/elements/SelectNative'
import {tailwindMerge} from '~/helpers'
import {saveAddresses, changeBillingAddress} from '../../actions'
import {
  formValuesAtom,
  isAddressesValidAtom,
  isSameAddressAtom,
  updateBillingCountryAtom,
  updateFormValuesAtom,
  updateShippingCountryAtom,
} from '../../store'
import {AddressBookDrawer} from '../AddressBookDrawer'

const debouncedSaveAddress = debounce(
  ({
    data,
    reset,
    router,
    updateFormValues,
  }: {
    data: any
    reset: UseFormReset<Record<string, any>>
    router: any
    updateFormValues: any
  }) => {
    saveAddresses(data)
    updateFormValues(data)
    reset({}, {keepValues: true})
    router.refresh()
  },
  1000,
  {leading: true},
)

export default function AddressForm({
  cart,
  addressFields,
  countries,
  shippingAddress,
  billingAddress,
  addresses,
  isRegistered,
}: {
  cart: Cart
  addressFields: any[]
  countries: any
  shippingAddress: any
  billingAddress: any
  addresses: any
  isRegistered: boolean
}) {
  const router = useRouter()
  const updateFormValues = useSetAtom(updateFormValuesAtom)

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

  const updateBillingCountry = useSetAtom(updateBillingCountryAtom)
  const updateShippingCountry = useSetAtom(updateShippingCountryAtom)
  const [av] = useAtom(formValuesAtom)
  const [isSameAddress, setIsSameAddress] = useAtom(isSameAddressAtom)
  const setIsAddressesValid = useSetAtom(isAddressesValidAtom)

  const shippingStatesOptions = countries[av.shipping_country_code].states.map(
    (s: any) => {
      return {
        name: s.name,
        value: s.id,
      }
    },
  )

  const billingStatesOptions = countries[av.billing_country_code].states.map(
    (s: any) => {
      return {
        name: s.name,
        value: s.id,
      }
    },
  )

  const schemaObj: Record<string, any> = {
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Required field'),
  }
  addressFields.forEach((field: any) => {
    if (field.serviceName !== 'email' && field.required) {
      if (
        !(field.serviceName === 'state_id' && !shippingStatesOptions.length)
      ) {
        schemaObj[`shipping_${field.serviceName}`] = yup
          .string()
          .required('Required field')
      }

      if (
        !isSameAddress &&
        !(field.serviceName === 'state_id' && !billingStatesOptions.length)
      ) {
        schemaObj[`billing_${field.serviceName}`] = yup
          .string()
          .required('Required field')
      }
    }
  })

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: {errors, isValid, isValidating, isDirty},
  } = useForm({
    mode: 'onChange',
    defaultValues,
    values: av,
    resolver: yupResolver(yup.object(schemaObj).required()),
  })

  const onSubmit = () => {}
  const data = watch()

  useEffect(() => {
    if (isDirty && isValid && !isValidating) {
      debouncedSaveAddress({
        data: {...data, same_address: Boolean(isSameAddress)},
        reset,
        router,
        updateFormValues,
      })
    }
  }, [
    isValid,
    data,
    isValidating,
    isDirty,
    reset,
    isSameAddress,
    router,
    updateFormValues,
  ])

  useEffect(() => {
    setIsAddressesValid(isValid)
  }, [isValid, setIsAddressesValid])

  const countriesOptions = Object.values(countries)
    .map(c => {
      return {
        // @ts-ignore
        name: c.name,
        // @ts-ignore
        value: c.code,
      }
    })
    // @ts-ignore
    .sort((a: string, b: string) => a.name.localeCompare(b.name))

  function renderAddressField(
    type: 'billing' | 'shipping',
    address: any,
    addressField: any,
  ) {
    const {serviceName: name, label, required, values} = addressField

    switch (name) {
      case 'country_code':
        // eslint-disable-next-line no-case-declarations
        const {onChange} = register(`${type}_${name}`, {
          required,
        })
        // eslint-disable-next-line no-case-declarations
        const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
          if (type === 'shipping') {
            updateShippingCountry(e.currentTarget.value, data)
          } else {
            updateBillingCountry(e.currentTarget.value, data)
          }
          onChange(e)
        }
        return (
          <SelectNative
            label={`${label}${required ? ' *' : ''}`}
            options={countriesOptions}
            defaultValue={av[`${type}_${name}`]}
            {...register(`${type}_${name}`, {
              required,
            })}
            onChange={handleChange}
          />
        )

      case 'state_id':
        // eslint-disable-next-line no-case-declarations
        const hasStates = Boolean(
          (type === 'shipping' ? shippingStatesOptions : billingStatesOptions)
            .length,
        )
        return (
          <>
            <div className={hasStates ? '' : 'hidden'}>
              <SelectNative
                label={`${label}${required ? ' *' : ''}`}
                defaultValue={av[`${type}_${name}`]}
                options={
                  type === 'shipping'
                    ? shippingStatesOptions
                    : billingStatesOptions
                }
                {...register(`${type}_${name}`, {
                  required,
                })}
              />
            </div>
            <div className={!hasStates ? '' : 'hidden'}>
              <Input
                type="text"
                label={label}
                defaultValue={av[`${type}_custom_state`]}
                error={!!errors[`${type}_custom_state`]}
                errorText={
                  errors[`${type}_custom_state`]
                    ? (errors[`${type}_custom_state`]?.message as string)
                    : undefined
                }
                placeholder="Enter here"
                {...register(`${type}_custom_state`, {
                  required,
                })}
              />
            </div>
          </>
        )

      case 'custom_state':
        return null

      default:
        return values ? (
          <SelectNative
            label={`${label}${required ? ' *' : ''}`}
            name={`${type}_${name}`}
            options={values.map((v: any) => {
              return {name: v.label, value: v.value}
            })}
            value={address?.fields[name]}
          />
        ) : (
          <Input
            type={name === 'email' ? 'email' : 'text'}
            label={`${label}${required ? ' *' : ''}`}
            defaultValue={name === 'email' ? cart.email : address?.fields[name]}
            error={!!errors[name === 'email' ? 'email' : `${type}_${name}`]}
            errorText={
              errors[name === 'email' ? 'email' : `${type}_${name}`]
                ? (errors[name === 'email' ? 'email' : `${type}_${name}`]
                    ?.message as string)
                : undefined
            }
            placeholder="Enter here"
            {...register(name === 'email' ? 'email' : `${type}_${name}`, {
              required,
            })}
          />
        )
    }
  }

  const colSplitPoint = addressFields.findIndex(
    f => f.serviceName === 'lastname',
  )
  const addressFieldsCol1 = addressFields.slice(0, colSplitPoint + 1)
  const addressFieldsCol2 = addressFields.slice(colSplitPoint + 1)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <div className="flex justify-between pb-unit-3">
          <h2>Shipping</h2>
          {isRegistered && addresses.length ? (
            <AddressBookDrawer
              type="shipping"
              addresses={addresses}
              addressFields={addressFields}
              countries={countries}
            />
          ) : null}
        </div>
        {shippingAddress?.id ? (
          <input
            type="hidden"
            {...register('sid')}
            value={shippingAddress?.id}
          />
        ) : null}
        <section className="flex flex-col gap-unit-6 lg:flex-row lg:gap-unit-8">
          <ul className="flex w-full flex-col gap-unit-6 lg:w-1/2">
            {addressFieldsCol1.map((field: any) => {
              const addressField = renderAddressField(
                'shipping',
                shippingAddress,
                field,
              )
              return addressField ? (
                <li key={field.serviceName}>{addressField}</li>
              ) : null
            })}
          </ul>
          <ul className="flex w-full flex-col gap-unit-6 lg:w-1/2">
            {addressFieldsCol2.map((field: any) => {
              const addressField = renderAddressField(
                'shipping',
                shippingAddress,
                field,
              )
              return addressField ? (
                <li key={field.serviceName}>{addressField}</li>
              ) : null
            })}
          </ul>
        </section>
      </section>
      <section className="mt-unit-8">
        <div className="flex justify-between pb-unit-3">
          <h2>Billing</h2>
          {isRegistered && addresses.length ? (
            <AddressBookDrawer
              type="billing"
              addresses={addresses}
              addressFields={addressFields}
              countries={countries}
            />
          ) : null}
        </div>
        {billingAddress?.id && billingAddress?.id !== shippingAddress?.id ? (
          <input
            type="hidden"
            {...register('bid')}
            value={billingAddress?.id}
          />
        ) : null}
        <p className="pb-unit-3">
          Enable this if you would like us to use your shipping address as your
          billing address.
        </p>
        <Checkbox
          name="same_address"
          label="The same as shipping"
          checked={isSameAddress}
          onChange={checked => {
            if (checked && shippingAddress?.id) {
              changeBillingAddress(shippingAddress?.id)
            }
            setIsSameAddress(!isSameAddress)
          }}
        />
        <section
          className={tailwindMerge(
            'flex flex-col gap-unit-6 pt-unit-3 lg:flex-row lg:gap-unit-8',
            isSameAddress ? 'hidden' : '',
          )}
        >
          <ul className="flex w-full flex-col gap-unit-6 lg:w-1/2">
            {addressFieldsCol1.map((field: any) => {
              if (field.serviceName === 'email') {
                return null
              }
              const addressField = renderAddressField(
                'billing',
                billingAddress,
                field,
              )
              return addressField ? (
                <li key={field.serviceName}>{addressField}</li>
              ) : null
            })}
          </ul>
          <ul className="flex w-full flex-col gap-unit-6 lg:w-1/2">
            {addressFieldsCol2.map((field: any) => {
              if (field.serviceName === 'email') {
                return null
              }
              const addressField = renderAddressField(
                'billing',
                billingAddress,
                field,
              )
              return addressField ? (
                <li key={field.serviceName}>{addressField}</li>
              ) : null
            })}
          </ul>
        </section>
      </section>
    </form>
  )
}
