'use client'

import Link from 'next/link'
import {useSelectedLayoutSegment} from 'next/navigation'
import {IconArrowDown, IconSecureCheckout} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'

function NavItem({
  href,
  label,
  current = true,
  hasIcon = true,
}: {
  href?: string
  label: string
  current?: boolean
  hasIcon?: boolean
}) {
  if (!href || current) {
    return (
      <div className="flex gap-unit-4 text-sm font-medium">
        <span
          className={
            current ? 'no-underline' : 'text-gray-700 underline opacity-20'
          }
        >
          {label}
        </span>
        {hasIcon ? (
          <span
            className={tailwindMerge(
              'flex h-unit-4 w-unit-4 items-center justify-center',
              current ? '' : 'opacity-20',
            )}
          >
            <IconArrowDown className="-rotate-90 fill-primary" />
          </span>
        ) : null}
      </div>
    )
  }

  return (
    <Link href={href} className="flex gap-unit-4 text-sm font-medium">
      <span>{label}</span>
      {hasIcon ? (
        <span className="flex h-unit-4 w-unit-4 items-center justify-center">
          <IconArrowDown className="-rotate-90 fill-primary" />
        </span>
      ) : null}
    </Link>
  )
}

export default function Navigation() {
  const segment = useSelectedLayoutSegment()

  return (
    <nav className="flex flex-col gap-unit-8 md:flex-row md:justify-between md:gap-0">
      <div className="flex flex-row items-center gap-unit-4 md:order-2">
        <NavItem
          href="/checkout/addresses"
          label="Addresses"
          current={segment === 'addresses'}
        />
        <NavItem
          href={
            segment === 'shipping' || segment === 'payment'
              ? '/checkout/shipping'
              : undefined
          }
          label="Shipping"
          current={segment === 'shipping'}
        />
        <NavItem
          href={segment === 'payment' ? '/checkout/payment' : undefined}
          label="Payment"
          current={segment === 'payment'}
          hasIcon={false}
        />
      </div>
      <div className="flex flex-row items-center gap-unit md:order-1">
        <IconSecureCheckout />
        <h1 className="whitespace-nowrap">Secure Checkout</h1>
      </div>
    </nav>
  )
}
