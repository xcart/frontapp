import type {
  OpenAPI3,
  OperationObject,
  ParameterObject,
  PathItemObject,
  RequestBody,
  ResponseObject,
  SchemaObject,
  // @ts-expect-error
} from 'openapi-typescript'
import {promises as fs} from 'fs'
import prettier from 'prettier'
import path from 'path'

const tagToClassMapping = {
  'Product Compact': 'product',
  'Product Detailed': 'product',
  'Category Compact': 'category',
  'Category Detailed': 'category',
  'Storefront Cart': 'cart',
  'Cart item': 'cart',
  'Cart merge request': 'cart',
  'MMY Garage': 'garage',
  'MMY Garage merge request': 'garage',
  'MMY Garage clear request': 'garage',
  'MMY Garage Vehicle': 'garage',
  'MMY Level': 'mmy',
  'MMY Levels Setup': 'mmy',
  'Vin lookup': 'mmy',
  Wishlist: 'wishlist',
  'Wishlist Product': 'wishlist',
  'Wishlist merge request': 'wishlist',
  'Wishlist clear request': 'wishlist',
}

const operationIdConverter = function (operationId: string): string {
  const mapping = {
    'getProduct CompactCollection': 'getCompactProductCollection',
    'getProduct CompactItem': 'getCompactProductById',
    'getRelatedProductsProduct CompactCollection': 'getRelatedProducts',
    'getByCleanURLProduct DetailedItem': 'getDetailedProductByCleanURL',
    'getProduct DetailedItem': 'getDetailedProductById',
    'getCategory CompactCollection': 'getCompactCategoryCollection',
    'getByCleanURLCategory CompactItem': 'getCompactCategoryByCleanURL',
    'getCategory CompactItem': 'getCompactCategoryById',
    'getCategory DetailedCollection': 'getDetailedCategoryCollection',
    'getByCleanURLCategory DetailedItem': 'getDetailedCategoryByCleanURL',
    'getCategory DetailedItem': 'getDetailedCategoryById',
    'postStorefront CartCollection': 'createCart',
    'postCart merge requestCollection': 'mergeCart',
    'getStorefront CartItem': 'getCart',
    'deleteStorefront CartItem': 'deleteCart',
    'patchStorefront CartItem': 'updateCart',
    'postCart itemCollection': 'addProduct',
    'deleteCart itemItem': 'deleteProduct',
    'patchCart itemItem': 'updateProduct',
    'getMMY GarageItem': 'getGarage',
    'postMMY Garage merge requestCollection': 'mergeGarage',
    'postMMY Garage clear requestCollection': 'clearGarage',
    'postMMY Garage VehicleCollection': 'addVehicle',
    'getMMY Garage VehicleItem': 'getVehicle',
    'deleteMMY Garage VehicleItem': 'deleteVehicle',
    'getMMY LevelCollection': 'getMMYLevel',
    'getMMY LevelItem': 'getMMYLevelById',
    'getMMY Levels SetupItem': 'getMMYLevels',
    'getVin lookupItem': 'getVehicleByVIN',
    getWishlistItem: 'getWishlist',
    getByHashWishlistItem: 'getWishlistByHash',
    'clearWishlist clear requestCollection': 'clearWishlist',
    'mergeWishlist merge requestCollection': 'mergeWishlist',
    'postWishlist ProductCollection': 'addToWishlist',
    'getWishlist ProductItem': 'getWishlistProduct',
    'deleteWishlist ProductItem': 'deleteFromWishlist',
  }

  return mapping[operationId] ?? operationId.replace(/\s/g, '')
}

function exportTypes(operationIds: string[]) {
  let output = ''

  operationIds.forEach(x => {
    output += `export type ${operationIdConverter(x)} = operations['${x}']\n`
  })

  return output
}

function importTypes(operationIds: string[]) {
  let output = 'import {'

  operationIds.forEach(x => {
    output += `${operationIdConverter(x)},\n`
  })

  output += '} from "./openapi-types"\n'

  return output
}

