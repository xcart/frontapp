'use client'

import {useEffect, useState} from 'react'
import {useProductTabs, useProductDetailsVariant} from '@xcart/components'
import type {ProductDetailed} from '@xcart/storefront'
import {useAtomValue} from 'jotai'
import _ from 'lodash'
import {GarageItem} from '~/components/mmy/functions/interface'
import {productTabsWithFitments} from '~/components/mmy/functions/productTabsWithFitments'
import {allLevelsAtom, selectedVehicleAtom} from '~/components/mmy/store'
import {Fitment} from '~/components/product/Fitment'
import {SelectedAttributes} from '~/components/product/interface'
import {Label} from '~/components/product/Label'
import {ProductAccordion} from '~/components/product/ProductAccordion'
import {ProductBreadcrumbs} from '~/components/product/ProductBreadcrumbs'
import {ProductBuyBox} from '~/components/product/ProductBuyBox'
import {ProductImagesDesktop} from '~/components/product/ProductImagesDesktop'
import {ProductImagesMobile} from '~/components/product/ProductImagesMobile'
import {ProductTitle} from '~/components/product/ProductTitle'

export function ProductPage({
  product,
  initCart,
  initSelectedVehicle,
}: {
  product: ProductDetailed
  initCart?: any
  initSelectedVehicle?: GarageItem
}) {
  const [mount, setMount] = useState<boolean>(false)
  const selectedVehicle = useAtomValue(selectedVehicleAtom)
  const allLevelsNames = useAtomValue(allLevelsAtom)

  useEffect(() => {
    setMount(true)
  }, [])

  const usedAttributes = _.filter(product.attributes, 'displayAbove')

  let defaultValues: SelectedAttributes = {}

  _.filter(usedAttributes, attribute => {
    const defaultAttributeValue = _.find(attribute.values, 'isDefault')

    if (attribute && defaultAttributeValue) {
      defaultValues = {
        ...defaultValues,
        ...{
          [attribute.id as number]: {
            id: String(defaultAttributeValue.id),
            name: defaultAttributeValue.value,
            value: defaultAttributeValue.value,
          },
        },
      }
    }
  })

  const brand = product?.brand && product?.brand?.name

  const manufacturerAttribute = product?.attributes?.find(attribute => {
    return attribute.name === 'Manufacturer'
  })

  const [selectedAttributes, setSelectedAttributes] =
    useState<SelectedAttributes>(defaultValues)

  const {productDetails, unavailableVariant} = useProductDetailsVariant({
    product,
    selectedAttributes,
  })

  const tabs = useProductTabs({product: productDetails})
  const productTabs = productTabsWithFitments(
    tabs,
    allLevelsNames,
    productDetails.fitment,
  )

  return (
    <div className="mb-unit-16 flex w-full flex-col lg:flex-row">
      <div className="flex-1 lg:pr-unit-4">
        {productDetails.images && productDetails.images.length > 0 && (
          <>
            <ProductImagesMobile
              images={productDetails.images}
              productId={productDetails.id as number}
            />
            <ProductImagesDesktop
              images={productDetails.images}
              productId={productDetails.id as number}
            />
          </>
        )}
      </div>
      <div className="flex-1 pt-unit-8 lg:pl-unit-4 lg:pt-0">
        {productDetails.path && (
          <ProductBreadcrumbs items={productDetails.path} />
        )}
        <Label
          productPrice={productDetails.price}
          productSalePrice={productDetails.salePrice}
        />
        {productDetails.name && (
          <ProductTitle
            title={productDetails.name}
            brand={
              brand ||
              (manufacturerAttribute?.values?.length
                ? manufacturerAttribute?.values[0].value
                : undefined)
            }
          />
        )}
        <Fitment
          selectedVehicle={mount ? selectedVehicle : initSelectedVehicle}
          fitment={productDetails.fitment}
        />
        <ProductBuyBox
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
          product={productDetails}
          unavailableVariant={unavailableVariant}
          initCart={initCart}
        />
        {productTabs && productTabs.length > 0 && (
          <ProductAccordion items={productTabs} />
        )}
      </div>
    </div>
  )
}
