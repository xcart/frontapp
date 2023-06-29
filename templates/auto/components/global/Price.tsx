// TODO add real currency
const CURRENCY = 'USD'
const LOCALES = 'en-En'

export function Price({
  price,
  productPriceClasses,
}: {
  price?: number
  productPriceClasses?: string
}) {
  const formatter = new Intl.NumberFormat(LOCALES, {
    style: 'currency',
    currency: CURRENCY,
  })

  if (!price) {
    return null
  }

  return (
    <span className={productPriceClasses} data-testid="ProductPrice">
      {formatter.format(price as number)}
    </span>
  )
}
