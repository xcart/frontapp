'use client'

import {useEffect, useState} from 'react'
import {ApiResponse, search} from '../api'

function transform(product: any) {
  return {
    id: Number(product.product_id),
    name: product.name,
    price: product.price,
    images: [
      {
        url: product.image_src,
        width: product.image_width,
        height: product.image_height,
        alt: product.name,
      },
    ],
    cleanUrl: product.url.split('/').pop(),
  }
}

const initialState: {
  products: ApiResponse['products']
  numFound: ApiResponse['numFoundProducts']
  hasMore: ApiResponse['haveMoreResults']
} = {
  products: [],
  numFound: 0,
  hasMore: false,
}

export function useCloudSearch(searchValue: string) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const fetchData = async (q: string) => {
      const response = await search(q)
      if (response && response.products) {
        setState({
          products: response.products.map(transform),
          numFound: response.numFoundProducts,
          hasMore: response.haveMoreResults ?? false,
        })
      }
      return response
    }

    if (searchValue.length === 0) {
      setState(initialState)
    } else {
      fetchData(searchValue)
    }
  }, [searchValue])

  return state
}
