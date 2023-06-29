import {useEffect} from 'react'
import {SignIn} from '~/components/auth/SignIn'
import {useDrawer} from '~/components/elements/Drawer'

export function SignInView({
  changePage,
  nextView,
}: {
  changePage: (page: string) => void
  nextView: () => void
}) {
  const {setAlert} = useDrawer()

  useEffect(() => {
    setAlert(null)
  }, [changePage, setAlert])

  return (
    <div className="w-full min-w-full">
      <div className="mb-unit-3 flex items-center justify-between">
        <h2>Sign in</h2>
        <button
          className="text-sm underline md:text-base"
          onClick={() => {
            changePage('sign_up')
          }}
          aria-label="Sign up"
        >
          Sign up
        </button>
      </div>
      <div className="flex flex-col">
        <SignIn />
        <button
          onClick={nextView}
          className="mt-unit-8 flex w-full justify-center text-sm underline outline-none md:mt-unit-9 md:text-base"
          aria-label="Forgot your password?"
        >
          Forgot your password?
        </button>
      </div>
    </div>
  )
}
