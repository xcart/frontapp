'use client'

import React, {
  createContext,
  createRef,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as Portal from '@radix-ui/react-portal'
import {disableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock'
import {IButton, ButtonProps, ButtonIcon} from '~/components/elements/Button'
import {IconClose} from '~/components/elements/Icons'
import {Alert} from '~/components/global/Alert'
import {tailwindMerge} from '~/helpers'
import {ModalProvider} from '../../providers/ModalContext'

export interface IDrawer {
  children: React.ReactNode
  triggerElement: React.ReactElement
  width?: string
  position?: 'fixed' | 'absolute'
  top?: number
  rootClasses?: string
  direction?: 'left' | 'right'
  hasOverlay?: boolean
  overlayClasses?: string
  onChange?: (value: boolean) => void
  duration?: number
}

interface IDrawerContext {
  open: boolean
  setOpen: (newValue: boolean) => void
  setAlert: (newValue: string | null) => void
  panelRef: RefObject<HTMLDivElement>
}

export const DrawerContext = createContext<IDrawerContext>({
  open: false,
  setOpen: () => {},
  setAlert: () => {},
  panelRef: createRef<HTMLDivElement>(),
})
DrawerContext.displayName = 'DrawerContext'

export function useDrawer() {
  return useContext(DrawerContext)
}

export function useInView(
  targetElm: RefObject<HTMLDivElement>,
  scrollableContainer: RefObject<HTMLDivElement>,
) {
  const [isInView, setIsInView] = useState(false)

  // @ts-ignore
  useEffect(() => {
    if (!scrollableContainer.current || !targetElm.current) {
      return
    }

    let observer: IntersectionObserver | null = null
    const target = targetElm.current
    const options = {
      root: scrollableContainer.current,
      rootMargin: '-90px',
      threshold: 0,
    }

    observer = new IntersectionObserver(e => {
      setIsInView(!e[0].isIntersecting)
    }, options)

    observer.observe(target)

    return () => observer !== null && observer.unobserve(target)
  }, [targetElm, scrollableContainer])

  return isInView
}

function Close({children}: {children: React.ReactElement}) {
  const {setOpen} = useDrawer()

  const onClick = () => {
    setOpen(false)
  }

  return (
    <>
      {React.Children.map(children, child =>
        React.cloneElement(child, {onClick}),
      )}
    </>
  )
}

function CloseButton({children, onClick, ...props}: IButton & ButtonProps) {
  return (
    <ButtonIcon
      className="relative -right-[4px] h-unit-4 w-unit-4 md:-right-[10px] md:h-unit-6 md:w-unit-6"
      onClick={onClick}
      {...props}
      aria-label="Close"
    >
      {children}
    </ButtonIcon>
  )
}

function StickyHeader({
  children,
  scrolledUnder = false,
  title,
  forceTitleVisibility = false,
}: {
  children?: React.ReactElement
  scrolledUnder?: boolean
  title?: React.ReactElement | string
  forceTitleVisibility?: boolean
}) {
  const headerClasses = tailwindMerge(
    'bg-contrast flex sticky top-0 h-unit-12 items-center justify-between px-unit-4 md:px-unit-12 z-10',
    scrolledUnder ? 'shadow-top' : '',
  )

  return (
    <div className={headerClasses}>
      <div className="flex w-full items-center justify-between">
        <span
          className={
            scrolledUnder || forceTitleVisibility
              ? 'opacity-1 transition-opacity duration-300'
              : 'opacity-0'
          }
        >
          {title}
        </span>
        <span className="flex items-center gap-unit-2">
          <span
            className={
              scrolledUnder
                ? 'opacity-1 flex items-center transition-opacity duration-300'
                : 'opacity-0'
            }
          >
            {children ?? null}
          </span>
          <Close>
            <CloseButton>
              <IconClose className="fill-gray-700" />
            </CloseButton>
          </Close>
        </span>
      </div>
    </div>
  )
}

function Content({
  children,
  className,
}: {
  children: React.ReactElement
  className?: string
}) {
  const {open, setOpen} = useDrawer()

  return (
    <ModalProvider value={{open, setOpen}}>
      <div
        className={tailwindMerge(
          'mt-unit-2 px-unit-4 md:px-unit-12',
          className ?? '',
        )}
      >
        {children}
      </div>
    </ModalProvider>
  )
}

function StickyFooter({children}: {children: React.ReactElement}) {
  return (
    <div className="fixed bottom-0 w-full bg-contrast px-unit-4 py-unit-2 shadow-bottom md:px-unit-12 md:py-unit-4">
      {children}
    </div>
  )
}

export function Drawer({
  children,
  triggerElement,
  width = '80%',
  position = 'fixed',
  top = 0,
  direction = 'left',
  rootClasses = 'bg-contrast z-modal',
  hasOverlay = true,
  overlayClasses = 'fixed z-modal top-0 right-0 bottom-0 left-0 bg-gray-700 opacity-80',
  onChange,
  duration = 200,
}: IDrawer) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [translate, setTranslate] = useState(0)
  const [alert, setAlert] = useState<string | null>(null)

  const w =
    width.endsWith('px') && typeof window !== 'undefined'
      ? `${Math.min(Number(width.replace('px', '')), window.innerWidth)}px`
      : width

  const panelDirection: object =
    direction === 'left' ? {right: `-${w}`} : {left: `-${w}`}
  const minus: string = direction === 'left' ? '-' : ''

  const panelRef = useRef<HTMLDivElement>()
  const overlayRef = hasOverlay ? createRef<HTMLDivElement>() : null

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setTranslate(open ? 100 : 0)

    if (onChange) {
      onChange(open)
    }
  }, [open, onChange])

  useEffect(() => {
    if (!open) {
      return
    }

    function onDocumentKeydown({key}: {key: string}) {
      if (key === 'Escape') {
        setOpen(false)
      }
    }

    document.body.addEventListener('keydown', onDocumentKeydown)

    const contentElement = panelRef.current

    if (contentElement) {
      disableBodyScroll(contentElement, {reserveScrollBarGap: true})
    }

    return () => {
      document.body.removeEventListener('keydown', onDocumentKeydown)
      clearAllBodyScrollLocks()
    }
  }, [open, panelRef])

  const drawerContextProviderValue = useMemo(
    () => ({open, setOpen, setAlert, panelRef}),
    [open, setOpen, setAlert, panelRef],
  )

  return (
    // @ts-ignore
    <DrawerContext.Provider value={drawerContextProviderValue}>
      {React.cloneElement(triggerElement, {onClick: () => setOpen(true)})}

      {mounted && (
        <Portal.Root>
          {hasOverlay && open && (
            <div
              id="DrawerOverlay"
              ref={overlayRef}
              className={overlayClasses}
            />
          )}
          <div
            className={rootClasses}
            style={{
              position,
              top,
              height: '100%',
              width: `${w}`,
              overflow: 'hidden',
              transition: `transform ${
                open ? duration : duration / 2
              }ms ease-in-out`,
              transform: open
                ? `translateX(${minus}${translate}%)`
                : `translateX(${translate})`,
              ...panelDirection,
            }}
          >
            {alert && <Alert message={alert} closeButton />}
            {/* @ts-ignore */}
            <div style={{height: '100%', overflowY: 'auto'}} ref={panelRef}>
              {children}
            </div>
          </div>
        </Portal.Root>
      )}
    </DrawerContext.Provider>
  )
}

Drawer.Close = Close
Drawer.Content = Content
Drawer.StickyHeader = StickyHeader
Drawer.StickyFooter = StickyFooter
