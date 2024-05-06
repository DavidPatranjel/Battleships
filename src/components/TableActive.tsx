import React from "react";
import styled from "styled-components/native";
import { ICell, IHit } from "../hooks/gameContext";
import { Text } from 'react-native';
import { Colours } from "../styles/colours";
import { strikeInGame } from "../api";
import { useAuth } from "../hooks/authContext";

interface ITable {
    state: ICell[][];
}

const Cell = styled.TouchableOpacity<{ boat: boolean }>`
    width: 26px;
    height: 26px;
    border: 1px solid;
    margin: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ boat }) => (boat ? Colours.INDIGO : Colours.WHITE)};
`

const CellNoTouch = styled.View<{ boat: boolean }>`
    width: 26px;
    height: 26px;
    border: 1px solid;
    margin: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ boat }) => (boat ? Colours.INDIGO : Colours.WHITE)};
`

const Row = styled.View`
    disiplay: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const LabelCell = styled.View`
    width: 26px;
    height: 26px;
    border: 1px solid;
    margin: 1px;
    display: flex;
    justify-content: center;
    align-items: center;    
    background-color: transparent;
    border: 0px;
`

const LabelText = styled.Text`
font-weight: bold;    

`

const BoatMove = styled.Text<{ hit: boolean }>`
    font-weight: bold;
    color: ${props => props.hit ? Colours.RED : Colours.NEON_BLUE};
`;


const TableActive: React.FC<ITable & { moves: IHit[], player: number, token: string, gameId: string, playerTurn: boolean}>  = ({state, moves, player, token, gameId, playerTurn}) => {
    return (
        <>
        <Row>
                <LabelCell><Text></Text></LabelCell> 
                {Array.from({ length: 10 }, (_, i) => i + 1).map((number, index) => (
                    <LabelCell key={index}><LabelText>{number}</LabelText></LabelCell>
                ))}
            </Row>
            
            {state.map((line, rowIndex) => (
                <Row key={rowIndex}>
                    <LabelCell><LabelText>{String.fromCharCode(65 + rowIndex)}</LabelText></LabelCell>
                    {line.map(({ id, boat }) => {
                        const move = moves.find(move => move.id === id && move.player === player);
                        const isHit = move && move.hit; // Check if move exists and if it's a hit
                        
                        if(playerTurn)
                        {
                            return (
                                <Cell key={id} boat={isHit} onPress={() => strikeInGame(token, gameId, id[0], parseInt(id.slice(1)))}>
                                    <BoatMove hit={isHit}>{move ? 'X' : ''}</BoatMove>
                                </Cell>
                            );
                        }else{
                            return (
                                <CellNoTouch key={id} boat={isHit}>
                                    <BoatMove hit={isHit}>{move ? 'X' : ''}</BoatMove>
                                </CellNoTouch>
                            );
                        }
                    })}
                </Row>
            ))}
        </>
    )
}


export default TableActive;
