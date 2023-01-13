import { Modal } from '../../../screens/Modal'
import { NotFound } from '../../../screens/NotFound'
import { Stack } from '../../navigationUtils'
import { BottomTabNavigator } from './BottomTabNavigator'

export const LoggedInRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFound} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={Modal} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
