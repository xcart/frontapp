import {buildQueryString} from './utils'

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  base_url?: string
  endpoint: string
  auth?: string
  accessToken?: string
  params?: Record<string, any>
  request_body?: Record<string, any>
  method?: string
}

class ApiResponseError extends Error {
  status: number
  statusText: string
  headers: Record<string, any>
  error: Record<string, any>

  constructor(
    status: number,
    statusText: string,
    headers: Headers,
    error: Record<string, any>,
  ) {
    super()
    this.status = status
    this.statusText = statusText
    this.headers = Object.fromEntries(headers)
    this.error = error
  }
}

export async function request({
  base_url,
  endpoint,
  auth,
  accessToken,
  params: query = {},
  request_body,
  method,
  headers,
  ...options
}: RequestOptions): Promise<Response | ApiResponseError> {
  const url = new URL(base_url + endpoint)
  url.search = buildQueryString(query)
  const includeBody = (method === 'POST' || method === 'PUT' || method === 'PATCH') && !!request_body
  const contentType = method === 'PATCH' ? 'application/merge-patch+json' : 'application/json'
  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/ld+json',
      ...(auth ? {'X-Auth-Token': auth} : undefined),
      ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : undefined),
      ...(includeBody
        ? {'Content-Type': `${contentType}; charset=utf-8`}
        : undefined),
      ...headers,
    },
    method,
    body: includeBody ? JSON.stringify(request_body) : undefined,
    ...options,
  })
  if (!response.ok) {
    const error = await response.json()
    return new ApiResponseError(
      response.status,
      response.statusText,
      response.headers,
      error,
    )
  }
  return response
}

export async function rest<T = Record<string, any>>(
  args: RequestOptions,
): Promise<T> {
  const response = await request(args)
  return !(response instanceof ApiResponseError) && response.status !== 204
    ? response.json()
    : response
}
