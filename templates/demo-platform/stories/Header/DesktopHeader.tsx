/**
 * TODO: Should be removed after Storybook upgrade to v7
 */
import {Category} from '@xcart/storefront'
import Link from 'next/link'
import {ButtonIcon} from '~/components/elements/Button'
import {IconCart, IconHeart} from '~/components/elements/Icons'
import {Logo} from '~/components/elements/Logo'
import {Categories} from '~/components/global/Categories'
import {Search} from '~/components/global/Header/Search'

export function DesktopHeader({categories}: {categories: Category[]}) {
  return (
    <div className="hidden lg:block">
      <div className="bg-gray-300">
        <div className="page flex h-unit-8 items-center justify-end px-unit-16">
          <Link
            href="/"
            className="px-unit-2 text-xs text-gray-700 no-underline"
          >
            Service
          </Link>
          <Link
            href="/"
            className="px-unit-2 text-xs text-gray-700 no-underline"
          >
            Sign in
          </Link>
        </div>
      </div>
      <div className="page flex h-header w-full items-center justify-between border-b border-gray-300 px-unit-16">
        <div className="flex items-center">
          <Link href="/">
            <Logo className="mr-unit-10 fill-primary" />
          </Link>
          <div className="flex items-center">
            <Categories categories={categories} />
          </div>
        </div>
        <div className="flex items-center">
          <Search popular={categories} />
          <ButtonIcon className="ml-unit-3">
            <IconHeart />
          </ButtonIcon>
          <ButtonIcon className="ml-unit-3">
            <IconCart />
          </ButtonIcon>
        </div>
      </div>
    </div>
  )
}
