'use client'

/**
 * TODO: Should be removed after Storybook upgrade to v7
 */
import {SetStateAction, useEffect, useRef, useState} from 'react'
import {Category} from '@xcart/storefront'
// import {useRouter} from 'next/navigation'
import {ButtonIcon, Button, ButtonBase} from '~/components/elements/Button'
import {IconArrowBack, IconClose, IconSearch} from '~/components/elements/Icons'
import {Input} from '~/components/elements/Input'
import {Categories} from '~/components/global/Categories'
import {tailwindMerge, componentOrNull} from '~/helpers'

function processRecentSearches(
  value: string,
  searches: string[],
  setSearches: (value: string[]) => void,
) {
  if (value && searches) {
    searches.unshift(value)

    if (searches.length > 3) {
      searches.splice(3, 1)
    }

    setSearches(searches)
  }
}

function SearchPanel({
  searchOpen,
  setSearchOpen,
  changeHandler,
  searchValue,
  popular,
}: {
  searchOpen?: boolean
  setSearchOpen: (value: SetStateAction<boolean>) => void
  changeHandler: (value: string) => void
  searchValue?: string
  popular?: Category[]
}) {
  const [openPanel, setOpenPanel] = useState(false)
  const [recent, setRecent] = useState<string[]>([])
  const spanRef = useRef(null as HTMLSpanElement | null)
  // const router = useRouter()

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        setOpenPanel(true)
        spanRef.current?.querySelector('input')?.focus()
      }, 600)
    } else {
      setOpenPanel(false)
    }
  }, [searchOpen])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchValue) {
      changeHandler(searchValue)
      setSearchOpen(false)
      processRecentSearches(searchValue, recent, setRecent)
      // router.push(`/search?q=${searchValue}`)
    }
  }

  const removeRecentSearchString = (str: string) => {
    const filtered = recent.filter(item => {
      return item !== str
    })

    setRecent(filtered)
  }

  const wrapperStyles =
    'transition-all duration-500 fixed z-10 top-0 right-0 overflow-hidden w-0 h-0 opacity-0 lg:top-[40px] flex flex-col items-end'
  const openWrapperStyles = searchOpen
    ? 'w-full h-screen opacity-1 visibility-visible'
    : ''
  const panelOpenStyles =
    'transition-all duration-300 w-full page bg-contrast overflow-hidden h-0 grow-0 px-unit-4 lg:px-unit-16'

  const panelStyles = (styles: object) => {
    return openPanel ? styles : undefined
  }

  return (
    <div className={tailwindMerge(wrapperStyles, openWrapperStyles)}>
      <div
        className="duration-400 w-0 overflow-hidden border-b border-b-gray-300 bg-contrast opacity-0 transition-all delay-200 ease-in-out"
        style={searchOpen ? {width: '100%', opacity: 1} : undefined}
      >
        <div className="page flex w-full py-unit-2 px-unit-4 lg:px-unit-16">
          <Button
            variant="light"
            className="mr-unit-6 flex h-unit-8 w-unit-8 min-w-unit-8 items-center justify-center p-0 transition"
            onClick={() => setSearchOpen(false)}
          >
            <IconArrowBack className="w-[18px] fill-primary" />
          </Button>
          <div className="relative w-full">
            <button
              type="button"
              className="absolute top-0 left-0 z-10 flex h-unit-8 w-unit-8 items-center justify-center"
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
              />
            </span>
            {searchValue && (
              <button
                type="button"
                className="absolute top-0 right-0 flex h-unit-8 w-unit-8 items-center justify-center"
                onClick={() => changeHandler('')}
              >
                <IconClose className="w-unit-4 stroke-gray-700" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          searchOpen
            ? tailwindMerge(panelOpenStyles, 'animate-searchPanelIn')
            : tailwindMerge(panelOpenStyles, 'animate-searchPanelOut')
        }
        style={panelStyles({height: 'auto', flexGrow: 1})}
      >
        {componentOrNull(
          recent.length > 0,
          <div
            className="py-unit-9 pl-unit-14 opacity-0 transition-opacity duration-1000"
            style={panelStyles({opacity: 1})}
          >
            <h2 className="mb-unit-4">
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
                      className="ml-[-5px] grow rounded-base py-unit pr-unit-4 pl-unit text-left transition hover:bg-gray-300"
                      onClick={() => {
                        setSearchOpen(false)
                        changeHandler(item)
                        // router.push(`/search?q=${item}`)
                      }}
                    >
                      {item}
                    </ButtonBase>
                    <ButtonIcon
                      className="ml-unit-3 h-unit-8 w-unit-8 rounded-base"
                      onClick={() => removeRecentSearchString(item)}
                    >
                      <IconClose className="w-unit-4 stroke-gray-700" />
                    </ButtonIcon>
                  </li>
                )
              })}
            </ul>
          </div>,
        )}
        {popular && popular.length > 0 && (
          <div
            className="py-unit-9 opacity-0 transition-opacity delay-200 duration-1000 lg:pl-unit-14"
            style={panelStyles({opacity: 1})}
          >
            <h2 className="mb-unit-4">Popular</h2>
            <Categories
              categories={popular}
              rootClasses="flex-col items-start"
              itemClasses="px-0 mb-unit-2"
              linkClasses="text-primary after:hidden"
              handleClick={() => setSearchOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export function Search({popular}: {popular?: Category[]}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [value, setValue] = useState('')

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
    // eslint-disable-next-line consistent-return
    return () => document.body.removeEventListener('keydown', onDocumentKeydown)
  }, [searchOpen])

  const changeHandler = (inputValue: SetStateAction<string>) => {
    setValue(inputValue)
  }

  const clickHandler = () => {
    setSearchOpen(!searchOpen)
  }

  return (
    <>
      <ButtonIcon
        onClick={() => clickHandler()}
        className="ml-unit-3 lg:hidden"
      >
        <IconSearch />
      </ButtonIcon>
      <div className="relative">
        <button
          type="button"
          className="relative hidden h-unit-8 w-[280px] rounded-base bg-gray-300 pl-unit-8 text-left text-gray-700 transition hover:bg-gray-500 lg:block"
          onClick={() => clickHandler()}
        >
          <>
            <IconSearch className="absolute top-1/2 left-[12px] flex -translate-y-1/2 items-center justify-center" />
            {value || 'Search'}
          </>
        </button>
        {value && (
          <button
            type="button"
            className="absolute top-0 right-0 hidden h-unit-8 w-unit-8 items-center justify-center lg:flex"
            onClick={() => changeHandler('')}
          >
            <IconClose className="w-unit-4 stroke-gray-700" />
          </button>
        )}
      </div>
      <SearchPanel
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        changeHandler={changeHandler}
        searchValue={value}
        popular={popular}
      />
    </>
  )
}
