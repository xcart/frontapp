import React from 'react'
import {PageTitle} from '~/components/global/PageTitle'
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

  return (
    <div className={styles}>
      <PageTitle
        title={pageTitle}
        titleDetails={titleDetails}
        hasSubcategories={hasSubcategories}
        noItems={noItems}
      />
      {children}
    </div>
  )
}
