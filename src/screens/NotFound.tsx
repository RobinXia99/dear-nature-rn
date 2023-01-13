import { TouchableOpacity } from 'react-native'
import { Text, View } from '../components/Themed'
import { RootStackScreenProps } from '../navigation/types'

export const NotFound = ({ navigation }: RootStackScreenProps<'NotFound'>) => {
  return (
    <View>
      <Text>This screen doesnt exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')}>
        <Text>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}
