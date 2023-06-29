'use client'

import {useEffect} from 'react'
import {useSetAtom} from 'jotai'
import {useRouter} from 'next/navigation'
import {clearCartId} from '~/components/cart/functions/cartActions'
import {cartAtom} from '~/components/cart/store'
import {Button} from '~/components/elements/Button'
import PageContent from '~/components/global/PageContent'

export function SuccessPage({orderNumber}: {orderNumber: string}) {
  const router = useRouter()
  const setCart = useSetAtom(cartAtom)

  useEffect(() => {
    clearCartId()
    setCart({})
  }, [setCart])

  return (
    <PageContent pageTitle="Thank you for your Order" noItems>
      <p>
        Congratulations! Your order{' '}
        <span className="font-medium">#{orderNumber}</span> has been placed.
      </p>
      <p>You will receive your invoice via email shortly.</p>
      <Button
        variant="secondary"
        buttonTitle="Continue Shopping"
        className="mt-unit-4"
        onClick={() => router.push('/')}
      />
    </PageContent>
  )
}
