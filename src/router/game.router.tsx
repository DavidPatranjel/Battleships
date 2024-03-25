import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameRouteNames } from './route-names';
import { Text } from 'react-native'
import SetupTableScreen from '../screens/game/SetupTable.screen';

const GameStack = createNativeStackNavigator()

const authRoutes = (
    <GameStack.Navigator initialRouteName='Login'>
        <GameStack.Screen name={GameRouteNames.SETUP_TABLE} component={SetupTableScreen} options={{
            headerTitle: (props) => <Text {...props}>Setup Table</Text>
        }}/>
    </GameStack.Navigator>
)

export default authRoutes;