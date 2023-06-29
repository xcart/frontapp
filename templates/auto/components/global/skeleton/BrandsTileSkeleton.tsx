import {BrandItemSkeleton} from '~/components/global/skeleton/BrandItemSkeleton'

export function BrandsTileSkeleton() {
  return (
    <div>
      <div className="mx-[-10px] flex flex-wrap lg:mx-[-20px]">
        {[...Array(20)].map((_item, index) => {
          const key = `item-${index}`
          return <BrandItemSkeleton key={key} />
        })}
      </div>
    </div>
  )
}
