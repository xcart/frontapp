import type {Product} from '@xcart/storefront'
import Image from 'next/image'
import {Link} from '~/components/navigation/link'
import {IMAGES} from '~/constants'

export interface IProductImage {
  product: Product
  imageClasses?: string
  noImageClasses?: string
  hasLink?: boolean
}

export function ProductImage({
  product,
  imageClasses,
  noImageClasses,
  hasLink = false,
}: IProductImage) {
  const renderImage = () => {
    return product?.images?.length ? (
      <Image
        src={product.images[0].url as string}
        alt={product.images[0].alt as string}
        width={IMAGES.productList.width}
        height={IMAGES.productList.height}
        className="w-full transition-transform duration-[450ms] group-hover:scale-105"
        sizes="(min-width: 768px) 20vw, 40vw"
      />
    ) : (
      <div className={noImageClasses} />
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
