'use client'

import {forwardRef, ForwardedRef} from 'react'
import * as RadixAccordion from '@radix-ui/react-accordion'

/**
 * Follow https://www.radix-ui.com/docs/primitives/components/accordion
 */

export interface IAccordion {
  accordionRootClasses?: string
  accordionItemClasses?: string
  accordionTriggerClasses?: string
  accordionContentClasses?: string
  accordionItems: IAccordionItems[]
  disabled?: boolean
}

export interface IAccordionItems {
  name?: string
  content?: React.ReactNode
  disabled?: boolean
}

export interface IAccordionItem {
  children: React.ReactNode
  accordionItem: {
    className?: string
    disabled?: boolean
  }
  className?: string
  itemKey: string
}

export interface IAccordionElement {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export const AccordionTrigger = forwardRef(
  (
    {children, className, ...props}: IAccordionElement,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
  ) => (
    <RadixAccordion.Header>
      <RadixAccordion.Trigger
        className={className}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  ),
)

export const AccordionItemContent = forwardRef(
  (
    {children, className, ...props}: IAccordionElement,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => (
    <RadixAccordion.Content className={className} {...props} ref={forwardedRef}>
      <div>{children}</div>
    </RadixAccordion.Content>
  ),
)

export function AccordionItem({
  children,
  accordionItem,
  className,
  itemKey,
}: IAccordionItem) {
  return (
    <RadixAccordion.Item
      className={className}
      disabled={accordionItem.disabled}
      value={itemKey}
      key={itemKey}
    >
      {children}
    </RadixAccordion.Item>
  )
}
