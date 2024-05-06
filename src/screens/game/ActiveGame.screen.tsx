import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';
import TableActive from '../../components/TableActive';
import TableInactive from '../../components/TableInactive';
import styled from 'styled-components/native';
import { Colours } from '../../styles/colours';
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameContext, IHit, useActiveGameContext } from '../../hooks/activeGameContext';
import { useAuth } from '../../hooks/authContext';
import { GameRouteNames } from '../../router/route-names';
import { GameStatus } from '../../components/gameStatus';

const BoatImage = styled.Image<{ isPlayerToMove: boolean }>`
  width: 20px;
  height: 20px;
  margin-left: 10px; 
  tint-color: ${({ isPlayerToMove }) => (isPlayerToMove ? Colours.BLACK : 'transparent')};
  position: absolute;
  right: 40px; 
`;

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
  border: 4px solid ${Colours.RED};
  border-radius: 15px;
  text-align: center;
  font-weight: bold;
  padding:2px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 5px;
  flex: 1; /* Allow text to expand */
`;

const TableContainer = styled.View`
padding: 10px;
margin-bottom: 20px;
`;


const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ActiveGameScreen = ({navigation}) => {
  const route = useRoute<any>();
  const gameCtx = useActiveGameContext();
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const handleEndGame = async (status) => {
    navigation.navigate(GameRouteNames.END_GAME, {finalGameStatus: status});
  }

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

  if(gameCtx.game != null && gameCtx.game.status == GameStatus.FINISHED)
  {
    if(gameCtx.userId == gameCtx.game.playerToMoveId)
      handleEndGame(0);
    else handleEndGame(1);
  }


  if(gameCtx.userId == gameCtx.game.player1Id)
  {
    return (      
      <Container>
        <UserContainer>
          <UserText>{gameCtx.game.player1.email.split("@")[0]}</UserText>
          <BoatImage source={require('../../../assets/icons/cruise.png')} 
                    isPlayerToMove={gameCtx.game.playerToMoveId == gameCtx.game.player1Id}/>
        </UserContainer>
        <TableContainer>
          <TableInactive state={gameCtx.tableState1} moves={gameCtx.moves} player={2} />
        </TableContainer>
        <UserContainer>
          <UserText>{gameCtx.game.player2.email.split("@")[0]}</UserText>
          <BoatImage source={require('../../../assets/icons/cruise.png')}  
                    isPlayerToMove={gameCtx.game.playerToMoveId == gameCtx.game.player2Id}/>
        </UserContainer>        
        <TableContainer>
          <TableActive state={gameCtx.tableState2} 
                          moves={gameCtx.moves} 
                          player={1} 
                          token={auth.token} 
                          gameId={gameCtx.game.id}
                          playerTurn={gameCtx.game.playerToMoveId == gameCtx.userId}/>        
        </TableContainer>
      </Container>
    );
  }
  else
  {
    return (      
      <Container>
        <UserContainer>
          <UserText>{gameCtx.game.player1.email.split("@")[0]}</UserText>
          <BoatImage source={require('../../../assets/icons/cruise.png')} 
                    isPlayerToMove={gameCtx.game.playerToMoveId == gameCtx.game.player1Id}/>
        </UserContainer>
        <TableContainer>
          <TableActive state={gameCtx.tableState1} 
                        moves={gameCtx.moves} 
                        player={2} 
                        token={auth.token} 
                        gameId={gameCtx.game.id}
                        playerTurn={gameCtx.game.playerToMoveId == gameCtx.userId}
                        />
        </TableContainer>
        <UserContainer>
          <UserText>{gameCtx.game.player2.email.split("@")[0]}</UserText>
          <BoatImage source={require('../../../assets/icons/cruise.png')}  
                    isPlayerToMove={gameCtx.game.playerToMoveId == gameCtx.game.player2Id}/>
        </UserContainer>
        <TableContainer>
          <TableInactive state={gameCtx.tableState2} moves={gameCtx.moves} player={1}/>
        </TableContainer>
      </Container>
    );
  }
}


export default ({ navigation }) => (
  <GameContext>
    <ActiveGameScreen navigation={navigation}/>
  </GameContext>
 );