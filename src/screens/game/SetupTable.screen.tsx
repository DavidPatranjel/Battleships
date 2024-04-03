import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native'; // Modificare aici
import Tabs from '../../router/tabs';


const Stack = createStackNavigator();


function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar />
    </View>
  );
}


export default function SetupTable() {
  return (      
      <></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

