import {AlphabeticalSearchByBrand} from '~/components/brands/AlphabeticalSearchByBrand'
import {BrandsTile} from '~/components/brands/BrandsTile'
import PageContent from '~/components/global/PageContent'
import {PageSearchField} from '~/components/global/PageSearchField'
import {getXCartClient} from '../../client'

export async function generateMetadata() {
  return {
    title: 'Shop by Brand',
  }
}

async function getAllBrands(
  page: number,
  firstLetter?: string,
  substring?: string,
) {
  const client = await getXCartClient()

  const data = await client.getAllBrandsPaginated({
    page,
    ...(firstLetter ? {'filter.firstLetter': firstLetter} : null),
    ...(substring ? {'filter.substring': substring} : null),
  })

  return data
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const page = Number(searchParams?.page ?? 1)
  const firstLetter = (searchParams?.firstLetter as string) || undefined
  const substring = (searchParams?.substring as string) || undefined

  const {brands, lastPage} = await getAllBrands(page, firstLetter, substring)

  return (
    <PageContent pageTitle="Shop by Brand">
      <>
        {/* @ts-expect-error Server Component */}
        <AlphabeticalSearchByBrand searchParams={searchParams} />
        <PageSearchField substring={substring} />
        <BrandsTile page={page} lastPage={lastPage} items={brands} />
      </>
    </PageContent>
  )
}
