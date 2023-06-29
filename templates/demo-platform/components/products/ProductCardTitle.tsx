import type {Product} from '@xcart/storefront'
import {Link} from '~/components/navigation/link'

export function ProductCardTitle({
  product,
  titleClasses,
  linkClasses,
}: {
  product: Product
  titleClasses?: string
  linkClasses?: string
}) {
  return (
    <span className={titleClasses}>
      <Link href={`/${product.cleanUrl}`} className={linkClasses}>
        {product.name}
      </Link>
    </span>
  )
}
