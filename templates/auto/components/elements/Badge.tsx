import {tailwindMerge} from '~/helpers'

export function Badge({
  children,
  className,
}: {
  children: React.ReactElement | number | string
  className?: string
}) {
  const badgeClasses = tailwindMerge(
    'absolute bottom-0 right-0 flex h-unit-3 min-w-unit-3 px-[2px] items-center justify-center rounded-full border border-contrast bg-primary text-3xs font-semibold text-contrast leading-[15px]',
    className,
  )
  return <span className={badgeClasses}>{children}</span>
}
