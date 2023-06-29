import PageContent from '~/components/global/PageContent'
import {ShopByLevelTileSkeleton} from '~/components/global/skeleton/ShopByLevelTileSkeleton'

export function ShopByLevelPageSkeleton() {
  return (
    <PageContent>
      <div className="skeleton mb-unit-8 h-unit-8 w-1/2" />
      <div className="skeleton mb-unit-8 h-unit-8 rounded" />
      <div className="skeleton mb-unit-8 h-unit-8 rounded lg:h-unit-12" />
      <ShopByLevelTileSkeleton />
    </PageContent>
  )
}
