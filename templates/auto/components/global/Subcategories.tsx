import {Category} from '@xcart/storefront'
import Link from 'next/link'
import {tailwindMerge} from '~/helpers'

export default function Subcategories({
  items,
  categoryCleanUrl,
  currentPath,
}: {
  items: Category[]
  categoryCleanUrl: string
  currentPath?: string
}) {
  const linkClasses =
    'whitespace-nowrap text-gray-700 text-base no-underline block py-unit px-unit-2 mx-unit-2 border-b border-b-2 border-transparent font-medium'
  const linkHoverClasses = 'hover:text-primary hover:border-primary'
  const linkFocusClasses =
    'focus:no-underline focus:text-primary focus:border-primary'
  const linkLgClasses = 'lg:whitespace-normal lg:text-lg'

  return (
    <div className="subcategories -mr-[20px] overflow-x-auto pb-unit-8 [clip-path:inset(0_0_40px_0)] lg:mr-0">
      <ul className="flex">
        {items?.map(c => (
          <li key={c.id}>
            <Link
              href={`/c/${categoryCleanUrl}/${c.cleanUrl}`}
              className={tailwindMerge(
                linkClasses,
                linkHoverClasses,
                linkFocusClasses,
                linkLgClasses,
                `${categoryCleanUrl}/${c.cleanUrl}` === currentPath
                  ? 'border-primary text-primary'
                  : '',
              )}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
