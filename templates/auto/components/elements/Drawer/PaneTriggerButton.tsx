import {Badge} from '~/components/elements/Badge'
import {ButtonIcon} from '~/components/elements/Button'

export function PaneTriggerButton({
  children,
  count,
  ariaLabel,
  ...props
}: {
  children: React.ReactElement
  count: number
  ariaLabel: string
}) {
  return (
    <ButtonIcon
      {...props}
      className="relative ml-unit-3 h-unit-6 w-unit-6"
      aria-label={ariaLabel}
    >
      {children}
      {count > 0 && <Badge>{count}</Badge>}
    </ButtonIcon>
  )
}
