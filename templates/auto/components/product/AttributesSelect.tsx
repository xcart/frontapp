'use client'

import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {UnavailableVariant} from '@xcart/components'
import {ProductAttribute} from '@xcart/storefront'
import _ from 'lodash'
import {Select} from '~/components/elements/Select'
import {SelectedAttributes} from '~/components/product/interface'

export function AttributesSelect({
  attribute,
  handleSelectChange,
  unavailableVariant,
}: {
  attribute: ProductAttribute
  handleSelectChange: Dispatch<SetStateAction<SelectedAttributes>>
  unavailableVariant?: UnavailableVariant
}) {
  const defaultAttribute = _.find(attribute.values, 'isDefault')

  const [selectedOption, setSelectedOption] = useState<{
    id?: number
    name?: string
    value?: string
  }>({
    id: defaultAttribute?.id,
    name: defaultAttribute?.value,
    value: defaultAttribute?.value,
  })

  const attributeId = attribute.id

  useEffect(() => {
    if (selectedOption && attributeId) {
      handleSelectChange(attributes => ({
        ...attributes,
        ...{[attributeId]: selectedOption},
      }))
    }
  }, [attributeId, handleSelectChange, selectedOption])

  return (
    <>
      {attribute.values && attribute.values.length > 0 && (
        <Select
          defaultValue={selectedOption?.value || defaultAttribute?.value}
          options={attribute.values}
          handleSelectChange={setSelectedOption}
          disabledOption={
            unavailableVariant?.unavailable || unavailableVariant?.outOfStock
          }
        />
      )}
    </>
  )
}
