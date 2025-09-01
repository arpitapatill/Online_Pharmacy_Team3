import axios from 'axios'

// Base URL for all API requests (falls back to localhost:8080)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

// Reusable Axios client
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

// Simple error message extractor
function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status
    const data: any = err.response?.data
    const msg = data?.message || data?.error || err.message
    return status ? `${msg} (status ${status})` : msg
  }
  return 'Request failed'
}

// GET JSON
export async function getJson<TRes>(url: string, params?: Record<string, any>): Promise<TRes> {
  try {
    const { data } = await api.get<TRes>(url, { params })
    return data
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}

// POST JSON
export async function postJson<TReq, TRes>(url: string, body: TReq): Promise<TRes> {
  try {
    const { data } = await api.post<TRes>(url, body)
    return data
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}

// PUT JSON
export async function putJson<TReq, TRes>(url: string, body: TReq): Promise<TRes> {
  try {
    const { data } = await api.put<TRes>(url, body)
    return data
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}

// DELETE JSON
export async function deleteJson<TRes>(url: string): Promise<TRes> {
  try {
    const { data } = await api.delete<TRes>(url)
    return data
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}