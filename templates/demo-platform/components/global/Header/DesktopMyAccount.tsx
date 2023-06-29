'use client'

import {useEffect, useState} from 'react'
import {ForgotPasswordView} from '~/components/auth/Views/ForgotPasswordView'
import {MyAccountView} from '~/components/auth/Views/MyAccountView'
import {SignInSignUpView} from '~/components/auth/Views/SignInSignUpView'
import {Drawer} from '~/components/elements/Drawer'
import {BackToView} from '~/components/elements/Drawer/BackToView'
import {tailwindMerge} from '~/helpers'

export function DesktopMyAccount({user}: {user: boolean}) {
  const [instantLogout, setInstantLogout] = useState(false)
  const [currentView, setCurrentView] = useState(
    user ? 'my_account' : 'sign_in',
  )

  useEffect(() => {
    if (user && !instantLogout) {
      setCurrentView('my_account')
    } else {
      setCurrentView('sign_in')
      if (instantLogout) {
        setTimeout(() => setInstantLogout(false), 2000)
      }
    }
  }, [user, instantLogout])

  return (
    <Drawer
      triggerElement={
        <button
          className="px-unit-2 text-xs text-gray-700 outline-none"
          aria-label={user ? 'My account' : 'Sign in'}
        >
          {user ? 'My account' : 'Sign in'}
        </button>
      }
      width="560px"
    >
      <Drawer.StickyHeader
        title={
          <BackToView
            setView={() => setCurrentView('sign_in')}
            label="Sign in"
          />
        }
        forceTitleVisibility={currentView === 'forgot_password'}
      />
      <Drawer.Content>
        <div className="overflow-hidden">
          {(currentView === 'sign_in' || currentView === 'forgot_password') && (
            <div
              className={tailwindMerge(
                'flex gap-unit-4 transition-transform duration-300 md:gap-unit-12',
                currentView === 'forgot_password'
                  ? 'translate-x-[calc(-100%-20px)] md:translate-x-[calc(-100%-60px)]'
                  : '',
              )}
            >
              <SignInSignUpView
                nextView={() => setCurrentView('forgot_password')}
              />
              <ForgotPasswordView />
            </div>
          )}
          {currentView === 'my_account' && (
            <MyAccountView instantLogout={() => setInstantLogout(true)} />
          )}
        </div>
      </Drawer.Content>
    </Drawer>
  )
}
