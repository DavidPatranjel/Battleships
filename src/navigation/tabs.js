import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BattlesScreen from '../screens/battles/Battles.screen';
import UserInfoScreen from '../screens/user/UserInfo.screen';
import LobbyScreen from '../screens/lobby/Lobby.screen';
import GameHistoryScreen from '../screens/game_history/GameHistory.screen';
import NewGameScreen from '../screens/game/NewGame.screen';
import { Image, Text, View, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#F26457',
    }}>
      {children}
    </View>
  </TouchableOpacity>
)

const Tabs = () => {
  return (
  
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 25,
            height: 90,
          }
        }}
      >
      
        <Tab.Screen name='Lobby' component={LobbyScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../../assets/icons/home.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#F26457' : '#000000',
                }}
              />
              <Text style={{ color: focused ? '#F26457' : '#000000', fontSize: 12, marginTop: 10 }}>Lobby</Text>
            </View>
          ),
        }} />
        <Tab.Screen name='Battles' component={BattlesScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../../assets/icons/cruise.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#F26457' : '#000000',
                }}
              />
              <Text style={{ color: focused ? '#F26457' : '#000000', fontSize: 12, marginTop: 10 }}>Battles</Text>
            </View>
          ),
        }} />
    
    <Tab.Screen name='New Game' component={NewGameScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                <Image
                  source={require('../../assets/icons/plus.png')}
                  resizeMode='contain'
                  style={{
                    width: 30,
                    height: 30,
                    marginBottom:20,
                    tintColor: '#fff',
                  }}
                />
              </View>
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}></CustomTabBarButton>
            )
          }}
        />
        
        <Tab.Screen name='History' component={GameHistoryScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../../assets/icons/hourglass.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#F26457' : '#000000'
                }}
              />
              <Text style={{ color: focused ? '#F26457' : '#000000', fontSize: 12, marginTop: 10 }}>History</Text>
            </View>
          ),
        }} />
        <Tab.Screen name='Account' component={UserInfoScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../../assets/icons/user.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#F26457' : '#000000'
                }}
              />
              <Text style={{ color: focused ? '#F26457' : '#000000', fontSize: 12, marginTop: 10 }}>Account</Text>
            </View>
          ),
        }} />
      </Tab.Navigator>
  );
}

export default Tabs;
