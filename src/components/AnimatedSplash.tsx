import { useEffect, useMemo, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import { useAppLoading } from '../hooks/useAppLoading'

export const AnimatedSplashScreen = ({ children }: { children: JSX.Element }) => {
  const isAppLoaded = useAppLoading()

  const animation = useMemo(() => new Animated.Value(1), [])
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false)
  const image = '../assets/images/splash.png'

  useEffect(() => {
    if (isAppLoaded && children) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true))
    }
  }, [isAppLoaded, animation, children])

  return (
    <View style={{ flex: 1 }}>
      {isAppLoaded && !isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#000',
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: Constants.manifest?.splash?.resizeMode || 'contain',
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={require(image)}
            fadeDuration={0}
          />
        </Animated.View>
      )}
      {isSplashAnimationComplete && children}
    </View>
  )
}
