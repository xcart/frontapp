import {componentOrNull} from '~/helpers'

export function DrawerTitle({
  children,
  count,
}: {
  children: React.ReactElement | string
  count?: number
}) {
  const itemsCount = count as number

  return (
    <h2>
      {children}
      {componentOrNull(
        itemsCount > 0,
        <span className="font-normal text-gray-700">&nbsp;({count})</span>,
      )}
    </h2>
  )
}
