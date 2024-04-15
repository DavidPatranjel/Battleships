import { createContext, useContext, useState, useEffect} from "react";
import { GameStatus } from "../components/gameStatus";
import { getGame } from "../api"
import { useAuth } from "./authContext";

export type CellId = 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10' |
              'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'B10' |
              'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8' | 'C9' | 'C10' |
              'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8' | 'D9' | 'D10' |
              'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6' | 'E7' | 'E8' | 'E9' | 'E10' |
              'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' |
              'G1' | 'G2' | 'G3' | 'G4' | 'G5' | 'G6' | 'G7' | 'G8' | 'G9' | 'G10' |
              'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'H7' | 'H8' | 'H9' | 'H10' |
              'I1' | 'I2' | 'I3' | 'I4' | 'I5' | 'I6' | 'I7' | 'I8' | 'I9' | 'I10' |
              'J1' | 'J2' | 'J3' | 'J4' | 'J5' | 'J6' | 'J7' | 'J8' | 'J9' | 'J10';
export type CellBoat = true | false;
export type PlayerHit = 1 | 2;
export type CellHit = true | false;
export interface ICell {
    boat:CellBoat;
    id: CellId;
}

export interface IHit {
    hit:CellHit;
    id: CellId;
    player: PlayerHit;
}

interface User
{
    id: string;
    email: string;
}

interface Move {
    x: string;
    y: number;
    result: boolean;
    playerId: string;
}

interface Coord
{
    x: string;
    y: number;
    hit: boolean;
    playerId: string;
}

interface Game
{
    id: string;
    status: GameStatus;
    player1Id: string;
    player2Id: string;
    playerToMoveId: string;
    moves: [Move];
    player1: User;
    player2: User;
    shipsCoord: [Coord]
}

interface GameContext {
    game: Game | null;
    loadGame: (id: string) => Promise<void>;
    tableState1: ICell[][];
    tableState2: ICell[][];
    moves: IHit[];
}

const Context = createContext<GameContext>({
    loadGame: () => Promise.resolve(),
    game: null,
    tableState1: [],
    tableState2: [],
    moves: []
});

const baseTableState1: ICell[][] = [
    [{id: 'A1', boat: false}, {id: 'A2', boat: false}, {id: 'A3', boat: false}, {id: 'A4', boat: false}, {id: 'A5', boat: false}, {id: 'A6', boat: false}, {id: 'A7', boat: false}, {id: 'A8', boat: false}, {id: 'A9', boat: false}, {id: 'A10', boat: false}],
    [{id: 'B1', boat: false}, {id: 'B2', boat: false}, {id: 'B3', boat: false}, {id: 'B4', boat: false}, {id: 'B5', boat: false}, {id: 'B6', boat: false}, {id: 'B7', boat: false}, {id: 'B8', boat: false}, {id: 'B9', boat: false}, {id: 'B10', boat: false}],
    [{id: 'C1', boat: false}, {id: 'C2', boat: false}, {id: 'C3', boat: false}, {id: 'C4', boat: false}, {id: 'C5', boat: false}, {id: 'C6', boat: false}, {id: 'C7', boat: false}, {id: 'C8', boat: false}, {id: 'C9', boat: false}, {id: 'C10', boat: false}],
    [{id: 'D1', boat: false}, {id: 'D2', boat: false}, {id: 'D3', boat: false}, {id: 'D4', boat: false}, {id: 'D5', boat: false}, {id: 'D6', boat: false}, {id: 'D7', boat: false}, {id: 'D8', boat: false}, {id: 'D9', boat: false}, {id: 'D10', boat: false}],
    [{id: 'E1', boat: false}, {id: 'E2', boat: false}, {id: 'E3', boat: false}, {id: 'E4', boat: false}, {id: 'E5', boat: false}, {id: 'E6', boat: false}, {id: 'E7', boat: false}, {id: 'E8', boat: false}, {id: 'E9', boat: false}, {id: 'E10', boat: false}],
    [{id: 'F1', boat: false}, {id: 'F2', boat: false}, {id: 'F3', boat: false}, {id: 'F4', boat: false}, {id: 'F5', boat: false}, {id: 'F6', boat: false}, {id: 'F7', boat: false}, {id: 'F8', boat: false}, {id: 'F9', boat: false}, {id: 'F10', boat: false}],
    [{id: 'G1', boat: false}, {id: 'G2', boat: false}, {id: 'G3', boat: false}, {id: 'G4', boat: false}, {id: 'G5', boat: false}, {id: 'G6', boat: false}, {id: 'G7', boat: false}, {id: 'G8', boat: false}, {id: 'G9', boat: false}, {id: 'G10', boat: false}],
    [{id: 'H1', boat: false}, {id: 'H2', boat: false}, {id: 'H3', boat: false}, {id: 'H4', boat: false}, {id: 'H5', boat: false}, {id: 'H6', boat: false}, {id: 'H7', boat: false}, {id: 'H8', boat: false}, {id: 'H9', boat: false}, {id: 'H10', boat: false}],
    [{id: 'I1', boat: false}, {id: 'I2', boat: false}, {id: 'I3', boat: false}, {id: 'I4', boat: false}, {id: 'I5', boat: false}, {id: 'I6', boat: false}, {id: 'I7', boat: false}, {id: 'I8', boat: false}, {id: 'I9', boat: false}, {id: 'I10', boat: false}],
    [{id: 'J1', boat: false}, {id: 'J2', boat: false}, {id: 'J3', boat: false}, {id: 'J4', boat: false}, {id: 'J5', boat: false}, {id: 'J6', boat: false}, {id: 'J7', boat: false}, {id: 'J8', boat: false}, {id: 'J9', boat: false}, {id: 'J10', boat: false}]
];

