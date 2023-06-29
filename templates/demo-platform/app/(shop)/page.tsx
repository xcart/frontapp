import {Suspense} from 'react'
import {getXCartClient} from 'app/client'
import PageContent from '~/components/global/PageContent'
import {ProductsPageSkeleton} from '~/components/global/skeleton/ProductsPageSkeleton'
import {Tabs} from '~/components/global/Tabs'
import {CenterBanners} from '~/components/homepage/CenterBanners'
import {MainBanner} from '~/components/homepage/MainBanner'
import {SectionWithButton} from '~/components/homepage/SectionWithButton'
import {SubcategoriesTiles} from '~/components/homepage/SubcategoriesTiles'

async function MainContent() {
  const client = await getXCartClient()

  const [{products: bestsellers}, {products: newArrivals}, {products: onsale}] =
    await Promise.all([
      client.getBestsellersProducts(4),
      client.getNewArrivalsProducts(4),
      client.getOnSaleProducts(4),
    ])

  const tabs = [
    {
      name: 'Bestsellers',
      content: <SectionWithButton products={bestsellers} path="bestsellers" />,
      disabled: false,
    },
    {
      name: 'Recent Arrivals',
      content: (
        <SectionWithButton products={newArrivals} path="recent-arrivals" />
      ),
      disabled: false,
    },
  ]

  return (
    <PageContent>
      {/* @ts-expect-error Server Component */}
      <SubcategoriesTiles />
      <Tabs
        tabs={tabs}
        sectionTitle="Collection"
        tabsWrapperClasses="mb-unit-12 lg:mb-unit-16"
      />
      <CenterBanners />
      <SectionWithButton
        products={onsale}
        title="On Sale"
        sectionClasses="w-full gap-unit-5 md:gap-unit-8 grid"
        path="sale"
      />
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
