import {useEffect} from 'react'
import {SignUp} from '~/components/auth/SignUp'
import {useDrawer} from '~/components/elements/Drawer'

export function SignUpView({changePage}: {changePage: (view: string) => void}) {
  const {setAlert} = useDrawer()

  useEffect(() => {
    setAlert(null)
  }, [changePage, setAlert])

  return (
    <>
      <div className="mb-unit-3 flex items-center justify-between">
        <h2>Sign up</h2>
        <button
          className="text-sm underline md:text-base"
          onClick={() => {
            changePage('sign_in')
          }}
          aria-label="Sign in"
        >
          Sign in
        </button>
      </div>
      <SignUp />
    </>
  )
}
