/**
 * TODO: Should be removed after Storybook upgrade to v7
 */
import {Category} from '@xcart/storefront'
import Link from 'next/link'
import {ButtonIcon} from '~/components/elements/Button'
import {IconCart, IconHeart} from '~/components/elements/Icons'
import {Logo} from '~/components/elements/Logo'
import {MobileMenu} from '~/components/global/Header/MobileMenu'
import {Search} from '~/components/global/Header/Search'

export function MobileHeader({categories}: {categories: Category[]}) {
  return (
    <div className="flex h-header w-full items-center justify-between border-b border-gray-300 px-unit-4 lg:hidden">
      <Link href="/">
        <Logo className="max-w-[114px] fill-primary" />
      </Link>
      <div className="flex items-center">
        <MobileMenu user={false} categories={categories} />
        <ButtonIcon className="ml-unit-3">
          <IconHeart />
        </ButtonIcon>
        <Search popular={categories} />
        <ButtonIcon className="ml-unit-3">
          <IconCart />
        </ButtonIcon>
      </div>
    </div>
  )
}
