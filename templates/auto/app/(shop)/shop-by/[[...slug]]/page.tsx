import PageContent from '~/components/global/PageContent'
import {PageSearchField} from '~/components/global/PageSearchField'
import {AlphabeticalSearchByLevel} from '~/components/shop-by/AlphabeticalSearchByLevel'
import {getShopByPaginatedLevelItems} from '~/components/shop-by/functions/getShopByPaginatedLevelItems'
import {ShopByTile} from '~/components/shop-by/ShopByTile'

export default async function Page({
  params,
  searchParams,
}: {
  params: {slug: any}
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const page = Number(searchParams?.page ?? 1)

  const firstLetter = (searchParams?.firstLetter as string) || undefined
  const substring = (searchParams?.substring as string) || undefined
  const parentId = (searchParams?.parentId as string) || undefined
  const depth = (searchParams?.depth as string) || '1'

  const {levelItems, lastPage} = await getShopByPaginatedLevelItems(
    depth,
    page,
    parentId,
    firstLetter,
    substring,
  )

  const levelName =
    params?.slug?.length && Number(depth) > 1
      ? params.slug.join(' ').replaceAll('__', ' ')
      : 'Make'

  const depthForTiles = params?.slug?.length > 0 ? params.slug.length + 2 : 2

  return (
    <PageContent pageTitle={`Shop by ${levelName}`}>
      <>
        {/* @ts-expect-error Server Component */}
        <AlphabeticalSearchByLevel
          searchParams={searchParams}
          depth={depth}
          parentId={parentId}
        />
        <PageSearchField substring={substring} params={searchParams} />
        <ShopByTile
          items={levelItems}
          depth={depthForTiles}
          page={page}
          lastPage={lastPage}
          searchParams={searchParams}
        />
      </>
    </PageContent>
  )
}
