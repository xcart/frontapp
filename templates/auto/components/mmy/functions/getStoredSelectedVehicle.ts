import {cookies} from 'next/headers'

export function getStoredSelectedVehicle() {
  const selectedVehicle = cookies().get('xc-selected-vehicle')

  return selectedVehicle?.value ? JSON.parse(selectedVehicle.value) : {}
}
