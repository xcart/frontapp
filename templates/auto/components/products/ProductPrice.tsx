// TODO add real currency
const CURRENCY = 'USD'
const LOCALES = 'en-En'

export function ProductPrice({
  price,
  productPriceClasses,
}: {
  price: number
  productPriceClasses?: string
}) {
  const formatter = new Intl.NumberFormat(LOCALES, {
    style: 'currency',
    currency: CURRENCY,
  })

  return (
    <span className={productPriceClasses} data-testid="ProductPrice">
      {formatter.format(price)}
    </span>
  )
}
