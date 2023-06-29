'use client'

import type {ShippingRate} from '@xcart/storefront'
import {RadioGroup} from '~/components/elements/RadioGroup'
import {Price} from '~/components/global/Price'
import {useCheckoutActions} from '../../hooks'

export function Form({
  rates,
  shippingMethodId,
}: {
  rates: ShippingRate[]
  shippingMethodId?: number
}) {
  const {selectShippingMethod} = useCheckoutActions()

  return (
    <RadioGroup
      value={String(shippingMethodId)}
      options={rates.map(r => {
        return {
          value: r.method?.id,
          name: (
            <div className="flex flex-col gap-unit">
              <span
                dangerouslySetInnerHTML={{__html: r.method?.name as string}}
              />
              <span className="text-sm">
                <span className=" font-semibold">
                  <Price price={r.value} />
                </span>
                {r.preparedDeliveryTime ? (
                  <span>&nbsp;({r.preparedDeliveryTime})</span>
                ) : null}
              </span>
            </div>
          ),
        }
      })}
      onChange={v => selectShippingMethod(v)}
    />
  )
}
