import {ProductImage} from '@xcart/storefront'
import Image from 'next/image'
import {WishlistButton} from '~/components/wishlist/WishlistButton'
import {IMAGES} from '~/constants'

export function ProductImagesDesktop({
  images,
  productId,
}: {
  images: ProductImage[]
  productId: number
}) {
  return (
    <div className="relative hidden lg:block">
      <WishlistButton productId={productId} />
      <div className="grid grid-cols-2 gap-unit-8">
        {images.map((image, index) => {
          const imageKey = `image-${index}`
          const imageStyle = index > 0 ? '' : 'col-span-2 w-full'
          return (
            <Image
              src={image.url as string}
              alt={image.alt as string}
              width={
                index > 0
                  ? IMAGES.productList.width
                  : IMAGES.productDetails.width
              }
              height={
                index > 0
                  ? IMAGES.productList.height
                  : IMAGES.productDetails.height
              }
              key={imageKey}
              className={imageStyle}
            />
          )
        })}
      </div>
    </div>
  )
}
