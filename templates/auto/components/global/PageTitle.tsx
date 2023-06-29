import React from 'react'
import {tailwindMerge} from '~/helpers'

export function PageTitle({
  title,
  titleDetails,
  hasSubcategories,
  noItems,
  titleAction,
  className,
}: {
  title?: string
  titleDetails?: string
  hasSubcategories?: boolean
  noItems?: boolean
  titleAction?: React.ReactNode
  className?: string
}) {
  const pageTitleClasses = tailwindMerge(
    'mb-unit-3 lg:mb-unit-8',
    hasSubcategories ? 'lg:mb-unit-4' : '',
    noItems ? 'mb-unit lg:mb-unit-4' : '',
    className,
  )

  return !title ? (
    <></>
  ) : (
    <h1 className={pageTitleClasses}>
      <span>{title}</span>
      {titleDetails && (
        <>
          &nbsp;
          <span className="font-normal text-gray-700">{titleDetails}</span>
        </>
      )}
      {titleAction}
    </h1>
  )
}
