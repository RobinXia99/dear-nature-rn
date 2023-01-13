import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useCheckForUpdates } from './useCheckForUpdates'
import { useLoadFonts } from './useLoadFonts'

export const useAppLoading = () => {
  const checkUpdate = useCheckForUpdates()
  const loadFonts = useLoadFonts()

  useEffect(() => {
    if (checkUpdate && loadFonts) {
      SplashScreen.hideAsync()
    }
  }, [checkUpdate, loadFonts])

  return checkUpdate && loadFonts
}
