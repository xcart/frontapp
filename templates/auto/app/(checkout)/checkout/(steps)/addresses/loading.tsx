export default function Loading() {
  return (
    <section>
      <h2 className="pb-unit-3">Shipping</h2>
      <div className="flex flex-col gap-unit-6 lg:flex-row lg:gap-unit-8">
        <div className="flex w-full flex-col gap-unit-6 lg:w-1/2">
          {[...Array(4)].map((_item, index) => {
            const key = `item-${index}`
            return (
              <div className="flex min-w-full" key={key}>
                <div className="flex w-full flex-col gap-unit">
                  <div className="skeleton skeleton-row mb-0 h-unit-3 w-unit-20" />
                  <div className="skeleton skeleton-row mb-0 h-unit-8 w-full lg:h-unit-12" />
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex w-full flex-col gap-unit-6 lg:w-1/2">
          {[...Array(5)].map((_item, index) => {
            const key = `item-${index}`
            return (
              <div className="flex min-w-full" key={key}>
                <div className="flex w-full flex-col gap-unit">
                  <div className="skeleton skeleton-row mb-0 h-unit-3 w-unit-20" />
                  <div className="skeleton skeleton-row mb-0 h-unit-8 w-full lg:h-unit-12" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
