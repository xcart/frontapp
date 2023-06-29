export function ProductTitle({title, brand}: {title: string; brand?: string}) {
  return (
    <div className="mb-unit-6 lg:mb-unit-8">
      <h1>{title}</h1>
      {brand && <div className="text-sm lg:text-base">{brand}</div>}
    </div>
  )
}
