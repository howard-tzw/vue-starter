import axios from 'axios'
import { FactoriesResponse } from '@/types'

const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/server/api'

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getFactories(range: number, lng: number, lat: number): Promise<FactoriesResponse> {
  try {
    const { data } = await instance.get(`/factories?range=${range}&lng=${lng}&lat=${lat}`)
    return data
  } catch (err) {
    console.error(err)
    throw new Error('Failed to get factories')
  }
}
