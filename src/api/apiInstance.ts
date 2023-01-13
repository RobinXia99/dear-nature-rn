import axios from 'axios'
import { API_HOST, EXPO_BUILD_ENV } from '../config/env'

export const apiInstance = axios.create({
  baseURL: API_HOST,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

if (EXPO_BUILD_ENV === 'dev') {
  apiInstance.interceptors.response.use(
    (res) => {
      console.log('--- API LOG RESPONSE ---')
      console.log('API request to:       ', res.config?.url)
      console.log('Returned with status: ', res.status)
      console.log('Status text:          ', res.statusText)
      console.log('Body:                 ', res.data)
      console.log('------')

      return res
    },
    (error) => {
      console.log('--- API LOG ERROR ---')
      console.log('API request failed with error: ', error)

      if (axios.isAxiosError(error)) {
        console.log('Axios Error')
        console.log('Message: ', error.message)
        console.log('Code: ', error.code)
        console.log('Status: ', error.response?.status)
        console.log('StatusText: ', error.response?.statusText)
        console.log('Body/Data: ', error.response?.data)
        console.log('Request URL:  ', error.response?.config?.url)
        console.log('Request payload:  ', error.response?.config?.data)
      }
      console.log('------')

      return Promise.reject(error)
    }
  )
}
