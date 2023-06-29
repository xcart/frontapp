import {Product} from '@xcart/storefront'
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
  return (
    <Section
      heading={title}
      sectionClasses={sectionClasses}
      sectionInnerClasses={sectionInnerClasses}
      headingClasses="text-center"
    >
      <ProductsGrid products={products} />
      {path && (
        <div className="text-center mt-unit-8 lg:mt-unit-12">
          <Button
            variant="secondary"
            onClick={() => alert(`You should be redirected to: ${path}`)}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </Section>
  )
}
