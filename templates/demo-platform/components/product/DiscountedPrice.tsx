import {usePrice} from '@xcart/components'
import {Price} from '~/components/global/Price'
import {tailwindMerge, componentOrNull} from '~/helpers'

export function DiscountedPrice({
  productPrice,
  productMarketPrice,
  productSalePrice,
  priceModifier,
  wrapperStyles,
  baseStyles,
  saleStyles,
}: {
  productPrice?: number | null
  productMarketPrice?: number
  productSalePrice?: number
  priceModifier?: number
  wrapperStyles?: string
  baseStyles?: string
  saleStyles?: string
}) {
  const basePrice: number = productPrice || 0
  const marketPrice: number =
    productMarketPrice && productMarketPrice > 0
      ? productMarketPrice
      : basePrice
  let discountedPrice: number = usePrice({
    basePrice,
    salePrice: productSalePrice,
  })

  if (priceModifier) {
    discountedPrice += priceModifier
  }

  return (
    <div className={wrapperStyles}>
      {discountedPrice && (
        <Price
          price={discountedPrice}
          productPriceClasses={tailwindMerge(
            'font-bold lg:text-2xl lg:leading-h1',
            baseStyles,
          )}
        />
      )}
      {componentOrNull(
        productSalePrice !== undefined &&
          productSalePrice > 0 &&
          productSalePrice < basePrice,
        <>
          &nbsp;
          <Price
            price={marketPrice}
            productPriceClasses={tailwindMerge(
              'font-medium text-xs lg:text-sm text-gray-700 line-through',
              saleStyles,
            )}
          />
        </>,
      )}
    </div>
  )
}
