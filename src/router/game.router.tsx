import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameRouteNames } from './route-names';
import { Text } from 'react-native'
import Menu from '../screens/menu/Menu.screen';
import SetupTableScreen from '../screens/game/SetupTable.screen';
import ActiveGameScreen from '../screens/game/ActiveGame.screen';
import GameReplayScreen from '../screens/game_history/GameReplay.screen';
import EndGameScreen from '../screens/game/EndGame.screen';

const GameStack = createNativeStackNavigator()

const authRoutes = (
    <GameStack.Navigator initialRouteName='Menu'>
        <GameStack.Screen name={GameRouteNames.MAIN_MENU} component={Menu} options={{
            headerShown: false
        }}/>
        <GameStack.Screen name={GameRouteNames.SETUP_TABLE} component={SetupTableScreen} options={{
            headerTitle: (props) => <Text {...props}>Game Setup</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.ACTIVE_GAME} component={ActiveGameScreen} options={{
            headerTitle: (props) => <Text {...props}>Battle</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.HISTORY} component={GameReplayScreen} options={{
            headerTitle: (props) => <Text {...props}>Game History</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.END_GAME} component={EndGameScreen} options={{
            headerShown: false
        }}/>
    </GameStack.Navigator>
)

export default authRoutes;