import {ForwardedRef, forwardRef} from 'react'
import {tailwindMerge} from '~/helpers'

export interface IGrid {
  as?: React.ElementType
  gridClasses?: string
  flow?: 'row' | 'col'
  gap?: 'default' | 'blog'
  items?: number
  layout?: 'default' | 'products' | 'auto' | 'blog'
  [key: string]: any
}

export const Grid = forwardRef(
  (
    {
      as: Component = 'div',
      gridClasses,
      flow = 'row',
      gap = 'default',
      items = 4,
      layout = 'default',
      ...props
    }: IGrid,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) => {
    const layouts = {
      default: `grid-cols-1 ${items === 2 && 'md:grid-cols-2'}  ${
        items === 3 && 'sm:grid-cols-3'
      } ${items > 3 && 'md:grid-cols-3'} ${items >= 4 && 'lg:grid-cols-4'}`,
      products: `grid-cols-2 ${items >= 3 && 'md:grid-cols-3'} ${
        items >= 4 && 'lg:grid-cols-4'
      }`,
      auto: 'auto-cols-auto',
      blog: `grid-cols-2 pt-24`,
    }

    const gaps = {
      default:
        'grid gap-x-unit-4 gap-y-unit-8 md:gap-x-unit-4 md:gap-y-unit-8 lg:gap-x-unit-8 lg:gap-y-unit-12',
      blog: 'grid gap-y-unit-12',
    }

    const flows = {
      row: 'grid-flow-row',
      col: 'grid-flow-col',
    }

    const styles = tailwindMerge(
      flows[flow],
      gaps[gap],
      layouts[layout],
      gridClasses,
    )

    return (
      <Component
        ref={forwardedRef}
        {...props}
        className={styles}
        data-testid="Grid"
      />
    )
  },
)
