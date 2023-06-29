'use client'

import {Product} from '@xcart/storefront'
import {useRouter} from 'next/navigation'
import {Button} from '~/components/elements/Button'
import {Section} from '~/components/elements/Section'
import {ProductsGrid} from '~/components/products/ProductsGrid'

export function SectionWithButton({
  products,
  title,
  buttonText = 'View All',
  path,
  sectionInnerClasses = '',
  sectionClasses,
}: {
  products: Product[]
  title?: string
  buttonText?: string
  path?: string
  sectionInnerClasses?: string
  sectionClasses?: string
}) {
  const router = useRouter()

  return (
    <Section
      heading={title}
      sectionClasses={sectionClasses}
      sectionInnerClasses={sectionInnerClasses}
      headingClasses="text-center"
    >
      <ProductsGrid products={products} />
      {path && (
        <div className="mt-unit-8 text-center lg:mt-unit-12">
          <Button
            variant="secondary"
            onClick={() => {
              router.push(path)
            }}
            aria-label={buttonText}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </Section>
  )
}
