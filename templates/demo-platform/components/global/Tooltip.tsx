'use client'

import {useState} from 'react'
import {
  autoUpdate,
  flip,
  shift,
  useHover,
  useFloating,
  useInteractions,
  useDismiss,
  useFocus,
  useRole,
  FloatingPortal,
} from '@floating-ui/react'
import {tailwindMerge} from '~/helpers'

export interface IToolipTrigger {
  triggerElementTag?: React.ElementType
  triggerElementClasses?: string
  triggerRef?: (node: any) => void
  children?: React.ReactNode
}

export interface ITooltip {
  triggerElementTag?: React.ElementType
  triggerElementClasses?: string
  tooltipClasses?: string
  children?: React.ReactNode
  tooltipText?: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  tooltipYIndent?: number
  tooltipXIndent?: number
}

function TootipTrigger({
  triggerElementTag: Component = 'span',
  triggerElementClasses,
  triggerRef,
  children,
  ...triggerProps
}: IToolipTrigger) {
  return (
    <Component
      ref={triggerRef}
      className={triggerElementClasses}
      {...triggerProps}
    >
      {children}
    </Component>
  )
}

function TooltipContent({
  children,
  tooltipClasses,
  tooltipRef,
  tooltipStyles,
  ...floatingProps
}: {
  children: React.ReactNode
  tooltipClasses?: string
  tooltipRef: (node: any) => void
  tooltipStyles: {}
}) {
  return (
    <div
      className={tooltipClasses}
      ref={tooltipRef}
      style={tooltipStyles}
      {...floatingProps}
    >
      {children}
    </div>
  )
}

export function Tooltip({
  triggerElementTag,
  children,
  triggerElementClasses,
  tooltipClasses,
  tooltipText,
  tooltipYIndent = 5,
  tooltipXIndent,
  placement = 'bottom',
}: ITooltip) {
  const [open, setOpen] = useState(false)

  const {x, y, reference, floating, strategy, context} = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const {getReferenceProps, getFloatingProps} = useInteractions([
    useHover(context, {move: false}),
    useFocus(context),
    useDismiss(context),
    useRole(context, {
      role: 'tooltip',
    }),
  ])

  const tooltipStyles = tailwindMerge(
    'border rounded bg-contrast border-gray-300 shadow-overlay p-unit-2 text-sm',
    tooltipClasses,
  )

  return (
    <>
      <TootipTrigger
        triggerRef={reference}
        triggerElementTag={triggerElementTag}
        triggerElementClasses={triggerElementClasses}
        {...getReferenceProps()}
      >
        {children}
      </TootipTrigger>
      <FloatingPortal>
        {open && (
          <TooltipContent
            tooltipRef={floating}
            tooltipStyles={{
              position: strategy,
              top: y && tooltipYIndent ? y + tooltipYIndent : y ?? 0,
              left: x && tooltipXIndent ? x + tooltipXIndent : x ?? 0,
            }}
            tooltipClasses={tooltipStyles}
            {...getFloatingProps()}
          >
            {tooltipText}
          </TooltipContent>
        )}
      </FloatingPortal>
    </>
  )
}
