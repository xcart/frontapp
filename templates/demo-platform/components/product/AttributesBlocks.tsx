'use client'

import {Dispatch, SetStateAction, useState} from 'react'
import {UnavailableVariant} from '@xcart/components'
import {ProductAttributeValue} from '@xcart/storefront'
import _ from 'lodash'
import {Button, ButtonBase} from '~/components/elements/Button'
import {IconCross} from '~/components/elements/Icons'
import {Tooltip} from '~/components/global/Tooltip'
import {SelectedAttributes} from '~/components/product/interface'
import {tailwindMerge, componentOrNull, isDark} from '~/helpers'

interface MappedProductAttributeValue extends ProductAttributeValue {
  outOfStock?: boolean
  unavailable?: boolean
}

export function AttributesBlocks({
  attributeId,
  selectedAttributes,
  attributesValues,
  attributeName,
  handleSelectAttibute,
  unavailableVariant,
  colorSwatches,
}: {
  attributeId?: number
  selectedAttributes?: SelectedAttributes
  attributesValues: MappedProductAttributeValue[]
  attributeName?: string
  handleSelectAttibute: Dispatch<SetStateAction<SelectedAttributes>>
  unavailableVariant?: UnavailableVariant
  colorSwatches?: boolean
}) {
  const defaultAttribute = _.find(attributesValues, 'isDefault')

  const [selected, setSelected] = useState<string | undefined>(
    defaultAttribute?.value,
  )

  const handleClick = (e: any) => {
    if (attributeId) {
      const dataset = Object.keys(e.target.dataset).length
        ? e.target.dataset
        : e.target.parentElement?.dataset

      handleSelectAttibute({
        ...selectedAttributes,
        ...{
          [attributeId]: {
            ...dataset,
          },
        },
      })

      setSelected(dataset.value)
    }
  }

  const unavailableOrOutOfStock =
    unavailableVariant?.unavailable || unavailableVariant?.outOfStock

  const renderButton = (
    value: MappedProductAttributeValue,
    active: boolean,
  ) => {
    const activeButtonClasses = colorSwatches ? 'border-primary' : ''

    const attributeClasses = active ? activeButtonClasses : 'border-gray-500'

    return colorSwatches ? (
      <div className="relative h-unit-8 w-unit-8">
        <ButtonBase
          className={tailwindMerge(
            'absolute h-unit-8 w-unit-8 rounded-full border border-gray-300 transition',
            value?.unavailable || value?.outOfStock ? 'opacity-20' : '',
            attributeClasses,
          )}
          onClick={e => handleClick(e)}
          data-value={value.value}
          data-name={value.value}
          data-id={value.id}
          key={value.id}
          aria-label={value.value}
        />
        <div
          className={tailwindMerge(
            'absolute top-0 left-0 right-0 bottom-0 z-[-1] rounded-full',
            !active && (value?.unavailable || value?.outOfStock)
              ? 'opacity-20'
              : '',
          )}
          style={{backgroundColor: `#${value.swatchColor}`}}
        >
          {componentOrNull(
            (active && unavailableOrOutOfStock) ||
              value?.outOfStock ||
              value?.unavailable,
            <IconCross
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              fill={
                isDark(`#${value.swatchColor}`)
                  ? 'var(--color-invariant-light)'
                  : 'var(--color-invariant-dark)'
              }
            />,
          )}
        </div>
        {componentOrNull(
          active,
          <div className="relative h-full w-full rounded-full border-2 border-primary">
            <div
              className="h-full w-full rounded-full border-2 border-contrast"
              data-value={value.value}
              data-name={value.value}
              data-id={value.id}
            />
          </div>,
        )}
      </div>
    ) : (
      <Button
        variant={active ? 'primary' : 'secondary'}
        className={tailwindMerge(
          'relative rounded-base border px-unit-4 font-normal lg:py-button-thin lg:text-base',
          attributeClasses,
          !(active && unavailableOrOutOfStock) &&
            (value.outOfStock || value.unavailable)
            ? 'hover:opacity-1'
            : '',
        )}
        onClick={e => handleClick(e)}
        data-value={value.value}
        data-name={value.value}
        data-id={value.id}
        key={value.id}
        aria-label={value.value}
      >
        <span className="block min-w-unit-6 opacity-0">{value.value}</span>
        <span
          className={tailwindMerge(
            'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap',
            active ? 'font-medium' : '',
            (active && unavailableOrOutOfStock) ||
              value.outOfStock ||
              value.unavailable
              ? 'line-through'
              : '',
            !(active && unavailableOrOutOfStock) &&
              (value.outOfStock || value.unavailable)
              ? 'opacity-20'
              : '',
          )}
        >
          {value.value}
        </span>
      </Button>
    )
  }

  return (
    <>
      <div
        className={tailwindMerge(
          'mb-unit-4 text-sm font-medium transition lg:text-base',
          unavailableOrOutOfStock ? 'text-error' : '',
        )}
      >
        {attributeName}: {selected}
      </div>
      <div className="flex flex-wrap">
        {attributesValues.map((value: MappedProductAttributeValue) => {
          const active = value.value === selected

          return (
            <Tooltip
              triggerElementClasses="inline-block mr-unit-2 mb-unit-2 h-unit-8"
              tooltipText={
                (active && unavailableVariant?.unavailable) || value.unavailable
                  ? 'This combination is not available'
                  : `${
                      (active && unavailableVariant?.outOfStock) ||
                      value.outOfStock
                        ? 'Out of Stock'
                        : null
                    }`
              }
              tooltipClasses={
                !(
                  (active && unavailableOrOutOfStock) ||
                  value.outOfStock ||
                  value.unavailable
                )
                  ? 'hidden'
                  : 'h-unit-8'
              }
              key={value.id}
            >
              {renderButton(value, active)}
            </Tooltip>
          )
        })}
      </div>
    </>
  )
}
