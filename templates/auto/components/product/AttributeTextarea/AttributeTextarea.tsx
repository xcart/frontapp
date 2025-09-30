'use client'

import {useEffect, useState} from 'react'
import {ProductAttributeValue} from '@xcart/storefront'
import {useSetAtom} from 'jotai'
import {useHydrateAtoms} from 'jotai/utils'
import {Textarea} from '~/components/elements/Textarea'
import {attributeTextareaAtom} from '~/components/product/AttributeTextarea/store'

export function AttributeTextarea({
  attributeId,
  attributeName,
  attributeValues,
}: {
  attributeId?: number
  attributeName?: string
  attributeValues: ProductAttributeValue[]
}) {
  const [value, setValue] = useState<string | undefined>(
    attributeValues[0].value,
  )
  const setAttributeTextareaValue = useSetAtom(attributeTextareaAtom)

  useHydrateAtoms([
    [
      attributeTextareaAtom,
      {
        attributeId,
        attributeValueId: attributeValues[0].id,
        attributeValue: attributeValues[0].value,
      },
    ],
  ])

  useEffect(() => {
    setAttributeTextareaValue({
      attributeId,
      attributeValueId: attributeValues[0].id,
      attributeValue: value,
    })
  }, [attributeValues, attributeId, value, setAttributeTextareaValue])

  return (
    <>
      <div className="mb-unit-4 text-sm font-medium transition lg:text-base">
        {attributeName}
      </div>
      <Textarea
        id={`attribute-textarea-${attributeId}`}
        value={value}
        onChange={setValue}
      />
    </>
  )
}
