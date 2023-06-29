'use client'

import * as RadixAccordion from '@radix-ui/react-accordion'
import {IconArrowDown} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'
import {
  IAccordion,
  AccordionItem,
  AccordionTrigger,
  AccordionItemContent,
} from './AccordionBase'

export interface IAccordionMultiple extends IAccordion {
  onValueChange?: RadixAccordion.AccordionMultipleProps['onValueChange']
}

export function AccordionMultiple({
  accordionRootClasses,
  accordionItemClasses,
  accordionTriggerClasses,
  accordionContentClasses,
  accordionItems,
  onValueChange,
  disabled = false,
}: IAccordionMultiple) {
  const baseAccordionItemClasses = 'border-b border-gray-500'
  const baseAccordionTriggerClasses =
    'accordion-trigger flex items-center justify-between w-full font-medium py-unit-3'
  const baseAccordionContentClasses =
    'transition pb-unit-3 data-[state=open]:animate-accordionSlideDown data-[state=closed]:animate-accordionSlideUp overflow-hidden'

  return (
    <RadixAccordion.Root
      className={accordionRootClasses}
      type="multiple"
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {accordionItems.map((item, index) => {
        const itemKey = `${item?.name?.replaceAll(' ', '')}-${index}`
        return (
          <AccordionItem
            accordionItem={item}
            itemKey={itemKey}
            className={tailwindMerge(
              baseAccordionItemClasses,
              accordionItemClasses,
            )}
            key={itemKey}
          >
            <>
              <AccordionTrigger
                className={tailwindMerge(
                  baseAccordionTriggerClasses,
                  accordionTriggerClasses,
                )}
              >
                {/* @ts-ignore */}
                <div dangerouslySetInnerHTML={{__html: item.name}} />
                <IconArrowDown className="transition" />
              </AccordionTrigger>
              <AccordionItemContent
                className={tailwindMerge(
                  baseAccordionContentClasses,
                  accordionContentClasses,
                )}
              >
                {/* @ts-ignore */}
                {typeof item.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{__html: item.content}} />
                ) : (
                  <div className="here">{item.content}</div>
                )}
              </AccordionItemContent>
            </>
          </AccordionItem>
        )
      })}
    </RadixAccordion.Root>
  )
}