function functionParameters(
  pathKey: string,
  method: string,
  pathQueryVariables: ParameterObject[],
  pathVariables: ParameterObject[],
  operationId: string,
  requestBody: (RequestBody & Record<string, any>) | undefined,
  responseBody: SchemaObject | undefined,
) {
  let output = ''
  const args = pathVariables
    ?.map(x => `${x.name}${x.required === false ? '?' : ''}: string`)
    .join(',')
  const responseType = `ApiResponse<${operationId}>`
  const needsPathQuery = pathQueryVariables && pathQueryVariables.length > 0
  const needsRequestBody = !!requestBody
  const pathQueryRequired = pathQueryVariables?.some(x => x.required === true)
  let requestBodyRequired =
    !requestBody?.required || requestBody?.required === true

  if (requestBody?.content && requestBody.content['application/json']?.schema) {
    const schema = requestBody.content['application/json']
      .schema as SchemaObject

    requestBodyRequired =
      requestBodyRequired ||
      (!!schema.properties &&
        Object.keys(schema.properties).some(x => schema.required?.includes(x)))
  }

  const optionalParams = needsPathQuery && !pathQueryRequired
  const optionalRequestBody = !requestBodyRequired

  output += `${operationId}: (`

  if (args) {
    output += `${args}, `
  }

  if (needsRequestBody && needsPathQuery) {
    output += `request_body: ApiBody<${operationId}>`

    if (optionalRequestBody) {
      output += '= {}'
    }

    output += ','
    output += `params: ApiParams<${operationId}>`

    if (optionalParams) {
      output += '= {}'
    }

    output += ','
  } else if (needsRequestBody && !needsPathQuery) {
    output += `request_body: ApiBody<${operationId}>`

    if (optionalRequestBody) {
      output += '= {}'
    }

    output += ','
  } else if (!needsRequestBody && needsPathQuery) {
    output += `params: ApiParams<${operationId}>`

    if (optionalParams) {
      output += '= {}'
    }

    output += ','
  }

  output += 'request_options?: Partial<RequestOptions>): '
  output += `Promise<ApiResponse<${operationId}>> => `
  output += `rest<${responseType}>({ auth: this.#apiKey, base_url: this.#baseUrl, accessToken: this.#accessToken, ...{...this.#requestOptions, ...request_options}, endpoint: \`${pathKey.replace(
    /{/g,
    '${',
  )}\``

  if (needsPathQuery) {
    output += ',params'
  }

  if (needsRequestBody) {
    output += ',request_body'
  }

  output += `,method: '${method.toUpperCase()}'})\n`

  return output
}

function buildClasses(classes: {
  [x: string]: {
    name: string
    functions: string[]
  }
}) {
  let output = ''

  Object.keys(classes).forEach(x => {
    const {name, functions} = classes[x]

    if (functions.length < 1) {
      return
    }

    output += `public readonly ${name} = {
      ${functions.join('\n,')}
    };`
  })

  return output
}

export async function generate(): Promise<void> {
  let spec: OpenAPI3

  spec = await fs
    .readFile(path.resolve(__dirname, '../src/gen/', 'openapi.json'), 'utf8')
    .then(JSON.parse)

  const openApiTs = (await import('openapi-typescript')).default
  let openApiTypes = await openApiTs(spec)

  const {paths} = spec

  const classes = {
    product: {
      name: 'product',
      functions: [],
    },
    category: {
      name: 'category',
      functions: [],
    },
    cart: {
      name: 'cart',
      functions: [],
    },
    garage: {
      name: 'garage',
      functions: [],
    },
    mmy: {
      name: 'mmy',
      functions: [],
    },
    wishlist: {
      name: 'wishlist',
      functions: [],
    },
    other: {
      name: 'other',
      functions: [],
    },
  }

  const operationIds: string[] = []

  let output = `
/*
This file is auto-generated
Do not make direct changes to this file
*/

import {rest, RequestOptions} from '../request'
import {ApiResponse, ApiBody, ApiParams} from '../types'\n\n`

  if (!paths) return

  Object.keys(paths).forEach(pathKey => {
    const endpointPath = paths[pathKey]

    Object.keys(endpointPath).forEach(methodKey => {
      const method = endpointPath[
        methodKey as keyof PathItemObject
      ] as OperationObject & Record<string, any>
      const {
        operationId,
        parameters,
        requestBody,
        responses = {},
        tags,
      } = method

      if (!operationId) {
        return new Error('No operation id')
      }

      const queryVariables = parameters?.filter(
        x => 'in' in x && x.in === 'query',
      ) as ParameterObject[]

      const pathVariables = parameters?.filter(
        x => 'in' in x && x.in === 'path',
      ) as ParameterObject[]

      const okResponse = responses['200'] as ResponseObject | undefined
      const responseBody = (
        responses
          ? okResponse?.content
            ? okResponse.content['application/ld+json'].schema
            : undefined
          : undefined
      ) as ResponseObject

      operationIds.push(operationId)

      if (!tags?.length) {
        throw 'No tags found'
      }

      const tag = tagToClassMapping[tags[0]] ?? 'other'

      classes[tag].functions.push(
        functionParameters(
          pathKey,
          methodKey,
          queryVariables,
          pathVariables,
          operationIdConverter(operationId),
          requestBody,
          responseBody,
        ),
      )
    })
  })

  openApiTypes += exportTypes(operationIds)

  output += importTypes(operationIds)

  output += `
export class Client {
  #baseUrl: string;
  #apiKey: string;
  #accessToken: string | undefined;
  #requestOptions: any;

  constructor(
    baseUrl: string,
    apiKey: string,
    accessToken?: string,
    requestOptions?: any
  ) {
    this.#baseUrl = baseUrl;
    this.#apiKey = apiKey;
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

  ${buildClasses(classes)}

}`

  await Promise.all([
    fs.writeFile(
      path.resolve(__dirname, '../src/gen/', 'openapi-types.ts'),
      openApiTypes,
    ),
    fs.writeFile(
      path.resolve(__dirname, '../src/gen/', 'Client.ts'),
      prettier.format(output, {parser: 'typescript'}),
    ),
  ])
}

generate()
