import {FindByVIN} from '~/components/mmy/garage/FindByVIN'
import {GarageDrawerTitle} from '~/components/mmy/garage/GarageDrawerTitle'

export function FindByVINView({
  changePage,
}: {
  changePage: (page: string) => void
}) {
  return (
    <div className="w-full min-w-full flex-[1_0_100%]">
      <GarageDrawerTitle
        title="Find by VIN"
        buttonTitle="Select Your Vehicle"
        clickHandler={() => changePage('select_your_vehicle')}
      />
      <div className="flex flex-col">
        <FindByVIN />
      </div>
    </div>
  )
}
