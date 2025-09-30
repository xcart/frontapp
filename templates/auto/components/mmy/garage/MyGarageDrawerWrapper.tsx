import {cookies} from 'next/headers'
import {getInitGarage} from '~/components/mmy/functions/getInitGarage'
import {getInitMMY} from '~/components/mmy/functions/getInitMMY'
import {MyGarageDrawer} from '~/components/mmy/garage/MyGarageDrawer'

function getInitGarageItemsCount() {
  const count = cookies().get('xc-garage')

  return Number(count?.value)
}

export async function MyGarageDrawerWrapper() {
  const {levels, rootLevel} = await getInitMMY()
  const myGarage = await getInitGarage()

  return (
    <MyGarageDrawer
      levels={levels}
      rootLevel={rootLevel || undefined}
      myGarage={myGarage || undefined}
      vehiclesCount={getInitGarageItemsCount()}
    />
  )
}
