import {Product, ProductDetailed} from '@xcart/storefront'
import {SelectedAttributes} from '~/components/product/interface'

export const ROOT_CATEGORIES = [
  {id: 1, name: 'Men', cleanUrl: 'men'},
  {id: 2, name: 'Women', cleanUrl: 'women'},
  {id: 4, name: 'Children', cleanUrl: 'children'},
]

export const SUBCATEGORIES = [
  {id: 1, name: 'Men', cleanUrl: 'men'},
  {id: 2, name: 'Women', cleanUrl: 'women'},
  {id: 4, name: 'Children', cleanUrl: 'children'},
  {id: 5, name: 'Sale', cleanUrl: 'sale'},
  {id: 6, name: 'New arrivals', cleanUrl: 'new-arrivals'},
]

export const BREADCRUMBS = [
  {id: 1, name: 'Home', cleanUrl: '/home'},
  {id: 2, name: 'Category', cleanUrl: '/category'},
  {id: 2, name: 'Product', cleanUrl: '/product'},
]

export const TABS = [
  {
    id: 1,
    name: 'Description',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum quam erat, tincidunt mollis nisi auctor sit amet. Nullam vel suscipit ante. Nunc at quam eget nisl tristique faucibus. Suspendisse efficitur eu augue at lacinia. Donec id lorem at tellus condimentum gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed iaculis blandit erat, sit amet ultrices quam. Duis vulputate quam in finibus convallis. Aenean at dictum elit. Nulla ut pretium risus. Praesent aliquet ipsum a aliquam consectetur. Donec non metus a est cursus porttitor.</p>',
  },
  {
    id: 2,
    name: 'Specification',
    content:
      '<ul><li>Sed dignissim nibh non porttitor feugiat</li><li>Donec posuere nibh facilisis magna blandit luctus</li><li>Ut vestibulum quam ut nunc feugiat, ac ornare libero bibendum</li></ul>',
  },
  {
    id: 3,
    name: 'Some info',
    content:
      '<p>Vivamus in augue enim. In mollis diam vel venenatis malesuada. Pellentesque porttitor pharetra maximus. Nullam dapibus quis lectus ut efficitur. Proin luctus sem ante, non mattis diam dictum ac. Morbi quis felis consectetur, ullamcorper nunc non, maximus justo. Nunc a nisi sit amet nulla ultricies imperdiet. Pellentesque sit amet sapien eget ante imperdiet pretium in quis urna. Phasellus et sapien enim.</p>',
  },
]

export const IMAGES = [
  {
    url: 'storybook-product-image.jpg',
    width: 720,
    height: 720,
    alt: '',
  },
  {
    url: 'storybook-product-image2.jpg',
    width: 720,
    height: 720,
    alt: '',
  },
  {
    url: 'storybook-product-image3.jpg',
    width: 720,
    height: 720,
    alt: '',
  },
]

export const PRODUCT_NO_ATTRIBUTES: ProductDetailed = {
  sku: '100000001',
  id: 1,
  name: 'Test product',
  cleanUrl: 'test-product',
  images: [
    {
      url: 'storybook-product-image.jpg',
      width: 720,
      height: 720,
      alt: 'Test product alt',
    },
  ],
  price: 10,
  salePrice: 5,
  marketPrice: 12,
}

export const PRODUCT: ProductDetailed = {
  sku: '100000001',
  id: 1,
  name: 'Test product',
  cleanUrl: 'test-product',
  images: [
    {
      url: 'storybook-product-image.jpg',
      width: 720,
      height: 720,
      alt: 'Test product alt',
    },
    {
      url: 'storybook-product-image2.jpg',
      width: 720,
      height: 720,
      alt: 'Test product alt',
    },
    {
      url: 'storybook-product-image3.jpg',
      width: 720,
      height: 720,
      alt: 'Test product alt',
    },
  ],
  price: 10,
  salePrice: 5,
  marketPrice: 12,
  attributes: [
    {
      id: 1,
      name: 'Size',
      type: 'S',
      displayMode: 'B',
      editable: false,
      displayAbove: true,
      values: [
        {
          id: 1,
          value: 'S',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: true,
        },
        {
          id: 2,
          value: 'M',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: false,
        },
        {
          id: 3,
          value: 'L',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: false,
        },
        {
          id: 4,
          value: 'XL',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: false,
        },
      ],
      group: 'Test',
    },
    {
      id: 2,
      name: 'Color',
      type: 'S',
      // @ts-ignore
      displayMode: 'C',
      editable: false,
      displayAbove: true,
      values: [
        {
          id: 1,
          value: 'Red',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: true,
          swatchColor: 'FF0000',
        },
        {
          id: 2,
          value: 'Green',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: false,
          swatchColor: '24ff00',
        },
        {
          id: 3,
          value: 'Blue',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: false,
          swatchColor: '02c2ff',
        },
        {
          id: 4,
          value: 'XL',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: false,
          swatchColor: '000000',
        },
      ],
      group: 'Test',
    },
    {
      id: 3,
      name: 'Select',
      type: 'S',
      displayMode: 'S',
      editable: false,
      displayAbove: true,
      values: [
        {
          id: 1,
          value: 'First',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: true,
          swatchColor: '',
        },
        {
          id: 2,
          value: 'Second',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: false,
          swatchColor: '',
        },
        {
          id: 3,
          value: 'Third',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: false,
          swatchColor: '',
        },
        {
          id: 4,
          value: 'Fourth',
          priceModifier: 0,
          priceModifierType: 'p',
          isDefault: false,
          swatchColor: '',
        },
      ],
      group: 'Test',
    },
  ],
}

