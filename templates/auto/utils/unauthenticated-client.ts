import {Client} from '@xcart/storefront'

export const client = new Client(
  process.env.NEXT_PUBLIC_XCART_API_URL as string,
  process.env.NEXT_PUBLIC_API_KEY as string,
)
