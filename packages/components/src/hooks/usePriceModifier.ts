import {ProductAttribute} from '@xcart/storefront'

export const usePriceModifier = ({
  attributes,
  selectedAttributes,
  productPrice,
}: {
  attributes?: ProductAttribute[]
  selectedAttributes: any
  productPrice: number
}) => {
  if (selectedAttributes && attributes) {
    let adjustedModifier: number = 0
    // eslint-disable-next-line array-callback-return
    Object.keys(selectedAttributes).filter(item => {
      const attribute = attributes.find(attr => attr.id === parseInt(item, 10))

      const attributeValue = attribute?.values?.find(
        value =>
          value.id === parseInt(selectedAttributes[item]?.id as string, 10),
      )

      const attributeValuePriceModifier = attributeValue?.priceModifier || 0

      if (attributeValue?.priceModifier && attributeValuePriceModifier !== 0) {
        if (attributeValue?.priceModifierType === 'p') {
          adjustedModifier += (productPrice / 100) * attributeValuePriceModifier
        } else {
          adjustedModifier += attributeValuePriceModifier
        }
      }
    })

    return adjustedModifier
  }

  return 0
}
