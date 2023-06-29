export interface AttributeForProductToAdd {
  name?: string
  attributeId: number
  attributeValueId: number
  attributeValue: string
}

export interface ProductToAdd {
  id: number
  amount: number
  attributes: AttributeForProductToAdd[]
}
