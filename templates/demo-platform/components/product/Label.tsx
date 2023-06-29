import {componentOrNull} from '~/helpers'

export function Label({
  productPrice,
  productSalePrice,
}: {
  productPrice?: number
  productSalePrice?: number
}) {
  const hasSaleLabel =
    productSalePrice && productPrice ? productSalePrice < productPrice : false

  return (
    <>
      {componentOrNull(
        hasSaleLabel,
        <div className="text-xs font-medium uppercase text-error lg:text-sm">
          sale
        </div>,
      )}
    </>
  )
}
