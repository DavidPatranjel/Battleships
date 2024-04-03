import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-web';
import { useAuth } from "../../hooks/authContext";
import { getGames, getUserId } from "../../api"
import BattlesListItem from "../../components/BattlesListItem"
import styled from 'styled-components/native';
import { Colours } from '../../styles/colours'
import { GameStatus } from '../../components/gameStatus';

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



const BattlesScreen =({navigation}) => {
    const auth = useAuth();

    const [games, setGames] = useState<any[]>([]);
    const [userId, setUserId] = useState<string>('');
    
    useEffect(() => {
        getGames(auth.token).then(setGames).catch(function(error) {
            console.log('There has been a problem fetching all games: ' + error.message);
              throw error;
            });
        getUserId(auth.token).then(setUserId).catch(function(error) {
            console.log('There has been a problem fetching user id: ' + error.message);
              throw error;
            });
    },[])

    return (  
        <Container>
            <GameList>
                <GameListContainer>
                    {games.filter(game => game.status != GameStatus.FINISHED)
                    .filter(game => game.player1.id == userId || 
                    (game.player2 != null && game.player2.id == userId))
                    .map(game => <BattlesListItem game_state = {game.status} username1 = {game.player1.email} 
                    username2 = {game.player2? game.player2.email:''} key = {game.id}/>)}
                </GameListContainer>
            </GameList>
        </Container>
    );
}
 
export default BattlesScreen;
