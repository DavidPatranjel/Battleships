import React from "react";
import styled from "styled-components/native";
import { ICell, IHit } from "../hooks/gameContext";
import { Text } from 'react-native';
import { Colours } from "../styles/colours";

interface ITable {
    state: ICell[][];
}

const Cell = styled.View<{ boat: boolean }>`
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


const TableInactive: React.FC<ITable & { moves: IHit[], player: number }>  = ({state, moves, player}) => {
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
                        const isMove = moves.some(move => move.id === id && move.player === player);
                        return (
                            <Cell key={id} boat={boat}>
                                <BoatMove hit={boat}>{isMove ? 'X' : ''}</BoatMove>
                            </Cell>
                        );
                    })}
                </Row>
            ))}
        </>
    )
}

export default TableInactive;