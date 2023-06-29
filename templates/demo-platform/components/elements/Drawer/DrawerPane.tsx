import {useRef} from 'react'
import {Drawer, useDrawer, useInView} from '~/components/elements/Drawer/Drawer'
import {DrawerTitle} from '~/components/elements/Drawer/DrawerTitle'
import {tailwindMerge} from '~/helpers'

export function DrawerPane({
  children,
  title,
  forceTitleVisibility,
  itemsCount,
  stickyFooter,
  stickySecondaryAction,
  drawerSecondaryAction,
  hideDrawerTitle,
  drawerPaneClasses,
}: {
  children: React.ReactElement
  title: string | React.ReactElement
  forceTitleVisibility?: boolean
  itemsCount?: number
  stickyFooter?: React.ReactElement
  stickySecondaryAction?: React.ReactElement
  drawerSecondaryAction?: React.ReactElement
  hideDrawerTitle?: boolean
  drawerPaneClasses?: string
}) {
  const {panelRef} = useDrawer()
  const ref = useRef<HTMLDivElement>(null)
  const scrolledUnderHeader = useInView(ref, panelRef)

  return (
    <>
      <Drawer.StickyHeader
        scrolledUnder={scrolledUnderHeader}
        title={<DrawerTitle count={itemsCount}>{title}</DrawerTitle>}
        forceTitleVisibility={forceTitleVisibility}
      >
        {stickySecondaryAction}
      </Drawer.StickyHeader>
      <Drawer.Content
        className={tailwindMerge('mb-[100px] md:mb-[140px]', drawerPaneClasses)}
      >
        <>
          <div
            className={tailwindMerge(
              'flex items-center justify-between',
              scrolledUnderHeader || hideDrawerTitle ? 'invisible' : '',
              itemsCount && itemsCount > 0 ? 'mb-unit-3' : 'mb-unit',
            )}
            ref={ref}
          >
            <DrawerTitle count={itemsCount}>{title}</DrawerTitle>
            {drawerSecondaryAction}
          </div>
          <div
            className={tailwindMerge(
              'flex flex-col gap-unit-8',
              hideDrawerTitle ? 'relative -top-[35px]' : '',
            )}
          >
            {children}
          </div>
        </>
      </Drawer.Content>
      {stickyFooter ? (
        <Drawer.StickyFooter>{stickyFooter}</Drawer.StickyFooter>
      ) : null}
    </>
  )
}
