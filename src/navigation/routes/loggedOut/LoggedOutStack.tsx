import { LoggedOutStartScreen } from '../../../screens/LoggedOutStart'
import { Stack } from '../../navigationUtils'

export const LoggedOutRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoggedOutStart" component={LoggedOutStartScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
