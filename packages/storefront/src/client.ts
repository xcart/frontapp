import {Client as ClientBase} from './gen/Client'
import {
  ApiParams,
  Category,
  getBrandCompactCollection,
  getCompactCategoryCollection,
  getCompactProductCollection,
  getMMYLevel,
  PaginatedBrands,
  PaginatedLevels,
  PaginatedProducts,
  Product,
} from './types'
import {RequestOptions} from './request'

export class Client extends ClientBase {
  getPaginatedProducts(
    params: ApiParams<getCompactProductCollection>,
    requestOptions?: Partial<RequestOptions>,
  ): Promise<PaginatedProducts> {
    return new Promise(resolve => {
      this.product
        .getCompactProductCollection({...params}, {...requestOptions})
        .then(data => {
          const itemsPerPage = params.itemsPerPage ?? 30
          resolve({
            products: data['hydra:member'],
            total: data['hydra:totalItems'],
            nextPage:
              data['hydra:view'] && data['hydra:view']['hydra:next']
                ? !params.page
                  ? 2
                  : params.page + 1
                : undefined,
            lastPage: Math.ceil((data['hydra:totalItems'] ?? 0) / itemsPerPage),
          })
        })
    })
  }

  getFeaturedProducts({
    categoryId,
    perPage,
    requestOptions,
  }: {
    categoryId: number
    perPage?: number
    requestOptions?: Partial<RequestOptions>
  }): Promise<Product[]> {
    const params = {itemsPerPage: perPage || 12}
    return new Promise(resolve => {
      this.product
        .getFeaturedProductsFromCategoryProductCompactCollection(
          categoryId.toString(),
          params,
          {...requestOptions},
        )
        .then(data => {
          resolve(data['hydra:member'])
        })
    })
  }

  getSaleProducts(num: number, requestOptions?: Partial<RequestOptions>) {
    return this.getPaginatedProducts(
      {
        itemsPerPage: num,
        'filter.participateSale': true,
      },
      {...requestOptions},
    )
  }

  getNewArrivalsProducts(
    num: number,
    requestOptions?: Partial<RequestOptions>,
  ) {
    return this.getPaginatedProducts(
      {
        itemsPerPage: num,
        'filter.newArrivals': true,
      },
      {...requestOptions},
    )
  }

  getBestsellersProducts(
    num: number,
    requestOptions?: Partial<RequestOptions>,
  ) {
    return this.getPaginatedProducts(
      {
        itemsPerPage: num,
        'filter.bestsellers': true,
      },
      {...requestOptions},
    )
  }

  getOnSaleProducts(
    perPageNum: number,
    requestOptions?: Partial<RequestOptions>,
  ) {
    return this.getPaginatedProducts(
      {
        itemsPerPage: perPageNum,
        'filter.participateSale': true,
      },
      {...requestOptions},
    )
  }

  getCategoryProducts(
    id: number,
    num: number,
    page: number,
    requestOptions?: Partial<RequestOptions>,
  ) {
    return this.getPaginatedProducts(
      {
        page,
        itemsPerPage: num,
        'filter.categories': String(id),
      },
      {...requestOptions},
    )
  }

  getRootCategories({
    categoriesCount,
    params,
    requestOptions,
  }: {
    categoriesCount?: number
    params?: ApiParams<getCompactCategoryCollection>
    requestOptions?: Partial<RequestOptions>
  }): Promise<Category[]> {
    return new Promise(resolve => {
      this.category
        .getCompactCategoryCollection(
          {
            itemsPerPage: categoriesCount,
            'filter.parent': 1,
            ...params,
          },
          {...requestOptions},
        )
        .then(data => {
          return resolve(data['hydra:member'])
        })
    })
  }

  getSubcategories(
    categoryId: number,
    requestOptions?: Partial<RequestOptions>,
  ): Promise<Category[]> {
    return new Promise(resolve => {
      this.category
        .getCompactCategoryCollection(
          {'filter.parent': categoryId},
          {...requestOptions},
        )
        .then(data => {
          resolve(data['hydra:member'])
        })
    })
  }

  getRelatedProducts({
    productId,
    count,
    requestOptions,
  }: {
    productId: number
    count?: number
    requestOptions?: Partial<RequestOptions>
  }): Promise<Product[]> {
    const params = count ? {itemsPerPage: count} : {}

    return new Promise(resolve => {
      this.product
        .getRelatedProducts(productId.toString(), params, {...requestOptions})
        .then(data => {
          resolve(data['hydra:member'])
        })
    })
  }

  getProductsByIds({
    productIds,
    requestOptions,
  }: {
    productIds: string
    requestOptions?: Partial<RequestOptions>
  }): Promise<Product[]> {
    return new Promise(resolve => {
      this.product
        .getCompactProductCollection(
          {'filter.products': productIds},
          {...requestOptions},
        )
        .then(data => {
          resolve(data['hydra:member'])
        })
    })
  }

  getAllBrandsPaginated(
    params?: ApiParams<getBrandCompactCollection>,
    requestOptions?: Partial<RequestOptions>,
  ): Promise<PaginatedBrands> {
    const itemsPerPage = params?.itemsPerPage ?? 30
    return new Promise(resolve => {
      this.other
        .getBrandCompactCollection(
          {itemsPerPage, ...params},
          {...requestOptions},
        )
        .then(data => {
          resolve({
            brands: data['hydra:member'],
            total: data['hydra:totalItems'],
            nextPage:
              data['hydra:view'] && data['hydra:view']['hydra:next']
                ? !params?.page
                  ? 2
                  : params.page + 1
                : undefined,
            lastPage: Math.ceil((data['hydra:totalItems'] ?? 0) / itemsPerPage),
          })
        })
    })
  }

  getMMYLevelsPaginated(
    depth: string,
    params?: ApiParams<getMMYLevel>,
    requestOptions?: Partial<RequestOptions>,
  ): Promise<PaginatedLevels> {
    const itemsPerPage = params?.itemsPerPage ?? 30
    return new Promise(resolve => {
      this.mmy
        .getMMYLevel(depth, {itemsPerPage, ...params}, {...requestOptions})
        .then(data => {
          resolve({
            levelItems: data['hydra:member'],
            total: data['hydra:totalItems'],
            nextPage:
              data['hydra:view'] && data['hydra:view']['hydra:next']
                ? !params?.page
                  ? 2
                  : params.page + 1
                : undefined,
            lastPage: Math.ceil((data['hydra:totalItems'] ?? 0) / itemsPerPage),
          })
        })
    })
  }
}
