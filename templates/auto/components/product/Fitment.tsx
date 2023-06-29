import type {ProductFitment} from '@xcart/storefront'
import {IconCheckMark} from '~/components/elements/Icons'
import {GarageItem} from '~/components/mmy/functions/interface'
import {tailwindMerge} from '~/helpers'

export function Fitment({
  selectedVehicle,
  fitment,
}: {
  selectedVehicle?: GarageItem
  fitment?: ProductFitment
}) {
  const iconStyles = tailwindMerge(
    'bg-navy w-unit-4 h-unit-4 rounded-full flex justify-center items-center mr-unit',
    fitment?.type === 'specific' && 'bg-violet',
    fitment?.type === 'universal' && 'bg-fit-green',
  )

  let text = fitment?.type === 'regular' ? 'Regular Product' : 'Universal Fit'

  if (fitment?.type === 'specific') {
    text =
      selectedVehicle &&
      Object.keys(selectedVehicle).length &&
      fitment?.fitments?.find(item => item.name === selectedVehicle?.name)
        ? `Fits your model: ${selectedVehicle.name}`
        : 'Vehicle Specific'
  }

  return (
    <div
      className={tailwindMerge(
        'text-navy mb-unit-8 mt-[-20px] flex items-center text-sm font-medium',
        fitment?.type === 'specific' && 'text-violet',
        fitment?.type === 'universal' && 'text-fit-green',
      )}
    >
      <span className={iconStyles}>
        <IconCheckMark className="w-unit-2 fill-white" />
      </span>
      <span>{text}</span>
    </div>
  )
}
