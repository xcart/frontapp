import {getClient} from '../../../lib/getClient'
import {client as unauthenticated} from '../../../utils/unauthenticated-client'

const clientAuth = async () => {
  let client = await getClient()

  if (!client.hasAccessToken()) {
    client = unauthenticated
  }

  return client
}

export const getMMYLevels = async () => {
  const levels = await unauthenticated.mmy.getMMYLevels()

  return levels
}

export const getMMYLevel = async (
  depth: string,
  params?: {'filter.parent'?: number},
) => {
  const levels = await unauthenticated.mmy.getMMYLevel(depth, params)

  return levels['hydra:member']
}

export const getMMYLevelById = async (depth: string, id: string) => {
  const level = await unauthenticated.mmy.getMMYLevelById(depth, id)

  return level
}

export const getGarageVehicles = async () => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return null
  }

  const response = await client.garage.getGarage()

  return response
}

export const addVehicle = async (vehicleId: number) => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return false
  }

  const response = await client.garage.addVehicle({vehicleId})

  return response
}

export const removeVehicle = async (vehicleId: number) => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return null
  }

  const response = await client.garage.deleteVehicle(String(vehicleId))

  return response
}

export const mergeGarage = async (vehicleIds: number[]) => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return false
  }

  const response = await client.garage.mergeGarage({vehicleIds})

  return response
}

export const clearGarage = async () => {
  const client = await clientAuth()

  if (!client.hasAccessToken()) {
    return false
  }

  const response = await client.garage.clearGarage({})

  return response
}

export const getVehicleByVIN = async (id: string) => {
  const response = await unauthenticated.mmy.getVehicleByVIN(id)

  return response
}
