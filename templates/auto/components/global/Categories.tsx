'use client'

import {Category} from '@xcart/storefront'
import {usePathname} from 'next/navigation'
import {Link} from '~/components/navigation/link'
import {tailwindMerge} from '~/helpers'

export interface ICategories {
  categories: Category[]
  rootClasses?: string
  itemClasses?: string
  linkClasses?: string
  handleClick?: () => void
}

export function Categories({
  categories,
  rootClasses,
  itemClasses,
  linkClasses,
  handleClick,
}: ICategories) {
  const pathFull = usePathname()
  const path = pathFull?.replace('/c/', '')

  const activeClasses =
    'text-primary after:content-[""] after:absolute after:-bottom-[16px] after:border after:border-primary after:left-0 after:right-0 after:cursor-default'

  const clickHandler = () => {
    if (handleClick) {
      handleClick()
    }

    return false
  }

  return (
    <ul className={tailwindMerge('flex items-center', rootClasses || '')}>
      {categories?.map(c => (
        <li
          key={c.id}
          className={tailwindMerge(
            'relative whitespace-nowrap px-unit-2',
            itemClasses || '',
          )}
        >
          <Link
            href={`/c/${c.cleanUrl}`}
            className={tailwindMerge(
              'text-gray-700 no-underline hover:text-primary',
              linkClasses || '',
              path === c.cleanUrl || pathFull?.includes(`/${c.cleanUrl}/`)
                ? activeClasses
                : '',
            )}
            onClick={clickHandler}
          >
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
