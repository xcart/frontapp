import {Category} from '@xcart/storefront'
import Image from 'next/image'
import Link from 'next/link'
import {getXCartClient} from 'app/client'
import {tailwindMerge} from '~/helpers'

async function fetchSubcategories() {
  const client = await getXCartClient()

  const rootCategories = await client.getRootCategories({})
  const categories: Category[] = []

  rootCategories.filter(cat => {
    return categories.push({id: cat.id, cleanUrl: cat.cleanUrl})
  })

  let request = null
  const subcatIds = [11, 3, 4, 6, 8]
  const subcategories: Category[] = []

  /* eslint-disable no-restricted-syntax, no-await-in-loop, @typescript-eslint/no-loop-func */
  for (const cat of categories) {
    if (cat) {
      request = client.getSubcategories(cat.id as number)

      await request.then(data => {
        data.map(item => {
          if (item.id && subcatIds.includes(item.id)) {
            const category = {...item, parentUrl: cat.cleanUrl}
            subcategories.push(category)
          }

          return false
        })
      })
    }
  }

  return subcatIds.map(id => {
    return subcategories.find(item => item.id === id)
  })
}

function Tile({
  item,
  index,
}: {
  item: {
    parentUrl?: string
  } & Category
  index: number
}) {
  let styles

  switch (index) {
    case 0:
      styles = 'md:col-span-4 md:row-start-1 md:row-end-2'
      break

    case 1:
      styles = 'md:col-span-3 md:row-start-1 md:row-end-2'
      break

    case 2:
      styles = 'md:col-span-3 md:row-start-2 md:row-end-3'
      break

    case 3:
      styles = 'md:col-span-4 md:row-start-2 md:row-end-3'
      break

    case 4:
      styles = 'md:col-span-5 md:row-start-1 md:row-end-3'
      break

    default:
      styles = ''
  }

  return (
    <div
      className={tailwindMerge(
        'group relative flex justify-end overflow-hidden bg-warning pt-[42.858%]', // Have to use magic percent number to get 240px height on large desktop
        styles,
      )}
    >
      <Link
        href={`/c/${item.parentUrl}/${item.cleanUrl}`}
        className="absolute top-0 left-0 z-10 block h-full w-full overflow-hidden"
        aria-label={item.name}
      />
      {item.icon?.url && (
        <Image
          src={item.icon?.url as string}
          alt={item.icon?.alt as string}
          width={710}
          height={520}
          sizes={
            index === 4
              ? '(min-width: 768px) 33vw, 100vw'
              : '(min-width: 768px) 18vw, 100vw'
          }
          className="absolute top-0 right-0 h-full w-auto max-w-none transition-transform duration-[450ms] group-hover:translate-x-[-4%] group-hover:scale-110"
        />
      )}
      <h3 className="absolute bottom-unit-4 left-unit-4 text-invariant-dark xl:bottom-unit-6 xl:left-unit-6">
        {item.name}
      </h3>
    </div>
  )
}

export async function SubcategoriesTiles() {
  const subcategories = await fetchSubcategories()

  return (
    <div className="mb-unit-13 grid gap-unit-4 md:grid-cols-12 md:grid-rows-2 lg:mb-unit-16 xl:gap-unit-8">
      {subcategories.map((item, index) => {
        if (!item) {
          return false
        }

        const key = `item-${index}`
        return <Tile item={item} index={index} key={key} />
      })}
    </div>
  )
}
