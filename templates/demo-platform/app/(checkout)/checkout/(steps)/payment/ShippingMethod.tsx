'use client'

import {useState} from 'react'
import type {Cart, ShippingRate} from '@xcart/storefront'
import {Button} from '~/components/elements/Button'
import {Drawer, useDrawer} from '~/components/elements/Drawer/Drawer'
import {DrawerPane} from '~/components/elements/Drawer/DrawerPane'
import {IconEdit} from '~/components/elements/Icons'
import {RadioGroup} from '~/components/elements/RadioGroup'
import {Price} from '~/components/global/Price'
import {useCheckoutActions} from '../../hooks'

function EditShippingIcon() {
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

export function ShippingMethod({
  cart,
  rates,
}: {
  cart: Cart
  rates: ShippingRate[] | undefined
}) {
  const [id, setId] = useState<number | null>(null)
  const shippingMethodId = cart.shipping?.id
  const {selectShippingMethod} = useCheckoutActions()

  const rate = cart.surcharges?.find(v => v.type === 'shipping')
  return rate && rates ? (
    <div className="relative text-sm">
      <div
        className="mb-unit"
        dangerouslySetInnerHTML={{__html: cart.shipping?.name as string}}
      />
      <p className="text-xs font-semibold leading-5">
        <Price price={rate.value} />
      </p>
      <div>
        <Drawer triggerElement={<EditShippingIcon />} width="560px">
          <DrawerPane
            title="Delivery Method"
            stickyFooter={
              <Button
                onClick={() => selectShippingMethod(id as number)}
                disabled={!id || id === shippingMethodId}
                buttonTitle="Save Changes"
                className="w-full"
              />
            }
          >
            <form className="mt-unit-2">
              <RadioGroup
                value={id ? String(id) : String(shippingMethodId)}
                options={rates.map(r => {
                  return {
                    value: r.method?.id,
                    name: (
                      <div className="flex flex-col gap-unit">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: r.method?.name as string,
                          }}
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
                onChange={v => {
                  setId(Number(v))
                }}
              />
            </form>
          </DrawerPane>
        </Drawer>
      </div>
    </div>
  ) : null
}
