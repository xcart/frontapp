'use client'

import {useEffect, useRef, useState} from 'react'
import {Product} from '@xcart/storefront'
import {Section} from '~/components/elements/Section'
import {Pagination} from '~/components/global/Pagination'
import {ScrollToTop} from '~/components/global/ScrollToTop'
import {SortingSelector} from '~/components/global/SortingSelector'
import {ProductsGrid} from '~/components/products/ProductsGrid'

export function ProductsListPaginated({
  page,
  products,
  lastPage,
  total,
  gridClasses,
  searchParams,
  filter,
}: {
  page: number
  products: Product[]
  lastPage: number
  total?: number
  gridClasses?: string
  searchParams?: {[key: string]: string | string[] | undefined}
  filter?: React.ReactNode
}) {
  const [isFetching, setIsFetching] = useState(false)
  const ref = useRef(null as HTMLElement | null)
  const height = ref.current?.clientHeight

  useEffect(() => {
    if (isFetching) {
      ref.current?.style.setProperty('height', `${height}px`)
    } else {
      ref.current?.style.removeProperty('height')
    }
  }, [height, isFetching])

  return (
    <Section sectionInnerClasses="grid gap-unit-8 md:gap-unit-12">
      <div className="grid gap-unit-4">
        {!!total && (
          <div className="flex h-unit-8 items-center justify-between">
            <SortingSelector
              initialValue={
                searchParams?.sortParam
                  ? (searchParams.sortParam as string)
                  : 'default'
              }
              setIsFetching={setIsFetching}
              params={searchParams}
            />
            {filter}
          </div>
        )}
        <ScrollToTop page={page}>
          <ProductsGrid
            ref={ref}
            products={products}
            gridClasses={gridClasses}
            isFetching={isFetching}
            data-id="ProductGrid"
          />
        </ScrollToTop>
      </div>
      <Pagination
        current={page}
        last={lastPage}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        params={searchParams}
      />
    </Section>
  )
}
