import {ProductsGridSkeleton} from '~/components/global/skeleton/ProductsGridSkeleton'

export function ProductDetailsSkeleton() {
  return (
    <div className="page px-unit-4 pt-unit-4 pb-unit-8 lg:px-unit-16 lg:pt-unit-8">
      <div className="flex flex-col w-full mb-unit-16 lg:flex-row">
        <div className="flex-1 lg:pr-unit-4">
          <div className="skeleton square" />
          <div className="hidden lg:flex mt-unit-8">
            <div className="w-1/2 pr-unit-4">
              <div className="flex-1 skeleton square" />
            </div>
            <div className="w-1/2 pl-unit-4">
              <div className="flex-1 skeleton square" />
            </div>
          </div>
        </div>
        <div className="flex-1 pt-unit-8 lg:pl-unit-4 lg:pt-0">
          <div className="skeleton skeleton-row w-[120px]" />
          <div className="skeleton skeleton-row w-full" />
          <div className="skeleton skeleton-row w-1/2 mb-unit-8" />
          <div className="skeleton skeleton-row w-[120px]" />
          <div className="flex mb-unit-8">
            {[...Array(6)].map((_item, index) => {
              const key = `item-${index}`
              return (
                <div
                  className="skeleton h-unit-8 w-unit-8 rounded-full mr-unit-2 last:mr-0"
                  key={key}
                />
              )
            })}
          </div>
          <div className="flex mb-unit-14">
            <div className="w-[120px] mr-unit-8">
              <div className="skeleton skeleton-row w-full" />
              <div className="skeleton skeleton-row mb-0 w-1/2" />
            </div>
            <div className="flex-1 skeleton h-unit-12 w-full" />
          </div>
          <div className="hidden w-full mb-unit-8 lg:flex">
            {[...Array(3)].map((_item, index) => {
              const key = `item-${index}`
              return (
                <div
                  className="skeleton skeleton-row w-[120px] mb-0 mr-unit-8 last:mr-0"
                  key={key}
                />
              )
            })}
          </div>
          <div className="skeleton skeleton-row w-full" />
          <div className="skeleton skeleton-row w-full" />
          <div className="skeleton skeleton-row w-full" />
          <div className="skeleton skeleton-row w-1/2" />
        </div>
      </div>
      <div className="skeleton skeleton-row w-[74.5%]" />
      <ProductsGridSkeleton count={4} />
    </div>
  )
}
