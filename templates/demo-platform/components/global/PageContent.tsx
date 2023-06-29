import {tailwindMerge} from '~/helpers'

/**
 * Used for the main content section in page.tsx
 */
export default function PageContent({
  children,
  pageTitle,
  titleDetails,
  hasSubcategories,
  noItems,
  topPadding = true,
  additionalClasses,
}: {
  children: React.ReactNode
  pageTitle?: string
  titleDetails?: string
  hasSubcategories?: boolean
  noItems?: boolean
  topPadding?: boolean
  additionalClasses?: string
}) {
  const topPaddingClass = topPadding ? 'pt-unit-4 lg:pt-unit-8' : ''

  const styles = tailwindMerge(
    'page px-unit-4 pb-unit-12 lg:px-unit-16 lg:pb-unit-16',
    topPaddingClass,
    additionalClasses,
  )

  const pageTitleClasses = tailwindMerge(
    'mb-unit-3 lg:mb-unit-8',
    hasSubcategories ? 'lg:mb-unit-4' : '',
    noItems ? 'mb-unit lg:mb-unit-4' : '',
  )

  return (
    <div className={styles}>
      {pageTitle && (
        <h1 className={pageTitleClasses}>
          <span>{pageTitle}</span>
          {titleDetails && (
            <span className="text-gray-700 font-normal">{titleDetails}</span>
          )}
        </h1>
      )}
      {children}
    </div>
  )
}
