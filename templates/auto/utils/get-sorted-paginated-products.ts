import {getXCartClient} from 'app/client'
import {CacheParams} from '~/constants'
import {search} from './cloud-search/search'
import {getStoredSelectedVehicle} from '~/components/mmy/functions/getStoredSelectedVehicle'
import {GarageItem} from '~/components/mmy/functions/interface'

const getSelectedVehicleId = () => {
  const selectedVehicleValues: GarageItem = getStoredSelectedVehicle()

  return selectedVehicleValues && Object.keys(selectedVehicleValues).length
    ? selectedVehicleValues.id
    : undefined
}

export const getSortedPaginatedProducts = async ({
  searchParams,
  perPage = 12,
  categoryId,
  filter,
  requestOptions,
}: {
  searchParams: any
  perPage?: number
  categoryId?: number
  filter?: {[key: string]: boolean | number}
  requestOptions?: CacheParams
}) => {
  const page = Number(searchParams?.page ?? 1)
  const levelId = getSelectedVehicleId()

  const filterParams = levelId ? {...filter, 'filter.levelId': levelId} : filter

  const {data, error} = await search({
    searchParams,
    perPage,
    categoryId,
    filter: filterParams,
  })

  if (!error && data !== null) {
    return {page, ...data}
    // eslint-disable-next-line no-else-return
  } else {
    const sorting = searchParams?.sort
      ? (() => {
          const [orderBy, direction] = (searchParams.sort as string).split('-')
          return {[`order_by.${orderBy}`]: direction}
        })()
      : {}

    const client = await getXCartClient()

    const response = await client.getPaginatedProducts(
      {
        itemsPerPage: perPage,
        page,
        ...filterParams,
        ...(categoryId ? {'filter.categories': String(categoryId)} : {}),
        ...(searchParams?.q
          ? {'filter.substring': String(searchParams?.q)}
          : {}),
        ...sorting,
      },
      {...requestOptions},
    )

    return {
      page,
      ...response,
    }
  }
}
