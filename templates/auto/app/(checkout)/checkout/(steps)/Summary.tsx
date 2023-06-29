'use client'

import {
  useState,
  experimental_useOptimistic as useOptimistic,
  startTransition,
  useTransition,
} from 'react'
import type {Cart, Coupon} from '@xcart/storefront'
import produce from 'immer'
import {useAtomValue} from 'jotai'
import Link from 'next/link'
import {useRouter, useSelectedLayoutSegment} from 'next/navigation'
import {useNotification} from '~/components/checkout/Notification'
import {Button, ButtonWithSpinner} from '~/components/elements/Button'
import {Checkbox} from '~/components/elements/Checkbox'
import {IconClose} from '~/components/elements/Icons'
import {Price} from '~/components/global/Price'
import {tailwindMerge} from '~/helpers'
import {ApplyCoupon} from './ApplyCoupon'
import {CartItemsDrawer} from './CartItemsDrawer'
import {deleteCoupon, placeOrder} from '../actions'
import {isAddressesValidAtom} from '../store'

const steps = [
  {
    name: 'addresses',
    href: '/checkout/addresses',
    label: '',
  },
  {
    name: 'shipping',
    href: '/checkout/shipping',
    label: 'Choose Shipping',
  },
  {
    name: 'payment',
    href: '/checkout/payment',
    label: 'Go to Payment',
  },
  {name: 'pay', href: '', label: 'Place Order'},
]

interface ExtendedCoupon extends Coupon {
  markedToDelete?: boolean
}

interface CouponAction {
  type: 'delete'
  id: number | null | undefined
}

function CouponsSection({coupons}: {coupons: ExtendedCoupon[]}) {
  const router = useRouter()
  const [optimisticCoupons, markCouponToDelete] = useOptimistic(
    coupons,
    (state, action: CouponAction) =>
      produce(state, draft => {
        switch (action.type) {
          case 'delete':
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            draft.find(c => c.id === action.id).markedToDelete = true
            break
          default:
            break
        }
      }),
  )

  return (
    <ul className="mt-unit flex flex-col gap-unit">
      {optimisticCoupons.map(c => {
        return (
          <li
            key={c.id}
            className={tailwindMerge(
              'flex gap-unit text-sm font-normal',
              c.markedToDelete ? 'text-gray-500' : '',
            )}
          >
            <div className="w-[150px] max-w-[150px]">{c.code}</div>
            <button
              type="button"
              disabled={c.markedToDelete}
              className="flex items-center justify-center"
              onClick={() =>
                startTransition(() => {
                  markCouponToDelete({type: 'delete', id: c.id})
                  deleteCoupon(String(c.id))
                  router.refresh()
                })
              }
              aria-label="Delete"
            >
              <IconClose
                className={tailwindMerge(
                  'fill-gray-700',
                  c.markedToDelete ? 'fill-gray-500' : '',
                )}
              />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function PlaceOrder({disabled}: {disabled: boolean}) {
  const [isPending, startClientTransition] = useTransition()
  const {setNotification} = useNotification()

  async function submit() {
    const result = await placeOrder()
    if (result.error) {
      setNotification({
        opened: true,
        content: result.error,
        type: 'error',
      })
    }
  }

  return (
    <form>
      <ButtonWithSpinner
        disabled={disabled || isPending}
        buttonTitle="Place Order"
        className="w-full px-0"
        onClick={() => startClientTransition(() => submit())}
        showSpinner={isPending}
      />
    </form>
  )
}

export function Summary({cart}: {cart: Cart}) {
  const segment = useSelectedLayoutSegment()
  const router = useRouter()
  const [tc, setTc] = useState(false)
  const isAddressesValid = useAtomValue(isAddressesValidAtom)

  const currentStepIndex = steps.findIndex(v => v.name === segment)
  const nextStep = steps[currentStepIndex + 1]

  const shippingCost =
    cart?.surcharges?.find(s => s.type === 'shipping')?.value || 0

  const nextStepDisabled =
    (segment === 'payment' && !tc) ||
    (segment === 'shipping' && !cart?.shipping) ||
    !isAddressesValid

  const mobileClasses =
    'flex flex-col gap-unit-4 fixed bottom-0 left-0 z-10 w-full bg-contrast py-unit-4 px-unit-4 shadow-[0px_-5px_20px_rgb(70,62,62,0.2)]'
  const desktopClasses = 'lg:py-0 lg:px-0 lg:static lg:shadow-none lg:mt-unit-4'

  const handleClick = () => {
    if (nextStep.name === 'pay') {
      placeOrder()
    } else {
      router.push(nextStep.href)
    }
  }

  return (
    <section className="-mx-[41px] mb-[120px] mt-0 h-full rounded border border-gray-500 p-unit-8 lg:mx-0 lg:w-1/3">
      <div className="flex justify-between font-medium">
        <CartItemsDrawer cart={cart} />
        <Price price={cart?.subTotal} />
      </div>
      <hr className="my-unit-4 divide-y divide-gray-500" />
      <div className="flex flex-col gap-unit-2 font-medium">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <Price price={cart?.subTotal} />
        </div>
        {cart?.surcharges?.map(s => {
          if (s.type === 'shipping') {
            return null
          }

          return (
            <div key={s.name}>
              <div className="flex justify-between">
                <span>{s.name}</span>
                <Price price={s.value} />
              </div>
              {s.name === 'Coupon discount' && cart.coupons ? (
                <CouponsSection coupons={cart.coupons} />
              ) : null}
            </div>
          )
        })}
        <div className="flex justify-between">
          <span>Shipping costs</span>
          <Price price={Number(shippingCost)} />
        </div>
      </div>
      <hr className="my-unit-4 divide-y divide-gray-500" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <Price price={cart?.total} />
      </div>
      <div className={tailwindMerge(mobileClasses, desktopClasses)}>
        {segment === 'payment' ? (
          <Checkbox
            label={
              <span>
                I accept the <Link href="/">Terms&Conditions</Link>
              </span>
            }
            checked={tc}
            onChange={checked => {
              setTc(Boolean(checked))
            }}
          />
        ) : null}
        <div className="flex items-center lg:flex-col">
          <div className="flex items-center gap-unit pr-unit-4 font-bold lg:mb-unit-4 lg:hidden lg:w-full">
            <span>Total</span>
            <Price price={cart?.total} />
          </div>
          <div className="w-[175px] flex-1 lg:w-full">
            {nextStep.name === 'pay' ? (
              <PlaceOrder disabled={nextStepDisabled} />
            ) : (
              <Button
                disabled={nextStepDisabled}
                buttonTitle={nextStep.label}
                className="w-full px-0"
                onClick={handleClick}
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-unit-4">
        <ApplyCoupon />
      </div>
    </section>
  )
}
