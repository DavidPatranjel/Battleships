import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native'; // Modificare aici
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GameContext, useGameContext } from '../../hooks/gameContext';
import Table from '../../components/Table';

const SetupTableScreen = () => {
  const route = useRoute<any>();
  const gameCtx = useGameContext();
  console.log("hereee");
  console.log(gameCtx);
  useEffect(() => {
    gameCtx.loadGame(route.params.gameId);
  }, [])
  return (      
    <SafeAreaView>
      <Text>SetupTableScreen</Text>
      <Table state = {[
        [{id: 'A1', value: '', boat: 'N'}],
        [],
        [],
        [],
        [], 
      ]}/>
    </SafeAreaView>
  );
}

export default () => (
  <GameContext>
    <SetupTableScreen />
  </GameContext>
 );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

