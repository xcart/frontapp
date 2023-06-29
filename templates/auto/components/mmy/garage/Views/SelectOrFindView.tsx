import {useState} from 'react'
import {useAtomValue} from 'jotai'
import {FindByVINView} from '~/components/mmy/garage/Views/FindByVINView'
import {SelectYourVehicleView} from '~/components/mmy/garage/Views/SelectYourVehicleView'
import {allLevelsAtom} from '~/components/mmy/store'

export function SelectOrFindView() {
  const allLevels = useAtomValue(allLevelsAtom)
  const [page, setPage] = useState('select_your_vehicle')

  return (
    <div className="w-full min-w-full">
      {allLevels.length > 0 && page === 'select_your_vehicle' && (
        <SelectYourVehicleView changePage={f => setPage(f)} />
      )}
      {page === 'find_by_vin' && <FindByVINView changePage={f => setPage(f)} />}
    </div>
  )
}
