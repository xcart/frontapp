export function BrandItemSkeleton() {
  return (
    <div className="mb-unit-8 flex w-[130px] flex-col items-center px-unit-2 lg:px-unit-4">
      <div className="skeleton relative w-full overflow-hidden rounded bg-gray-300 pt-[65%]" />
      <div className="skeleton mt-unit-2 h-unit-4 w-full rounded text-center text-sm" />
    </div>
  )
}
