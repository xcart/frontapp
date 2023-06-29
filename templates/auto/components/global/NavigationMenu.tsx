'use client'

import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu'

export interface IMenuItems {
  id: number
  name: string
  href?: string
  items?: IMenuItems[]
  className?: string
}

export interface INavigationMenu {
  menuItems: IMenuItems[]
  delayDuration?: RadixNavigationMenu.NavigationMenuProps['delayDuration']
  rootOrientation?: RadixNavigationMenu.NavigationMenuProps['orientation']
  rootOnValueChange?: RadixNavigationMenu.NavigationMenuProps['onValueChange']
  rootValue?: RadixNavigationMenu.NavigationMenuProps['value']
  rootClasses?: string
  rootItemClasses?: string
  subListClasses?: string
  subListItemClasses?: string
  subItemClasses?: string
}

export function MenuItem({
  id,
  name,
  href,
  className,
}: {
  id: number
  name: string
  href?: string
  className?: string
}) {
  return href ? (
    <RadixNavigationMenu.Link className={className} href={href} key={id}>
      {name}
    </RadixNavigationMenu.Link>
  ) : (
    <span className={className} key={id}>
      {name}
    </span>
  )
}

/**
 * Follow https://www.radix-ui.com/docs/primitives/components/navigation-menu
 */
export function NavigationMenu({
  menuItems,
  delayDuration,
  rootOrientation = 'horizontal',
  rootOnValueChange,
  rootValue,
  rootClasses,
  rootItemClasses,
  subListClasses,
  subListItemClasses,
  subItemClasses,
}: INavigationMenu) {
  return (
    <RadixNavigationMenu.Root
      delayDuration={delayDuration}
      orientation={rootOrientation}
      onValueChange={rootOnValueChange}
      value={rootValue}
      className={rootClasses}
    >
      <RadixNavigationMenu.List>
        {menuItems.map(item => {
          const content = item.items?.length && (
            <ul className={subListClasses}>
              {item.items.map(sub => {
                return (
                  <li className={subListItemClasses} key={sub.id}>
                    <MenuItem
                      id={sub.id}
                      name={sub.name}
                      href={sub.href}
                      className={subItemClasses}
                    />
                  </li>
                )
              })}
            </ul>
          )

          return (
            <RadixNavigationMenu.Item key={item.id}>
              {item.items ? (
                <>
                  <RadixNavigationMenu.Trigger>
                    <MenuItem
                      id={item.id}
                      name={item.name}
                      href={item.href}
                      className={rootItemClasses}
                    />
                  </RadixNavigationMenu.Trigger>
                  <RadixNavigationMenu.Content>
                    {content}
                  </RadixNavigationMenu.Content>
                </>
              ) : (
                <MenuItem
                  id={item.id}
                  name={item.name}
                  href={item.href}
                  className={rootItemClasses}
                />
              )}
            </RadixNavigationMenu.Item>
          )
        })}
      </RadixNavigationMenu.List>
    </RadixNavigationMenu.Root>
  )
}
