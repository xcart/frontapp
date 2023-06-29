import {ForgotPassword} from '~/components/auth/ForgotPassword'

export function ForgotPasswordView() {
  return (
    <div className="w-full min-w-full">
      <div className="mb-unit flex items-center justify-between">
        <h2>Forgot password?</h2>
      </div>
      <ForgotPassword />
    </div>
  )
}
