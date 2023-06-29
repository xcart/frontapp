import {useEffect} from 'react'
import {MMYLevel, MMYLevelsSetupItem} from '@xcart/storefront'
import {useSetAtom} from 'jotai'
import {prepareLevels} from '~/components/mmy/functions/helpers'
import {allLevelsAtom, levelsValuesAtom} from '~/components/mmy/store'

export function useInitMMY(levels: MMYLevelsSetupItem[], rootLevel?: MMYLevel) {
  const setAllLevels = useSetAtom(allLevelsAtom)
  const setLevelsValues = useSetAtom(levelsValuesAtom)

  useEffect(() => {
    if (levels && levels.length > 0) {
      setAllLevels(levels)
    }

    const levelValues = prepareLevels(levels, rootLevel)

    if (levelValues) {
      setLevelsValues(levelValues)
    }
  }, [setAllLevels, levels, rootLevel, setLevelsValues])
}
