import {Dispatch, SetStateAction} from 'react'
import {ProductAttributeSelector, UnavailableVariant} from '@xcart/components'
import type {ProductAttribute} from '@xcart/storefront'
import {AttributeCheckbox} from '~/components/product/AttributeCheckbox'
import {AttributesBlocks} from '~/components/product/AttributesBlocks'
import {AttributesSelect} from '~/components/product/AttributesSelect'
import {AttributeTextarea} from '~/components/product/AttributeTextarea/AttributeTextarea'
import {SelectedAttributes} from '~/components/product/interface'

export function ProductAttributes({
  selectedAttributes,
  setSelectedAttributes,
  attributes,
  unavailableVariant,
}: {
  selectedAttributes: any
  setSelectedAttributes: Dispatch<SetStateAction<SelectedAttributes>>
  attributes: ProductAttribute[]
  unavailableVariant?: UnavailableVariant
}) {
  return (
    <>
      {attributes.map(attribute => {
        return (
          attribute.displayAbove &&
          attribute.values &&
          attribute.values.length > 0 && (
            <ProductAttributeSelector
              attributesWrapperClasses="mb-unit-6"
              attribute={attribute}
              showAttributeName={false}
              sType={
                <AttributesSelect
                  attribute={attribute}
                  handleSelectChange={setSelectedAttributes}
                  data-id={attribute.id}
                  unavailableVariant={unavailableVariant}
                />
              }
              bType={
                <AttributesBlocks
                  attributeId={attribute.id}
                  selectedAttributes={selectedAttributes}
                  attributesValues={attribute.values}
                  attributeName={attribute.name}
                  handleSelectAttibute={setSelectedAttributes}
                  unavailableVariant={unavailableVariant}
                />
              }
              cType={
                <AttributesBlocks
                  attributeId={attribute.id}
                  selectedAttributes={selectedAttributes}
                  attributesValues={attribute.values}
                  attributeName={attribute.name}
                  handleSelectAttibute={setSelectedAttributes}
                  unavailableVariant={unavailableVariant}
                  colorSwatches
                />
              }
              textAreaType={
                <AttributeTextarea
                  attributeId={attribute.id}
                  attributeValues={attribute.values}
                  attributeName={attribute.name}
                />
              }
              yesNoType={
                <AttributeCheckbox
                  attribute={attribute}
                  handleAttributeChange={setSelectedAttributes}
                />
              }
              key={attribute.id}
            />
          )
        )
      })}
    </>
  )
}
