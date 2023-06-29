import {useAtomValue} from 'jotai'
import {Button} from '~/components/elements/Button'
import {MyGarage} from '~/components/mmy/garage/MyGarage'
import {myGarageItemsAtom} from '~/components/mmy/store'
import {tailwindMerge} from '~/helpers'

export function MyGarageView({
  changePage,
}: {
  changePage: (page: string) => void
}) {
  const vehicles = useAtomValue(myGarageItemsAtom)

  return (
    <div>
      {vehicles?.length ? (
        <MyGarage />
      ) : (
        <p>Store vehicles in your garage. Easily find parts & accessories.</p>
      )}
      <Button
        variant="secondary"
        className={tailwindMerge(
          'w-full',
          vehicles?.length ? 'mt-unit-6' : 'mt-unit-4',
        )}
        buttonTitle="Add Vehicle"
        onClick={() => changePage('select_your_vehicle')}
      />
    </div>
  )
}
