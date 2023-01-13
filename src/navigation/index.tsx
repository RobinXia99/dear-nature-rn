import { FC, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LinkingConfiguration from './LinkingConfiguration'
import { useAppSelector } from '../hooks/hooks'
import { navigationRef } from './navigationUtils'
import { LoggedOutRoutes } from './routes/loggedOut/LoggedOutStack'
import { selectIsAuthenticated } from '../state/user'
import { LoggedInRoutes } from './routes/loggedIn/LoggedInStack'
import { AnimatedSplashScreen } from '../components/AnimatedSplash'

/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 */

export const Navigation: FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  return (
    <AnimatedAppLoader>
      <NavigationContainer linking={LinkingConfiguration()} ref={navigationRef}>
        {isAuthenticated ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      </NavigationContainer>
    </AnimatedAppLoader>
  )
}

const AnimatedAppLoader = ({ children }: { children: JSX.Element }) => {
  const [isSplashReady, setSplashReady] = useState(false)

  useEffect(() => {
    setSplashReady(true)
  }, [])

  if (!isSplashReady) {
    return null
  }

  return <AnimatedSplashScreen>{children}</AnimatedSplashScreen>
}
