'use client'

import {useState} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {Button} from '~/components/elements/Button'
import {tailwindMerge} from '~/helpers'

function LetterButton({
  name,
  onClick,
  currentValue,
  disabled,
}: {
  name: string
  onClick: (event: any) => void
  currentValue: string
  disabled?: boolean
}) {
  const activeValue = currentValue.toUpperCase() === name.toUpperCase()

  return (
    <li className="mx-unit">
      <Button
        variant={activeValue ? 'primary' : 'secondary'}
        value={name}
        className={tailwindMerge(
          'mb-unit-2 h-unit-8 w-unit-8 border p-button lg:p-button',
          !activeValue && 'border-gray-500 font-normal',
          disabled && 'line-through',
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {name}
      </Button>
    </li>
  )
}

export function AlphabeticalSearch({
  firstLetter,
  itemsFirstLetters,
  params,
}: {
  firstLetter?: string
  itemsFirstLetters?: (string | undefined)[]
  params?: {[key: string]: string | string[] | undefined}
}) {
  const [currentValue, setCurrentValue] = useState<string>(firstLetter || 'All')
  const pathname = usePathname()
  const router = useRouter()
  const alphabet = [...'abcdefghijklmnopqrstuvwxyz']

  const url = (param: string) => {
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

    if (param === '') {
      searchParams.delete('firstLetter')
    } else {
      searchParams.set('firstLetter', String(param))
    }

    return `${pathname}?${searchParams.toString()}`
  }

  const handleClick = (param: string, value: string) => {
    setCurrentValue(value || 'All')
    router.push(param)
  }

  return (
    <ul className="mx-[-5px] mb-unit-6 flex flex-wrap">
      <LetterButton
        name="All"
        onClick={event => handleClick(url(''), event.target.value)}
        currentValue={currentValue}
      />
      {alphabet.map((letter: string, index: number) => {
        const key = `${letter}-${index}`
        return (
          <LetterButton
            name={letter.toUpperCase()}
            key={key}
            onClick={event => handleClick(url(letter), event.target.value)}
            currentValue={currentValue}
            disabled={!itemsFirstLetters?.includes(letter.toUpperCase())}
          />
        )
      })}
    </ul>
  )
}
