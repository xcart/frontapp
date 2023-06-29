import {Level} from '@xcart/storefront'

export interface GarageItem {
  id?: number
  name?: string
  depth?: number
  levels?: Level[]
}
