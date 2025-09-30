import {Dispatch, SetStateAction, useState} from 'react'
import {ProductAttribute} from '@xcart/storefront'
import _ from 'lodash'
import {Checkbox} from '~/components/elements/Checkbox'
import {SelectedAttributes} from '~/components/product/interface'

export function AttributeCheckbox({
  attribute,
  handleAttributeChange,
}: {
  attribute: ProductAttribute
  handleAttributeChange: Dispatch<SetStateAction<SelectedAttributes>>
}) {
  const defaultAttribute = _.find(attribute.values, 'isDefault')

  const [value, setValue] = useState<boolean>(
    defaultAttribute?.value === 'Yes' || false,
  )

  const handleChange = (val: string | boolean) => {
    setValue(val as boolean)

    const stringValue = val ? 'Yes' : 'No'

    handleAttributeChange((selectedAttributes: SelectedAttributes) => {
      const selectedAttributeValues = _.find(attribute.values, {
        value: stringValue,
      })

      return {
        ...selectedAttributes,
        ...{
          [`${attribute.id}`]: {
            id: String(selectedAttributeValues?.id),
            name: selectedAttributeValues?.value,
            value: selectedAttributeValues?.value,
            type: 'C',
          },
        },
      }
    })
  }

  return (
    <Checkbox
      label={attribute.name as string}
      checked={value}
      onChange={v => handleChange(v)}
    />
  )
}
