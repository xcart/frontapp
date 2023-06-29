import {Suspense} from 'react'
import {getXCartClient} from 'app/client'
import PageContent from '~/components/global/PageContent'
import {ProductsPageSkeleton} from '~/components/global/skeleton/ProductsPageSkeleton'
import {Tabs} from '~/components/global/Tabs'
import {CenterBanners} from '~/components/homepage/CenterBanners'
import {MainBanner} from '~/components/homepage/MainBanner'
import {SectionWithButton} from '~/components/homepage/SectionWithButton'

async function MainContent() {
  const client = await getXCartClient()

  const [
    {products: bestsellers},
    {products: newArrivals},
    {brands},
    {levelItems},
  ] = await Promise.all([
    client.getBestsellersProducts(4),
    client.getNewArrivalsProducts(4),
    client.getAllBrandsPaginated({itemsPerPage: 8}),
    client.getMMYLevelsPaginated('1', {'filter.showOnFrontPage': true}),
  ])

  const tabs = [
    {
      name: 'Bestsellers',
      content: (
        <SectionWithButton
          items={bestsellers}
          path="bestsellers"
          type="products"
        />
      ),
      disabled: false,
    },
    {
      name: 'Recent Arrivals',
      content: (
        <SectionWithButton
          items={newArrivals}
          path="recent-arrivals"
          type="products"
        />
      ),
      disabled: false,
    },
  ]

  return (
    <PageContent>
      <Tabs
        tabs={tabs}
        sectionTitle="Collection"
        tabsWrapperClasses="mb-unit-12 lg:mb-unit-16"
      />
      {brands.length > 0 && (
        <SectionWithButton
          items={brands}
          title="Shop By Brand"
          sectionClasses="w-full gap-unit-5 md:gap-unit-8 grid"
          path="brands"
          type="brands"
          additionalSectionClasses="justify-center"
          buttonWrapperClasses="mt-0 lg:mt-0"
        />
      )}
      {levelItems.length > 0 && (
        <SectionWithButton
          items={levelItems}
          title="Shop By Make"
          sectionClasses="w-full gap-unit-5 md:gap-unit-8 grid"
          path="shop-by"
          type="levels"
          buttonWrapperClasses="mt-unit-6 lg:mt-unit-6"
        />
      )}
      <CenterBanners />
    </PageContent>
  )
}

export default function Home() {
  return (
    <>
      <MainBanner />
      <Suspense fallback={<ProductsPageSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <MainContent />
      </Suspense>
    </>
  )
}
