import {useEffect} from 'react'
import {Garage} from '@xcart/storefront'
import {useSetAtom} from 'jotai/index'
import {updatedGarage} from '~/components/mmy/functions/helpers'
import {myGarageItemsAtom} from '~/components/mmy/store'

export function useInitGarage(garage?: Garage) {
  const setMyGarage = useSetAtom(myGarageItemsAtom)

  useEffect(() => {
    if (garage && garage?.vehicles?.length) {
      const myGarage = updatedGarage(garage)

      if (myGarage && myGarage.length) {
        setMyGarage(myGarage)
      }
    }
  }, [garage, setMyGarage])
}
