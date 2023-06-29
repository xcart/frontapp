import {ForwardedRef, forwardRef} from 'react'
import {tailwindMerge} from '~/helpers'
import {IconArrowDown} from './Icons'

export type SelectProps = JSX.IntrinsicElements['select'] & {
  label: string
  name?: string
  options: any
  wrapperClasses?: string
  selectClasses?: string
  selectOuterClasses?: string
  labelClasses?: string
  arrowClasses?: string
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
      selectClasses,
      selectOuterClasses,
      labelClasses,
      arrowClasses,
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
        <div
          className={tailwindMerge(
            'relative h-unit-8 w-full min-w-[280px] max-w-full rounded-base border border-gray-300 bg-gray-300 transition focus-within:border-gray-700 focus-within:bg-contrast focus-within:shadow-input focus-within:outline-none lg:h-unit-12',
            selectOuterClasses,
          )}
        >
          <select
            defaultValue={rest.defaultValue}
            name={name}
            onChange={onChange ? e => onChange(e) : () => {}}
            className={tailwindMerge(
              'w-full max-w-full appearance-none bg-transparent py-unit pl-unit-2 pr-unit-7 outline-none lg:h-unit-12 lg:py-unit-3',
              selectClasses,
            )}
            ref={ref}
            {...rest}
          >
            <option value="">{rest.placeholder || 'Select'}</option>
            {options.map((o: any) => {
              return (
                <option
                  value={o.value}
                  key={o.value}
                  data-value={o.id || undefined}
                >
                  {o.name}
                </option>
              )
            })}
          </select>
          <IconArrowDown
            className={tailwindMerge(
              'absolute right-unit-2 top-1/2 -translate-y-1/2',
              arrowClasses,
            )}
          />
        </div>
      </WrappedSelect>
    )
  },
)
