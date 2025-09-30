import {ClassGroup, ClassGroupId} from 'tailwind-merge/src/lib/types'

const generateTwThemeUnits = () => {
  return [...Array(20)].map((item, index) => {
    return index === 0 ? 'unit' : `unit-${index}`
  })
}

const generateTwClassesGroup = (prefixes: string[], suffixes: string[]) => {
  let group: Record<ClassGroupId, ClassGroup> = {}

  prefixes.forEach(prefix => {
    group = {...group, [prefix]: [{[prefix]: suffixes}]}
  })

  return group
}

export const tailwindMergeConfig: {
  classGroups: Record<ClassGroupId, ClassGroup>
} = {
  classGroups: {
    ...generateTwClassesGroup(
      ['p', 'pb', 'pt', 'pl', 'pr', 'px', 'py'],
      [
        'button',
        'button-lg',
        'button-thin',
        'input',
        'input-lg',
        ...generateTwThemeUnits(),
      ],
    ),
    ...generateTwClassesGroup(
      [
        'w',
        'h',
        'm',
        'mb',
        'mt',
        'ml',
        'mr',
        'mx',
        'my',
        'gap',
        'gap-y',
        'gap-x',
        'min-w',
        'w',
        'h',
        'inset',
        'inset-x',
        'inset-y',
        'top',
        'right',
        'left',
        'bottom',
      ],
      generateTwThemeUnits(),
    ),
    ...generateTwClassesGroup(
      ['leading'],
      ['base', 'sm', 'h1', 'h2', 'h3', 'h4'],
    ),
    ...generateTwClassesGroup(
      ['colors'],
      [
        'primary',
        'contrast',
        'error',
        'warning',
        'success',
        'error-alert',
        'invariant-light',
        'invariant-dark',
        'rgb-gray-300',
      ],
    ),
    ...generateTwClassesGroup(
      ['height'],
      ['header', ...generateTwThemeUnits()],
    ),
    ...generateTwClassesGroup(
      ['width'],
      ['product-image', ...generateTwThemeUnits()],
    ),
    ...generateTwClassesGroup(['max-w'], ['page', 'page-inner']),
    ...generateTwClassesGroup(
      ['shadow'],
      ['input', 'overlay', 'top', 'bottom'],
    ),
    ...generateTwClassesGroup(
      ['animate'],
      [
        'accordionSlideDown',
        'accordionSlideUp',
        'rotate180',
        'rotate360',
        'searchPanelIn',
        'searchPanelOut',
        'skeleton',
      ],
    ),
    ...generateTwClassesGroup(['transition'], ['height']),
    ...generateTwClassesGroup(['text'], ['3xs', 'xxs']),
  },
}
