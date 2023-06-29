'use client'

import {useSetAtom} from 'jotai'
import {useRouter} from 'next/navigation'
import {ButtonIcon} from '~/components/elements/Button'
import {IconClose} from '~/components/elements/Icons'
import {PageTitle} from '~/components/global/PageTitle'
import {selectedVehicleAtom} from '~/components/mmy/store'

function TitleAction() {
  const router = useRouter()
  const setSelectedVehicle = useSetAtom(selectedVehicleAtom)

  const removeVehicleSelection = () => {
    setSelectedVehicle({})
    router.push('/')
  }

  return (
    <>
      &nbsp;
      <ButtonIcon
        className="bg-gray-300 hover:bg-gray-500 lg:h-unit-12 lg:w-unit-12"
        onClick={removeVehicleSelection}
      >
        <IconClose className="fill-primary lg:w-unit-6" />
      </ButtonIcon>
    </>
  )
}

export function VehiclePageTitle({
  title,
  total,
}: {
  title: string
  total?: number
}) {
  return (
    <PageTitle
      title={title}
      titleDetails={total && total > 0 ? `(${total})` : undefined}
      noItems={total === 0}
      titleAction={<TitleAction />}
      className="flex flex-wrap items-center"
    />
  )
}
