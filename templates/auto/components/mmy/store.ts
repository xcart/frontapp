import {Level, MMYLevel, MMYLevelsSetupItem} from '@xcart/storefront'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import Cookies from 'js-cookie'
import {updatedGarage} from '~/components/mmy/functions/helpers'
import {
  GarageItem,
  MMYLevels,
  SelectedMMYLevel,
} from '~/components/mmy/functions/interface'
import {
  addVehicle,
  clearGarage,
  getGarageVehicles,
  getMMYLevel,
  mergeGarage,
  removeVehicle,
} from '~/components/mmy/functions/mmyActions'
import {getClient} from '../../lib/getClient'

export const allLevelsAtom = atom<MMYLevelsSetupItem[]>([]) // All level names, eg. Make, Model, Year, etc.
export const drawerCurrentViewAtom = atom<string>('my_garage')
export const levelsValuesAtom = atom<MMYLevels[]>([])
export const selectedVehicleLevelAtom = atom<SelectedMMYLevel>({})
export const selectedVehicleValuesAtom = atom<GarageItem>({})
export const isLoadingLevelAtom = atom<boolean>(false)
export const enableMMYButtonAtom = atom<boolean>(false)
export const myGarageItemsAtom = atomWithStorage<GarageItem[]>('xc-garage', []) // My Garage items
export const shopByLevelInfoAtom = atom<Level[]>([])

export const selectedLevelsValues = atom(
  get => get(levelsValuesAtom),
  async (
    get,
    set,
    newValues: SelectedMMYLevel,
    depth: number,
    levelsCount: number,
  ) => {
    set(isLoadingLevelAtom, true)
    const levels = get(levelsValuesAtom)
    const selectedLevelName = Object.keys(newValues)[0]

    let depthCounter = depth

    const setNextSingleLevel = async () => {
      set(isLoadingLevelAtom, true)

      if (depthCounter <= levelsCount) {
        const previousLevels = get(levelsValuesAtom)
        const selectedLevels = get(selectedVehicleLevelAtom)
        const prevSelectedLevelName = Object.keys(
          previousLevels[depthCounter - 1],
        )[0]
        const selectedLevelItem: MMYLevel =
          previousLevels[depthCounter - 1][prevSelectedLevelName][0]
        const selectedLevelItemName = selectedLevelItem.name
        const selectedLevelItemId = selectedLevelItem.id

        const prepareSelected: SelectedMMYLevel = {
          [prevSelectedLevelName]: {
            value: selectedLevelItemName,
            id: String(selectedLevelItemId),
          },
        }

        set(selectedVehicleLevelAtom, {
          ...selectedLevels,
          ...prepareSelected,
        })

        if (!previousLevels[depthCounter]) {
          set(isLoadingLevelAtom, false)

          return false
        }

        const nextLevelName = Object.keys(previousLevels[depthCounter])[0]

        if (selectedLevelItemId) {
          const values = await getMMYLevel(String(depthCounter + 1), {
            'filter.parent': selectedLevelItemId,
          })

          const updatedLevels = previousLevels.map((level: MMYLevels) => {
            const levelName = Object.keys(level)[0]
            let updatedLevel = structuredClone(level)

            if (levelName === nextLevelName) {
              updatedLevel = {...updatedLevel, ...{[nextLevelName]: values}}
            }

            return updatedLevel
          })

          set(levelsValuesAtom, updatedLevels)

          depthCounter += 1

          if (values.length === 1) {
            await setNextSingleLevel()
          }
        }
      }

      set(isLoadingLevelAtom, false)
    }

    if (selectedLevelName && depth <= levelsCount) {
      let values: MMYLevel[] = []

      if (newValues[selectedLevelName].id) {
        values = await getMMYLevel(String(depth), {
          'filter.parent': Number(newValues[selectedLevelName].id),
        })
      }

      const selectedLevels = structuredClone(get(selectedVehicleLevelAtom))
      let updateSelected = false

      const updatedLevels = levels.map((level: MMYLevels, index: number) => {
        const levelName = Object.keys(level)[0]
        let updatedLevel = structuredClone(level)

        if (levelName === selectedLevelName) {
          updatedLevel = {...updatedLevel, ...{[selectedLevelName]: values}}
        }

        if (
          Object.keys(values).length > 1 &&
          index + 1 <= levelsCount &&
          depth <= index + 1 &&
          levelName !== selectedLevelName
        ) {
          updatedLevel = {...updatedLevel, ...{[levelName]: []}}

          Object.keys(selectedLevels).forEach((key, idx) => {
            if (idx >= index) {
              updateSelected = true
              delete selectedLevels[key]
            }
          })
        }

        if (
          !newValues[selectedLevelName].id &&
          index < levelsCount &&
          depth - 1 <= index
        ) {
          updatedLevel = {...updatedLevel, ...{[levelName]: []}}
        }

        return updatedLevel
      })

      if (updateSelected) {
        set(selectedVehicleLevelAtom, selectedLevels)
      }

      set(levelsValuesAtom, updatedLevels)
      set(isLoadingLevelAtom, false)

      if (Object.keys(values).length === 1) {
        setNextSingleLevel()
      }
    }
  },
)

