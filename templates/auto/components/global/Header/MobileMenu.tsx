'use client'

import {useEffect, useState} from 'react'
import {Category} from '@xcart/storefront'
import {ForgotPasswordView} from '~/components/auth/Views/ForgotPasswordView'
import {MyAccountView} from '~/components/auth/Views/MyAccountView'
import {SignInSignUpView} from '~/components/auth/Views/SignInSignUpView'
import {ButtonBase} from '~/components/elements/Button'
import {Drawer} from '~/components/elements/Drawer'
import {IconArrowDown, IconMenu} from '~/components/elements/Icons'
import {Categories} from '~/components/global/Categories'
import {tailwindMerge} from '~/helpers'

function MainView({
  user,
  categories,
  nextView,
}: {
  user: boolean
  categories: Category[]
  nextView: () => void
}) {
  return (
    <div className="w-full min-w-full">
      <div className="mb-unit-3 flex items-center justify-between">
        <h2>Menu</h2>
      </div>
      <div>
        <div>
          <Categories
            categories={categories}
            rootClasses="items-start flex flex-col gap-unit-2"
            itemClasses="px-0"
            linkClasses="block text-primary after:hidden"
          />
        </div>
        <hr className="my-unit-4" />
        {user ? (
          <button
            onClick={nextView}
            className="flex w-full items-center justify-between"
            aria-label="My account"
          >
            <span>My Account</span>
            <span className="w-unit-4">
              <IconArrowDown className="-rotate-90 fill-primary" />
            </span>
          </button>
        ) : (
          <button
            onClick={nextView}
            className="flex w-full items-center justify-between"
            aria-label="Sign in"
          >
            <span>Sign in</span>
            <span className="w-unit-4">
              <IconArrowDown className="-rotate-90 fill-primary" />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export function MobileMenu({
  user,
  categories,
}: {
  user: boolean
  categories: Category[]
}) {
  const [instantLogout, setInstantLogout] = useState(false)
  const [currentView, setCurrentView] = useState(0)

  const nextView = () => setCurrentView(f => f + 1)
  const prevView = () => setCurrentView(f => f - 1)

  useEffect(() => {
    if (instantLogout) {
      setTimeout(() => setInstantLogout(false), 2000)
    }
  }, [instantLogout])

  const views = [
    {
      id: 'menu',
      title: 'Menu',
      visible: 'always',
      component: (
        <MainView
          user={user}
          categories={categories}
          nextView={nextView}
          key="menu"
        />
      ),
    },
    {
      id: 'sign_in',
      title: 'Sign in',
      visible: 'unauthorized',
      component: <SignInSignUpView nextView={nextView} key="sign_in" />,
    },
    {
      id: 'forgot_password',
      title: 'Forgot password?',
      visible: 'unauthorized',
      component: <ForgotPasswordView key="forgot_password" />,
    },
    {
      id: 'my_account',
      title: 'My account',
      visible: 'authorized',
      component: (
        <MyAccountView
          instantLogout={() => setInstantLogout(true)}
          key="my_account"
        />
      ),
    },
  ]

  // eslint-disable-next-line react/no-unstable-nested-components
  function Back() {
    return (
      <button
        onClick={prevView}
        className="flex items-center text-sm font-normal outline-none md:text-base"
        aria-label="Back"
      >
        <span className="w-unit-4">
          <IconArrowDown className="rotate-90 fill-gray-700" />
        </span>
        <span className="pl-unit text-gray-700 underline">
          {views[currentView - 1]?.title}
        </span>
      </button>
    )
  }

  let offsetClasses

  // hack for tailwind
  switch (currentView) {
    case 0:
      offsetClasses = ''
      break
    case 1:
      offsetClasses =
        'translate-x-[calc(calc(-100%-20px)*1)] md:translate-x-[calc(calc(-100%-60px)*1)]'
      break
    case 2:
      offsetClasses =
        'translate-x-[calc(calc(-100%-20px)*2)] md:translate-x-[calc(calc(-100%-60px)*2)]'
      break
    default:
      offsetClasses = ''
  }

  return (
    <Drawer
      triggerElement={
        <ButtonBase
          className="ml-unit-3 flex h-unit-6 w-unit-6 items-center justify-center rounded border-0 hover:bg-gray-300"
          aria-label="Menu"
        >
          <IconMenu className="w-unit-4 fill-primary" />
        </ButtonBase>
      }
      width="100%"
    >
      <Drawer.StickyHeader
        title={<Back />}
        forceTitleVisibility={currentView > 0}
      />
      <Drawer.Content>
        <div className="overflow-hidden">
          <div
            className={tailwindMerge(
              'flex gap-unit-4 transition-transform duration-300 md:gap-unit-12',
              offsetClasses,
            )}
          >
            {views
              .filter(
                f =>
                  f.visible === 'always' ||
                  (user && !instantLogout
                    ? f.visible === 'authorized'
                    : f.visible === 'unauthorized'),
              )
              .map(f => f.component)}
          </div>
        </div>
      </Drawer.Content>
    </Drawer>
  )
}
