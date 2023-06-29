import {useDrawer} from '~/components/elements/Drawer'
import {FindByVINField} from '~/components/mmy/VIN/FindByVINField'

export function FindByVINDrawer() {
  const {setAlert} = useDrawer()

  return (
    <div>
      <p className="mb-unit-8 hidden lg:block">
        Select your vehicle, or find it by VIN, and add it to your garage. Then
        easily find parts & accessories.
      </p>
      <FindByVINField
        label="Vehicle VIN"
        wrapperClasses="flex-col"
        fieldClasses="mb-unit-6"
        buttonClasses="w-full"
        setAlert={setAlert}
      />
    </div>
  )
}
