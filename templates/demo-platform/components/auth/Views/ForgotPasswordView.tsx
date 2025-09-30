import {ForgotPassword} from '~/components/auth/ForgotPassword'
import {tailwindMerge} from '~/helpers'

export function ForgotPasswordView({visible = true}: {visible?: boolean}) {
  return (
    <div
      className={tailwindMerge(
        'w-full min-w-full',
        !visible ? 'invisible' : '',
      )}
    >
      <div className="mb-unit flex items-center justify-between">
        <h2>Forgot password?</h2>
      </div>
      <ForgotPassword />
    </div>
  )
}
