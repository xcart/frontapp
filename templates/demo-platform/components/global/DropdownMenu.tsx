'use client'

import {useState} from 'react'
import {
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react'
import clsx from 'clsx'
import Link from 'next/link'

export interface IDropdownMenuItem {
  tag?: React.ElementType
  label: string
  labelClasses?: string
  icon?: string
  iconClasses?: string
  href?: string
  dropdownMenuItemStyles?: string
  separator?: boolean
  separatorClasses?: string
  disabled?: boolean
}

export interface IDropdownMenu {
  wrapper?: React.ElementType
  wrapperClasses?: string
  buttonTitle: string
  buttonClasses?: string
  buttonTag?: React.ElementType
  dropdownTag?: React.ElementType
  dropdownClasses?: string
  menuItems: IDropdownMenuItem[]
  menuItemClasses?: string
}

function DropdownMenuItem({
  tag: Component = 'div',
  label,
  labelClasses,
  icon,
  iconClasses,
  href,
  dropdownMenuItemStyles,
  separator,
  separatorClasses,
  disabled,
}: IDropdownMenuItem) {
  return (
    <Component className={dropdownMenuItemStyles} disabled={disabled}>
      {separator && <div className={separatorClasses} />}
      {icon && <span className={iconClasses}>{icon}</span>}
      {href ? (
        <Link href={href}>
          <span data-testid="DropdownMenuItemTestId">{label}</span>
        </Link>
      ) : (
        <span className={labelClasses} data-testid="DropdownMenuItemTestId">
          {label}
        </span>
      )}
    </Component>
  )
}

/**
 * Dropdown component
 * Follow https://floating-ui.com/docs/react
 */
export function DropdownMenu({
  wrapper: Wrapper = 'div',
  wrapperClasses,
  buttonTitle,
  buttonClasses,
  buttonTag: DropdownButton = 'button',
  dropdownTag: DropdownItems = 'div',
  dropdownClasses,
  menuItems,
  menuItemClasses,
}: IDropdownMenu) {
  const [open, setOpen] = useState(false)

  const {context} = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const {getReferenceProps, getFloatingProps} = useInteractions([
    useClick(context, {
      event: 'click',
      toggle: true,
    }),
    useDismiss(context),
  ])

  const wrapperStyles = clsx('relative', wrapperClasses)

  return (
    <Wrapper className={wrapperStyles}>
      <DropdownButton
        className={buttonClasses}
        ref={context.refs.setReference}
        {...getReferenceProps()}
        data-testid="DropdownButtonTestId"
      >
        {buttonTitle}
      </DropdownButton>
      {open && (
        <DropdownItems
          className={dropdownClasses}
          ref={context.refs.setFloating}
          style={{
            position: context.strategy,
            top: context.y ?? 0,
          }}
          {...getFloatingProps()}
        >
          {menuItems.map((item, index) => {
            const itemKey: string = `item-${index}`
            const styles: string = clsx(
              menuItemClasses,
              item.dropdownMenuItemStyles,
            )

            return (
              <DropdownMenuItem
                tag={item.tag}
                label={item.label}
                labelClasses={item.labelClasses}
                icon={item.icon}
                iconClasses={item.iconClasses}
                href={item.href}
                dropdownMenuItemStyles={styles || undefined}
                separator={item.separator}
                separatorClasses={item.separatorClasses}
                disabled={item.disabled}
                key={itemKey}
              />
            )
          })}
        </DropdownItems>
      )}
    </Wrapper>
  )
}
