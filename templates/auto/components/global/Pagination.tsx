'use client'

import {Fragment, useEffect, useState} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {Button} from '~/components/elements/Button'
import {IconArrowBack} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'

export function Pagination({
  last,
  current,
  isFetching,
  setIsFetching,
  params,
}: {
  last: number
  current: number
  isFetching: boolean
  setIsFetching?: (value: boolean) => void
  params?: {[key: string]: string | string[] | undefined}
}) {
  const [clicked, setClicked] = useState<number | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (setIsFetching && current === clicked) {
      setIsFetching(false)
    }
  }, [clicked, current, setIsFetching])

  if (last <= 1) {
    return null
  }

  const url = (page: number) => {
    const searchParams = new URLSearchParams()

    if (params) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
          value.map(v => searchParams.append(key, String(v)))
        } else {
          searchParams.set(key, String(value))
        }
      }
    }

    searchParams.set('page', String(page))

    return `${pathname}?${searchParams.toString()}`
  }

  const hasPrev = current !== 1
  const hasNext = current !== last

  const handleClick = (param: any, value?: number) => {
    if (value) {
      setClicked(value)
    }

    router.push(param)

    if (setIsFetching) {
      setIsFetching(true)
    }
  }

  const baseStyles = tailwindMerge(
    'p-0 min-w-unit-8 w-unit-8 h-unit-8 flex items-center justify-center transition rounded',
    isFetching ? 'pointer-events-none cursor-progress' : '',
  )

  const activeStyles = tailwindMerge(
    baseStyles,
    'border cursor-default pointer-events-none lg:text-base',
  )
  const nonActiveStyles = tailwindMerge(
    baseStyles,
    'hidden border border-gray-500 font-normal lg:flex lg:text-base hover:opacity-1 hover:border-gray-300',
  )

  const separator =
    last > 5 ? (
      <button className="hidden h-unit-8 w-unit-8 cursor-default text-lg lg:block">
        …
      </button>
    ) : (
      ''
    )

  const renderButtons = (total: number) => {
    const active = (val: number) => {
      return clicked ? clicked === val : current === val
    }

    const button = (buttonValue: number, key: string) => (
      <Button
        variant={active(buttonValue) ? 'primary' : 'secondary'}
        className={active(buttonValue) ? activeStyles : nonActiveStyles}
        value={buttonValue}
        onClick={e => {
          const target = e.target as HTMLButtonElement
          handleClick(url(buttonValue), Number(target.value))
        }}
        key={key}
        aria-label={buttonValue.toString()}
      >
        {buttonValue}
      </Button>
    )

    return [...Array(total)].map((_item, index) => {
      const key = `item-${index}`
      const buttonValue = index + 1

      return total < 6 ? (
        button(buttonValue, key)
      ) : (
        <Fragment key={key}>
          {(current !== 1 && index === 0) ||
          current === buttonValue ||
          (current !== last && buttonValue === total) ? (
            <>
              {current !== last && buttonValue === total ? separator : null}

              {button(buttonValue, key)}

              {current !== 1 && index === 0 ? separator : null}
            </>
          ) : null}
        </Fragment>
      )
    })
  }

  return (
    <div className="flex justify-center gap-unit-4">
      <Button
        variant="light"
        className={baseStyles}
        onClick={() =>
          handleClick(url(Math.max(current - 1, 1)), Math.max(current - 1, 1))
        }
        disabled={!hasPrev}
        aria-label="Previous"
      >
        <IconArrowBack className="w-[18px] fill-primary" />
      </Button>

      {renderButtons(last)}

      <Button
        variant="light"
        className={baseStyles}
        onClick={() => handleClick(url(current + 1), Number(current + 1))}
        disabled={!hasNext}
        aria-label="Next"
      >
        <IconArrowBack className="w-[18px] rotate-180 fill-primary" />
      </Button>
    </div>
  )
}
