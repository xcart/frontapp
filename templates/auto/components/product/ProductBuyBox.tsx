'use client'

import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {UnavailableVariant, usePrice, usePriceModifier} from '@xcart/components'
import {CartItem, ProductDetailed} from '@xcart/storefront'
import {useAtomValue} from 'jotai'
import {AddToCartButton} from '~/components/cart/AddToCartButton'
import {
  currentProductInCartCount,
  hasSameAttributesByValueId,
} from '~/components/cart/functions/helpers'
import {ProductToAdd} from '~/components/cart/interface'
import {cartAtom} from '~/components/cart/store'
// import {ButtonWithSpinner} from '~/components/elements/Button'
import {DiscountedPrice} from '~/components/product/DiscountedPrice'
import {SelectedAttributes} from '~/components/product/interface'
import {ProductAttributes} from '~/components/product/ProductAttributes'
import {tailwindMerge, mapProductAttributesForVariants} from '~/helpers'

export function ProductBuyBox({
  product,
  selectedAttributes,
  setSelectedAttributes,
  unavailableVariant,
  initCart,
}: {
  product: ProductDetailed & {
    isVariant?: boolean
    variantId?: number
  }
  selectedAttributes: SelectedAttributes
  setSelectedAttributes: Dispatch<SetStateAction<SelectedAttributes>>
  unavailableVariant?: UnavailableVariant
  initCart?: any
}) {
  const [mount, setMount] = useState<boolean>(false)
  const cart = useAtomValue(cartAtom)

  const mobileCLasses =
    'fixed bottom-0 left-0 z-10 w-full bg-contrast py-unit-4 px-unit-4 shadow-[0px_-5px_20px_rgb(70,62,62,0.2)]'
  const desktopClasses =
    'lg:py-0 lg:px-0 lg:mb-unit-12 lg:static lg:shadow-none'

  const productPrice = usePrice({
    basePrice: product.price || 0,
    salePrice: product.salePrice,
  })

  const calculatePriceModifier = usePriceModifier({
    attributes: product.attributes || undefined,
    selectedAttributes,
    productPrice,
  })

  const productAttributes = mapProductAttributesForVariants({
    product,
    selectedAttributes,
    productAttributes: structuredClone(product.attributes),
  })

  const attributesToAdd = Object.keys(selectedAttributes).map(key => {
    return {
      attributeId: Number(key),
      attributeValueId: Number(selectedAttributes[key].id),
      attributeValue: String(selectedAttributes[key].value),
    }
  })

  const productToAddData: ProductToAdd = {
    id: Number(product.id),
    amount: 1,
    attributes: attributesToAdd,
  }

  useEffect(() => {
    setMount(true)
  }, [])

  const renderAddToCartButton = () => {
    const currentCart = mount ? cart : initCart

    const hasEnoughQty = () => {
      let cartQty: number = 0

      currentCart?.items?.forEach((item: CartItem) => {
        if (
          item.productId === productToAddData.id &&
          hasSameAttributesByValueId(
            item.attributes,
            productToAddData.attributes,
          )
        ) {
          cartQty = item.amount || 0
        }
      })

      return productToAddData.amount + cartQty <= (product.amount || 0)
    }

    return (
      <AddToCartButton
        cartId={currentCart?.id}
        amount={currentProductInCartCount(productToAddData, currentCart?.items)}
        productToAdd={productToAddData}
        hasEnoughQty={hasEnoughQty()}
      />
    )
  }

  return (
    <>
      {productAttributes && (
        <ProductAttributes
          attributes={productAttributes}
          setSelectedAttributes={setSelectedAttributes}
          selectedAttributes={selectedAttributes}
          unavailableVariant={unavailableVariant}
        />
      )}
      <div className={tailwindMerge(mobileCLasses, desktopClasses)}>
        <div className="flex items-center lg:flex-col">
          {!unavailableVariant?.unavailable &&
            !unavailableVariant?.outOfStock && (
              <div className="flex w-[120px] items-center pr-unit-4 lg:mb-unit-4 lg:w-full">
                <DiscountedPrice
                  productPrice={product.price}
                  productSalePrice={product.salePrice}
                  productMarketPrice={product.marketPrice}
                  priceModifier={
                    !product.isVariant ? calculatePriceModifier : undefined
                  }
                  wrapperStyles="flex items-center"
                />
              </div>
            )}
          <div className="w-full flex-1">
            {unavailableVariant?.outOfStock ||
            unavailableVariant?.unavailable ? (
              <div className="w-full rounded bg-warning p-button text-center lg:p-button-lg">
                {unavailableVariant.unavailable
                  ? 'This Combination is Not Available'
                  : 'This Combination is Out of Stock'}
              </div>
            ) : (
              renderAddToCartButton()
            )}
          </div>
        </div>
      </div>
    </>
  )
}
