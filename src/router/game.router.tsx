import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameRouteNames } from './route-names';
import { Text } from 'react-native'
import Menu from '../screens/menu/Menu.screen';

const GameStack = createNativeStackNavigator()

const authRoutes = (
    <GameStack.Navigator initialRouteName='Menu'>
        <GameStack.Screen name={GameRouteNames.MAIN_MENU} component={Menu} options={{
            headerShown: false
        }}/>
    </GameStack.Navigator>
)

export default authRoutes;