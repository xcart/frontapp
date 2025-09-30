'use server'

import {revalidateTag} from 'next/cache'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import {getXCartClient} from 'app/client'
import {getCartAddresses, getCartId} from './helpers'

export async function saveAddresses(data: any) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  const {shippingAddress, billingAddress} = await getCartAddresses()
  const sid = data.sid || shippingAddress?.id
  const bid =
    data.bid ||
    (shippingAddress?.id !== billingAddress?.id ? billingAddress?.id : null)

  const addressData: any[] = []
  // eslint-disable-next-line no-restricted-syntax
  for (const [k, v] of Object.entries(data)) {
    if (k.startsWith('shipping_')) {
      addressData.push({
        serviceName: k.replace(/^shipping_/, ''),
        value: !v ? '' : String(v),
      })
    }
  }

  const billingAddressData: any[] = []
  // eslint-disable-next-line no-restricted-syntax
  for (const [k, v] of Object.entries(data)) {
    if (k.startsWith('billing_')) {
      billingAddressData.push({
        serviceName: k.replace(/^billing_/, ''),
        value: !v ? '' : String(v),
      })
    }
  }

  client.other.postCartemailchangeCollection(cartId, {email: data.email})

  if (sid) {
    await client.other.patchCartAddressItem(
      String(sid),
      cartId,
      // @ts-ignore
      {
        fields: addressData,
      },
      {
        next: {revalidate: 0},
      },
    )
  } else {
    await client.other.postCartAddressCollection(cartId, {
      fields: addressData,
    })
  }

  if (data.same_address) {
    if (bid && bid !== sid) {
      await client.other.patchCartAddressItem(
        String(sid),
        cartId,
        // @ts-ignore
        {
          isBilling: true,
        },
        {
          next: {revalidate: 0},
        },
      )
    }
  } else if (bid) {
    await client.other.patchCartAddressItem(
      String(bid),
      cartId,
      // @ts-ignore
      {
        fields: billingAddressData,
      },
      {
        next: {revalidate: 0},
      },
    )
  } else {
    const response = await client.other.postCartAddressCollection(cartId, {
      fields: billingAddressData,
    })
    if (response.id) {
      await client.other.patchCartAddressItem(
        String(response.id),
        cartId,
        // @ts-ignore
        {
          isBilling: true,
        },
        {
          next: {revalidate: 0},
        },
      )
    }
  }

  revalidateTag(cartId)
}

export async function changeShippingAddress(id: number, sameAddress: boolean) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  const body: Record<string, boolean> = {
    isShipping: true,
  }

  if (sameAddress) {
    body.isBilling = true
  }

  const res = await client.other.patchCartAddressItem(
    String(id),
    cartId,
    // @ts-ignore
    body,
    {
      next: {revalidate: 0},
    },
  )

  revalidateTag(cartId)

  return res
}

export async function changeBillingAddress(id: number) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  const res = await client.other.patchCartAddressItem(
    String(id),
    cartId,
    // @ts-ignore
    {
      isBilling: true,
    },
    {
      next: {revalidate: 0},
    },
  )

  revalidateTag(cartId)

  return res
}

export async function updateAddress(data: any) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  const addressData: any[] = []
  // eslint-disable-next-line no-restricted-syntax
  for (const [k, v] of Object.entries(data)) {
    if (k !== 'email' && k !== 'id') {
      addressData.push({
        serviceName: k,
        value: !v ? '' : String(v),
      })
    }
  }

  if (data.email) {
    client.other.postCartemailchangeCollection(cartId, {email: data.email})
  }

  let res
  if (data.id) {
    res = await client.other.patchCartAddressItem(
      String(data.id),
      cartId,
      // @ts-ignore
      {fields: addressData},
      {
        next: {revalidate: 0},
      },
    )
  } else {
    res = await client.other.postCartAddressCollection(cartId, {
      fields: addressData,
    })
    if (res.id) {
      res = await client.other.patchCartAddressItem(
        String(res.id),
        cartId,
        // @ts-ignore
        {
          isBilling: true,
        },
        {
          next: {revalidate: 0},
        },
      )
    }
  }

  revalidateTag(cartId)

  return res
}

export async function updateShippingMethod(shippingMethodId: string | number) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  await client.other.postCartshippingmethodselectionCollection(cartId, {
    shippingMethodId: Number(shippingMethodId),
  })
  revalidateTag(cartId)
}

export async function updatePaymentMethod(paymentMethodId: string | number) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  await client.other.postCartpaymentmethodselectionCollection(cartId, {
    paymentMethodId: Number(paymentMethodId),
  })
  revalidateTag(cartId)
}

export async function applyCoupon(code: string) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  const response = await client.other.postCartcouponCollection(cartId, {code})
  if (response instanceof Error) {
    // @ts-ignore
    return {message: response?.error['hydra:description'], error: true}
  }
  revalidateTag(cartId)

  return {message: 'The coupon has been applied to your order'}
}

export async function deleteCoupon(id: string) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  await client.other.deleteCartcouponItem(id, cartId)
  revalidateTag(cartId)
}

export async function placeOrder(actionData: any[] = []) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  const cart = await client.cart.getCart(cartId, {
    next: {tags: [cartId], revalidate: 0},
  })

  const initResponse = await client.other.patchPaymentItem(
    cart.paymentTransaction as string,
    cartId,
    // @ts-ignore
    {
      action: 'init',
      actionData,
      actionMetaData: [
        {
          name: 'success_url',
          value: `${process.env.NEXTAUTH_URL}/payment_return/${cartId}/${
            cart.paymentTransaction as string
          }`,
        },
        {
          name: 'cancel_url',
          value: `${process.env.NEXTAUTH_URL}/payment_cancel/${cartId}/${
            cart.paymentTransaction as string
          }`,
        },
      ],
    },
    {
      next: {revalidate: 0},
    },
  )

  if (!initResponse.actionMetaData?.length) {
    if (initResponse.status === 'P') {
      await client.other.patchPaymentItem(
        cart.paymentTransaction as string,
        cartId,
        // @ts-ignore
        {action: 'pay'},
        {
          next: {revalidate: 0},
        },
      )
    } else if (initResponse.status === 'F') {
      revalidateTag(cartId)
      return {error: 'Error, try again'}
    }
  } else {
    redirect(initResponse.actionMetaData[0].value as string)
  }

  const orderResponse = await client.other.postOrderCollection(cartId, {})

  if (!(orderResponse instanceof Error)) {
    cookies().set({
      name: 'xc-cart',
      value: '',
      path: '/',
    })
    redirect(`/checkout-success?order_number=${orderResponse.number}`)
  } else {
    // @ts-ignore
    return {error: orderResponse?.error['hydra:description']}
  }
}

export async function generateXPaymentsWidgetData(
  paymentTransaction: string | null | undefined,
) {
  const client = await getXCartClient()

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error('Cart not found')
  }

  const response = await client.other.patchPaymentItem(
    paymentTransaction as string,
    cartId,
    // @ts-ignore
    {
      action: 'generate_widget_data',
    },
    {
      next: {revalidate: 0},
    },
  )

  return response
}
