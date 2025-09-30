import {getInitMMY} from '~/components/mmy/functions/getInitMMY'
import {getStoredSelectedVehicle} from '~/components/mmy/functions/getStoredSelectedVehicle'
import {prepareLevels} from '~/components/mmy/functions/helpers'
import {MMYLevels} from '~/components/mmy/functions/interface'
import {MMYFilter} from '~/components/mmy/MMYFilter/MMYFilter'

async function getMMYlevels() {
  const {levels, rootLevel} = await getInitMMY()

  let levelValues: MMYLevels[] = []

  if (rootLevel && levels && levels.length > 0) {
    levelValues = prepareLevels(levels, rootLevel)
  }

  return levelValues
}

export async function MMYFilterWrapper() {
  const levels = await getMMYlevels()

  return <MMYFilter levels={levels} selected={getStoredSelectedVehicle()} />
}
