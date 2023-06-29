export function ProductCard({
  children,
  productCardClasses,
}: {
  children: React.ReactNode
  productCardClasses?: string
}) {
  return <div className={productCardClasses}>{children}</div>
}
