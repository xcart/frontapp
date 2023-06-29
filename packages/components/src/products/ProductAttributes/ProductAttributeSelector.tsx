'use client'

import type {ProductAttribute} from '@xcart/storefront'
import clsx from 'clsx'

type ProductAttributeWithSwatches = Omit<ProductAttribute, 'displayMode'>

export interface ProductAttributeBlockClasses {
  attributeNameClasses?: string
  attributeBlockClasses?: string
  attributeNameSingleClasses?: string
  attributeBlockSingleClasses?: string
  showAttributeName?: boolean
}

export function ProductAttributeBox({
  children,
  attributeName,
  attributeNameClasses,
  attributeNameSingleClasses,
  attributeBlockClasses,
  attributeBlockSingleClasses,
  showAttributeName = true,
  isSingle,
}: {
  children: React.ReactNode
  attributeName?: string
  isSingle?: boolean
} & ProductAttributeBlockClasses) {
  const attributeBlockStyles = isSingle
    ? clsx(attributeBlockClasses, attributeBlockSingleClasses)
    : attributeBlockClasses
  const attributeNameStyles = isSingle
    ? clsx(attributeNameClasses, attributeNameSingleClasses)
    : attributeNameClasses

  return (
    <div className={attributeBlockStyles}>
      {showAttributeName && attributeName && (
        <div className={attributeNameStyles}>{attributeName}</div>
      )}
      {children}
    </div>
  )
}

export function ProductAttributeSelector({
  attributesWrapperClasses,
  attribute,
  attributeNameClasses,
  attributeBlockClasses,
  attributeBlockSingleClasses,
  attributeNameSingleClasses,
  showAttributeName,
  sType,
  bType,
  cType,
  textAreaType,
  yesNoType,
}: {
  attributesWrapperClasses?: string
  attribute: ProductAttributeWithSwatches & {displayMode?: 'S' | 'B' | 'C'}
  sType?: React.ReactNode
  bType?: React.ReactNode
  cType?: React.ReactNode
  textAreaType?: React.ReactNode
  yesNoType?: React.ReactNode
} & ProductAttributeBlockClasses) {
  let displayVariant: string | React.ReactNode = attribute.values
    ? attribute.values[0].value
    : null

  if (attribute.type === 'S') {
    if (attribute.values && attribute.values.length > 1) {
      if (attribute.displayMode === 'S' && typeof sType !== undefined) {
        displayVariant = sType
      } else if (attribute.displayMode === 'B' && typeof bType !== undefined) {
        displayVariant = bType
      } else if (attribute.displayMode === 'C' && typeof cType !== undefined) {
        displayVariant = cType
      }
    }
  }

  if (attribute.type === 'T') {
    displayVariant = textAreaType
  }

  if (attribute.type === 'C') {
    displayVariant = yesNoType
  }

  return (
    <div className={attributesWrapperClasses}>
      <ProductAttributeBox
        attributeName={attribute.name}
        showAttributeName={showAttributeName}
        attributeBlockClasses={attributeBlockClasses}
        attributeBlockSingleClasses={attributeBlockSingleClasses}
        attributeNameClasses={attributeNameClasses}
        attributeNameSingleClasses={attributeNameSingleClasses}
        isSingle={attribute.values && attribute.values.length === 1}
        key={attribute.id}
      >
        {displayVariant}
      </ProductAttributeBox>
    </div>
  )
}
