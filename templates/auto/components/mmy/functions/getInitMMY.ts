import {MMYLevelsSetupItem} from '@xcart/storefront'
import {client} from 'utils/unauthenticated-client'
import {getMMYLevelsByPage} from '~/components/mmy/functions/getMMYLevelsByPage'

export const getInitMMY = async () => {
  const [levels, rootLevel] = await Promise.all([
    await client.mmy.getMMYLevels(),
    await getMMYLevelsByPage({client, depth: '1'}),
  ])

  const availLevels: MMYLevelsSetupItem[] = []

  levels.levels?.forEach((level: MMYLevelsSetupItem) => {
    if (level.enabled) {
      availLevels.push(level)
    }
  })

  return {
    levels: availLevels,
    rootLevel,
  }
}
