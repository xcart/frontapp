'use client'

import React, {useEffect, useRef, useState} from 'react'
import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock'
import {useAtom} from 'jotai'
import {useHydrateAtoms} from 'jotai/utils'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {ButtonIcon} from '~/components/elements/Button'
import {IconArrowDown, IconClose} from '~/components/elements/Icons'
import {Alert} from '~/components/global/Alert'
import {getUpdatedSearchParams} from '~/components/mmy/functions/getUpdatedSearchParams'
import {GarageItem, MMYLevels} from '~/components/mmy/functions/interface'
import {MakeModelYear} from '~/components/mmy/MMYFilterComponents/MakeModelYear'
import {levelsValuesAtom, selectedVehicleAtom} from '~/components/mmy/store'
import {FindByVINFilter} from '~/components/mmy/VIN/FindByVINFilter'
import {tailwindMerge} from '~/helpers'

export function MMYFilter({
  levels,
  selected,
}: {
  levels: MMYLevels[]
  selected: GarageItem
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [mounted, setMounted] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(Object.keys(selected).length === 0)
  const [showVIN, setShowVIN] = useState<boolean>(false)
  const [scrollEnd, setScrollEnd] = useState<number>(0)
  const [alert, setAlert] = useState<string | null>(null)

  const [selectedVehicle, setSelectedVehicle] = useAtom(selectedVehicleAtom)

  const ref = useRef<HTMLDivElement>(null)

  const compareVehiclesFromPath = () => {
    if (
      Object.keys(selected).length &&
      pathname &&
      pathname.indexOf('/mmy/') > -1
    ) {
      const name = pathname
        .replace('/mmy/', '')
        .split('/')
        .join(' ')
        .replaceAll('__', ' ')

      if (selected.name !== name) {
        return {}
      }
    }

    return null
  }

  useHydrateAtoms([
    [selectedVehicleAtom, compareVehiclesFromPath() || selected],
    [levelsValuesAtom, levels],
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const filter = ref.current
    if (filter) {
      if (open) {
        setTimeout(() => {
          if (
            filter.getBoundingClientRect().height +
              filter.getBoundingClientRect().top >
            window.innerHeight
          ) {
            filter.style.top = `${filter.getBoundingClientRect().top}px`
            filter.classList.add('filter-locked')

            disableBodyScroll(filter, {reserveScrollBarGap: true})
          }
        }, 400)
      } else {
        filter.classList.remove('filter-locked')
        filter.style.removeProperty('top')

        clearAllBodyScrollLocks()
      }
    }
  }, [open])

  useEffect(() => {
    const handleFilterOnScroll = () => {
      if (window.scrollY > scrollEnd && window.scrollY - scrollEnd > 0) {
        setOpen(false)
      }

      setScrollEnd(window.scrollY)
    }

    window.addEventListener('scroll', handleFilterOnScroll, {passive: true})

    return () => {
      window.removeEventListener('scroll', handleFilterOnScroll)
    }
  }, [scrollEnd])

  const renderTitleBlock = () => {
    const vehicle = mounted ? selectedVehicle : selected

    const handleClickRemoveVehicle = () => {
      const newSearchParams = getUpdatedSearchParams(searchParams, '')

      const isVehiclePage = pathname?.match('/mmy/')

      if (isVehiclePage) {
        router.push('/')
      } else {
        router.push(`${pathname}?${newSearchParams.toString()}`)
      }

      setSelectedVehicle({})
    }

    const title = showVIN ? 'Find by VIN' : 'Select your vehicle'

    return vehicle && Object.keys(vehicle).length ? (
      <div className="flex h-unit-12 flex-col lg:block lg:h-auto">
        <span>Your vehicle: &nbsp;</span>
        <span className="text-light-green inline-block">
          {vehicle.name}
          <span className="inline-block align-middle">
            <ButtonIcon
              className="relative z-10 ml-unit h-unit-4 w-unit-4 bg-transparent p-0 hover:bg-transparent"
              onClick={() => handleClickRemoveVehicle()}
            >
              <IconClose className="w-unit-3 fill-invariant-light" />
            </ButtonIcon>
          </span>
        </span>
      </div>
    ) : (
      <div className="flex h-unit-12 items-center lg:h-auto">{title}</div>
    )
  }

  const renderFindByButton = () => {
    return (
      <button
        className="relative text-sm font-normal underline hover:no-underline"
        onClick={() => {
          setShowVIN(!showVIN)

          if (!open) {
            setOpen(true)
          }
        }}
      >
        {showVIN ? 'Select Your Vehicle' : 'Find by VIN'}
      </button>
    )
  }

  return (
    <>
      <div className="lg:h-mmy-filter-lg z-mmy-filter sticky top-unit-12 w-full">
        <div className="min-h-unit-16 px-unit-4 py-unit-2 pr-unit-8 opacity-0 md:pr-0 lg:min-h-0 lg:p-unit-4">
          {renderTitleBlock()}
        </div>
        <div
          ref={ref}
          className="min-h-unit-16 bg-invariant-mmy-dark absolute left-0 top-0 w-full p-unit-4 py-unit-2 text-invariant-light lg:min-h-0 lg:px-unit-16 lg:py-unit-4"
        >
          {alert && <Alert message={alert} closeButton />}
          <button
            className="lg:h-mmy-filter-lg absolute left-0 top-0 w-full"
            onClick={() => setOpen(!open)}
            aria-label="MMY Filter"
          />
          <div className="page relative">
            <div className="relative flex items-center justify-between pr-unit-8 text-invariant-light md:pr-0">
              <button
                className="absolute left-0 top-0 h-full w-full"
                onClick={() => setOpen(!open)}
                aria-label="MMY Filter"
              >
                <IconArrowDown
                  className={tailwindMerge(
                    'absolute right-0 top-1/2 -translate-y-1/2 fill-invariant-light transition-transform lg:right-[-40px]',
                    open && 'rotate-180',
                  )}
                />
              </button>
              <div className="flex w-full items-center text-base font-medium md:w-auto lg:text-lg">
                {renderTitleBlock()}
                <div className="relative ml-unit-4 hidden pl-unit-4 lg:block">
                  <span className="absolute left-0 top-1/2 block h-unit-4 -translate-y-1/2 border-l border-l-gray-700" />
                  {renderFindByButton()}
                </div>
              </div>
            </div>
            {!mounted ? (
              <div
                className="flex flex-wrap"
                style={
                  open
                    ? {maxHeight: '1000px', opacity: '100%'}
                    : {maxHeight: 0, opacity: 0, overflow: 'hidden'}
                }
              >
                <div className="h-unit-3 w-full text-invariant-light lg:h-unit-2" />
                <MakeModelYear levels={levels} />
              </div>
            ) : (
              <div
                className="duration-250 flex flex-wrap transition transition-[max-height,opacity]"
                style={
                  open
                    ? {maxHeight: '1000px', opacity: '100%'}
                    : {maxHeight: 0, opacity: 0, overflow: 'hidden'}
                }
              >
                <div
                  className="h-unit-3 w-full lg:h-unit-2"
                  style={!open ? {position: 'relative', zIndex: -1} : undefined}
                />
                {showVIN ? (
                  <FindByVINFilter setAlert={setAlert} />
                ) : (
                  <MakeModelYear />
                )}
                <div className="mt-unit-4 w-full text-center text-invariant-light lg:hidden">
                  {renderFindByButton()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
