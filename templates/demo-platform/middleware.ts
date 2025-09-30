import {Client} from '@xcart/storefront'
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {getToken} from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/payment_return')) {
    const client = new Client(
      process.env.NEXT_PUBLIC_XCART_API_URL as string,
      process.env.NEXT_PUBLIC_API_KEY as string,
    )
    const token = await getToken({req: request})
    if (token && Date.now() < (token.access_token_exp as number) * 1000) {
      client.setAccessToken(token.access_token as string)
    }
    client.setRequestOptions({next: {revalidate: 0}})

    const cartId = request.nextUrl.pathname.split('/')[2]
    const txnId = request.nextUrl.pathname.split('/')[3]

    await client.other.patchPaymentItem(
      txnId,
      cartId,
      // @ts-ignore
      {action: 'pay'},
    )
    const orderResponse = await client.other.postOrderCollection(cartId, {})
    if (!(orderResponse instanceof Error)) {
      const response = NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/checkout-success?order_number=${orderResponse.number}`,
      )
      response.cookies.set({
        name: 'xc-cart',
        value: '',
        path: '/',
      })
      return response
    }
  }

  if (request.nextUrl.pathname.startsWith('/payment_cancel')) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/checkout/payment`)
  }
}

export const config = {
  matcher: ['/payment_return/:path*', '/payment_cancel/:path*'],
}
