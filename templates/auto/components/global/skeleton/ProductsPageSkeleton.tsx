import {ProductsGridSkeleton} from '~/components/global/skeleton/ProductsGridSkeleton'
import {tailwindMerge} from '~/helpers'

export function ProductsPageSkeleton({
  hasSubcategories = false,
}: {
  hasSubcategories?: boolean
}) {
  const titlePlaceholderWidth = hasSubcategories ? 'w-[71.25%]' : 'w-[74.5%]'
  const productsCount = hasSubcategories ? 9 : 12

  return (
    <div className="page px-unit-4 pt-unit-4 pb-unit-8 lg:px-unit-16 lg:pt-unit-8">
      <div className="skeleton h-[200px] mb-unit-8 rounded-base" />
      <div
        className={tailwindMerge(
          'skeleton h-unit-4 mb-unit-8 rounded-base',
          titlePlaceholderWidth,
        )}
      />
      <div
        className={
          hasSubcategories
            ? 'grid grid-flow-row lg:gap-unit-8 lg:grid-cols-[180px_minmax(0,_1fr)]'
            : ''
        }
      >
        {hasSubcategories && (
          <div className="pr-unit-12">
            <div className="skeleton h-unit-4 mb-unit-4 rounded-base" />
            <div className="skeleton h-unit-4 mb-unit-4 rounded-base" />
            <div className="skeleton h-unit-4 mb-unit-4 rounded-base" />
            <div className="skeleton h-unit-4 mb-unit-4 rounded-base" />
          </div>
        )}

        <ProductsGridSkeleton
          count={productsCount}
          gridClasses={hasSubcategories ? 'lg:grid-cols-3' : ''}
        />
      </div>
    </div>
  )
}
