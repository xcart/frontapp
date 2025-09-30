'use client'

import {useEffect, useState, useTransition} from 'react'
import type {Cart} from '@xcart/storefront'
import {useAtom, useSetAtom} from 'jotai'
import {useRouter} from 'next/navigation'
import {useNotification} from '~/components/checkout/Notification'
import {RadioGroup} from '~/components/elements/RadioGroup'
import {tailwindMerge} from '~/helpers'
import XPaymentsWidget from './widget'
import {generateXPaymentsWidgetData, placeOrder} from '../../actions'
import {useCheckoutActions} from '../../hooks'
import {isSubmittingAtom, xPaymentsWidgetAtom} from '../../store'

let isLoading = false

export function PaymentMethodForm({
  methods,
  cart,
}: {
  methods: any[]
  cart: Cart
}) {
  const router = useRouter()
  const [isWidgetLoading, setIsWidgetLoading] = useState<boolean>(false)
  const [, startTransition] = useTransition()
  const {selectPaymentMethod} = useCheckoutActions()
  const [widget, setWidget] = useAtom(xPaymentsWidgetAtom)
  const setIsSubmitting = useSetAtom(isSubmittingAtom)
  const {setNotification} = useNotification()

  const paymentMethodId = cart.payment?.id
  const {paymentTransaction} = cart
  const [isXPayments, setIsXPayments] = useState<boolean>(
    () =>
      methods.find(m => m.id === paymentMethodId).serviceName ===
      'XPaymentsCloud',
  )

  const paymentMethodChangeHandler = (pid: string) => {
    if (widget) {
      setIsXPayments(false)
      widget.destroy()
      setWidget(null)
    } else {
      setIsXPayments(
        methods.find(m => m.id === Number(pid)).serviceName ===
          'XPaymentsCloud',
      )
    }
    selectPaymentMethod(pid)
  }

  useEffect(() => {
    async function submit(data: any, w: any) {
      const result = await placeOrder(data)
      if (result.error) {
        setNotification({
          opened: true,
          content: result.error,
          type: 'error',
        })
        // TODO: maybe there is better way to reinitialize widget
        w.destroy()
        setWidget(null)
        router.refresh()
      }
    }

    if (!widget && !isLoading && isXPayments) {
      setIsWidgetLoading(true)
      isLoading = true
      const initWidget = new XPaymentsWidget()
      const loadWidget = async () => {
        const res = await generateXPaymentsWidgetData(paymentTransaction)
        // @ts-ignore
        if (res.error) {
          setIsWidgetLoading(false)
          isLoading = false
          return
        }

        let widgetConfig = null
        // @ts-ignore
        // eslint-disable-next-line no-restricted-syntax
        for (const d of res.actionData) {
          if (d.name === 'widgetConfig') {
            // @ts-ignore
            widgetConfig = JSON.parse(d.value)
          }
        }
        widgetConfig.container = '#xpayments-iframe-container'
        widgetConfig.form = '#form'
        widgetConfig.debug = true

        initWidget.init(widgetConfig)
        initWidget.load()

        initWidget.on('success', (params: any) => {
          startTransition(async () => {
            await submit(
              [
                {
                  name: 'token',
                  value: params.token,
                },
              ],
              initWidget,
            )
            setIsSubmitting(false)
          })
        })
        initWidget.on('alert', (params: any) => {
          setNotification({
            opened: true,
            content: params.message,
            type: 'error',
          })
          setIsSubmitting(false)
        })
        initWidget.on('loaded', () => {
          isLoading = false
          setIsWidgetLoading(false)
        })
        setWidget(initWidget)
      }
      loadWidget()
    }
  }, [
    isXPayments,
    paymentTransaction,
    widget,
    setWidget,
    setIsSubmitting,
    setNotification,
    router,
  ])

  useEffect(() => {
    if (widget && widget.config.order.total !== cart.total) {
      widget.setOrder(cart.total)
    }
  }, [widget, cart])

  return (
    <div className="flex flex-col justify-between gap-unit-8 lg:flex-row lg:gap-0">
      <div>
        <h2 className="pb-unit-3">Payment Method</h2>
        <form>
          <RadioGroup
            value={String(paymentMethodId)}
            options={methods.map(r => {
              return {
                value: r.id,
                name: (
                  <div className="flex flex-col gap-unit">
                    <span>{r.title}</span>
                    <span className="text-sm">{r.description}</span>
                  </div>
                ),
              }
            })}
            onChange={paymentMethodChangeHandler}
          />
        </form>
      </div>
      <div
        id="xpayments-iframe-container"
        className={tailwindMerge(
          'w-full lg:max-w-[400px]',
          isWidgetLoading ? 'skeleton' : '',
        )}
      />
    </div>
  )
}
