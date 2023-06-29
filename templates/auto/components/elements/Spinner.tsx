import {tailwindMerge} from '~/helpers'

export function Spinner({
  size = 'h-[22px] w-[22px]',
  wrapperClasses,
  spinnerClasses,
}: {
  size?: string
  wrapperClasses?: string
  spinnerClasses?: string
}) {
  return (
    <div className={tailwindMerge('relative', size, wrapperClasses)}>
      <div
        className={tailwindMerge(
          'absolute top-1/2 left-1/2 -mt-[50%] -ml-[50%] animate-rotate360 rounded-full border-2 border-primary border-r-transparent',
          size,
          spinnerClasses,
        )}
      />
    </div>
  )
}
