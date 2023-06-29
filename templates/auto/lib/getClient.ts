import {Client} from '@xcart/storefront'
import {getSession} from 'next-auth/react'

let client: Client | null = null

export const getClient = async () => {
  if (!client) {
    client = new Client(
      process.env.NEXT_PUBLIC_XCART_API_URL as string,
      process.env.NEXT_PUBLIC_API_KEY as string,
    )
  }

  const session = await getSession()

  if (
    session &&
    // @ts-ignore
    session.access_token &&
    // @ts-ignore
    Date.now() < (session.access_token_exp as number) * 1000
  ) {
    // @ts-ignore
    client.setAccessToken(session.access_token as string)
  }

  return client
}

export const clearClient = () => {
  client = null

  return false
}
