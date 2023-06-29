'use client'

import {Brand, MMYLevel, Product} from '@xcart/storefront'
import {useRouter} from 'next/navigation'
import {BrandsTile} from '~/components/brands/BrandsTile'
import {Button} from '~/components/elements/Button'
import {Section} from '~/components/elements/Section'
import {ProductsGrid} from '~/components/products/ProductsGrid'
import {ShopByTile} from '~/components/shop-by/ShopByTile'
import {componentOrNull, tailwindMerge} from '~/helpers'

export function SectionWithButton({
  items,
  title,
  buttonText = 'View All',
  path,
  sectionInnerClasses = '',
  sectionClasses,
  additionalSectionClasses,
  buttonWrapperClasses,
  type,
}: {
  items: Product[] | Brand[] | MMYLevel[]
  title?: string
  buttonText?: string
  path?: string
  sectionInnerClasses?: string
  sectionClasses?: string
  additionalSectionClasses?: string
  buttonWrapperClasses?: string
  type: 'products' | 'brands' | 'levels'
}) {
  const router = useRouter()

  return (
    <Section
      heading={title}
      sectionClasses={sectionClasses}
      sectionInnerClasses={sectionInnerClasses}
      headingClasses="text-center"
    >
      {componentOrNull(type === 'products', <ProductsGrid products={items} />)}
      {componentOrNull(
        type === 'brands',
        <BrandsTile
          items={items}
          page={1}
          lastPage={1}
          wrapperClasses={additionalSectionClasses}
        />,
      )}
      {componentOrNull(
        type === 'levels',
        <ShopByTile
          page={1}
          lastPage={1}
          depth={2}
          items={items}
          wrapperClasses={additionalSectionClasses}
        />,
      )}
      {path && (
        <div
          className={tailwindMerge(
            'mt-unit-8 text-center lg:mt-unit-12',
            buttonWrapperClasses,
          )}
        >
          <Button
            variant="secondary"
            onClick={() => {
              router.push(path)
            }}
            aria-label={buttonText}
            className="w-full lg:w-auto"
          >
            {buttonText}
          </Button>
        </div>
      )}
    </Section>
  )
}
