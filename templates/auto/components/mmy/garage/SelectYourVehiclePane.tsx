import {MakeModelYear} from '~/components/mmy/MMYFilterComponents/MakeModelYear'

export function SelectYourVehiclePane() {
  return (
    <div>
      <p className="mb-unit-8 hidden lg:block">
        Select your vehicle, or find it by VIN, and add it to your garage. Then
        easily find parts & accessories.
      </p>
      <MakeModelYear isDrawer />
    </div>
  )
}
