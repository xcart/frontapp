import {Blocks} from './FilterTypes/Blocks'
import {CategoriesRefinementList} from './FilterTypes/CategoriesRefinementList'
import {ColorSwatches} from './FilterTypes/ColorSwatches'
import {PriceRangeInput} from './FilterTypes/PriceRangeInput'
import {RefinementList} from './FilterTypes/RefinementList'
import {Facet} from '../store'

export function Filter({
  facet: {id, type, name, counts, unfolded, expanded},
}: {
  facet: Facet
}) {
  if (type === 'category') {
    return (
      <CategoriesRefinementList
        facet={{id, type, name, counts, unfolded, expanded}}
      />
    )
  }

  if (type === 'price') {
    return <PriceRangeInput />
  }

  if (name === 'Color') {
    return (
      <ColorSwatches facet={{id, type, name, counts, unfolded, expanded}} />
    )
  }

  if (name === 'Size') {
    return (
      <Blocks facet={{id, type, name, counts, unfolded, expanded}} />
    )
  }

  return <RefinementList facet={{id, type, name, counts, unfolded, expanded}} />
}
