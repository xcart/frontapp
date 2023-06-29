import {render, screen} from '@testing-library/react'
import type {ProductAttribute} from '@xcart/storefront'
import {ProductAttributeSelector} from './ProductAttributeSelector'

type ProductAttributeWithSwatches = Omit<ProductAttribute, 'displayMode'>

const attribute: ProductAttributeWithSwatches & {displayMode: 'S' | 'B' | 'C'} =
  {
    id: 1,
    name: 'Attribute 1',
    type: 'S',
    displayMode: 'S',
    values: [
      {
        id: 1,
        value: '11',
        isDefault: true,
      },
      {
        id: 2,
        value: '12',
        isDefault: false,
      },
    ],
  }

it('ProductAttributeSelector component test', () => {
  render(
    <ProductAttributeSelector
      attribute={attribute}
      sType={
        <select>
          {attribute.values.map(option => {
            return <option key={option.id}>{option.value}</option>
          })}
        </select>
      }
    />,
  )

  expect(screen.getByText('Attribute 1'))
})
