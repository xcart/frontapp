import {IconArrowDown} from '~/components/elements/Icons'

export function BackToView({
  label,
  setView,
}: {
  label: string
  setView: () => void
}) {
  return (
    <button
      onClick={setView}
      className="flex items-center text-base font-normal outline-none"
      aria-label={label}
    >
      <span className="w-unit-4">
        <IconArrowDown className="rotate-90 fill-gray-700" />
      </span>
      <span className="pl-unit text-gray-700 underline">{label}</span>
    </button>
  )
}
