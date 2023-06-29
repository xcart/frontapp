import {SuccessPage} from './SuccessPage'

export default async function Page({
  searchParams,
}: {
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  return <SuccessPage orderNumber={searchParams?.order_number as string} />
}
