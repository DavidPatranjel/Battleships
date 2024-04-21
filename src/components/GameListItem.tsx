import React from 'react';
import styled from 'styled-components/native';
import { Text } from "react-native";
import { Colours } from '../styles/colours';


const Container = styled.TouchableOpacity`
    border: 1px solid ${Colours.YELLOW};
    border-radius: 25px;
    background-color: ${Colours.PURPLE};
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

const BottomContainer = styled.View`
    flex: 1;
    background-color: ${Colours.YELLOW};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    border: 3px solid ${Colours.PURPLE};

`;

const TextStyled = styled.Text`
    color: ${Colours.BLACK};
    font-weight: bold;
    font-size: 16px;
    text-align: center;
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
    display: flex;
    align-items: center;
    justify-content: center; 
`

export interface IGameListItem{
    username: string,
    onPress: () => void,
}

const GameListItem: React.FC<IGameListItem> = ({username, onPress}) => {
    const status = "Waiting..."; 
    const usernamePrefix = username.split('@')[0];

    return (
        <Container onPress={onPress}>
            <TopContainer>
                <WaitingText>{status}</WaitingText>
            </TopContainer>
            <BottomContainer>
                <TextStyled>{usernamePrefix}</TextStyled>
            </BottomContainer>
        </Container>
    )
}

export default GameListItem;

