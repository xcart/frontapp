export default function Loading() {
  return (
    <section>
      <h2 className="pb-unit-3">Payment Method</h2>
      <div className="mb-unit-8 flex flex-col gap-unit-3">
        {[...Array(3)].map((_item, index) => {
          const key = `item-${index}`
          return (
            <div className="flex min-w-full" key={key}>
              <div className="skeleton mr-unit-2 h-unit-4 w-unit-4 rounded-full" />
              <div className="flex flex-col gap-unit w-full">
                <div className="skeleton skeleton-row mb-0 h-unit-6 w-[120px]" />
                <div className="skeleton skeleton-row mb-0 h-unit-4 w-full lg:w-[300px]" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
