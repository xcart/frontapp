'use client'

import * as RadixAccordion from '@radix-ui/react-accordion'
import {
  IAccordion,
  AccordionItem,
  AccordionTrigger,
  AccordionItemContent,
} from './AccordionBase'

export interface IAccordionSingle extends IAccordion {
  accordionDefaultValue?: RadixAccordion.AccordionSingleProps['defaultValue']
  onValueChange?: RadixAccordion.AccordionSingleProps['onValueChange']
  collapsible?: RadixAccordion.AccordionSingleProps['collapsible']
}

export function AccordionSingle({
  accordionDefaultValue,
  accordionRootClasses,
  accordionItemClasses,
  accordionTriggerClasses,
  accordionContentClasses,
  accordionItems,
  onValueChange,
  collapsible = false,
  disabled = false,
}: IAccordionSingle) {
  return (
    <RadixAccordion.Root
      defaultValue={accordionDefaultValue}
      className={accordionRootClasses}
      type="single"
      onValueChange={onValueChange}
      disabled={disabled}
      collapsible={collapsible}
    >
      {accordionItems.map((item, index) => {
        const itemKey = `${item.name?.replaceAll(' ', '')}-${index}`
        return (
          <AccordionItem
            accordionItem={item}
            itemKey={itemKey}
            className={accordionItemClasses}
            key={itemKey}
          >
            <>
              <AccordionTrigger className={accordionTriggerClasses}>
                {/* @ts-ignore */}
                <div dangerouslySetInnerHTML={{__html: item.name}} />
              </AccordionTrigger>
              <AccordionItemContent className={accordionContentClasses}>
                {/* @ts-ignore */}
                <div dangerouslySetInnerHTML={{__html: item.content}} />
              </AccordionItemContent>
            </>
          </AccordionItem>
        )
      })}
    </RadixAccordion.Root>
  )
}
