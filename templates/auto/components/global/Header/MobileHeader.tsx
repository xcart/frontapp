import {Category} from '@xcart/storefront'
import {CartDrawerWrapper} from '~/components/cart/CartDrawerWrapper'
import {MobileHeaderBase} from '~/components/global/Header/Components/MobileHeaderBase'
import {MobileMenu} from '~/components/global/Header/MobileMenu'
import {Search} from '~/components/global/Header/Search'
import {MyGarageDrawerWrapper} from '~/components/mmy/garage/MyGarageDrawerWrapper'
import {WishlistDrawerWrapper} from '~/components/wishlist/WishlistDrawerWrapper'

export function MobileHeader({
  categories,
  user,
}: {
  categories: Category[]
  user: boolean
}) {
  return (
    <MobileHeaderBase>
      <MobileMenu user={user} categories={categories} />
      {/* @ts-expect-error Server Component */}
      <MyGarageDrawerWrapper />
      {/* @ts-expect-error Server Component */}
      <WishlistDrawerWrapper />
      <Search popular={categories} />
      {/* @ts-expect-error Server Component */}
      <CartDrawerWrapper />
    </MobileHeaderBase>
  )
}
