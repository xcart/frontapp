import {MMYLevelsSetupItem} from '@xcart/storefront'
import {getXCartClient} from '../../../app/client'

export const getInitMMY: any = async () => {
  const client = await getXCartClient()

  const [levels, rootLevel] = await Promise.all([
    await client.mmy.getMMYLevels(),
    await client.mmy.getMMYLevel('1'),
  ])

  const availLevels: MMYLevelsSetupItem[] = []

  levels.levels?.forEach((level: MMYLevelsSetupItem) => {
    if (level.enabled) {
      availLevels.push(level)
    }
  })

  return {
    levels: availLevels,
    rootLevel: rootLevel['hydra:member'],
  }
}
