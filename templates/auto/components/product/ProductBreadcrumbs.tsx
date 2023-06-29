import Link from 'next/link'

export function ProductBreadcrumbs({
  items,
}: {
  items: {
    id?: number
    name?: string
    cleanUrl?: string
  }[]
}) {
  return (
    <div className="mb-unit-2">
      {items.map((item, index) => {
        const prev = index - 1 >= 0 ? `${items[index - 1].cleanUrl}/` : ''

        return (
          <span className="text-gray-700 text-xs lg:text-sm" key={item.id}>
            {item.cleanUrl ? (
              <Link href={`/c/${prev}${item.cleanUrl}`}>{item.name}</Link>
            ) : (
              item.name
            )}
            {index < items.length - 1 ? (
              <span className="w-unit-4 text-center inline-block">|</span>
            ) : null}
          </span>
        )
      })}
    </div>
  )
}
