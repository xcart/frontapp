'use client'

import {Provider} from 'jotai'
import {useHydrateAtoms} from 'jotai/utils'
import {parseFilters} from 'utils/cloud-search/helpers'
import {Drawer} from '~/components/elements/Drawer'
import {DrawerPane} from '~/components/elements/Drawer/DrawerPane'
import {Reset} from '~/components/global/Filters/Components/Reset'
import {ShowResultsButton} from './Components/ShowResultsButton'
import {Trigger} from './Components/Trigger'
import {filtersAtom, numFiltersAppliedAtom, paramsAtom} from './store'

function Filters({children}: {children: React.ReactElement}) {
  return (
    <DrawerPane
      title="Filters"
      stickySecondaryAction={<Reset withDelimiter />}
      drawerSecondaryAction={<Reset />}
      stickyFooter={<ShowResultsButton />}
    >
      {children}
    </DrawerPane>
  )
}

function HydrateAtoms({params}: any) {
  const filters = parseFilters(params.searchParams)
  useHydrateAtoms([
    [filtersAtom, filters],
    [numFiltersAppliedAtom, Object.keys(filters).length],
    [paramsAtom, params],
  ])
  return <></>
}

// eslint-disable-next-line react/function-component-definition
export default (props: any) => (
  <Provider>
    <HydrateAtoms {...props} />
    <Drawer triggerElement={<Trigger />} width="560px">
      <Filters {...props} />
    </Drawer>
  </Provider>
)
