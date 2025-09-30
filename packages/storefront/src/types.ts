import {components} from './gen/openapi-types'

export * from './gen/openapi-types'

export type SuccessStatus = 200 | 201
export type ApplicationJsonType = 'application/json'
export type ResponseType = 'application/ld+json'

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type GetSuccess<T> = {
  [K in SuccessStatus & keyof T]: GetContent<T[K]>
}[SuccessStatus & keyof T]

export type ApiResponse<T> = UnionToIntersection<ExtractApiResponse<T>>

export type GetContent<T> = 'content' extends keyof T
  ? ResponseType extends keyof T['content']
    ? T['content'][ResponseType]
    : never
  : never

export type ExtractApiResponse<T> = 'responses' extends keyof T
  ? GetSuccess<T['responses']>
  : never

export type ApiParams<T> = 'parameters' extends keyof T
  ? 'query' extends keyof T['parameters']
    ? T['parameters']['query']
    : never
  : never

export type ApiPath<T> = 'parameters' extends keyof T
  ? 'path' extends keyof T['parameters']
    ? T['parameters']['path']
    : never
  : never

export type ApiBody<T> = 'requestBody' extends keyof T
  ? 'content' extends keyof T['requestBody']
    ? ApplicationJsonType extends keyof T['requestBody']['content']
      ? T['requestBody']['content'][ApplicationJsonType]
      : never
    : never
  : never

export type Product = components['schemas']['Product.Compact.jsonld-read']

export type ProductDetailed =
  components['schemas']['Product.Detailed.jsonld-read']

export type ProductAttribute =
  components['schemas']['ProductAttribute.jsonld-read']

export type ProductAttributeValue =
  components['schemas']['ProductAttributeValue.jsonld-read']

export type ProductImage = components['schemas']['Image.jsonld-read']

export type ProductTab = components['schemas']['ProductTab.jsonld-read']

export type Category = components['schemas']['Category.Compact.jsonld-read']

export type Cart = components['schemas']['Storefront.Cart.jsonld-read']

export type CartItem = components['schemas']['Cart.item.jsonld-read']

export type MMYLevelsSetup =
  components['schemas']['MMY.Levels.Setup.jsonld-read']

export type MMYLevelsSetupItem =
  components['schemas']['MmyLevelsSetupItem.jsonld-read']

export type MMYLevel = components['schemas']['MMY.Level.jsonld-read']

export type Level = components['schemas']['Level.jsonld-read']

export type Garage = components['schemas']['MMY.Garage.jsonld-read']

export type Vehicle = components['schemas']['Vehicle.jsonld-read']

export type Brand = components['schemas']['Brand.Compact.jsonld-read']

export type ProductFitment = components['schemas']['ProductFitment.jsonld-read']

export type Coupon = components['schemas']['Cart.coupon-read']

export type ShippingRate = components['schemas']['ShippingRate.jsonld-read']

export type Address = components['schemas']['Cart.Address.jsonld-read']

export type CustomerWishlist = components['schemas']['Wishlist.jsonld-read']

export type UserData = components['schemas']['User.jsonld-read']

export interface PaginatedProducts {
  products: Product[]
  total: number | undefined
  nextPage: number | undefined
  lastPage: number
}

export interface PaginatedBrands {
  brands: Brand[]
  total: number | undefined
  nextPage: number | undefined
  lastPage: number
}

export interface PaginatedLevels {
  levelItems: MMYLevel[]
  total: number | undefined
  nextPage: number | undefined
  lastPage: number
}
