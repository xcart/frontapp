import {Garage, MMYLevel, MMYLevelsSetupItem, Vehicle} from '@xcart/storefront'
import {GarageItem} from '~/components/mmy/functions/interface'

export const prepareGarageItem = ({id, name, depth, levels}: GarageItem) => {
  return {
    id,
    name,
    depth,
    levels,
  }
}

export const updatedGarage = (garage: Garage) => {
  if (!garage?.vehicles) {
    return false
  }

  return garage.vehicles.map((item: Vehicle) => {
    return prepareGarageItem({
      id: item.levels ? Number(item.levels.at(-1)?.id) : undefined,
      name: item.name,
      depth: item.levels?.length,
      levels: item.levels,
    })
  })
}

export const prepareLevels = (
  levels: MMYLevelsSetupItem[],
  rootLevel?: MMYLevel,
) => {
  let levelValues: any[] = []

  if (rootLevel && levels && levels.length > 0) {
    const {name} = levels[0]

    levels?.forEach((level: MMYLevel) => {
      if (name && level.name) {
        levelValues =
          level.name === name
            ? [...levelValues, ...[{[name]: rootLevel}]]
            : [...levelValues, ...[{[level.name]: []}]]
      }
    })
  }

  return levelValues
}
