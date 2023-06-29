import {Level} from '@xcart/storefront'

export function getMMYPath(levels?: Level[]) {
  if (!levels) {
    return '/'
  }

  let path = ''

  levels.forEach((level: Level) => {
    if (level.name) {
      path += `/${level?.name.replaceAll(' ', '__')}`
    }
  })

  return `/mmy${path}`
}