export const addVehicleAtom = atom(
  null,
  async (get, set, vehicle?: GarageItem, addToGarage?: boolean) => {
    const currentGarage = get(myGarageItemsAtom)
    let vehiclesCount = 0

    if (!addToGarage) {
      return false
    }

    const client = await getClient()

    if (client.hasAccessToken() && vehicle?.id) {
      addVehicle(vehicle.id).then(async response => {
        try {
          if (response) {
            const garage = await getGarageVehicles()

            if (garage && garage.vehicles) {
              const vehicles = updatedGarage(garage)

              if (vehicles && vehicles.length) {
                set(myGarageItemsAtom, vehicles)
                vehiclesCount = vehicles.length
              }
            }
          }
        } catch (err) {
          if (err) {
            return false
          }
        }
      })
    } else if (vehicle) {
      let hasInGarage = false

      currentGarage.forEach(currentGarageItem => {
        if (vehicle.id === currentGarageItem.id) {
          hasInGarage = true
        }
      })

      if (!hasInGarage) {
        const updatedVehicles = [...currentGarage, ...[vehicle]]

        if (updatedVehicles && updatedVehicles.length) {
          set(myGarageItemsAtom, updatedVehicles)
          vehiclesCount = updatedVehicles.length
        }
      }
    }

    if (vehiclesCount > 0) {
      Cookies.set('xc-garage', `${vehiclesCount}`, {expires: 7})
    } else {
      Cookies.remove('xc-garage')
    }
  },
)

export const mergeGarageAtom = atom(null, (get, set) => {
  const currentGarage = get(myGarageItemsAtom)

  if (currentGarage.length) {
    // @ts-ignore
    const vehicleIds: number[] = currentGarage.map(item => {
      return item.id
    })

    if (vehicleIds) {
      mergeGarage(vehicleIds).then(async () => {
        const garage = await getGarageVehicles()

        if (garage) {
          const vehicles = updatedGarage(garage)

          if (vehicles) {
            set(myGarageItemsAtom, vehicles)
            Cookies.set('xc-garage', `${vehicles.length}`, {expires: 7})
          }
        }
      })
    }
  }
})

export const clearGarageAtom = atom(null, async (get, set) => {
  const client = await getClient()

  if (client.hasAccessToken()) {
    await clearGarage()
  }

  set(myGarageItemsAtom, [])
  Cookies.remove('xc-garage')
})

export const removeGarageItemAtom = atom(null, async (get, set, id: number) => {
  const client = await getClient()

  let count = 0

  if (client.hasAccessToken()) {
    removeVehicle(id).then(async () => {
      const garage = await getGarageVehicles()

      if (garage && garage.vehicles) {
        const vehicles = updatedGarage(garage)

        if (vehicles && vehicles.length) {
          count = vehicles.length
          set(myGarageItemsAtom, vehicles)
        }
      }
    })
  } else {
    const myGarage = get(myGarageItemsAtom)
    const vehicles = myGarage.filter((item: GarageItem) => item.id !== id)

    count = vehicles.length

    set(myGarageItemsAtom, vehicles)
  }

  if (count > 0) {
    Cookies.set('xc-garage', String(count))
  } else {
    Cookies.remove('xc-garage')
  }
})

/**
 * Selected vehicle. Filter products depending on this selection
 * */
export const selectedVehicleAtom = atom(
  get => get(selectedVehicleValuesAtom),
  (get, set, vehicle: GarageItem) => {
    if (Object.keys(vehicle).length > 0) {
      Cookies.set(
        'xc-selected-vehicle',
        JSON.stringify({
          id: vehicle.id,
          name: vehicle.name,
          depth: vehicle.depth,
          levels: vehicle.levels,
        }),
      )
    } else {
      Cookies.remove('xc-selected-vehicle')
    }

    set(selectedVehicleValuesAtom, vehicle)
  },
)
