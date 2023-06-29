import {useState} from 'react'
import {SignInView} from './SignInView'
import {SignUpView} from './SignUpView'

export function SignInSignUpView({nextView}: {nextView: () => void}) {
  const [page, setPage] = useState('sign_in')
  return (
    <div className="w-full min-w-full">
      {page === 'sign_in' && (
        <SignInView changePage={f => setPage(f)} nextView={nextView} />
      )}
      {page === 'sign_up' && <SignUpView changePage={f => setPage(f)} />}
    </div>
  )
}
