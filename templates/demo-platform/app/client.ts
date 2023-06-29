import {Client} from '@xcart/storefront'
import {headers, cookies} from 'next/headers'
import {NextRequest} from 'next/server'
import {getToken} from 'next-auth/jwt'

export const getXCartClient = async () => {
  const client = new Client(
    process.env.NEXT_PUBLIC_XCART_API_URL as string,
    process.env.NEXT_PUBLIC_API_KEY as string,
  )

  const req = {headers: headers(), cookies: cookies()} as unknown as NextRequest
  const token = await getToken({req})

  if (token && Date.now() < (token.access_token_exp as number) * 1000) {
    client.setAccessToken(token.access_token as string)
  }

  /**
   * https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache
   * https://nextjs.org/docs/app/api-reference/functions/fetch#optionsnextrevalidate
   */
  client.setRequestOptions({next: {revalidate: 3600}})

  return client
}
