import {Category} from '@xcart/storefront'
import {CartDrawerWrapper} from '~/components/cart/CartDrawerWrapper'
import {Categories} from '~/components/global/Categories'
import {DesktopHeaderBase} from '~/components/global/Header/Components/DesktopHeaderBase'
import {Search} from '~/components/global/Header/Search'
import {WishlistDrawerWrapper} from '~/components/wishlist/WishlistDrawerWrapper'

export function DesktopHeader({categories}: {categories: Category[]}) {
  return (
    <DesktopHeaderBase menu={<Categories categories={categories} />}>
      <Search popular={categories} />
      {/* @ts-expect-error Server Component */}
      <WishlistDrawerWrapper />
      {/* @ts-expect-error Server Component */}
      <CartDrawerWrapper />
    </DesktopHeaderBase>
  )
}
