export const usePrice = ({
  basePrice,
  salePrice,
}: {
  basePrice: number
  salePrice?: number
}): number => {
  return salePrice && salePrice > 0 ? salePrice : basePrice
}
