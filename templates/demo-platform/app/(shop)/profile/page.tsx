import {notFound} from 'next/navigation'
import PageContent from '~/components/global/PageContent'
import {ProfileDetails} from '~/components/profile/ProfileDetails'
import {getXCartClient} from '../../client'

export async function generateMetadata() {
  return {
    title: 'Profile Details',
  }
}

export default async function Page() {
  const client = await getXCartClient()

  if (!client.hasAccessToken()) {
    notFound()
  }

  const userData = await client.other.getUserItem()

  return (
    <PageContent pageTitle="Profile Details">
      <ProfileDetails user={userData} />
    </PageContent>
  )
}
