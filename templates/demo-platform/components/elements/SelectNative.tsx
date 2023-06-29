import {ForwardedRef, forwardRef} from 'react'
import {tailwindMerge} from '~/helpers'
import {IconArrowDown} from './Icons'

export type SelectProps = JSX.IntrinsicElements['select'] & {
  label: string
  name?: string
  options: Array<{name: string; value: string | number}>
  wrapperClasses?: string
  labelClasses?: string
}

export function WrappedSelect({
  wrapper: Component = 'div',
  className,
  children,
}: {
  wrapper?: React.ElementType
  className?: string
  children: React.ReactNode
}) {
  return <Component className={className}>{children}</Component>
}

export const SelectNative = forwardRef(
  (
    {
      label,
      name,
      options,
      onChange,
      wrapperClasses,
      labelClasses,
      ...rest
    }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    const labelStyles = tailwindMerge(
      'text-xs text-gray-700 font-medium absolute top-0 left-0',
      labelClasses,
    )

    const wrapperStyles = label
      ? tailwindMerge('flex flex-col pt-unit-4 relative', wrapperClasses)
      : wrapperClasses

    return (
      <WrappedSelect className={wrapperStyles}>
        <span className={labelStyles}>{label}</span>
        <div className="relative h-unit-8 w-full min-w-[280px] max-w-full rounded-base border border-gray-300 bg-gray-300 px-unit-2 py-unit transition focus-within:border-gray-700 focus-within:bg-contrast focus-within:shadow-input focus-within:outline-none lg:h-unit-12 lg:py-unit-3">
          <select
            name={name}
            onChange={onChange || (() => {})}
            className="w-full max-w-full appearance-none bg-transparent outline-none"
            ref={ref}
            {...rest}
          >
            <option value="">Select</option>
            {options.map(o => {
              return (
                <option value={o.value} key={o.value}>
                  {o.name}
                </option>
              )
            })}
          </select>
          <IconArrowDown className="absolute right-unit-2 top-1/2 -translate-y-1/2" />
        </div>
      </WrappedSelect>
    )
  },
)
