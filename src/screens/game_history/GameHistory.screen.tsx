import React, { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/authContext";
import { getGames, getUserId } from "../../api"
import GameHistoryListItem from "../../components/GameHistoryListItem"
import styled from 'styled-components/native';
import { Colours } from '../../styles/colours'
import { GameStatus } from '../../components/gameStatus';
import { useIsFocused } from '@react-navigation/native'
import { GameRouteNames } from '../../router/route-names';
import { View, Text, TouchableOpacity } from 'react-native';

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


const GameHistoryScreen =({navigation}) => {
    const auth = useAuth();
    const isFocused = useIsFocused();

    const [games, setGames] = useState<any[]>([]);
    const [userId, setUserId] = useState<string>('');

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
    }, [isFocused])

//                    to add another filter!

    const handleGetGameInfo = async (gameid) => {
        navigation.navigate(GameRouteNames.HISTORY, {gameId: gameid});
    }


    return (  
        <Container>
            <GameList>
                <GameListContainer>
                    {games.filter(game => game.status == GameStatus.FINISHED)
                    .map(game => <GameHistoryListItem username_player_lost = {game.playerToMoveId} 
                        username_current_player = {userId}
                        username1 = {game.player1.email}
                         username2 = {game.player2.email} key = {game.id}
                         onPress={() => handleGetGameInfo(game.id)}/>)}
                </GameListContainer>
            </GameList>
        </Container>
    );
};


export default GameHistoryScreen;


/*
.filter(game => game.player1.id == userId || 
                    (game.player2 != null && game.player2.id == userId))
*/
