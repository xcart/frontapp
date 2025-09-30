import {Level, MMYLevel} from '@xcart/storefront'

export interface GarageItem {
  id?: number
  name?: string
  depth?: number
  levels?: Level[]
}

export interface MMYLevels {
  [key: string]: MMYLevel[] | []
}

export interface SelectedMMYLevel {
  [key: string]: {
    id?: string
    value?: string
  }
}
