import {useId} from 'react'
import {SelectNative} from '~/components/elements/SelectNative'
import {componentOrNull, tailwindMerge} from '~/helpers'

export function LevelSelect({
  level,
  name,
  className,
  labelClasses,
  handleSelectChange,
  isLoading,
  defaultValue,
  disabled,
  isDrawer,
}: {
  level: any[]
  name: string
  className?: string
  labelClasses?: string
  handleSelectChange: (values: any) => void
  isLoading: boolean
  defaultValue?: string
  disabled: boolean
  isDrawer?: boolean
}) {
  const id = useId()
  return (
    <div
      className={tailwindMerge(
        'mb-unit-6 last:mb-0',
        !isDrawer && 'flex-1 pr-0 lg:mb-0 lg:pr-unit-4',
      )}
    >
      <div
        className={tailwindMerge(
          'block text-xs font-medium capitalize text-gray-700',
          labelClasses,
        )}
      >
        {name}
      </div>
      <span className="relative block">
        <SelectNative
          id={id}
          label=""
          options={level}
          onChange={handleSelectChange}
          placeholder={`Select ${name}`}
          disabled={disabled}
          selectOuterClasses={tailwindMerge(
            'min-w-0',
            className,
            disabled ? 'opacity-30 pointer-event-none' : '',
            isDrawer
              ? ''
              : 'bg-invariant-gray-300 text-invariant-dark focus-within:bg-invariant-light',
          )}
          arrowClasses={isDrawer ? '' : 'fill-invariant-dark'}
          defaultValue={defaultValue}
        />
        {componentOrNull(
          isLoading,
          <div className="absolute left-0 top-0 h-full w-full rounded bg-gray-500 opacity-50" />,
        )}
      </span>
    </div>
  )
}
