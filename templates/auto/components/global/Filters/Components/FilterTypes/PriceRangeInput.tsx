import {useAtomValue, useSetAtom} from 'jotai'
import {Input} from '~/components/elements/Input'
import {
  filterPricesAtom,
  priceRangeAtom,
  reloadFacetsAtom,
  updatePriceAtom,
} from '../../store'

export function PriceRangeInput() {
  const {min: statsMin, max: statsMax} = useAtomValue(priceRangeAtom)
  const {min, max} = useAtomValue(filterPricesAtom)
  const updatePrice = useSetAtom(updatePriceAtom)
  const reloadFacets = useSetAtom(reloadFacetsAtom)

  const change = (value: string, fid: string) => {
    updatePrice({facetId: fid, value})
    reloadFacets()
  }

  const format = (value: number) =>
    new Intl.NumberFormat('en-En', {style: 'currency', currency: 'USD'})
      .format(value)
      .replace('$', '')

  return (
    <div>
      <div className="mb-unit-3 text-sm font-medium md:text-base">Price</div>
      <div className="flex items-center justify-between">
        <div className="grow">
          <Input
            type="input"
            inputClasses="min-w-min"
            onChange={e => change(e.target.value, 'min_price')}
            value={min}
            placeholder={`${statsMin ? format(statsMin) : 'min'}`}
          />
        </div>
        <span className="px-unit-3">-</span>
        <div className="grow">
          <Input
            type="input"
            inputClasses="min-w-min grow"
            onChange={e => change(e.target.value, 'max_price')}
            value={max}
            placeholder={`${statsMax ? format(statsMax) : 'max'}`}
          />
        </div>
      </div>
    </div>
  )
}
