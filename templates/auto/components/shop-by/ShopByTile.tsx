'use client'

import {useState} from 'react'
import {MMYLevel} from '@xcart/storefront'
import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import {usePathname, useRouter} from 'next/navigation'
import {Button} from '~/components/elements/Button'
import {Pagination} from '~/components/global/Pagination'
import {ShopByLevelItemSkeleton} from '~/components/global/skeleton/ShopByLevelItemSkeleton'
import {
  allLevelsAtom,
  selectedVehicleAtom,
  shopByLevelInfoAtom,
} from '~/components/mmy/store'
import {tailwindMerge} from '~/helpers'

export function ShopByTile({
  items,
  depth,
  page,
  lastPage,
  searchParams,
  wrapperClasses,
}: {
  items: MMYLevel[]
  depth: number
  page: number
  lastPage: number
  searchParams?: {[key: string]: string | string[] | undefined}
  wrapperClasses?: string
}) {
  const allLevels = useAtomValue(allLevelsAtom)
  const setSelectedVehicle = useSetAtom(selectedVehicleAtom)
  const [levelsInfo, setLevelsInfo] = useAtom(shopByLevelInfoAtom)

  const [isFetching, setIsFetching] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  return (
    <div>
      <ul
        className={tailwindMerge(
          'mx-[-5px] mb-unit-6 flex flex-wrap',
          wrapperClasses,
        )}
      >
        {items.map((item: MMYLevel) => {
          const levelName = item.name?.replaceAll(' ', '__')

          let url = `${pathname}/${levelName}?depth=${depth}&parentId=${item.id}`

          if (depth > allLevels.length) {
            url = `${pathname?.replace('shop-by', 'mmy')}/${levelName}`
          } else if (
            (pathname && pathname.split('/').length - 1 >= depth) ||
            (!pathname?.match('shop-by') && !pathname?.match('mmy'))
          ) {
            url = `/shop-by/${levelName}?depth=${depth}&parentId=${item.id}`
          }

          const clickHandler = () => {
            router.push(url)

            const levelInfo = {name: item.name, id: item.id as number}

            setLevelsInfo([...levelsInfo, levelInfo])

            if (depth > allLevels.length && item.id && item.name) {
              setSelectedVehicle({
                id: item.id,
                name: `${pathname
                  ?.replace('/shop-by/', '')
                  .replaceAll('__', ' ')
                  .split('/')
                  .join(' ')} ${item.name}`,
                depth: depth - 1,
                levels: [
                  ...levelsInfo,
                  {name: item.name, id: item.id as number},
                ],
              })

              setLevelsInfo([])
            }
          }

          return isFetching ? (
            <ShopByLevelItemSkeleton key={item.id} />
          ) : (
            <li
              className="w-1/2 px-unit pb-unit-2 md:w-[25%] min-[800px]:w-[20%] min-[1026px]:w-[12.5%]"
              key={item.id}
            >
              <Button
                variant="secondary"
                className="h-unit-8 w-full overflow-hidden text-ellipsis whitespace-nowrap rounded border border-gray-500 px-unit py-button text-center text-center font-normal no-underline hover:border-primary hover:bg-gray-300 hover:opacity-100 lg:py-button"
                title={item.name}
                onClick={() => clickHandler()}
              >
                {item.name}
              </Button>
            </li>
          )
        })}
      </ul>
      <Pagination
        current={page}
        last={lastPage}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        params={searchParams}
      />
    </div>
  )
}
