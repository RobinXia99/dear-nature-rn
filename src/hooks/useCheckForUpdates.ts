import { useEffect, useState } from 'react'
import * as Updates from 'expo-updates'

export const useCheckForUpdates = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    checkVersion()
  }, [])

  const checkVersion = async () => {
    if (__DEV__) {
      setLoadingComplete(true)
      return
    }

    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComplete(true)
    }
  }

  return isLoadingComplete
}
