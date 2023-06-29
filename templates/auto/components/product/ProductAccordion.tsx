import {AccordionMultiple} from '~/components/global/Accordion'
import {IAccordionItems} from '~/components/global/Accordion/AccordionBase'

export function ProductAccordion({items}: {items: IAccordionItems[]}) {
  return (
    <AccordionMultiple
      accordionItems={items}
      accordionRootClasses="border-t border-gray-500 mt-unit-10 lg:mt-0"
      accordionItemClasses="border-gray-500"
    />
  )
}