export const SELECTED_ATTRIBUTES: SelectedAttributes = {
  '2': {
    id: '2',
    name: 'Green',
    value: 'Green',
  },
  '1': {
    id: '2',
    name: 'M',
    value: 'M',
  },
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Test product',
    cleanUrl: 'test-product',
    images: [
      {
        url: 'storybook-product-image.jpg',
        width: 720,
        height: 720,
        alt: 'Test product alt',
      },
    ],
    price: 10,
    salePrice: 5,
    marketPrice: 12,
  },
  {
    id: 2,
    name: 'Test product 2',
    cleanUrl: 'test-product-2',
    images: [
      {
        url: 'storybook-product-image.jpg',
        width: 720,
        height: 720,
        alt: 'Test product 2 alt',
      },
    ],
    price: 20,
    salePrice: 10,
    marketPrice: 22,
  },
  {
    id: 3,
    name: 'Test product 3',
    cleanUrl: 'test-product-3',
    images: [
      {
        url: 'storybook-product-image.jpg',
        width: 720,
        height: 720,
        alt: 'Test product 3 alt',
      },
    ],
    price: 30,
    salePrice: 15,
    marketPrice: 32,
  },
  {
    id: 4,
    name: 'Test product 4',
    cleanUrl: 'test-product-4',
    images: [
      {
        url: 'storybook-product-image.jpg',
        width: 720,
        height: 720,
        alt: 'Test product 4 alt',
      },
    ],
    price: 40,
    salePrice: 20,
    marketPrice: 0,
  },
]

export const PRODUCTS2: Product[] = [
  {
    id: 1,
    name: 'Test product',
    cleanUrl: 'test-product',
    images: [
      {
        url: 'storybook-product-image2.jpg',
        width: 720,
        height: 720,
        alt: 'Test product alt',
      },
    ],
    price: 10,
    salePrice: 5,
    marketPrice: 12,
  },
  {
    id: 2,
    name: 'Test product 2',
    cleanUrl: 'test-product-2',
    images: [
      {
        url: 'storybook-product-image2.jpg',
        width: 720,
        height: 720,
        alt: 'Test product 2 alt',
      },
    ],
    price: 20,
    salePrice: 10,
    marketPrice: 22,
  },
  {
    id: 3,
    name: 'Test product 3',
    cleanUrl: 'test-product-3',
    images: [
      {
        url: 'storybook-product-image2.jpg',
        width: 720,
        height: 720,
        alt: 'Test product 3 alt',
      },
    ],
    price: 30,
    salePrice: 15,
    marketPrice: 32,
  },
  {
    id: 4,
    name: 'Test product 4',
    cleanUrl: 'test-product-4',
    images: [
      {
        url: 'storybook-product-image2.jpg',
        width: 720,
        height: 720,
        alt: 'Test product 4 alt',
      },
    ],
    price: 40,
    salePrice: 20,
    marketPrice: 0,
  },
]

export const FOOTER_MENU_ITEMS = [
  {
    name: 'Contact Us',
    content:
      '<div class="leading-base"><strong><a href="tel:1-800-657-7957" class="no-underline">1-800-657-7957</a></strong><div class="text-xs leading-sm">Mon-Fr, 09.00 - 17.00</div></div>',
  },
  {
    name: 'Service',
    content:
      '<ul><li class="mb-unit-3"><a href="/">Link 1</a></li><li class="mb-unit-3"><a href="/">Link 2</a></li><li><a href="/">Link 3</a></li></ul>',
  },
]
