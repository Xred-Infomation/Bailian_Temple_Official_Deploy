import axios from 'axios'

const baseURL = import.meta.env.PROD
  ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` // 讀正式環境
  : '/api/v1' // 本地開發用相對路徑

const api = axios.create({
  baseURL,
  timeout: 10000,
})

export default api
