import {getXCartClient} from '../../../app/client'

export const getInitGarage = async () => {
  const client = await getXCartClient()

  if (!client.hasAccessToken()) {
    return null
  }

  const response = await client.garage.getGarage()

  return response
}
