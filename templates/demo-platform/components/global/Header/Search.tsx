'use client'

import {createRef, SetStateAction, useEffect, useRef, useState} from 'react'
import {Category} from '@xcart/storefront'
import {disableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock'
import {useRouter, useSearchParams} from 'next/navigation'
import {ButtonIcon, Button, ButtonBase} from '~/components/elements/Button'
import {IconArrowBack, IconClose, IconSearch} from '~/components/elements/Icons'
import {Input} from '~/components/elements/Input'
import {Categories} from '~/components/global/Categories'
import {ProductsGrid} from '~/components/products/ProductsGrid'
import {ModalProvider} from '~/components/providers/ModalContext'
import {tailwindMerge, componentOrNull} from '~/helpers'
import {useCloudSearch} from '../Filters/hooks/use-cloud-search'

function processRecentSearches(value: string, searches: string[]) {
  if (value && searches) {
    if (searches.find(str => str === value)) {
      return
    }

    searches.unshift(value)

    if (searches.length > 3) {
      searches.splice(3, 1)
    }

    localStorage.setItem('xc-recent-searches', JSON.stringify({...searches}))
  }
}

function SearchPanel({
  searchOpen,
  setSearchOpen,
  changeHandler,
  searchValue,
  popular,
  cloudSearchInfo,
}: {
  searchOpen?: boolean
  setSearchOpen: (value: SetStateAction<boolean>) => void
  changeHandler: (value: string) => void
  searchValue?: string
  popular?: Category[]
  cloudSearchInfo: any
}) {
  const [openPanel, setOpenPanel] = useState(false)
  const [recent, setRecent] = useState<string[]>([])
  const spanRef = useRef(null as HTMLSpanElement | null)
  const router = useRouter()
  const panelRef = createRef<HTMLDivElement>()
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const desktopHeader = panelRef.current?.closest('.page')

    const calculatePanelTopOffset = (elem: Element) => {
      const dist = elem?.getBoundingClientRect().top

      if (typeof dist !== undefined) {
        panelRef.current?.style.setProperty('top', `${dist}px`)
        setDistance(dist)
      }
    }

    if (desktopHeader) {
      calculatePanelTopOffset(desktopHeader)
    }

    if (searchOpen) {
      if (panelRef && panelRef.current) {
        if (desktopHeader) {
          calculatePanelTopOffset(desktopHeader)
        }

        disableBodyScroll(panelRef.current, {reserveScrollBarGap: true})
      }
      setTimeout(() => {
        setOpenPanel(true)
        spanRef.current?.querySelector('input')?.focus()
      }, 600)
    } else {
      clearAllBodyScrollLocks()
      setOpenPanel(false)
    }
  }, [panelRef, searchOpen, setDistance])

  const submit = () => {
    if (searchValue) {
      setSearchOpen(false)
      processRecentSearches(searchValue, recent)
      router.push(`/search?q=${searchValue}`)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchValue) {
      changeHandler(searchValue)
      submit()

      event.currentTarget.blur()
    }
  }

  const removeRecentSearchString = (str: string) => {
    const filtered = recent.filter(item => {
      return item !== str
    })

    localStorage.setItem('xc-recent-searches', JSON.stringify({...filtered}))

    setRecent(filtered)
  }

  useEffect(() => {
    if (!recent.length) {
      const saved = localStorage.getItem('xc-recent-searches')

      if (saved && Object.keys(JSON.parse(saved)).length) {
        setRecent(Object.values(JSON.parse(saved)))
      }
    }
  }, [recent])

  const wrapperStyles =
    'fixed z-10 top-0 right-0 overflow-hidden w-0 h-0 opacity-0 lg:top-[40px] flex flex-col items-end'
  const openWrapperStyles = searchOpen
    ? 'w-full h-screen opacity-1 visibility-visible'
    : ''
  const panelOpenStyles =
    'transition-all duration-300 w-full page bg-contrast overflow-hidden h-0 grow-0 px-unit-4 lg:px-unit-16'

  const panelStyles = (styles: object) => {
    return openPanel ? styles : undefined
  }

  return (
    <div
      ref={panelRef}
      className={tailwindMerge(wrapperStyles, openWrapperStyles)}
    >
      <div
        className="duration-400 min-h-[60px] w-0 overflow-hidden border-b border-b-gray-300 bg-contrast opacity-0 transition-all delay-200 ease-in-out"
        style={searchOpen ? {width: '100%', opacity: 1} : undefined}
      >
        <div className="page flex w-full px-unit-4 py-unit-2 lg:px-unit-16">
          <Button
            variant="light"
            className="mr-unit-6 flex h-unit-8 w-unit-8 min-w-unit-8 items-center justify-center p-0 transition-colors"
            onClick={() => setSearchOpen(false)}
            aria-label="Close"
          >
            <IconArrowBack className="w-[18px] fill-primary" />
          </Button>
          <div className="relative w-full">
            <button
              type="button"
              className="absolute left-0 top-0 z-10 flex h-unit-8 w-unit-8 items-center justify-center"
              aria-label="Search"
            >
              <IconSearch className="w-[16px] fill-primary" />
            </button>
            <span ref={spanRef}>
              <Input
                type="search"
                inputClasses="w-full lg:h-unit-8 pl-unit-8 min-w-min"
                onChange={event => {
                  changeHandler(event.target.value)
                }}
                onKeyDown={event => handleKeyDown(event)}
                value={searchValue || ''}
                autoFocus
                aria-label="Search..."
              />
            </span>
            {searchValue && (
              <button
                type="button"
                className="absolute right-0 top-0 flex h-unit-8 w-unit-8 items-center justify-center"
                onClick={() => changeHandler('')}
                aria-label="Close"
              >
                <IconClose className="w-unit-4 fill-gray-700" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          searchOpen
            ? tailwindMerge(
                panelOpenStyles,
                'animate-searchPanelIn overflow-y-scroll',
              )
            : tailwindMerge(
                panelOpenStyles,
                'animate-searchPanelOut overflow-y-scroll',
              )
        }
        style={panelStyles({height: 'auto', flexGrow: 1})}
      >
        {componentOrNull(
          recent.length > 0 && cloudSearchInfo.numFound === 0,
          <div
            className="pt-unit-8 opacity-0 transition-opacity duration-1000 lg:pl-unit-14"
            style={panelStyles({opacity: 1})}
          >
            <h2 className="mb-unit-3 lg:mb-unit-4">
              Recent
              <span className="hidden lg:inline"> Searches</span>
            </h2>
            <ul>
              {recent.map((item, index) => {
                const itemKey = item.replace(' ', '') + index
                return (
                  <li
                    key={itemKey}
                    className="flex items-center justify-between"
                  >
                    <ButtonBase
                      className="ml-[-5px] grow rounded-base py-unit pl-unit pr-unit-4 text-left transition-colors hover:bg-gray-300"
                      onClick={() => {
                        setSearchOpen(false)
                        changeHandler(item)
                        router.push(`/search?q=${item}`)
                      }}
                      aria-label={item}
                    >
                      {item}
                    </ButtonBase>
                    <ButtonIcon
                      className="ml-unit-3 h-unit-8 w-unit-8 rounded-base"
                      onClick={() => removeRecentSearchString(item)}
                      aria-label="Close"
                    >
                      <IconClose className="w-unit-4 fill-gray-700" />
                    </ButtonIcon>
                  </li>
                )
              })}
            </ul>
          </div>,
        )}
        {popular && popular.length > 0 && cloudSearchInfo.numFound === 0 && (
          <div
            className="py-unit-8 opacity-0 transition-opacity delay-200 duration-1000 lg:pl-unit-14"
            style={panelStyles({opacity: 1})}
          >
            <h2 className="mb-unit-3 lg:mb-unit-4">Popular</h2>
            <Categories
              categories={popular}
              rootClasses="flex-col items-start"
              itemClasses="px-0 w-full"
              linkClasses="text-primary transition-colors block ml-[-5px] mr-[-5px] pl-unit py-unit rounded-base hover:bg-gray-300 after:hidden"
              handleClick={() => setSearchOpen(false)}
            />
          </div>
        )}
        {cloudSearchInfo.numFound !== 0 && (
          <div className="flex h-[100%] flex-col justify-between">
            <div className="mb-unit-12 mt-unit-8">
              <ModalProvider
                value={{open: searchOpen as boolean, setOpen: setSearchOpen}}
              >
                <ProductsGrid products={cloudSearchInfo.products} />
              </ModalProvider>
              {!!cloudSearchInfo.hasMore && (
                <div className="mt-unit-12">
                  <button
                    className="text-left underline"
                    onClick={submit}
                    aria-label="See more results"
                  >
                    {`See more results for ”${searchValue}” (${cloudSearchInfo.numFound} products found)`}
                  </button>
                </div>
              )}
            </div>
            <div
              className="text-xs text-gray-700"
              style={{paddingBottom: `calc(30px + ${distance}px)`}}
            >
              <a
                className="no-underline"
                href="https://www.xcart.com/ecommerce-search-engine.html"
              >
                Search powered by Cloud Search
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function Search({popular}: {popular?: Category[]}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const searchParam = useSearchParams()

  const searchQuery = searchParam?.get('q')
    ? (searchParam?.get('q') as string)
    : ''

  const [value, setValue] = useState<string>(searchQuery)

  const cloudSearchInfo = useCloudSearch(value)

  useEffect(() => {
    if (!searchOpen) {
      return
    }

    function onDocumentKeydown({key}: {key: string}) {
      if (key === 'Escape') {
        setSearchOpen(false)
      }
    }

    document.body.addEventListener('keydown', onDocumentKeydown)

    return () => document.body.removeEventListener('keydown', onDocumentKeydown)
  }, [searchOpen])

  const changeHandler = (inputValue: SetStateAction<string>) => {
    setValue(inputValue)
  }

  const clickHandler = () => {
    setSearchOpen(!searchOpen)
  }

  useEffect(() => {
    if (searchParam?.get('q')) {
      setValue(prevValue => searchParam?.get('q') || prevValue)
    }
  }, [searchParam])

  return (
    <>
      <ButtonIcon
        onClick={clickHandler}
        className="ml-unit-3 h-unit-6 w-unit-6 lg:hidden"
        aria-label="Search"
      >
        <IconSearch />
      </ButtonIcon>
      <div className="relative lg:mr-unit-5">
        <button
          type="button"
          className={tailwindMerge(
            'relative hidden h-unit-8 w-[280px] rounded-base border border-gray-300 bg-gray-300 pl-unit-8 text-left text-gray-700 transition-colors hover:bg-gray-500 lg:block',
            value !== '' ? 'border-gray-500 pr-unit-8' : '',
          )}
          onClick={() => clickHandler()}
          aria-label="Search"
        >
          <>
            <IconSearch className="absolute left-[12px] top-1/2 flex -translate-y-1/2 items-center justify-center" />
            <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {value || 'Search'}
            </span>
          </>
        </button>
        {value && (
          <button
            type="button"
            className="absolute right-0 top-0 hidden h-unit-8 w-unit-8 items-center justify-center lg:flex"
            onClick={() => changeHandler('')}
            aria-label="Close"
          >
            <IconClose className="w-unit-4 fill-gray-700" />
          </button>
        )}
      </div>
      <SearchPanel
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        changeHandler={changeHandler}
        searchValue={value}
        popular={popular}
        cloudSearchInfo={cloudSearchInfo}
      />
    </>
  )
}
