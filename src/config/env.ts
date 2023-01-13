import Constants from 'expo-constants'
export interface EnvironmentVariables {
  EXPO_BUILD_ENV: 'production' | 'test' | 'dev'
  API_HOST: string
  GIT_COMMIT_SHA: string
}

const extras = Constants?.manifest?.extra

if (!extras) console.log('No extra object found in manifest')
if (extras) {
  if (!extras.EXPO_BUILD_ENV) console.log('No EXPO_BUILD_ENV found in extras')
  if (!extras.API_HOST) console.log('No API_HOST found in extras')
  if (!extras.GIT_COMMIT_SHA) console.log('No GIT_COMMIT_SHA found in extras')
}

export const { EXPO_BUILD_ENV, API_HOST, GIT_COMMIT_SHA } = extras as EnvironmentVariables
