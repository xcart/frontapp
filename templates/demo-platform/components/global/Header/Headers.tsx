import {getXCartClient} from 'app/client'
import {DesktopHeader} from '~/components/global/Header/DesktopHeader'
import {MobileHeader} from '~/components/global/Header/MobileHeader'

export async function Headers() {
  const client = await getXCartClient()
  const rootCategories = await client.getRootCategories({categoriesCount: 3})

  return (
    <>
      <MobileHeader
        categories={rootCategories}
        user={client.hasAccessToken()}
      />
      <DesktopHeader categories={rootCategories} />
    </>
  )
}
