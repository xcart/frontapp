'use client'

import {useEffect, useRef, useState} from 'react'
import {Garage, MMYLevel, MMYLevelsSetupItem} from '@xcart/storefront'
import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import {useHydrateAtoms} from 'jotai/utils'
import {Badge} from '~/components/elements/Badge'
import {ButtonIcon} from '~/components/elements/Button'
import {
  Drawer,
  DrawerTitle,
  SecondaryAction,
  useDrawer,
  useInView,
} from '~/components/elements/Drawer'
import {BackToView} from '~/components/elements/Drawer/BackToView'
import {PaneTriggerButton} from '~/components/elements/Drawer/PaneTriggerButton'
import {IconCar} from '~/components/elements/Icons'
import {prepareLevels} from '~/components/mmy/functions/helpers'
import {useInitGarage} from '~/components/mmy/functions/useInitGarage'
import {MyGarageView} from '~/components/mmy/garage/Views/MyGarageView'
import {SelectOrFindView} from '~/components/mmy/garage/Views/SelectOrFindView'
import {
  allLevelsAtom,
  clearGarageAtom,
  drawerCurrentViewAtom,
  levelsValuesAtom,
  myGarageItemsAtom,
} from '~/components/mmy/store'
import {tailwindMerge} from '~/helpers'

function MyGaragePane() {
  const [currentView, setCurrentView] = useAtom(drawerCurrentViewAtom)
  const vehicles = useAtomValue(myGarageItemsAtom)
  const clearGarageAction = useSetAtom(clearGarageAtom)

  const {panelRef} = useDrawer()
  const ref = useRef<HTMLDivElement>(null)
  const scrolledUnderHeader = useInView(ref, panelRef)

  const stickyHeaderTitle =
    currentView === 'my_garage' ? (
      <DrawerTitle count={vehicles?.length}>My Garage</DrawerTitle>
    ) : (
      <BackToView
        setView={() => setCurrentView('my_garage')}
        label="My Garage"
      />
    )

  return (
    <>
      <Drawer.StickyHeader
        scrolledUnder={scrolledUnderHeader && currentView === 'my_garage'}
        title={stickyHeaderTitle}
        forceTitleVisibility={currentView !== 'my_garage'}
      >
        <SecondaryAction
          count={vehicles?.length}
          withDelimiter
          handleAction={() => clearGarageAction()}
        >
          Clear
        </SecondaryAction>
      </Drawer.StickyHeader>
      <Drawer.Content className="mb-[100px] md:mb-[140px]">
        <div className="overflow-hidden">
          <div className="flex flex-col gap-unit-8">
            <div
              className={tailwindMerge(
                'flex gap-unit-4 transition-transform duration-300 md:gap-unit-12',
                currentView === 'select_your_vehicle' ||
                  currentView === 'find_by_vin'
                  ? 'translate-x-[calc(-100%-20px)] md:translate-x-[calc(-100%-60px)]'
                  : '',
              )}
            >
              <div className="flex-[1_0_100%]">
                <div
                  className={tailwindMerge(
                    'mb-unit-3 flex items-center justify-between',
                    scrolledUnderHeader ? 'invisible' : '',
                  )}
                  ref={ref}
                >
                  <DrawerTitle count={vehicles?.length}>My Garage</DrawerTitle>
                  <SecondaryAction
                    count={vehicles?.length}
                    handleAction={() => clearGarageAction()}
                  >
                    Clear
                  </SecondaryAction>
                </div>
                <MyGarageView changePage={setCurrentView} />
              </div>
              <SelectOrFindView />
            </div>
          </div>
        </div>
      </Drawer.Content>
    </>
  )
}

function MyGaragePaneTriggerButton(props: any) {
  const vehicles = useAtomValue(myGarageItemsAtom)

  return (
    <PaneTriggerButton
      count={vehicles?.length}
      ariaLabel="My Garage"
      {...props}
    >
      <IconCar />
    </PaneTriggerButton>
  )
}

export function MyGarageDrawer({
  levels,
  rootLevel,
  myGarage,
  vehiclesCount,
}: {
  levels: MMYLevelsSetupItem[]
  rootLevel?: MMYLevel[]
  myGarage?: Garage
  vehiclesCount: number
}) {
  const [mounted, setMounted] = useState<boolean>(false)

  useHydrateAtoms([
    [allLevelsAtom, levels || []],
    [levelsValuesAtom, prepareLevels(levels, rootLevel)],
  ])

  useInitGarage(myGarage)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <ButtonIcon
        className="relative ml-unit-3 h-unit-6 w-unit-6"
        aria-label="My Garage"
      >
        <IconCar />
        {vehiclesCount > 0 && <Badge>{vehiclesCount}</Badge>}
      </ButtonIcon>
    )
  }

  return (
    <Drawer triggerElement={<MyGaragePaneTriggerButton />} width="560px">
      <MyGaragePane />
    </Drawer>
  )
}
