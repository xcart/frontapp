import {useState} from 'react'
import {useSetAtom} from 'jotai'
import {ButtonIcon} from '~/components/elements/Button'
import {IconTrash} from '~/components/elements/Icons'
import {Spinner} from '~/components/elements/Spinner'
import {removeGarageItemAtom} from '~/components/mmy/store'

export function DeleteVehicleFromGarage({id}: {id?: number}) {
  const [loading, setLoading] = useState<boolean>(false)
  const updateMyGarage = useSetAtom(removeGarageItemAtom)

  const handleDeleteVehicle = () => {
    if (!id) {
      return false
    }

    setLoading(true)

    updateMyGarage(id).then(() => setLoading(false))
  }

  return (
    <ButtonIcon
      className="bg-gray-300 hover:bg-gray-500 lg:h-unit-12 lg:w-unit-12"
      onClick={handleDeleteVehicle}
    >
      {' '}
      {loading ? (
        <Spinner size="w-[14px] h-[14px] lg:w-[22px] lg:h-[22px]" />
      ) : (
        <IconTrash className="w-[15px] lg:w-[22px]" />
      )}
    </ButtonIcon>
  )
}
