import type {Product} from '@xcart/storefront'
import Image from 'next/image'
import {Link} from '~/components/navigation/link'
import {IMAGES} from '~/constants'

export interface IProductImage {
  product: Product
  imageClasses?: string
  hasLink?: boolean
}

export function ProductImage({
  product,
  imageClasses,
  hasLink = false,
}: IProductImage) {
  const renderImage = () => {
    return product?.images?.length ? (
      <Image
        src={product.images[0].url as string}
        alt={product.images[0].alt as string}
        width={IMAGES.productList.width}
        height={IMAGES.productList.height}
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-[450ms] group-hover:scale-105"
        sizes="(min-width: 768px) 20vw, 40vw"
      />
    ) : (
      <div />
    )
  }

  return (
    <div className={imageClasses}>
      {hasLink ? (
        <Link href={`/${product.cleanUrl}`} aria-label={product.name}>
          {renderImage()}
        </Link>
      ) : (
        <>{renderImage()}</>
      )}
    </div>
  )
}
