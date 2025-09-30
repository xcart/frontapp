'use client'

import {useState} from 'react'
import {Brand} from '@xcart/storefront'
import Image from 'next/image'
import {IconImagePlaceholder} from '~/components/elements/Icons'
import {Pagination} from '~/components/global/Pagination'
import {BrandItemSkeleton} from '~/components/global/skeleton/BrandItemSkeleton'
import {Link} from '~/components/navigation/link'
import {tailwindMerge} from '~/helpers'

export function BrandsTile({
  items,
  page,
  lastPage,
  searchParams,
  wrapperClasses,
}: {
  items?: Brand[]
  page: number
  lastPage: number
  searchParams?: {[key: string]: string | string[] | undefined}
  wrapperClasses?: string
}) {
  const [isFetching, setIsFetching] = useState(false)

  if (!items) {
    return <div>No items found</div>
  }

  return (
    <div>
      <div
        className={tailwindMerge(
          'mx-[-10px] flex flex-wrap lg:mx-[-20px]',
          wrapperClasses,
        )}
      >
        {items.map((item: Brand) => {
          return isFetching ? (
            <BrandItemSkeleton key={item.id} />
          ) : (
            <div
              className="mb-unit-4 flex w-[110px] flex-col items-center px-unit-2 lg:mb-unit-8 lg:w-[130px] lg:px-unit-4"
              key={item.id}
            >
              <div
                className={tailwindMerge(
                  'relative overflow-hidden rounded bg-gray-300',
                  !item.logo?.url ? 'p-[50%]' : '',
                )}
              >
                {item.logo?.url ? (
                  <Image
                    src={item.logo?.url}
                    alt={item.name || ''}
                    width={90}
                    height={90}
                  />
                ) : (
                  <IconImagePlaceholder className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
                {item && item.cleanUrl && (
                  <Link
                    href={`/brands/${item.cleanUrl}`}
                    className="absolute bottom-0 left-0 right-0 top-0"
                    aria-label={item.name || ''}
                  />
                )}
              </div>
              {item && item.cleanUrl ? (
                <Link
                  href={`/brands/${item.cleanUrl}`}
                  className="mt-unit-2 text-center text-sm no-underline hover:underline"
                >
                  {item.name}
                </Link>
              ) : (
                <div className="mt-unit-2 text-center text-sm">{item.name}</div>
              )}
            </div>
          )
        })}
      </div>
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