const baseTableState2: ICell[][] = [
    [{id: 'A1', boat: false}, {id: 'A2', boat: false}, {id: 'A3', boat: false}, {id: 'A4', boat: false}, {id: 'A5', boat: false}, {id: 'A6', boat: false}, {id: 'A7', boat: false}, {id: 'A8', boat: false}, {id: 'A9', boat: false}, {id: 'A10', boat: false}],
    [{id: 'B1', boat: false}, {id: 'B2', boat: false}, {id: 'B3', boat: false}, {id: 'B4', boat: false}, {id: 'B5', boat: false}, {id: 'B6', boat: false}, {id: 'B7', boat: false}, {id: 'B8', boat: false}, {id: 'B9', boat: false}, {id: 'B10', boat: false}],
    [{id: 'C1', boat: false}, {id: 'C2', boat: false}, {id: 'C3', boat: false}, {id: 'C4', boat: false}, {id: 'C5', boat: false}, {id: 'C6', boat: false}, {id: 'C7', boat: false}, {id: 'C8', boat: false}, {id: 'C9', boat: false}, {id: 'C10', boat: false}],
    [{id: 'D1', boat: false}, {id: 'D2', boat: false}, {id: 'D3', boat: false}, {id: 'D4', boat: false}, {id: 'D5', boat: false}, {id: 'D6', boat: false}, {id: 'D7', boat: false}, {id: 'D8', boat: false}, {id: 'D9', boat: false}, {id: 'D10', boat: false}],
    [{id: 'E1', boat: false}, {id: 'E2', boat: false}, {id: 'E3', boat: false}, {id: 'E4', boat: false}, {id: 'E5', boat: false}, {id: 'E6', boat: false}, {id: 'E7', boat: false}, {id: 'E8', boat: false}, {id: 'E9', boat: false}, {id: 'E10', boat: false}],
    [{id: 'F1', boat: false}, {id: 'F2', boat: false}, {id: 'F3', boat: false}, {id: 'F4', boat: false}, {id: 'F5', boat: false}, {id: 'F6', boat: false}, {id: 'F7', boat: false}, {id: 'F8', boat: false}, {id: 'F9', boat: false}, {id: 'F10', boat: false}],
    [{id: 'G1', boat: false}, {id: 'G2', boat: false}, {id: 'G3', boat: false}, {id: 'G4', boat: false}, {id: 'G5', boat: false}, {id: 'G6', boat: false}, {id: 'G7', boat: false}, {id: 'G8', boat: false}, {id: 'G9', boat: false}, {id: 'G10', boat: false}],
    [{id: 'H1', boat: false}, {id: 'H2', boat: false}, {id: 'H3', boat: false}, {id: 'H4', boat: false}, {id: 'H5', boat: false}, {id: 'H6', boat: false}, {id: 'H7', boat: false}, {id: 'H8', boat: false}, {id: 'H9', boat: false}, {id: 'H10', boat: false}],
    [{id: 'I1', boat: false}, {id: 'I2', boat: false}, {id: 'I3', boat: false}, {id: 'I4', boat: false}, {id: 'I5', boat: false}, {id: 'I6', boat: false}, {id: 'I7', boat: false}, {id: 'I8', boat: false}, {id: 'I9', boat: false}, {id: 'I10', boat: false}],
    [{id: 'J1', boat: false}, {id: 'J2', boat: false}, {id: 'J3', boat: false}, {id: 'J4', boat: false}, {id: 'J5', boat: false}, {id: 'J6', boat: false}, {id: 'J7', boat: false}, {id: 'J8', boat: false}, {id: 'J9', boat: false}, {id: 'J10', boat: false}]
];

