import {
  ProductAttribute,
  ProductAttributeValue,
  ProductDetailed,
} from '@xcart/storefront'
import _ from 'lodash'
import {extendTailwindMerge} from 'tailwind-merge'
import {SelectedAttributes} from '~/components/product/interface'
import {tailwindMergeConfig} from '~/components/theme/tailwindMergeConfig'

export const validateEmail = (email: string) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )

export const componentOrNull = (
  condition: boolean | undefined | null,
  component: React.ReactNode,
) => {
  return condition ? component : null
}

export function hexToRgb(hex: string = '') {
  // @ts-ignore
  const match = hex.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i)

  if (!match) {
    return [0, 0, 0]
  }

  let colorString = match[0]

  if (match[0].length === 3) {
    colorString = colorString
      .split('')
      .map((char: string) => {
        return char + char
      })
      .join('')
  }

  /* eslint-disable no-bitwise */
  const integer = parseInt(colorString, 16)
  const r = (integer >> 16) & 0xff
  const g = (integer >> 8) & 0xff
  const b = integer & 0xff

  return [r, g, b]
}

export function isDark(color: string = ''): boolean {
  // eslint-disable-next-line no-param-reassign
  color = color.toLowerCase()
  // Equation from http://24ways.org/2010/calculating-color-contrast
  const rgb = hexToRgb(color)
  const res = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  return res < 128
}

export function mapProductAttributesForVariants({
  product,
  selectedAttributes,
  productAttributes,
}: {
  product: ProductDetailed & {
    isVariant?: boolean
    variantId?: number
  }
  selectedAttributes: SelectedAttributes
  productAttributes?: ProductAttribute[]
}) {
  const selectableAttributes = productAttributes?.filter(
    attr => attr.displayAbove,
  )

  /* eslint-disable no-param-reassign */
  if (product?.variants && product?.variants?.length > 0) {
    const outOfStockVariants = product.variants.filter(
      variant => variant.amount === 0,
    )

    const productVariantsAttributes = product.variants.map(variant => {
      return variant.attributes
    })

    const variantAttributesGroups = productVariantsAttributes[0]?.map(
      attribute => attribute.name,
    )

    const attributesByGroup: any[] = []

    selectableAttributes?.forEach(selectableAttribute => {
      if (
        selectableAttribute.values &&
        selectableAttribute.values.length &&
        variantAttributesGroups?.some(name => name === selectableAttribute.name)
      ) {
        attributesByGroup.push(selectableAttribute.values)
      }
    })

    let allPossibleVariants: any[] | undefined

    attributesByGroup.forEach(
      (attrGroup: ProductAttributeValue[], index: number) => {
        allPossibleVariants = attrGroup.reduce(
          (
            attr: ProductAttributeValue[] | undefined,
            attrValue: ProductAttributeValue,
            // eslint-disable-next-line array-callback-return
          ) => {
            if (
              attr &&
              attributesByGroup[index - 1] &&
              attributesByGroup[index - 1].length
            ) {
              const results = attr.concat(
                attributesByGroup[index - 1].map(
                  (value: ProductAttributeValue) => [attrValue].concat(value),
                ),
              )

              if (results && results.length) {
                return results
              }
            }
          },
          [],
        )
      },
    )

    const availAttributesTmp: any[] = []

    productVariantsAttributes.forEach(productVariants => {
      productVariants?.forEach(productVariant => {
        if (
          productVariant.id &&
          selectedAttributes[productVariant.id].value === productVariant.value
        ) {
          allPossibleVariants?.forEach((all, idx) => {
            all.forEach((item: ProductAttributeValue) => {
              if (allPossibleVariants && item.value === productVariant.value) {
                availAttributesTmp.push(allPossibleVariants[idx])
              }
            })
          })
        }
      })
    })

    const availAttributes = _.uniq(availAttributesTmp)

    const variantAttributeValues: any[] = []
    const availAttributeValues: any[] = []

    productVariantsAttributes.forEach(variantAttribute => {
      variantAttributeValues.push(
        variantAttribute?.map((attr: ProductAttributeValue) => attr.value),
      )
    })

    availAttributes.forEach(availAttribute => {
      availAttributeValues.push(
        availAttribute.map(
          (attr: ProductAttributeValue & {unavailable: boolean}) => attr.value,
        ),
      )
    })

    const availProductVariantsAttributes: any[] = []

    availAttributeValues.forEach(availAttributeValue => {
      variantAttributeValues.forEach(variantAttributeValue => {
        const intersect = _.intersectionWith(
          availAttributeValue,
          variantAttributeValue,
          _.isEqual,
        )
        if (intersect.length > 1) {
          availProductVariantsAttributes.push(intersect)
        }
      })
    })

    const unavailProductVariantsAttributes = _.differenceWith(
      availAttributeValues,
      availProductVariantsAttributes,
      _.isEqual,
    )

    const unavailAttributesValues: any[] = []

    if (unavailProductVariantsAttributes.length) {
      Object.keys(selectedAttributes).forEach(key => {
        product.attributes?.forEach(attribute => {
          attribute.values = attribute.values?.map(attributeValue => {
            if (selectedAttributes[key].value === attributeValue.value) {
              unavailProductVariantsAttributes.forEach(attr => {
                const diff = _.differenceWith(
                  attr,
                  [attributeValue.value],
                  _.isEqual,
                )

                if (
                  diff.length === 1 &&
                  diff.toString() !== attributeValue.value
                ) {
                  unavailAttributesValues.push(diff.toString())
                }
              })
            }

            return attributeValue
          })

          return attribute
        })
      })
    }

    productAttributes = product.attributes?.map(attribute => {
      attribute.values = attribute.values?.map(attributeValue => {
        if (outOfStockVariants.length > 0) {
          outOfStockVariants.forEach((variant, index) => {
            variant.attributes?.forEach(variantAttribute => {
              if (
                variantAttribute.id &&
                selectedAttributes[variantAttribute.id].value ===
                  variantAttribute.value
              ) {
                outOfStockVariants[index].attributes?.forEach(
                  outOfStockVariantAttribute => {
                    if (
                      variantAttribute.id &&
                      selectedAttributes[variantAttribute.id].value !==
                        outOfStockVariantAttribute.value &&
                      outOfStockVariantAttribute.value === attributeValue.value
                    ) {
                      attributeValue = {
                        ...attributeValue,
                        ...{outOfStock: true},
                      }
                    }
                  },
                )
              }
            })
          })
        }

        if (unavailAttributesValues.length) {
          if (
            unavailAttributesValues.find(
              value => value === attributeValue.value,
            )
          ) {
            attributeValue = {
              ...attributeValue,
              ...{unavailable: true},
            }
          }
        }

        return attributeValue
      })

      return attribute
    })
  }
  /* eslint-enable */

  return productAttributes
}

/**
 * We should extend class groups via custom suffixes, which are defined in templates/auto/tailwind.config.js
 * https://github.com/dcastil/tailwind-merge/blob/v1.10.0/docs/api-reference.md#extendtailwindmerge
 */
export const tailwindMerge = extendTailwindMerge(tailwindMergeConfig)

export function sortObj(obj: any) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      // @ts-ignore
      acc[key] = obj[key]

      return acc
    }, {})
}
