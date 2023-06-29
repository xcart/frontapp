'use client'

import {AccordionMultiple} from '~/components/global/Accordion'
import {IAccordionItems} from '~/components/global/Accordion/AccordionBase'

export function FooterMenuMobile({items}: {items: IAccordionItems[]}) {
  return (
    <div className="w-full border-t border-gray-500 lg:hidden">
      <AccordionMultiple accordionItems={items} />
    </div>
  )
}
