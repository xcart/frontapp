export function GarageDrawerTitle({
  title,
  buttonTitle,
  clickHandler,
}: {
  title: string
  buttonTitle: string
  clickHandler: () => void
}) {
  return (
    <div className="mb-unit-3 flex items-center justify-between">
      <h2>{title}</h2>
      <button
        className="text-sm underline"
        onClick={clickHandler}
        aria-label={buttonTitle}
      >
        {buttonTitle}
      </button>
    </div>
  )
}
