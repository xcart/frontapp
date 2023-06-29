export interface SelectedAttributes {
  [key: string]: {id?: string; name?: string; value?: string}
}

export interface CartItem {
  id: number
  selectedAttributes?: SelectedAttributes
  variantId?: number
  amount: number
}
