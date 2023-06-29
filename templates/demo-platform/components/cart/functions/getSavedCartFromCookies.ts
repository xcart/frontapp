import {cookies} from 'next/headers'

export default function getSavedCartFromCookies() {
  const savedCartId = cookies().get('xc-cart')

  return savedCartId || null
}
