import { FC, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './state/store'
import * as SplashScreen from 'expo-splash-screen'
import { Navigation } from './navigation'
import { EXPO_BUILD_ENV } from './config/env'
import Constants from 'expo-constants'

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

export const RootComponent: FC = () => {
  useEffect(() => {
    if (EXPO_BUILD_ENV === 'dev' && Constants.manifest?.debuggerHost) {
      const localHostURL = `http://${Constants.manifest.debuggerHost.split(':').shift()}:8000`
      console.log(`Local API endpoint accessible at: ${localHostURL}`)
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
