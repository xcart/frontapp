import {ShopByLevelItemSkeleton} from '~/components/global/skeleton/ShopByLevelItemSkeleton'

export function ShopByLevelTileSkeleton() {
  return (
    <ul className="mx-[-5px] mb-unit-6 flex flex-wrap">
      {[...Array(16)].map((_item, index) => {
        const key = `item-${index}`
        return <ShopByLevelItemSkeleton key={key} />
      })}
    </ul>
  )
}
