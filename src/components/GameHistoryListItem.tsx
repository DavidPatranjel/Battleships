import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text } from "react-native";
import { Colours } from '../styles/colours';

const Container = styled.TouchableOpacity<{colour: string}>`
    border: 1px solid ${Colours.YELLOW};
    border-radius: 25px;
    background-color: ${props => props.colour};
    justify-content: center;
    align-items: center;
    width: 48%; 
    margin-bottom: 10px; 
    display: flex;
`;

const TopContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    height: 30px;
`;

const BottomContainer = styled.View<{colour: string}>`
    flex: 1;
    background-color: ${Colours.YELLOW};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
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
`

const WaitingText = styled.Text`
    color: ${Colours.WHITE};
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    font-family: kanit-regular; 
    display: flex;
    align-items: center;
    justify-content: center; 
`


export interface IGameListItem{
    username_player_lost: string,
    username_current_player:string, 
    username1: string, 
    username2: string,
    onPress: () => void
}

const GameHistoryListItem: React.FC<IGameListItem> = 
({username_player_lost, username_current_player, username1, username2, onPress}) => {
    const [statusString, setStatusString] = useState("");
    const [statusColour, setStatusColour] = useState("");
    const [showedText, setShowedText] = useState("");
    const usernamePrefix1 = username1.split('@')[0];
    const usernamePrefix2 = username2.split('@')[0];                         
    useEffect(() => {
        if(username_player_lost != username_current_player){
            setStatusColour(Colours.GREEN);
            setStatusString("Won!");
        }
        else{
            setStatusColour(Colours.RED);
            setStatusString("Lost!");
        }
        setShowedText(usernamePrefix1 + " VS " + usernamePrefix2);

    }, []);
                                        

    return (

        <Container colour = {statusColour} onPress={onPress}>
            <TopContainer>
                <WaitingText>{statusString}</WaitingText>
            </TopContainer> 
            <BottomContainer colour = {statusColour}>
                <TextStyled>{showedText}</TextStyled>
            </BottomContainer>
        </Container>
    )
}

export default GameHistoryListItem;

