import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameRouteNames } from './route-names';
import { Text } from 'react-native'
import SetupTable from '../components/SetupTable';

const GameStack = createNativeStackNavigator()

const authRoutes = (
    <GameStack.Navigator initialRouteName='Login'>
        <GameStack.Screen name={GameRouteNames.SETUP_TABLE} component={SetupTable} options={{
            headerTitle: (props) => <Text {...props}>Setup Table</Text>
        }}/>
    </GameStack.Navigator>
)

export default authRoutes;