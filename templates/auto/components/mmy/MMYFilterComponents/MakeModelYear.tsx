import {useEffect, useState} from 'react'
import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import {useRouter, useSearchParams} from 'next/navigation'
import {ButtonWithSpinner} from '~/components/elements/Button'
import {Checkbox} from '~/components/elements/Checkbox'
import {getMMYPath} from '~/components/mmy/functions/getMMYPath'
import {getUpdatedSearchParams} from '~/components/mmy/functions/getUpdatedSearchParams'
import {prepareGarageItem} from '~/components/mmy/functions/helpers'
import {LevelSelect} from '~/components/mmy/MMYFilterComponents/LevelSelect'
import {
  drawerCurrentViewAtom,
  enableMMYButtonAtom,
  isLoadingLevelAtom,
  selectedLevelsValues,
  selectedVehicleLevelAtom,
  addVehicleAtom,
  selectedVehicleAtom,
} from '~/components/mmy/store'
import {componentOrNull, tailwindMerge} from '~/helpers'

export function MakeModelYear({
  isDrawer,
  levels,
}: {
  isDrawer?: boolean
  levels?: any
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [mounted, setMounted] = useState<boolean>(false)
  const [addToGarage, setAddToGarage] = useState<boolean>(false)
  const [loadingButtonState, setLoadingButtonState] = useState<boolean>(false)

  const [levelsValues, setLevelsValues] = useAtom(selectedLevelsValues)
  const [selectedVehicleLevel, setSelectedVehicleLevel] = useAtom(
    selectedVehicleLevelAtom,
  )
  const setSelectedVehicle = useSetAtom(selectedVehicleAtom)
  const isLoading = useAtomValue(isLoadingLevelAtom)
  const [enableButton, setEnableButton] = useAtom(enableMMYButtonAtom)
  const setCurrentView = useSetAtom(drawerCurrentViewAtom)
  const addVehicle = useSetAtom(addVehicleAtom)

  const renderedLevels = levels || levelsValues

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setEnableButton(
      Object.keys(selectedVehicleLevel).length === levelsValues.length,
    )
  }, [levelsValues, selectedVehicleLevel, setEnableButton])

  const handleButtonClick = () => {
    setLoadingButtonState(true)
    const levelsSelected = Object.keys(selectedVehicleLevel)
    const selectedLevelIndex = levelsSelected[levelsSelected.length - 1]
    const selectedVehicleName = levelsSelected
      .map(item => selectedVehicleLevel[item].value)
      .join(' ')
    const levelsInfo = levelsSelected.map(item => {
      return {
        name: selectedVehicleLevel[item].value,
        id: Number(selectedVehicleLevel[item].id),
      }
    })

    const preparedVehicle = prepareGarageItem({
      id: Number(selectedVehicleLevel[selectedLevelIndex].id),
      name: selectedVehicleName,
      depth: levelsSelected.length,
      levels: levelsInfo,
    })

    addVehicle(preparedVehicle, isDrawer || (!isDrawer && addToGarage)).then(
      () => {
        setLoadingButtonState(false)
        setSelectedVehicle(preparedVehicle)
        setCurrentView('my_garage')
      },
    )

    const newSearchParams = getUpdatedSearchParams(searchParams, 'mmy')

    const url = getMMYPath(levelsInfo)

    return router.push(`${url}?${newSearchParams.toString()}`)
  }

  return (
    <>
      {renderedLevels && renderedLevels.length > 0 && (
        <>
          <ul
            className={
              isDrawer
                ? ''
                : 'flex w-full flex-col lg:w-[calc(100%_-_106px)] lg:flex-row'
            }
          >
            {renderedLevels.map((level: any, index: number) => {
              const name = Object.keys(level)[0]

              const levelOptions = level[name].length
                ? level[name]?.map((values: any) => {
                    return {...values, value: values.name}
                  })
                : []

              const handleLevelSelect = (selected: any) => {
                setSelectedVehicleLevel((prev: any) => {
                  const selectedOption =
                    selected.target.options[selected.target.selectedIndex]

                  if (selectedOption.dataset.value) {
                    return {
                      ...prev,
                      ...{
                        [Object.keys(renderedLevels[index])[0]]: {
                          value: selectedOption.innerText,
                          id: selectedOption.dataset.value,
                        },
                      },
                    }
                  }

                  let values = {}

                  Object.keys(prev).forEach((key, idx) => {
                    const value = prev[key]

                    if (idx < index) {
                      values = {...values, ...{[key]: value}}
                    }
                  })

                  return values
                })

                if (index + 1 < renderedLevels.length) {
                  const selectedValues = {
                    value:
                      selected.target.options[selected.target.selectedIndex]
                        .innerText,
                    id: selected.target.options[selected.target.selectedIndex]
                      .dataset.value,
                  }

                  setLevelsValues(
                    {
                      [Object.keys(renderedLevels[index + 1])[0]]:
                        selectedValues,
                    },
                    Number(index + 2),
                    renderedLevels.length,
                  )
                }
              }

              return (
                <LevelSelect
                  level={levelOptions}
                  name={name}
                  key={`item-${Math.random()}`}
                  className={
                    !levelOptions.length || levelOptions.length === 1
                      ? 'disabled pointer-events-none'
                      : undefined
                  }
                  handleSelectChange={handleLevelSelect}
                  isLoading={isLoading}
                  disabled={loadingButtonState}
                  defaultValue={selectedVehicleLevel[name]?.value}
                  isDrawer={isDrawer}
                  labelClasses={!isDrawer ? 'text-invariant-light' : undefined}
                />
              )
            })}
          </ul>
          {componentOrNull(
            !isDrawer,
            <Checkbox
              label="Add to My Garage"
              checked={addToGarage}
              onChange={() => setAddToGarage(!addToGarage)}
              wrapperClasses="mt-unit-6 lg:mt-0 lg:absolute top-unit right-0"
              checkboxBaseClasses="border-invariant-gray-300 bg-invariant-mmy-dark group-data-[state=checked]:border-invariant-gray-300"
              checkboxIndicatorClasses="bg-invariant-mmy-dark"
              checkMarkClasses="fill-invariant-light"
              labelClasses="text-sm text-invariant-light"
            />,
          )}
          <ButtonWithSpinner
            className={tailwindMerge(
              'w-full',
              loadingButtonState ? 'pointer-evens-none' : '',
              isDrawer
                ? 'mt-unit-6'
                : 'mt-unit-6 border-invariant-light bg-invariant-light text-invariant-dark lg:mt-unit-4 lg:w-[106px]',
            )}
            buttonTitle={isDrawer ? 'Add' : 'Go'}
            disabled={!mounted || !enableButton || isLoading}
            showSpinner={loadingButtonState}
            onClick={handleButtonClick}
          />
        </>
      )}
    </>
  )
}
