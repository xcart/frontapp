import {useAtom, useAtomValue} from 'jotai'
import {useRouter, useSearchParams} from 'next/navigation'
import {useDrawer} from '~/components/elements/Drawer'
import {IconCar, IconCheckMark} from '~/components/elements/Icons'
import {getMMYPath} from '~/components/mmy/functions/getMMYPath'
import {getUpdatedSearchParams} from '~/components/mmy/functions/getUpdatedSearchParams'
import {GarageItem} from '~/components/mmy/functions/interface'
import {DeleteVehicleFromGarage} from '~/components/mmy/garage/DeleteVehicleFromGarage'
import {myGarageItemsAtom, selectedVehicleAtom} from '~/components/mmy/store'

export function MyGarage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const {setOpen} = useDrawer()

  const [selectedVehicle, setSelectedVehicle] = useAtom(selectedVehicleAtom)
  const vehicles = useAtomValue(myGarageItemsAtom)

  const handleClick = (vehicle: GarageItem) => {
    setSelectedVehicle(vehicle)

    const newSearchParams = getUpdatedSearchParams(searchParams, 'mmy')

    const url = getMMYPath(vehicle.levels)

    router.push(`${url}?${newSearchParams.toString()}`)

    return setOpen(false)
  }

  return (
    <ul>
      {vehicles?.map((vehicle: GarageItem) => {
        return (
          <li
            className="mb-unit-4 flex items-center last:mb-0 lg:mb-unit-3"
            key={vehicle.id}
          >
            <div className="flex w-[calc(100%_-_40px)] items-start pr-unit-4 lg:w-[calc(100%_-_60px)]">
              <div className="pr-unit-2 pt-[3px] lg:pt-[7px]">
                {selectedVehicle.id === vehicle.id ? (
                  <div className="flex h-unit-4 w-unit-4 items-center justify-center rounded-sm border border-gray-700 bg-primary">
                    <IconCheckMark className="fill-contrast" />
                  </div>
                ) : (
                  <IconCar className="mr-[2px] w-[18px]" />
                )}
              </div>
              <button
                className="text-left text-sm font-medium hover:underline lg:text-base"
                onClick={() => handleClick(vehicle)}
              >
                {vehicle.name}
              </button>
            </div>
            <DeleteVehicleFromGarage id={vehicle?.id} />
          </li>
        )
      })}
    </ul>
  )
}
