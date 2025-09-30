import {tailwindMerge} from '~/helpers'

export function Textarea({
  id,
  value,
  className,
  onChange,
}: {
  id?: string
  value?: string
  className?: string
  onChange: (val: string) => void
}) {
  const defaultTextareaStyles =
    'border border-gray-300 rounded-base resize transition px-unit-2 py-unit bg-gray-300 invalid:border-error invalid:bg-error-alert autofill:bg-gray-300'
  const responsiveStyles = 'lg:py-unit-3'
  const focusedStyles =
    'focus:outline-none focus:bg-contrast focus:border-gray-700 focus:shadow-input'
  const disabledStyles = 'disabled:opacity-20 disabled:pointer-events-none'

  return (
    <textarea
      className={tailwindMerge(
        defaultTextareaStyles,
        responsiveStyles,
        focusedStyles,
        disabledStyles,
        className,
      )}
      id={id}
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  )
}
