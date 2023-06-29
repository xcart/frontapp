import {MyAccount} from '~/components/auth/MyAccount'

export function MyAccountView({
  instantLogout = () => {},
}: {
  instantLogout: () => void
}) {
  return (
    <div className="w-full min-w-full">
      <div className="mb-unit-3 flex items-center justify-between">
        <h2>My account</h2>
      </div>
      <div className="flex flex-col gap-unit-8">
        <MyAccount instantLogout={instantLogout} />
      </div>
    </div>
  )
}
