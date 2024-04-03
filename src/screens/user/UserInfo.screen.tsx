import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from "../../hooks/authContext";
import styled from 'styled-components/native';
import { getUserEmail, getNumbergames, getNumberGamesLost, getNumberGamesPlayed, getNumberGamesWon } from '../../api';
import { Button } from 'react-native-web';
import { Colours } from '../../styles/colours'

const UserInfoScreen = () => {
    const [username, setUserName] = useState('');
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [numberOfGamesPlayed, setNumberOfGamesPlayed] = useState(0);
    const [numberOfGamesWon, setNumberOfGamesWon] = useState(0);
    const [numberOfGamesLost, setNumberOfGamesLost] = useState(0);
    const auth = useAuth();

    useEffect(() => {
        getUserEmail(auth.token)
          .then(email => {
            console.log("Fetched user email:", email);
            setUserName(email);
          })
          .catch(error => {
            console.error('Error fetching user email:', error);
          });
          getNumbergames(auth.token)
          .then( games=> {
            console.log("Fetched user email:", games);
            setNumberOfGames(games);
          })
          .catch(error => {
            console.error('Error fetching user email:', error);
          });
          getNumberGamesPlayed(auth.token)
          .then( games=> {
            console.log("Fetched user email:", games);
            setNumberOfGamesPlayed(games);
          })
          .catch(error => {
            console.error('Error fetching user email:', error);
          });

          getNumberGamesWon(auth.token)
          .then( games=> {
            console.log("Fetched user email:", games);
            setNumberOfGamesWon(games);
          })
          .catch(error => {
            console.error('Error fetching user email:', error);
          });
         
          getNumberGamesLost(auth.token)
          .then( games=> {
            console.log("Fetched user email:", games);
            setNumberOfGamesLost(games);
          })
          .catch(error => {
            console.error('Error fetching user email:', error);
          });
    }, [auth.token]);
    

// Calculul procentului de câștig
const totalGamesPlayed = numberOfGamesWon + numberOfGamesLost;
const winPercentage = totalGamesPlayed > 0 ? (numberOfGamesWon / totalGamesPlayed) * 100 : 0;

    return (
        <View style={styles.container}>
            <View style={styles.semiCircle}>
                <View style={styles.usernameContainer}>
                    <Text style={styles.usernameOnCircle}>{username.split('@')[0]}</Text>
                </View>
                <View style={[styles.completionCircle, {backgroundColor: Colours.PINK}]}>
                <Text style={styles.completionText}>{winPercentage.toFixed(2)}%</Text>

                </View>
            </View>
            <View style={styles.whiteBackground}>
                <View style={[styles.tilesContainer, {marginTop: 30}]}>
                    <View style={styles.tile}>
                    <TopContainer colour={Colours.INDIGO}>
                            <WaitingText>Jocuri curente</WaitingText>
                        </TopContainer> 
                        <BottomContainer colour={Colours.INDIGO}>
                             <TextStyled>{numberOfGames}</TextStyled>
                        </BottomContainer>
                    </View>
                    <View style={styles.tile}>
                        <TopContainer colour={Colours.INDIGO}>
                            <WaitingText>Jocuri jucate</WaitingText>
                        </TopContainer> 
                        <BottomContainer colour={Colours.INDIGO}>
                            <TextStyled>{numberOfGamesPlayed}</TextStyled>
                        </BottomContainer>
                    </View>
                    <View style={styles.tile}>
                        <TopContainer colour={Colours.INDIGO}>
                            <WaitingText>Jocuri pierdute</WaitingText>
                        </TopContainer> 
                        <BottomContainer colour={Colours.INDIGO}>
                            <TextStyled>{numberOfGamesLost}</TextStyled>
                        </BottomContainer>
                    </View>
                    <View style={styles.tile}>
                        <TopContainer colour={Colours.INDIGO}>
                            <WaitingText>Jocuri câștigate</WaitingText>
                        </TopContainer> 
                        <BottomContainer colour={Colours.INDIGO}>
                            <TextStyled>{numberOfGamesWon}</TextStyled>
                        </BottomContainer>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default UserInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.BABY_BLUE
    },
    usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    usernameOnCircle: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    completionCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 50,
    },
    completionText: {
        color: 'white',
        fontSize: 20,
        alignItems: 'center',
    },
    tilesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: Colours.BABY_BLUE
    },
    tile: {
        width: '45%',
        height: 130,
        backgroundColor: Colours.INDIGO,
        borderRadius: 25,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    semiCircle: {
        backgroundColor: Colours.INDIGO,
        height: 250,
        borderBottomLeftRadius: 500,
        borderBottomRightRadius: 500,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    whiteBackground: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
});

const TopContainer = styled.View<{colour: string}>`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: '${props => props.colour}';
    height: 20px;
`;

const BottomContainer = styled.View<{colour: string}>`
    flex: 1;
    background-color: ${Colours.WHITE};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    border: 3px solid ${props => props.colour};
`;

const TextStyled = styled.Text`
    color: ${Colours.BLACK};
    font-weight: bold;
    font-size: 17px;
    text-align: center;
    font-family: kanit-regular; 
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center; 
`;

const WaitingText = styled.Text`
    color: ${Colours.WHITE};
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    font-family: kanit-regular; 
    display: flex;
    align-items: center;
    justify-content: center; 
`;
