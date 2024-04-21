import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import BattlesScreen from '../screens/battles/Battles.screen';
import UserInfoScreen from '../screens/user/UserInfo.screen';
import LobbyScreen from '../screens/lobby/Lobby.screen';
import NewGameScreen from '../screens/game/NewGame.screen';
import GameHistoryScreen from '../screens/game_history/GameHistory.screen';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from 'react-native';
import { Colours } from '../styles/colours'
import { createGame} from '../api'
import { useAuth } from "../hooks/authContext";


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children }) => {
  const auth = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const handleCreateGame = async () => {
    await createGame(auth.token);
  }

  const reloadPage = () => {
    // ceva aici help
  };

  return (
    <View>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalTextA}>You have created</Text>
                <Text style={styles.modalTextB}>a new game!</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => 
                {
                  handleCreateGame();
                  setModalVisible(!modalVisible);
                  reloadPage();
                }}>
                <Text style={styles.textStyle}>Close</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
      <TouchableOpacity
        style={{
          top: -30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setModalVisible(true)}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: Colours.DARK_BLUE,
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Tabs = () => {

  function getColor(focused) {
    return focused ? Colours.DARK_BLUE : Colours.BLACK;
  }

  return (
  
      <Tab.Navigator
        initialRouteName="Battles"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 2,
            backgroundColor: Colours.WHITE,
            borderRadius: 25,
            height: 90,
          }
        }}
      >
      
        <Tab.Screen name='Lobby' component={LobbyScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1}}>
              <Image
                source={require('../../assets/icons/home.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: getColor(focused),
                }}
              />
              <Text style={{ color: getColor(focused), fontSize: 12, marginTop: 10 }}>Lobby</Text>
            </View>
          ),
        }} />
        <Tab.Screen name='Battles' component={BattlesScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1}}>
              <Image
                source={require('../../assets/icons/cruise.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: getColor(focused),
                }}
              />
              <Text style={{ color: getColor(focused), fontSize: 12, marginTop: 10 }}>Battles</Text>
            </View>
          ),
        }} />
    
    <Tab.Screen name='New Game' component={NewGameScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1}}>
                <Image
                  source={require('../../assets/icons/plus.png')}
                  resizeMode='contain'
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: Colours.WHITE,
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
            <View style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1}}>
              <Image
                source={require('../../assets/icons/hourglass.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: getColor(focused)
                }}
              />
              <Text style={{ color: getColor(focused), fontSize: 12, marginTop: 10 }}>History</Text>
            </View>
          ),
        }} />
        <Tab.Screen name='Account' component={UserInfoScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1}}>
              <Image
                source={require('../../assets/icons/user.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: getColor(focused)
                }}
              />
              <Text style={{ color: getColor(focused), fontSize: 12, marginTop: 10 }}>Account</Text>
            </View>
          ),
        }} />
      </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: Colours.DARK_BLUE,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextB: {
    fontSize: 17,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTextA: {
    fontSize: 17,
    textAlign: 'center',
  },
});
 

export default Tabs;
