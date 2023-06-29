import type {ProductDetailed, ProductTab} from '@xcart/storefront'
import _ from 'lodash'

/**
 * X-Cart API sends some tabs just as placeholders (e.g. Description, Specification, Comments, Ratings)
 *
 * Default X-Cart product Specification tab shows weight, SKU, attributes with `displayAbove: false`
 */
export const useProductTabs = ({product}: {product: ProductDetailed}) => {
  const tabs: ProductTab[] = []

  product.tabs?.filter((item, index) => {
    if (item.serviceName === 'Description') {
      tabs[index] = {...item, content: product.description}
    } else if (item.name === 'Specification') {
      const attributesByDisplay = _.groupBy(product.attributes, 'displayAbove')
      const attributeGroups = _.groupBy(attributesByDisplay.false, 'group')

      let spec = '<ul class="specification-tab">'

      if (product.weight) {
        spec += `<li><span class="name">Weight</span><span class="value">${product.weight} lbs</span></li>`
      }

      if (product.sku) {
        spec += `<li><span class="name">SKU</span><span class="value">${product.sku}</span></li>`
      }

      Object.keys(attributeGroups).map(group => {
        if (group !== 'null') {
          spec += `<li class="specification-tab-group"><h3>${group}</h3><ul>`
        }

        attributeGroups[group].forEach(attr => {
          let valueStr = ''

          attr?.values?.filter((value, idx) => {
            if (attr?.values && attr?.values?.length > 1 && idx > 0) {
              valueStr += ', '
            }

            valueStr += value.value

            return valueStr
          })

          spec += `<li>
                    <span class="name">${attr.name}</span>
                    <span class="value">${valueStr}</span>
                    </li>`
        })

        if (group !== 'null') {
          spec += `</ul></li>`
        }

        return spec
      })

      spec += '</ul>'

      tabs[index] = {...item, content: spec}
    } else {
      tabs.push(item)
    }

    return tabs
  })

  return tabs
}
