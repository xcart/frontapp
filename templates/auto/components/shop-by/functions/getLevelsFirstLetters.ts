import {MMYLevel} from '@xcart/storefront'

export function getLevelsFirstLetters(items: MMYLevel[]) {
  return items.map((item: MMYLevel) => item.name?.charAt(0).toUpperCase())
}
