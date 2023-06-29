import type {
  Level,
  MMYLevelsSetupItem,
  ProductFitment,
  ProductTab,
} from '@xcart/storefront'

export function productTabsWithFitments(
  tabs: ProductTab[],
  allLevelsNames: MMYLevelsSetupItem[],
  fitment?: ProductFitment,
) {
  const updatedTabs: ProductTab[] = []

  tabs.forEach((tab: ProductTab, index: number) => {
    if (tab.content) {
      updatedTabs[index] = tab
    }

    if (tab.name === 'Fitment' && fitment) {
      let type = 'Regular Product'

      if (fitment.type === 'specific') {
        type = 'Vehicle Specific'
      } else if (fitment.type === 'universal') {
        type = 'Universal Fit'
      }

      const tableHead = allLevelsNames.map((level: MMYLevelsSetupItem) => {
        return `<th class="capitalize text-left p-unit-2 font-medium border border-gray-500">${level.name}</th>`
      })

      let tableRows = ''

      fitment.fitments?.forEach(fitmentLevel => {
        let tableCells = ''

        fitmentLevel.levels?.forEach((level: Level) => {
          tableCells += `<td class="p-unit-2 border border-gray-500">${level.name}</td>`
        })

        tableRows += `<tr>${tableCells}</tr>`
      })

      const table = `<table class="mt-unit-4 text-sm border border-gray-500 w-full">
                        <thead>
                            ${tableHead.join('')}
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>`

      const content = `<div class="overflow-hidden">
                         <div class="overflow-auto">
                            <div class="whitespace-nowrap">
                                <span class="mr-unit-8">Fitment Type</span><span>${type}</span>
                            </div>
                            ${fitment.type === 'specific' ? table : ''}
                         </div>
                       </div>`

      updatedTabs[index] = {...tab, content}
    }
  })

  return updatedTabs.filter(tab => tab)
}
