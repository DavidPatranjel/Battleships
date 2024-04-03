import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-web';
import { useAuth } from "../../hooks/authContext";
import { getGames, getUserId } from "../../api"
import GameListItem from "../../components/GameListItem"
import styled from 'styled-components/native';
import { Colours } from '../../styles/colours'


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
                    {games.filter(game => !game.player1.email.includes('string'))
                        .filter(game => game.player1.id != userId )
                        .map(game => <GameListItem username = {game.player1.email} key = {game.id}/>)}
                </GameListContainer>
            </GameList>
        </Container>
    );
}
 
export default LobbyScreen;

//.filter(game => game.player1.email == "davidtest@yahoo.com")




