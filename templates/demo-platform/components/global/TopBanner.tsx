import type {ProductImage} from '@xcart/storefront'
import Image from 'next/image'
import {tailwindMerge} from '~/helpers'

export function TopBanner({
  image,
  alt,
  additionalClasses,
}: {
  image: ProductImage & {src?: string}
  alt?: string
  additionalClasses?: string
}) {
  return (
    image && (
      <div
        className={tailwindMerge(
          'page mb-unit-8 mt-unit-4 h-[200px] lg:px-unit-16 lg:mt-unit-8',
          additionalClasses || '',
        )}
      >
        <Image
          src={(image.url || image.src) as string}
          alt={(alt || image.alt) as string}
          width={image.width as number}
          height={image.height as number}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    )
  )
}
