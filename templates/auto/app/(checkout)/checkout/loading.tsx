import {IconSecureCheckout} from '~/components/elements/Icons'

export default function Loading() {
  return (
    <div className="relative flex flex-col gap-unit-3 md:gap-unit-8">
      <div className="flex flex-col gap-unit-8 md:flex-row md:justify-between md:gap-0">
        <div className="flex flex-row items-center gap-unit-4 md:order-2">
          <div className="skeleton skeleton-row mb-0 w-unit-20" />
          <div className="skeleton skeleton-row mb-0 w-unit-20" />
          <div className="skeleton skeleton-row mb-0 w-unit-20" />
        </div>
        <div className="flex flex-row items-center gap-unit md:order-1">
          <IconSecureCheckout />
          <h1 className="whitespace-nowrap">Secure Checkout</h1>
        </div>
      </div>
      <div className="flex flex-col gap-unit-8 lg:flex-row">
        <section className="w-full lg:w-2/3">
          <div className="mb-unit-4">
            <div className="skeleton skeleton-row mb-0 h-unit-6 w-unit-20 lg:h-unit-8" />
          </div>
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
        <section className="-mx-[41px] mb-[120px] mt-0 h-full rounded border border-gray-500 p-unit-8 lg:mx-0 lg:w-1/3">
          <div className="flex w-full flex-col gap-unit">
            {[...Array(8)].map((_item, index) => {
              const key = `item-${index}`
              return (
                <div
                  key={key}
                  className="skeleton skeleton-row mb-unit-8 w-full"
                />
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
