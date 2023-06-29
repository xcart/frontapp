import {useState} from 'react'
import {useSetAtom} from 'jotai'
import {useRouter, useSearchParams} from 'next/navigation'
import {Button} from '~/components/elements/Button'
import {Input} from '~/components/elements/Input'
import {getMMYPath} from '~/components/mmy/functions/getMMYPath'
import {getUpdatedSearchParams} from '~/components/mmy/functions/getUpdatedSearchParams'
import {prepareGarageItem} from '~/components/mmy/functions/helpers'
import {getVehicleByVIN} from '~/components/mmy/functions/mmyActions'
import {
  addVehicleAtom,
  drawerCurrentViewAtom,
  selectedVehicleAtom,
} from '~/components/mmy/store'
import {validateVIN} from '~/components/mmy/VIN/helpers'

export function FindByVINField({
  label,
  wrapperClasses,
  fieldClasses,
  labelClasses,
  inputClasses,
  buttonClasses,
  setAlert,
}: {
  label?: string
  wrapperClasses?: string
  fieldClasses?: string
  labelClasses?: string
  inputClasses?: string
  buttonClasses?: string
  setAlert: (value: string | null) => void
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [value, setValue] = useState<string>('')
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()

  const setCurrentView = useSetAtom(drawerCurrentViewAtom)
  const addVehicle = useSetAtom(addVehicleAtom)
  const setSelectedVehicle = useSetAtom(selectedVehicleAtom)

  const handleClick = async () => {
    const validate = validateVIN(value)

    if (validate.error) {
      setError(validate.error)

      return false
    }

    setAlert(null)

    if (value.length > 0) {
      setIsFetching(true)

      const response = await getVehicleByVIN(value)

      if (response.error) {
        setAlert(response.error)
      }

      if (response.vehicle) {
        const preparedVehicle = prepareGarageItem({
          id: Number(response.vehicle?.levels?.at(-1)?.id),
          name: response.vehicle.name,
          depth: response.vehicle?.levels?.length,
          levels: response.vehicle?.levels,
        })

        addVehicle(preparedVehicle, true).then(() => {
          setSelectedVehicle(preparedVehicle)
          setCurrentView('my_garage')
          setValue('')
        })

        const newSearchParams = getUpdatedSearchParams(searchParams, 'mmy')

        const url = getMMYPath(response.vehicle?.levels)

        router.push(`${url}?${newSearchParams.toString()}`)
      }

      setIsFetching(false)
    }
  }

  return (
    <ul className={wrapperClasses}>
      <li className={fieldClasses}>
        <Input
          label={label}
          labelClasses={labelClasses}
          inputClasses={inputClasses}
          placeholder="Enter here"
          onChange={event => {
            setValue(event.target.value)
            setError(undefined)
          }}
          value={value}
          disabled={isFetching}
          error={error !== undefined && error?.length > 0}
          errorText={error}
        />
      </li>
      <li>
        <Button
          className={buttonClasses}
          buttonTitle="Find Vehicle"
          onClick={handleClick}
          disabled={isFetching}
        />
      </li>
    </ul>
  )
}
