/*
This file is auto-generated
Do not make direct changes to this file
*/

import {rest, RequestOptions} from '../request'
import {ApiResponse, ApiBody, ApiParams} from '../types'

import {
  getAddressFieldCollection,
  getAddressFieldItem,
  apiStorefrontAuthLogin,
  apiStorefrontAuthLogout,
  apiStorefrontAuthRefresh,
  resetPasswordAuthenticationCollection,
  whoamiAuthenticationItem,
  getBrandCompactCollection,
  getBrandCompactItem,
  getByCleanURLBrandDetailedItem,
  getBrandDetailedItem,
  createCart,
  getCartAddressCollection,
  postCartAddressCollection,
  getCartAddressItem,
  deleteCartAddressItem,
  patchCartAddressItem,
  postCalculatedshippingratesCollection,
  postCartemailchangeCollection,
  postCartcouponCollection,
  getCartcouponItem,
  deleteCartcouponItem,
  getCartitemCollection,
  addProduct,
  getCartitemItem,
  deleteProduct,
  updateProduct,
  mergeCart,
  postOrderCollection,
  getPaymentItem,
  patchPaymentItem,
  getPaymentmethodCollection,
  getPaymentmethodItem,
  postCartpaymentmethodselectionCollection,
  postCartshippingmethodselectionCollection,
  getCart,
  deleteCart,
  updateCart,
  getCompactCategoryCollection,
  getCompactCategoryByCleanURL,
  getCompactCategoryById,
  getDetailedCategoryCollection,
  getDetailedCategoryByCleanURL,
  getDetailedCategoryById,
  getConfigCollection,
  getConfigItem,
  getCountryCollection,
  getCountryItem,
  getCurrencyCollection,
  getByCodeCurrencyItem,
  getCurrencyItem,
  getMenuCollection,
  getMenuItem,
  getGarage,
  clearGarage,
  mergeGarage,
  addVehicle,
  getVehicle,
  deleteVehicle,
  getMMYLevel,
  getMMYLevelById,
  getMMYLevels,
  getVehicleByVIN,
  getStaticPageCollection,
  getByCleanURLStaticPageItem,
  getStaticPageItem,
  getCompactProductCollection,
  getFeaturedProductsProductCompactCollection,
  getFeaturedProductsFromCategoryProductCompactCollection,
  getCompactProductById,
  getRelatedProducts,
  getDetailedProductByCleanURL,
  getDetailedProductById,
  postUserCollection,
  getUserItem,
  deleteUserItem,
  patchUserItem,
  getUserAddressCollection,
  postUserAddressCollection,
  getUserAddressItem,
  deleteUserAddressItem,
  patchUserAddressItem,
} from './openapi-types'

export class Client {
  #baseUrl: string
  #apiKey: string
  #accessToken: string | undefined
  #requestOptions: any

  constructor(
    baseUrl: string,
    apiKey: string,
    accessToken?: string,
    requestOptions?: any,
  ) {
    this.#baseUrl = baseUrl
    this.#apiKey = apiKey
    if (accessToken) {
      this.#accessToken = accessToken
    }
    if (requestOptions) {
      this.#requestOptions = requestOptions
    }
  }

  public setAccessToken(accessToken: string) {
    this.#accessToken = accessToken
  }

  public hasAccessToken() {
    return !!this.#accessToken
  }

  public setRequestOptions(requestOptions: any) {
    this.#requestOptions = requestOptions
  }

  public readonly product = {
    getCompactProductCollection: (
      params: ApiParams<getCompactProductCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCompactProductCollection>> =>
      rest<ApiResponse<getCompactProductCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/products/compact`,
        params,
        method: 'GET',
      }),

    getFeaturedProductsProductCompactCollection: (
      params: ApiParams<getFeaturedProductsProductCompactCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getFeaturedProductsProductCompactCollection>> =>
      rest<ApiResponse<getFeaturedProductsProductCompactCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/products/compact/featured/home_page`,
        params,
        method: 'GET',
      }),

