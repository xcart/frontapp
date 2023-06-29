import {ProductsGridSkeleton} from '~/components/global/skeleton/ProductsGridSkeleton'

export function MMYPageSkeleton() {
  return (
    <div className="page px-unit-4 pb-unit-8 pt-unit-4 lg:px-unit-16 lg:pt-unit-8">
      <div className="skeleton mb-unit-8 h-unit-8 w-[74.5%] rounded" />
      <div className="skeleton mb-unit-4 h-unit-4 w-[150px] rounded" />
      <ProductsGridSkeleton count={12} />
    </div>
  )
}
