import React, { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/authContext";
import { getGames, getUserId, joinGame} from "../../api"
import GameListItem from "../../components/GameListItem"
import styled from 'styled-components/native';
import { Colours } from '../../styles/colours'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { GameStatus } from '../../components/gameStatus';
import { GameRouteNames } from '../../router/route-names';

const Container = styled.View`
    flex:1;
    padding-top: 20px;
    padding-horizontal: 10px;
    background-color: ${Colours.BABY_BLUE};
`;

const GameList = styled.ScrollView`
    margin-bottom: 100px;
`;

const GameListContainer = styled.View`
    margin-bottom: 100px;
    padding-horizontal: 10px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;



const LobbyScreen =({navigation}) => {
    const auth = useAuth();
    const [games, setGames] = useState<any[]>([]);
    const [userId, setUserId] = useState<string>('');
    const isFocused = useIsFocused();
    const navigator = useNavigation<any>();


    useEffect(() => {
        if(isFocused){
        getGames(auth.token).then(setGames).catch(function(error) {
            console.log('There has been a problem fetching all games: ' + error.message);
              throw error;
            });
        getUserId(auth.token).then(setUserId).catch(function(error) {
            console.log('There has been a problem fetching user id: ' + error.message);
              throw error;
            });
        }
    },[isFocused])

    const handleJoinGame = async (gameid) => {
        await joinGame(auth.token, gameid);
        await navigation.navigate(GameRouteNames.SETUP_TABLE, {gameId: gameid});
    }


    return (  
        <Container>
            <GameList>
                <GameListContainer>
                    {games.filter(game => !game.player1.email.includes('string'))
                        .filter(game => game.player1.id != userId )
                        .filter(game => game.status == GameStatus.CREATED)
                        .map(game => <GameListItem username = {game.player1.email} key = {game.id} 
                            onPress={() => handleJoinGame(game.id)}/>)}
                </GameListContainer>
            </GameList>
        </Container>
    );
}
 
export default LobbyScreen;

//.filter(game => game.player1.email == "davidtest@yahoo.com")




