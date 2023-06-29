import {Product} from '@xcart/storefront'
import {Params} from 'utils/cloud-search/helpers'
import {FiltersDrawerWrapper} from '~/components/global/Filters/FiltersDrawerWrapper'
import {ProductsListPaginated} from './ProductsListPaginated'

export function ProductsList(props: {
  page: number
  products: Product[]
  lastPage: number
  total?: number
  params: Params
}) {
  const {params} = props
  const {searchParams} = params

  return (
    <>
      <ProductsListPaginated
        {...props}
        searchParams={searchParams}
        filter={<FiltersDrawerWrapper params={params} />}
      />
    </>
  )
}
