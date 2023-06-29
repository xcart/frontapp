import {componentOrNull, tailwindMerge} from '~/helpers'

export function SecondaryAction({
  children,
  withDelimiter,
  className,
  count,
  handleAction,
  ...props
}: {
  children: React.ReactElement | string
  withDelimiter?: boolean
  className?: string
  count?: number
  handleAction: () => void
}) {
  const itemsCount = count as number

  return (
    <>
      {componentOrNull(
        itemsCount > 0,
        <>
          <button
            className={tailwindMerge('underline', className)}
            onClick={handleAction}
            {...props}
          >
            {children}
          </button>
          {withDelimiter && (
            <span className="ml-unit-2 inline-block h-unit-4 w-[1px] bg-gray-500" />
          )}
        </>,
      )}
    </>
  )
}

export function ClearPaneAction({
  count,
  withDelimiter,
  handleAction,
}: {
  count?: number
  withDelimiter?: boolean
  handleAction: () => void
}) {
  return (
    <SecondaryAction
      count={count}
      handleAction={handleAction}
      withDelimiter={withDelimiter}
    >
      Clear
    </SecondaryAction>
  )
}
