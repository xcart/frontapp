import type {CartItem} from '@xcart/storefront'
import Image from 'next/image'

export function CartItemImage({item}: {item: CartItem}) {
  return item.variant &&
    Object.keys(item.variant).length > 0 &&
    item.variant.image ? (
    <Image
      src={item.variant.image.url as string}
      fill
      alt={item.variant.sku as string}
      sizes="100%"
    />
  ) : (
    <Image
      src={item.images ? (item.images[0].url as string) : ''}
      fill
      alt={item.sku as string}
      sizes="100%"
    />
  )
}
