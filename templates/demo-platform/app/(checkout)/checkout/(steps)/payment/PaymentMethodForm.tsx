'use client'

import {RadioGroup} from '~/components/elements/RadioGroup'
import {useCheckoutActions} from '../../hooks'

export function PaymentMethodForm({
  methods,
  paymentMethodId,
}: {
  methods: any[]
  paymentMethodId?: number | null
}) {
  const {selectPaymentMethod} = useCheckoutActions()

  return (
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
      onChange={v => selectPaymentMethod(v)}
    />
  )
}
