/* eslint-disable no-param-reassign */
import {produce} from 'immer'
import {atom} from 'jotai'

// -------------
// store
// -------------

export const addressFieldsAtom = atom<Array<any>>([])
export const formValuesAtom = atom<Record<string, any>>({})
export const isSameAddressAtom = atom<boolean>(true)
export const isAddressesValidAtom = atom<boolean>(false)
export const isRegisteredAtom = atom<boolean>(false)
export const xPaymentsWidgetAtom = atom<any>(null)
export const isSubmittingAtom = atom<boolean>(false)

// -------------
// actions
// -------------

export const updateShippingCountryAtom = atom(
  null,
  (get, set, country_code: string, unsavedValues: any) => {
    set(
      formValuesAtom,
      produce(get(formValuesAtom), draft => {
        Object.entries(unsavedValues).forEach(([key, value]) => {
          draft[key] = value
        })
        draft.shipping_country_code = country_code
        draft.shipping_state_id = ''
        draft.shipping_custom_state = ''
      }),
    )
  },
)

export const updateBillingCountryAtom = atom(
  null,
  (get, set, country_code: string, unsavedValues: any) => {
    set(
      formValuesAtom,
      produce(get(formValuesAtom), draft => {
        Object.entries(unsavedValues).forEach(([key, value]) => {
          draft[key] = value
        })
        draft.billing_country_code = country_code
        draft.billing_state_id = ''
        draft.billing_custom_state = ''
      }),
    )
  },
)

export const updateFormValuesAtom = atom(
  null,
  (get, set, newValues: Record<string, any>) => {
    set(formValuesAtom, {...get(formValuesAtom), ...newValues})
  },
)
