import { FC } from 'react'
import { API_HOST, EXPO_BUILD_ENV, GIT_COMMIT_SHA } from '../config/env'
import Constants from 'expo-constants'
import { View, Text } from 'react-native'

export const DebugInfoScreen: FC = () => {
  const runtimeVersion = Constants.manifest?.runtimeVersion

  return (
    <View>
      <Text>EXPO_BUILD_ENV: {EXPO_BUILD_ENV}</Text>
      <Text>API_HOST: {API_HOST}</Text>
      <Text>GIT_COMMIT_SHA: {GIT_COMMIT_SHA}</Text>
      <Text>runtimeVersion: {runtimeVersion}</Text>
      {/* <Text>SENTRY_DSN: {Boolean(ENV_VARS.SENTRY_DSN).toString()}</Text> */}
    </View>
  )
}
