import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { GameContext, IHit, useGameContext } from '../../hooks/gameContext';
import { useRoute } from '@react-navigation/native';
import Table from '../../components/Table';
import styled from 'styled-components/native';
import Counter from '../../components/Counter';
import { Colours } from '../../styles/colours';
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled.View`
  flex: 1;
  padding-top: 20px;
  padding-horizontal: 20px;
  background-color: ${Colours.BABY_BLUE};
  position: relative;
`;

const UserText = styled.Text`
  font-size: 18px;
  color: ${Colours.BLACK};
  background-color: ${Colours.YELLOW};
  border: 3px solid ${Colours.RED};
  border-radius: 15px;
  text-align: center;
  font-weight: bold;
  padding:2px;
  margin-left: 10px;
  margin-right: 10px;
`;

const TableContainer = styled.View`
padding: 10px;
margin-bottom: 20px;
`;

const BottomStrip = styled.View`
  flex: 1;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 12%; 
  background-color: ${Colours.DARK_BLUE}; 
`;

const GameReplayScreen = () => {
  const route = useRoute<any>();
  const gameCtx = useGameContext();

  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [movesCut, setMovesCut] = useState<IHit[]>([]);


  const  increaseCounter = () => {
    if (counter < gameCtx.moves.length) {
      let new_counter = counter + 1;
      setCounter(new_counter);
      setMovesCut(gameCtx.moves.slice(0, new_counter));    
    }
  };

  const decreaseCounter = () => {
    let new_counter = Math.max(0, counter - 1);
    setCounter(new_counter);
    setMovesCut(gameCtx.moves.slice(0, new_counter));    
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await gameCtx.loadGame(route.params.gameId);
      setIsLoading(false);
    };

    fetchData();
  }, [])



  if(isLoading) {
    return (
        <SafeAreaView style = {
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }
        }>
            <ActivityIndicator size = "large" color = {Colours.PINK} />
        </SafeAreaView>
    )
  }
  return (      
    <Container>
      <UserText>{gameCtx.game.player1.email.split("@")[0]}</UserText>
      <TableContainer>
        <Table state={gameCtx.tableState1} moves={movesCut} player={2} />
      </TableContainer>
      <UserText>{gameCtx.game.player2.email.split("@")[0]}</UserText>
      <TableContainer>
      <Table state={gameCtx.tableState2} moves={movesCut} player={1}/>
      </TableContainer>
      <BottomStrip>
        <Counter count={counter} onIncrease={increaseCounter} onDecrease={decreaseCounter} />
      </BottomStrip>
    </Container>
  );
}

export default () => (
  <GameContext>
    <GameReplayScreen />
  </GameContext>
 );


