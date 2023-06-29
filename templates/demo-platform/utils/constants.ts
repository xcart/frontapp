export interface CacheParams {
  cache?: 'force-cache' | 'no-store'
  next?: {revalidate: number | false | 0}
}

export const IMAGES = {
  productList: {
    width: 290,
    height: 290,
  },
  productDetails: {
    width: 620,
    height: 620,
  },
}