export const GameContext: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [game, setGame] = useState<Game | null>(null);
    const [tableState1, setTableState1] = useState<ICell[][]>([]);
    const [tableState2, setTableState2] = useState<ICell[][]>([]);
    const [moves, setMoves] = useState<IHit[]>([]);
    const auth = useAuth();

    const initGameToTabelState1 = () => {
        return baseTableState1;
    }

    const initGameToTabelState2 = () => {
        return baseTableState1;
    }

    const gameToTabelState1 = (playerId) => {
        const boatMap: Partial<{[key in CellId]: CellBoat}> = {};
        game.shipsCoord.filter(ship => ship.playerId == playerId).forEach(ship => {
            const cell = ship.x + ship.y;
            boatMap[cell] = true;
        });
        return baseTableState1.map(
            row => row.map(({id, boat}) => ({id, boat: boatMap[id] || boat}))
        )
    }

    const gameToTabelState2 = (playerId) => {
        const boatMap: Partial<{[key in CellId]: CellBoat}> = {};
        game.shipsCoord.filter(ship => ship.playerId == playerId).forEach(ship => {
            const cell = ship.x + ship.y;
            boatMap[cell] = true;
        });
        return baseTableState2.map(
            row => row.map(({id, boat}) => ({id, boat: boatMap[id] || boat}))
        )
    }
    const gameToMoves = (player1) => {
        const movesArray: IHit[] = [];
        game.moves.forEach(move => {
            const cell: CellId = (move.x + move.y) as CellId;
            const result: CellHit = move.result;
            let player: PlayerHit = 2;
            if(move.playerId == player1) player = 1;

            movesArray.push({ id: cell, hit: result, player: player});
        });
        return movesArray;
    };

    const handleLoadGame = async (id: string) => {
        const result = await getGame(auth.token, id);
        setGame(result);
    }

    useEffect(() => {
        
        if(game != null)
        {
            setTableState1(gameToTabelState1(game.player1Id));
            setTableState2(gameToTabelState2(game.player2Id));
            setMoves(gameToMoves(game.player1Id));
        }
        else 
        {
            setTableState1(initGameToTabelState1());
            setTableState2(initGameToTabelState2());
        }
        
    }, [game]);

    return (<Context.Provider value={{loadGame: handleLoadGame, game, tableState1, tableState2, moves}}>
    {children}
    </Context.Provider>)
}

export const useGameContext = () => useContext(Context);