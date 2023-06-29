'use client'

import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import {useRouter} from 'next/navigation'
import * as yup from 'yup'
import {ButtonWithSpinner} from '~/components/elements/Button'
import {Drawer, useDrawer} from '~/components/elements/Drawer'
import {DrawerPane} from '~/components/elements/Drawer/DrawerPane'
import {IconArrowDown, IconEdit, IconTick} from '~/components/elements/Icons'
import {Input} from '~/components/elements/Input'
import {SelectNative} from '~/components/elements/SelectNative'
import {tailwindMerge} from '~/helpers'
import {
  changeBillingAddress,
  changeShippingAddress,
  updateAddress,
} from '../actions'
import {
  addressFieldsAtom,
  formValuesAtom,
  isRegisteredAtom,
  isSameAddressAtom,
  updateFormValuesAtom,
} from '../store'

function EditAddressIcon() {
  const {setOpen} = useDrawer()
  return (
    <button
      className="absolute bottom-0 right-0 appearance-none"
      onClick={() => setOpen(true)}
    >
      <IconEdit />
    </button>
  )
}

function Address({
  type,
  address,
  selected,
  index,
  countries,
  sameAddress,
}: {
  type: 'shipping' | 'billing'
  address: any
  selected: boolean
  index: number
  countries: any
  sameAddress: boolean
}) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const updateFormValues = useSetAtom(updateFormValuesAtom)
  const setIsSameAddress = useSetAtom(isSameAddressAtom)
  const [addressFields] = useAtom(addressFieldsAtom)

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
      onClick={() =>
        startTransition(async () => {
          const resp =
            type === 'shipping'
              ? await changeShippingAddress(address.id, sameAddress)
              : await changeBillingAddress(address.id)
          router.refresh()
          const newValues: Record<string, any> = {}
          resp.fields?.forEach((f: any) => {
            if (f.serviceName !== 'email') {
              if (type === 'shipping') {
                newValues[`shipping_${f.serviceName}`] = f.value
                if (sameAddress) {
                  newValues[`billing_${f.serviceName}`] = f.value
                }
              } else {
                newValues[`billing_${f.serviceName}`] = f.value
              }
            }
          })
          if (resp.isBilling === resp.isShipping) {
            setIsSameAddress(true)
          } else {
            setIsSameAddress(false)
          }
          updateFormValues(newValues)
        })
      }
      className={tailwindMerge(
        'relative w-full appearance-none rounded border border-gray-500 p-unit-4 text-left hover:cursor-pointer hover:border-gray-300',
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

const AddressBookView = forwardRef(
  (
    {
      type,
      visible,
      addresses,
      countries,
      sameAddress,
    }: {
      type: 'shipping' | 'billing'
      visible: boolean
      addresses: any
      countries: any
      sameAddress: boolean
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        className={tailwindMerge(
          'w-full min-w-full',
          visible ? '' : 'invisible',
        )}
      >
        <div className="mb-unit-3">
          <h2>Address Book</h2>
        </div>
        <div className="flex flex-col gap-unit-3" ref={ref}>
          {addresses.map((addr: any, index: number) => {
            const selected =
              (type === 'shipping' && addr.isShipping) ||
              (type === 'billing' && addr.isBilling)
            return (
              <Address
                key={addr.id}
                type={type}
                selected={selected}
                index={index + 1}
                address={addr}
                countries={countries}
                sameAddress={sameAddress}
              />
            )
          })}
        </div>
      </div>
    )
  },
)

const EditAddressView = forwardRef(
  (
    {
      type,
      address,
      sameAddress,
      countries,
      setSaveButtonState,
    }: {
      type: 'shipping' | 'billing'
      address: any
      sameAddress: boolean
      countries: any
      setSaveButtonState: ({
        disabled,
        loading,
      }: {
        disabled: boolean
        loading: boolean
      }) => void
    },
    ref: ForwardedRef<HTMLFormElement>,
  ) => {
    const router = useRouter()
    const updateFormValues = useSetAtom(updateFormValuesAtom)
    const setIsSameAddress = useSetAtom(isSameAddressAtom)
    const [addressFields] = useAtom(addressFieldsAtom)
    const [addressValues] = useAtom(formValuesAtom)

    const defaultValues = {...address.fields, email: addressValues.email}
    const [countryCode, setCountryCode] = useState(
      defaultValues.country_code || 'US',
    )

    // @ts-ignore
    const statesOptions = countries[countryCode].states.map((s: any) => {
      return {
        name: s.name,
        value: s.id,
      }
    })

    const schemaObj: {[key: string]: any} = {}
    if (type === 'shipping') {
      schemaObj.email = yup
        .string()
        .email('Must be a valid email')
        .required('Required field')
    }
    addressFields.forEach((field: any) => {
      if (field.serviceName !== 'email' && field.required) {
        if (!(field.serviceName === 'state_id' && !statesOptions.length)) {
          schemaObj[field.serviceName] = yup.string().required('Required field')
        }
      }
    })

    const {
      register,
      setValue,
      reset,
      trigger,
      handleSubmit,
      formState: {errors, isValid, isDirty},
    } = useForm({
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(yup.object(schemaObj).required()),
    })

    useEffect(() => {
      // @ts-ignore
      setSaveButtonState(state => {
        return {...state, disabled: state.loading || !(isDirty && isValid)}
      })
    }, [isDirty, isValid, setSaveButtonState])

    useEffect(() => {
      trigger()
    }, [countryCode, trigger])

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

    function renderAddressField(addr: any, addressField: any) {
      const {serviceName: name, label, required, values} = addressField

      switch (name) {
        case 'country_code':
          // eslint-disable-next-line no-case-declarations
          const {onChange} = register('country_code', {
            required,
          })
          // eslint-disable-next-line no-case-declarations
          const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
            onChange(e)
            const newCountryCode = e.currentTarget.value
            setCountryCode(newCountryCode)
            setValue('country_code', newCountryCode)
            setValue('custom_state', '')
            setValue('state_id', '')
          }
          return (
            <SelectNative
              label={`${label}${required ? ' *' : ''}`}
              options={countriesOptions}
              defaultValue={countryCode}
              {...register(name, {
                required,
              })}
              onChange={handleChange}
            />
          )

        case 'state_id':
          // eslint-disable-next-line no-case-declarations
          const hasStates = Boolean(statesOptions.length)
          return (
            <>
              <div className={hasStates ? '' : 'hidden'}>
                <SelectNative
                  label={`${label}${required ? ' *' : ''}`}
                  defaultValue={defaultValues[name]}
                  options={statesOptions}
                  {...register(name, {
                    required,
                  })}
                />
              </div>
              <div className={!hasStates ? '' : 'hidden'}>
                <Input
                  type="text"
                  label={label}
                  defaultValue={defaultValues.custom_state}
                  error={!!errors.custom_state}
                  errorText={
                    errors.custom_state
                      ? (errors.custom_state.message as string)
                      : undefined
                  }
                  placeholder="Enter here"
                  {...register('custom_state', {
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
              name={`${name}`}
              options={values.map((v: any) => {
                return {name: v.label, value: v.value}
              })}
              value={addr?.fields[name]}
            />
          ) : (
            <Input
              type={name === 'email' ? 'email' : 'text'}
              label={`${label}${required ? ' *' : ''}`}
              defaultValue={
                name === 'email' ? defaultValues.email : addr?.fields[name]
              }
              error={!!errors[name === 'email' ? 'email' : `${name}`]}
              errorText={
                errors[name === 'email' ? 'email' : `${name}`]
                  ? (errors[name === 'email' ? 'email' : `${name}`]
                      ?.message as string)
                  : undefined
              }
              placeholder="Enter here"
              {...register(name === 'email' ? 'email' : `${name}`, {
                required,
              })}
            />
          )
      }
    }

    const onSubmit = async (data: any) => {
      setSaveButtonState({disabled: true, loading: true})
      const resp = await updateAddress(data)
      setSaveButtonState({disabled: true, loading: false})
      router.refresh()
      reset({}, {keepValues: true})
      const newValues: {[key: string]: any} = {}
      resp.fields?.forEach((f: any) => {
        if (f.serviceName !== 'email') {
          if (type === 'shipping') {
            newValues[`shipping_${f.serviceName}`] = f.value
            if (resp.isBilling === resp.isShipping) {
              newValues[`billing_${f.serviceName}`] = f.value
            }
          } else {
            newValues[`billing_${f.serviceName}`] = f.value
          }
        }
      })
      if (resp.isBilling === resp.isShipping) {
        setIsSameAddress(true)
      }
      updateFormValues(newValues)
    }

    return (
      <div className="mt-unit-2 w-full min-w-full">
        <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
          <section>
            {address?.id && !(type === 'billing' && sameAddress) ? (
              <input type="hidden" {...register('id')} value={address?.id} />
            ) : null}
            <ul className="flex w-full flex-col gap-unit-6">
              {addressFields.map((field: any) => {
                if (field.serviceName === 'email' && type === 'billing') {
                  return null
                }
                const addressField = renderAddressField(address, field)
                return addressField ? (
                  <li key={field.serviceName}>{addressField}</li>
                ) : null
              })}
            </ul>
          </section>
        </form>
      </div>
    )
  },
)

function Pane({
  type,
  address,
  addresses,
  countries,
  sameAddress,
}: {
  type: 'shipping' | 'billing'
  address: any
  addresses: any
  countries: any
  sameAddress: boolean
}) {
  const [currentView, setCurrentView] = useState('edit_address')
  const isRegistered = useAtomValue(isRegisteredAtom)
  const [h1, setH1] = useState(0)
  const [h2, setH2] = useState(0)
  const editAddressRef = useRef<HTMLFormElement>(null)
  const addressBookRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editAddressRef.current && wrapperRef.current) {
      setH1(editAddressRef.current.offsetHeight + 10)
      wrapperRef.current.style.height = `${
        editAddressRef.current.offsetHeight + 10
      }px`
    }
    if (addressBookRef.current) {
      setH2(addressBookRef.current.offsetHeight + 55)
    }
  }, [])

  const saveChanges = () => {
    editAddressRef.current?.requestSubmit()
  }

  const [saveButtonState, setSaveButtonState] = useState({
    disabled: true,
    loading: false,
  })
  const {panelRef} = useDrawer()

  function changeView(view: string) {
    if (panelRef.current && wrapperRef.current && editAddressRef.current) {
      const height = view === 'edit_address' ? `${h1 + 10}px` : `${h2 + 55}px`
      wrapperRef.current.style.height = height
      panelRef.current.scrollTo({top: 0})
    }
    setCurrentView(view)
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function BackToEditAddress({
    addressType,
  }: {
    addressType: 'shipping' | 'billing'
  }) {
    return (
      <button
        onClick={() => changeView('edit_address')}
        className="flex items-center text-base font-normal outline-none"
        aria-label="Sign in"
      >
        <span className="w-unit-4">
          <IconArrowDown className="rotate-90 fill-gray-700" />
        </span>
        <span className="pl-unit text-gray-700 underline">
          {addressType === 'shipping' ? 'Shipping address' : 'Billing address'}
        </span>
      </button>
    )
  }

  const title = type === 'shipping' ? 'Shipping' : 'Billing'

  return (
    <DrawerPane
      title={
        currentView === 'address_book' ? (
          <BackToEditAddress addressType={type} />
        ) : (
          title
        )
      }
      forceTitleVisibility={currentView === 'address_book'}
      hideDrawerTitle={currentView === 'address_book'}
      drawerSecondaryAction={
        currentView === 'edit_address' && isRegistered ? (
          <button
            className="text-sm underline md:text-base"
            onClick={() => changeView('address_book')}
          >
            Address Book
          </button>
        ) : undefined
      }
      stickySecondaryAction={
        currentView === 'edit_address' && isRegistered ? (
          <button
            className="text-sm underline md:text-base"
            onClick={() => changeView('address_book')}
          >
            Address Book
          </button>
        ) : undefined
      }
      stickyFooter={
        currentView === 'edit_address' ? (
          <ButtonWithSpinner
            onClick={saveChanges}
            disabled={saveButtonState.disabled}
            showSpinner={saveButtonState.loading}
            buttonTitle="Save Changes"
            className="w-full"
          />
        ) : undefined
      }
    >
      <div className="overflow-x-hidden">
        <div
          className={tailwindMerge(
            'flex gap-unit-4 transition-transform duration-300 md:gap-unit-12',
            currentView === 'address_book'
              ? 'translate-x-[calc(-100%-20px)] md:translate-x-[calc(-100%-60px)]'
              : 'overflow-hidden',
          )}
          ref={wrapperRef}
        >
          <EditAddressView
            type={type}
            setSaveButtonState={setSaveButtonState}
            address={address}
            sameAddress={sameAddress}
            countries={countries}
            ref={editAddressRef}
          />
          <AddressBookView
            type={type}
            visible={currentView === 'address_book'}
            addresses={addresses}
            sameAddress={sameAddress}
            countries={countries}
            ref={addressBookRef}
          />
        </div>
      </div>
    </DrawerPane>
  )
}

export function EditAddressDrawer({
  type,
  address,
  addresses,
  countries,
  sameAddress,
}: {
  type: 'shipping' | 'billing'
  address: any
  addresses: any
  countries: any
  sameAddress: boolean
}) {
  return (
    <Drawer triggerElement={<EditAddressIcon />} width="560px">
      <Pane
        type={type}
        address={address}
        addresses={addresses}
        countries={countries}
        sameAddress={sameAddress}
      />
    </Drawer>
  )
}
