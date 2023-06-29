import {ProductDetailed} from '@xcart/storefront'

export interface UnavailableVariant {
  unavailable: boolean | undefined
  outOfStock: boolean
}

export const useProductDetailsVariant = ({
  product,
  selectedAttributes,
}: {
  product: ProductDetailed
  selectedAttributes: {
    [key: string]: {
      id?: string
      name?: string
      value?: string
    }
  }
}) => {
  let productDetails: ProductDetailed & {
    isVariant?: boolean
    variantId?: number
  } = structuredClone(product)

  let currentVariant: any

  if (productDetails?.variants?.length) {
    productDetails.variants.forEach(variant => {
      const variantAttributesCount = variant?.attributes?.length
      let count = 1

      variant?.attributes?.forEach(item => {
        const {id} = item
        if (id && selectedAttributes[id]?.value === item.value) {
          if (count === variantAttributesCount) {
            currentVariant = variant
          }
          count += 1
        }
      })
    })

    if (currentVariant) {
      const salePrice =
        currentVariant.saleValue || productDetails.saleValue
          ? currentVariant.salePrice
          : 0

      const images = structuredClone(productDetails.images)

      if (currentVariant.image) {
        images?.unshift(currentVariant.image)
      }

      const adjustedProductDetails = {
        amount: currentVariant.amount ? currentVariant.amount : 0,
        sku: currentVariant.sku || productDetails.sku,
        weight: currentVariant.weight ? productDetails.weight : 0,
        discountType:
          currentVariant.discountType || productDetails.discountType,
        price: currentVariant.price || productDetails.price,
        salePrice,
        saleValue: currentVariant.saleValue || productDetails.saleValue,
        images,
      }

      productDetails = {
        ...productDetails,
        ...adjustedProductDetails,
        isVariant: true,
        variantId: currentVariant.id,
      }
    }
  }

  const unavailableVariant: UnavailableVariant = {
    unavailable:
      productDetails?.variants &&
      productDetails?.variants?.length > 0 &&
      !currentVariant,
    outOfStock: productDetails.amount === 0,
  }

  return {
    productDetails,
    unavailableVariant,
  }
}
