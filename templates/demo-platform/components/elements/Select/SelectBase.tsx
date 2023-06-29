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
import {IconArrowDown} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'

export interface IOption {
  id?: string | number
  name?: string
  value?: string
  optionClasses?: string
  clickHandler?: (e: any) => void
}

export interface ISelect {
  wrapper?: React.ElementType
  tag?: React.ElementType
  label?: any
  defaultValue?: string
  selectedOptionClasses?: string
  options: IOption[]
  handleChange?: (values: any) => void
  selectClasses?: string
  optionsDropdownClasses?: string
  selectedOptionDropdownClasses?: string
  optionClasses?: string
  showArrow?: boolean
}

function Option({id, name, value, optionClasses, clickHandler}: IOption) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li
      className={optionClasses}
      data-value={value}
      data-name={name}
      data-id={id}
      onClick={clickHandler}
    >
      {name}
    </li>
  )
}

export function SelectBase({
  wrapper: Wrapper = 'div',
  tag: Component = 'div',
  label: Label,
  defaultValue,
  selectedOptionClasses,
  options,
  handleChange,
  selectClasses = 'relative',
  optionClasses,
  optionsDropdownClasses,
  selectedOptionDropdownClasses = 'font-semibold',
  showArrow,
  ...props
}: ISelect) {
  const [open, setOpen] = useState<boolean>(false)

  interface OptionValues {
    name?: string
    value?: string
  }

  const defaultSelectedOption = () => {
    let defaultOption: OptionValues = {
      name: 'Select option',
      value: '',
    }

    if (defaultValue) {
      options.forEach(option => {
        if (option.value !== '' && option.value === defaultValue) {
          defaultOption = {
            name: option.name || option.value,
            value: option.value,
          }
        }
      })
    }

    return defaultOption
  }

  const [selectedOption, setSelectedOption] = useState<OptionValues>(
    defaultSelectedOption,
  )

  const {context} = useFloating<HTMLElement>({
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

  const selectOption = (event: any) => {
    setSelectedOption(event.target.dataset)
    setOpen(false)

    if (handleChange && event.target.dataset !== defaultValue) {
      handleChange(event.target.dataset)
    }
  }

  const baseSelectClasses = 'transition cursor-pointer relative'
  const baseOptionClasses =
    'text-sm py-unit-2 px-unit-4 whitespace-nowrap hover:bg-gray-300'
  const baseOptionsDropdownClasses =
    'transition bg-contrast py-unit-2 z-[5] left-0 rounded-base shadow-[0px_5px_10px_rgba(70,62,62,0.2)]'

  return (
    <Wrapper className={tailwindMerge(baseSelectClasses, selectClasses)}>
      <Component
        className={selectedOptionClasses}
        ref={context.refs.setReference}
        data-state={open ? 'open' : 'closed'}
        data-selected-value={selectedOption.value}
        data-selected-name={selectedOption.name}
        data-testid="SelectedOption"
        {...props}
        {...getReferenceProps()}
      >
        {Label ? (
          <Label>{selectedOption.name}</Label>
        ) : (
          <>
            {selectedOption.name}
            {showArrow && (
              <IconArrowDown className="absolute right-unit-3 top-1/2 -translate-y-1/2" />
            )}
          </>
        )}
      </Component>
      {open && (
        <ul
          className={tailwindMerge(
            baseOptionsDropdownClasses,
            optionsDropdownClasses,
          )}
          ref={context.refs.setFloating}
          style={{
            position: context.strategy,
            top: context.y ?? 0,
          }}
          data-testid="SelectDropdown"
          data-placement={context.placement}
          {...getFloatingProps()}
        >
          {options.map((option, index) => {
            const name = option.name || option.value
            const optionKey = `${name?.replaceAll(' ', '')}-${index}`

            return (
              <Option
                name={option.name || option.value}
                value={option.value}
                id={option.id}
                optionClasses={tailwindMerge(
                  baseOptionClasses,
                  optionClasses,
                  option.value === selectedOption.value
                    ? selectedOptionDropdownClasses
                    : '',
                )}
                clickHandler={(event: any) => selectOption(event)}
                key={optionKey}
              />
            )
          })}
        </ul>
      )}
    </Wrapper>
  )
}
