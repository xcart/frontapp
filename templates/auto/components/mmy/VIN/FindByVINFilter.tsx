import {FindByVINField} from '~/components/mmy/VIN/FindByVINField'

export function FindByVINFilter({
  setAlert,
}: {
  setAlert: (value: string | null) => void
}) {
  return (
    <FindByVINField
      label="VIN"
      wrapperClasses="flex-col flex w-full lg:flex-row"
      fieldClasses="mr-unit-4 w-full"
      inputClasses="border-invariant-gray-300 bg-invariant-gray-300 focus:bg-invariant-light text-invariant-dark"
      buttonClasses="w-full mt-unit-4 border-invariant-light bg-invariant-light text-invariant-dark whitespace-nowrap lg:w-auto"
      labelClasses="text-invariant-light"
      setAlert={setAlert}
    />
  )
}