    getFeaturedProductsFromCategoryProductCompactCollection: (
      category_id: string,
      params: ApiParams<getFeaturedProductsFromCategoryProductCompactCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<
      ApiResponse<getFeaturedProductsFromCategoryProductCompactCollection>
    > =>
      rest<
        ApiResponse<getFeaturedProductsFromCategoryProductCompactCollection>
      >({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/products/compact/featured/${category_id}`,
        params,
        method: 'GET',
      }),

    getCompactProductById: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCompactProductById>> =>
      rest<ApiResponse<getCompactProductById>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/products/compact/${id}`,
        method: 'GET',
      }),

    getRelatedProducts: (
      product_id: string,
      params: ApiParams<getRelatedProducts> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getRelatedProducts>> =>
      rest<ApiResponse<getRelatedProducts>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/products/compact/${product_id}/related`,
        params,
        method: 'GET',
      }),

    getDetailedProductByCleanURL: (
      clean_url: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getDetailedProductByCleanURL>> =>
      rest<ApiResponse<getDetailedProductByCleanURL>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/products/detailed/by_clean_url/${clean_url}`,
        method: 'GET',
      }),

    getDetailedProductById: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getDetailedProductById>> =>
      rest<ApiResponse<getDetailedProductById>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/products/detailed/${id}`,
        method: 'GET',
      }),
  }
  public readonly category = {
    getCompactCategoryCollection: (
      params: ApiParams<getCompactCategoryCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCompactCategoryCollection>> =>
      rest<ApiResponse<getCompactCategoryCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/categories/compact`,
        params,
        method: 'GET',
      }),

    getCompactCategoryByCleanURL: (
      clean_url: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCompactCategoryByCleanURL>> =>
      rest<ApiResponse<getCompactCategoryByCleanURL>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/categories/compact/by_clean_url/${clean_url}`,
        method: 'GET',
      }),

    getCompactCategoryById: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCompactCategoryById>> =>
      rest<ApiResponse<getCompactCategoryById>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/categories/compact/${id}`,
        method: 'GET',
      }),

    getDetailedCategoryCollection: (
      params: ApiParams<getDetailedCategoryCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getDetailedCategoryCollection>> =>
      rest<ApiResponse<getDetailedCategoryCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/categories/detailed`,
        params,
        method: 'GET',
      }),

    getDetailedCategoryByCleanURL: (
      clean_url: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getDetailedCategoryByCleanURL>> =>
      rest<ApiResponse<getDetailedCategoryByCleanURL>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/categories/detailed/by_clean_url/${clean_url}`,
        method: 'GET',
      }),

    getDetailedCategoryById: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getDetailedCategoryById>> =>
      rest<ApiResponse<getDetailedCategoryById>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/categories/detailed/${id}`,
        method: 'GET',
      }),
  }
  public readonly cart = {
    createCart: (
      request_body: ApiBody<createCart>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<createCart>> =>
      rest<ApiResponse<createCart>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts`,
        request_body,
        method: 'POST',
      }),

    getCartitemCollection: (
      cart_id: string,
      params: ApiParams<getCartitemCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCartitemCollection>> =>
      rest<ApiResponse<getCartitemCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/items`,
        params,
        method: 'GET',
      }),

    addProduct: (
      cart_id: string,
      request_body: ApiBody<addProduct>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<addProduct>> =>
      rest<ApiResponse<addProduct>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/items`,
        request_body,
        method: 'POST',
      }),

    getCartitemItem: (
      id: string,
      cart_id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCartitemItem>> =>
      rest<ApiResponse<getCartitemItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/items/${id}`,
        method: 'GET',
      }),

    deleteProduct: (
      id: string,
      cart_id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<deleteProduct>> =>
      rest<ApiResponse<deleteProduct>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/items/${id}`,
        method: 'DELETE',
      }),

    updateProduct: (
      id: string,
      cart_id: string,
      request_body: ApiBody<updateProduct>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<updateProduct>> =>
      rest<ApiResponse<updateProduct>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/items/${id}`,
        request_body,
        method: 'PATCH',
      }),

    mergeCart: (
      cart_id: string,
      request_body: ApiBody<mergeCart>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<mergeCart>> =>
      rest<ApiResponse<mergeCart>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/merge`,
        request_body,
        method: 'POST',
      }),

    getCart: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCart>> =>
      rest<ApiResponse<getCart>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${id}`,
        method: 'GET',
      }),

    deleteCart: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<deleteCart>> =>
      rest<ApiResponse<deleteCart>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${id}`,
        method: 'DELETE',
      }),

    updateCart: (
      id: string,
      request_body: ApiBody<updateCart>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<updateCart>> =>
      rest<ApiResponse<updateCart>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${id}`,
        request_body,
        method: 'PATCH',
      }),
  }
  public readonly garage = {
    getGarage: (
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getGarage>> =>
      rest<ApiResponse<getGarage>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/garage`,
        method: 'GET',
      }),

    clearGarage: (
      request_body: ApiBody<clearGarage>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<clearGarage>> =>
      rest<ApiResponse<clearGarage>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/garage/clear`,
        request_body,
        method: 'POST',
      }),

    mergeGarage: (
      request_body: ApiBody<mergeGarage>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<mergeGarage>> =>
      rest<ApiResponse<mergeGarage>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/garage/merge`,
        request_body,
        method: 'POST',
      }),

    addVehicle: (
      request_body: ApiBody<addVehicle>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<addVehicle>> =>
      rest<ApiResponse<addVehicle>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/garage/vehicles`,
        request_body,
        method: 'POST',
      }),

    getVehicle: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getVehicle>> =>
      rest<ApiResponse<getVehicle>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/garage/vehicles/${id}`,
        method: 'GET',
      }),

    deleteVehicle: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<deleteVehicle>> =>
      rest<ApiResponse<deleteVehicle>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/garage/vehicles/${id}`,
        method: 'DELETE',
      }),
  }
  public readonly mmy = {
    getMMYLevel: (
      depth: string,
      params: ApiParams<getMMYLevel> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getMMYLevel>> =>
      rest<ApiResponse<getMMYLevel>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/levels/${depth}`,
        params,
        method: 'GET',
      }),

    getMMYLevelById: (
      depth: string,
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getMMYLevelById>> =>
      rest<ApiResponse<getMMYLevelById>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/levels/${depth}/${id}`,
        method: 'GET',
      }),

    getMMYLevels: (
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getMMYLevels>> =>
      rest<ApiResponse<getMMYLevels>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/levels_setup`,
        method: 'GET',
      }),

    getVehicleByVIN: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getVehicleByVIN>> =>
      rest<ApiResponse<getVehicleByVIN>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/mmy/vin_lookup/${id}`,
        method: 'GET',
      }),
  }
  public readonly other = {
    getAddressFieldCollection: (
      params: ApiParams<getAddressFieldCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getAddressFieldCollection>> =>
      rest<ApiResponse<getAddressFieldCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/address_fields`,
        params,
        method: 'GET',
      }),

    getAddressFieldItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getAddressFieldItem>> =>
      rest<ApiResponse<getAddressFieldItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/address_fields/${id}`,
        method: 'GET',
      }),

    apiStorefrontAuthLogin: (
      request_body: ApiBody<apiStorefrontAuthLogin>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<apiStorefrontAuthLogin>> =>
      rest<ApiResponse<apiStorefrontAuthLogin>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/auth/login`,
        request_body,
        method: 'POST',
      }),

    apiStorefrontAuthLogout: (
      request_body: ApiBody<apiStorefrontAuthLogout>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<apiStorefrontAuthLogout>> =>
      rest<ApiResponse<apiStorefrontAuthLogout>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/auth/logout`,
        request_body,
        method: 'POST',
      }),

    apiStorefrontAuthRefresh: (
      request_body: ApiBody<apiStorefrontAuthRefresh>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<apiStorefrontAuthRefresh>> =>
      rest<ApiResponse<apiStorefrontAuthRefresh>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/auth/refresh`,
        request_body,
        method: 'POST',
      }),

    resetPasswordAuthenticationCollection: (
      request_body: ApiBody<resetPasswordAuthenticationCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<resetPasswordAuthenticationCollection>> =>
      rest<ApiResponse<resetPasswordAuthenticationCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/auth/reset_password`,
        request_body,
        method: 'POST',
      }),

    whoamiAuthenticationItem: (
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<whoamiAuthenticationItem>> =>
      rest<ApiResponse<whoamiAuthenticationItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/auth/whoami`,
        method: 'GET',
      }),

    getBrandCompactCollection: (
      params: ApiParams<getBrandCompactCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getBrandCompactCollection>> =>
      rest<ApiResponse<getBrandCompactCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/brands/compact`,
        params,
        method: 'GET',
      }),

    getBrandCompactItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getBrandCompactItem>> =>
      rest<ApiResponse<getBrandCompactItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/brands/compact/${id}`,
        method: 'GET',
      }),

    getByCleanURLBrandDetailedItem: (
      clean_url: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getByCleanURLBrandDetailedItem>> =>
      rest<ApiResponse<getByCleanURLBrandDetailedItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/brands/detailed/by_clean_url/${clean_url}`,
        method: 'GET',
      }),

    getBrandDetailedItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getBrandDetailedItem>> =>
      rest<ApiResponse<getBrandDetailedItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/brands/detailed/${id}`,
        method: 'GET',
      }),

    getCartAddressCollection: (
      cart_id: string,
      params: ApiParams<getCartAddressCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCartAddressCollection>> =>
      rest<ApiResponse<getCartAddressCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/addresses`,
        params,
        method: 'GET',
      }),

    postCartAddressCollection: (
      cart_id: string,
      request_body: ApiBody<postCartAddressCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<postCartAddressCollection>> =>
      rest<ApiResponse<postCartAddressCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/addresses`,
        request_body,
        method: 'POST',
      }),

    getCartAddressItem: (
      id: string,
      cart_id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCartAddressItem>> =>
      rest<ApiResponse<getCartAddressItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/addresses/${id}`,
        method: 'GET',
      }),

    deleteCartAddressItem: (
      id: string,
      cart_id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<deleteCartAddressItem>> =>
      rest<ApiResponse<deleteCartAddressItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/addresses/${id}`,
        method: 'DELETE',
      }),

    patchCartAddressItem: (
      id: string,
      cart_id: string,
      request_body: ApiBody<patchCartAddressItem>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<patchCartAddressItem>> =>
      rest<ApiResponse<patchCartAddressItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/addresses/${id}`,
        request_body,
        method: 'PATCH',
      }),

    postCalculatedshippingratesCollection: (
      cart_id: string,
      request_body: ApiBody<postCalculatedshippingratesCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<postCalculatedshippingratesCollection>> =>
      rest<ApiResponse<postCalculatedshippingratesCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/calculatedShippingRates`,
        request_body,
        method: 'POST',
      }),

    postCartemailchangeCollection: (
      cart_id: string,
      request_body: ApiBody<postCartemailchangeCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<postCartemailchangeCollection>> =>
      rest<ApiResponse<postCartemailchangeCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/change_email`,
        request_body,
        method: 'POST',
      }),

    postCartcouponCollection: (
      cart_id: string,
      request_body: ApiBody<postCartcouponCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<postCartcouponCollection>> =>
      rest<ApiResponse<postCartcouponCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/coupons`,
        request_body,
        method: 'POST',
      }),

    getCartcouponItem: (
      id: string,
      cart_id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCartcouponItem>> =>
      rest<ApiResponse<getCartcouponItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/coupons/${id}`,
        method: 'GET',
      }),

    deleteCartcouponItem: (
      id: string,
      cart_id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<deleteCartcouponItem>> =>
      rest<ApiResponse<deleteCartcouponItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/coupons/${id}`,
        method: 'DELETE',
      }),

    postOrderCollection: (
      cart_id: string,
      request_body: ApiBody<postOrderCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<postOrderCollection>> =>
      rest<ApiResponse<postOrderCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/order`,
        request_body,
        method: 'POST',
      }),

    getPaymentItem: (
      id: string,
      cart_id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getPaymentItem>> =>
      rest<ApiResponse<getPaymentItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/payment/${id}`,
        method: 'GET',
      }),

    patchPaymentItem: (
      id: string,
      cart_id: string,
      request_body: ApiBody<patchPaymentItem>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<patchPaymentItem>> =>
      rest<ApiResponse<patchPaymentItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/payment/${id}`,
        request_body,
        method: 'PATCH',
      }),

    getPaymentmethodCollection: (
      cart_id: string,
      params: ApiParams<getPaymentmethodCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getPaymentmethodCollection>> =>
      rest<ApiResponse<getPaymentmethodCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/payment_methods`,
        params,
        method: 'GET',
      }),

    getPaymentmethodItem: (
      id: string,
      cart_id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getPaymentmethodItem>> =>
      rest<ApiResponse<getPaymentmethodItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/payment_methods/${id}`,
        method: 'GET',
      }),

    postCartpaymentmethodselectionCollection: (
      cart_id: string,
      request_body: ApiBody<postCartpaymentmethodselectionCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<postCartpaymentmethodselectionCollection>> =>
      rest<ApiResponse<postCartpaymentmethodselectionCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/select_payment_method`,
        request_body,
        method: 'POST',
      }),

    postCartshippingmethodselectionCollection: (
      cart_id: string,
      request_body: ApiBody<postCartshippingmethodselectionCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<postCartshippingmethodselectionCollection>> =>
      rest<ApiResponse<postCartshippingmethodselectionCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/carts/${cart_id}/select_shipping_method`,
        request_body,
        method: 'POST',
      }),

    getConfigCollection: (
      params: ApiParams<getConfigCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getConfigCollection>> =>
      rest<ApiResponse<getConfigCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/configs`,
        params,
        method: 'GET',
      }),

    getConfigItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getConfigItem>> =>
      rest<ApiResponse<getConfigItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/configs/${id}`,
        method: 'GET',
      }),

    getCountryCollection: (
      params: ApiParams<getCountryCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCountryCollection>> =>
      rest<ApiResponse<getCountryCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/countries`,
        params,
        method: 'GET',
      }),

    getCountryItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCountryItem>> =>
      rest<ApiResponse<getCountryItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/countries/${id}`,
        method: 'GET',
      }),

    getCurrencyCollection: (
      params: ApiParams<getCurrencyCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCurrencyCollection>> =>
      rest<ApiResponse<getCurrencyCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/currencies`,
        params,
        method: 'GET',
      }),

    getByCodeCurrencyItem: (
      code: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getByCodeCurrencyItem>> =>
      rest<ApiResponse<getByCodeCurrencyItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/currencies/by_code/${code}`,
        method: 'GET',
      }),

    getCurrencyItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getCurrencyItem>> =>
      rest<ApiResponse<getCurrencyItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/currencies/${id}`,
        method: 'GET',
      }),

    getMenuCollection: (
      params: ApiParams<getMenuCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getMenuCollection>> =>
      rest<ApiResponse<getMenuCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/menus`,
        params,
        method: 'GET',
      }),

    getMenuItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getMenuItem>> =>
      rest<ApiResponse<getMenuItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/menus/${id}`,
        method: 'GET',
      }),

    getStaticPageCollection: (
      params: ApiParams<getStaticPageCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getStaticPageCollection>> =>
      rest<ApiResponse<getStaticPageCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/pages`,
        params,
        method: 'GET',
      }),

    getByCleanURLStaticPageItem: (
      clean_url: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getByCleanURLStaticPageItem>> =>
      rest<ApiResponse<getByCleanURLStaticPageItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/pages/by_clean_url/${clean_url}`,
        method: 'GET',
      }),

    getStaticPageItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getStaticPageItem>> =>
      rest<ApiResponse<getStaticPageItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/pages/${id}`,
        method: 'GET',
      }),

    postUserCollection: (
      request_body: ApiBody<postUserCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<postUserCollection>> =>
      rest<ApiResponse<postUserCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/users`,
        request_body,
        method: 'POST',
      }),

    getUserItem: (
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getUserItem>> =>
      rest<ApiResponse<getUserItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/users/self`,
        method: 'GET',
      }),

    deleteUserItem: (
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<deleteUserItem>> =>
      rest<ApiResponse<deleteUserItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/users/self`,
        method: 'DELETE',
      }),

    patchUserItem: (
      request_body: ApiBody<patchUserItem>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<patchUserItem>> =>
      rest<ApiResponse<patchUserItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/users/self`,
        request_body,
        method: 'PATCH',
      }),

    getUserAddressCollection: (
      params: ApiParams<getUserAddressCollection> = {},
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getUserAddressCollection>> =>
      rest<ApiResponse<getUserAddressCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/users/self/addresses`,
        params,
        method: 'GET',
      }),

    postUserAddressCollection: (
      request_body: ApiBody<postUserAddressCollection>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<postUserAddressCollection>> =>
      rest<ApiResponse<postUserAddressCollection>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/users/self/addresses`,
        request_body,
        method: 'POST',
      }),

    getUserAddressItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<getUserAddressItem>> =>
      rest<ApiResponse<getUserAddressItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/users/self/addresses/${id}`,
        method: 'GET',
      }),

    deleteUserAddressItem: (
      id: string,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<deleteUserAddressItem>> =>
      rest<ApiResponse<deleteUserAddressItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/users/self/addresses/${id}`,
        method: 'DELETE',
      }),

    patchUserAddressItem: (
      id: string,
      request_body: ApiBody<patchUserAddressItem>,
      request_options?: Partial<RequestOptions>,
    ): Promise<ApiResponse<patchUserAddressItem>> =>
      rest<ApiResponse<patchUserAddressItem>>({
        auth: this.#apiKey,
        base_url: this.#baseUrl,
        accessToken: this.#accessToken,
        ...{...this.#requestOptions, ...request_options},
        endpoint: `/api/storefront/users/self/addresses/${id}`,
        request_body,
        method: 'PATCH',
      }),
  }
}
