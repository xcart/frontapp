import {GarageDrawerTitle} from '~/components/mmy/garage/GarageDrawerTitle'
import {SelectYourVehiclePane} from '~/components/mmy/garage/SelectYourVehiclePane'

export function SelectYourVehicleView({
  changePage,
}: {
  changePage: (page: string) => void
}) {
  return (
    <div className="w-full min-w-full flex-[1_0_100%]">
      <GarageDrawerTitle
        title="Select Your Vehicle"
        buttonTitle="Find by VIN"
        clickHandler={() => changePage('find_by_vin')}
      />
      <div className="flex flex-col">
        <SelectYourVehiclePane />
      </div>
    </div>
  )
}
