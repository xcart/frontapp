'use client'

import {useTransition} from 'react'
import {useAtom, useSetAtom} from 'jotai'
import {useRouter} from 'next/navigation'
import {
  changeBillingAddress,
  changeShippingAddress,
  updatePaymentMethod,
  updateShippingMethod,
} from './actions'
import {isSameAddressAtom, updateFormValuesAtom} from './store'

export function useCheckoutActions() {
  const updateFormValues = useSetAtom(updateFormValuesAtom)
  const [isSameAddress, setIsSameAddress] = useAtom(isSameAddressAtom)
  const router = useRouter()
  const [, startTransition] = useTransition()

  const selectShippingMethod = (shippingMethodId: number | string) => {
    startTransition(() => {
      updateShippingMethod(shippingMethodId)
    })
    router.refresh()
  }

  const selectPaymentMethod = (paymentMethodId: number | string) => {
    startTransition(() => {
      updatePaymentMethod(paymentMethodId)
    })
    router.refresh()
  }

  const selectShippingAddress = async (addressId: number) => {
    startTransition(async () => {
      const response = await changeShippingAddress(addressId, isSameAddress)
      router.refresh()
      const newValues: {[key: string]: any} = {}
      response.fields?.forEach((f: any) => {
        if (f.serviceName !== 'email') {
          newValues[`shipping_${f.serviceName}`] = f.value
          if (isSameAddress) {
            newValues[`billing_${f.serviceName}`] = f.value
          }
        }
      })
      if (response.isBilling === response.isShipping) {
        setIsSameAddress(true)
      }
      updateFormValues(newValues)
    })
  }

  const selectBillingAddress = async (addressId: number) => {
    startTransition(async () => {
      const response = await changeBillingAddress(addressId)
      router.refresh()
      const newValues: {[key: string]: any} = {}
      response.fields?.forEach((f: any) => {
        if (f.serviceName !== 'email') {
          newValues[`billing_${f.serviceName}`] = f.value
        }
      })
      if (response.isBilling === response.isShipping) {
        setIsSameAddress(true)
      } else {
        setIsSameAddress(false)
      }
      updateFormValues(newValues)
    })
  }

  return {
    selectShippingMethod,
    selectPaymentMethod,
    selectShippingAddress,
    selectBillingAddress,
  }
}
