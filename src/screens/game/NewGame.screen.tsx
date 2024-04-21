import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Colours } from '../../styles/colours';
import {sendMapConfiguration, getGame } from '../../api';
import { useAuth } from '../../hooks/authContext';

const NewGameScreen = ({ navigation }) => {
    const [board, setBoard] = useState(Array(10).fill(Array(10).fill(false))); // Matrix to store board cells
    const [selectedShipType, setSelectedShipType] = useState(null); // Selected ship type
    const [isVertical, setIsVertical] = useState(true); // Orientation of ship: vertical or horizontal
    const [placedShips, setPlacedShips] = useState([]); // Array to store placed ships


    const { token } = useAuth();
    const placeShip = (x, y) => {
        if (!selectedShipType) return; 
        if (placedShips.filter(ship => ship.name === selectedShipType.name).length >= selectedShipType.limit) return; 
    
        const newBoard = board.map(row => [...row]); 
        const shipSize = selectedShipType.size;
        const direction = isVertical ? 'VERTICAL' : 'HORIZONTAL';
    
       
        if ((direction === 'VERTICAL' && x + shipSize > 10) || (direction === 'HORIZONTAL' && y + shipSize > 10)) {
            console.log('Invalid ship placement');
            return;
        }
    
        for (let i = 0; i < shipSize; i++) {
            if (direction === 'VERTICAL') {
                if (newBoard[x + i][y]) {
                    Alert.alert('Error', 'Ships cannot overlap. Please choose another position.');
                    return;
                }
            } else {
                if (newBoard[x][y + i]) {
                    Alert.alert('Error', 'Ships cannot overlap. Please choose another position.');
                    return;
                }
            }
        }
       
        for (let i = 0; i < shipSize; i++) {
            if (direction === 'VERTICAL') {
                newBoard[x + i][y] = true;
            } else {
                newBoard[x][y + i] = true;
            }
        }
        let direction2;
        if( direction == 'VERTICAL')
                direction2='HORIZONTAL';
        else direction2='VERTICAL';
        const newPlacedShip = { ...selectedShipType, x, y, direction2 }; 
        setBoard(newBoard);
        setPlacedShips([...placedShips, newPlacedShip]);
    };
    
    const renderBoard = () => {
        const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

        return (
            <View style={styles.boardContainer}>
                <Text style={styles.title}>Set Up Your Map</Text>
                <View style={styles.board}>
                   
                    <View style={[styles.columnHeaderRow, styles.row]}>
                        {/* Rendering row numbers */}
                        {board.map((row, x) => (
                            <Text key={x} style={[styles.columnHeader]}>
                                {x + 1}
                            </Text>
                        ))}
                    </View>
                   
                    {board.map((row, x) => (
                        <View key={x} style={styles.row}>
                            <Text style={[styles.cell, styles.rowHeader]}>{rowLetters[x]}</Text>
                            {row.map((cell, y) => (
                                <TouchableOpacity
                                    key={y}
                                    style={[styles.cell, { backgroundColor: cell ? Colours.BLUE : '#FFF' }]}
                                    onPress={() => placeShip(x, y)}
                                    disabled={cell}
                                />
                            ))}
                        </View>
                    ))}
                </View>
                <View style={styles.topButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.optionButton, { marginRight: 10 }]}
                        onPress={() => setIsVertical(!isVertical)}
                    >
                        <Text style={styles.optionButtonText}>{isVertical ? 'Vertical' : 'Horizontal'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                       style={styles.startButton}
                       onPress={async () => {
                           try {
                               const gameId = "clupo2d0o13979086ntanfdzau8"; // Înlocuim cu ID-ul jocului real
                              
                               placedShips.forEach(ship => {
                                console.log(ship);
                            });
                               // Construieesc configuratia mapei
                               const mapConfiguration = placedShips.map(ship => {
                               
                                return {
                                    x:String.fromCharCode(65 + ship.x),
                                    y: ship.y+1,
                                    size: ship.size,
                                    direction: ship.direction2
                                };
                                
                            });
                            
                               // Trimit configuratia mapei către API
                               await sendMapConfiguration(gameId, token, mapConfiguration);
                               console.log('Configurația mapei a fost trimisă cu succes');
                           } 
                           catch (error) {
                               console.error('Eroare la trimiterea configurației mapei:', error);
                           }
                       }}>
                        <Text style={styles.startButtonText}>Start Game</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderShipOptions = () => {
        // Function to render ship options
        return (
            <View style={styles.shipOptionsContainer}>
                {SHIP_TYPES.map(shipType => {
                    const numPlaced = placedShips.filter(ship => ship.name === shipType.name).length;
                    const disabled = numPlaced >= shipType.limit;
                    return (
                        <TouchableOpacity
                            key={shipType.id}
                            style={[
                                styles.optionButton,
                                {
                                    backgroundColor: disabled ? Colours.GRAY : (selectedShipType === shipType ? Colours.BLUE : Colours.INDIGO),
                                    opacity: disabled ? 0.5 : 1 // Dezactivează butonul dacă limita a fost atinsă
                                }
                            ]}
                            onPress={() => setSelectedShipType(shipType)}
                            disabled={disabled}
                        >
                            <Text style={styles.optionButtonText}>{shipType.name}</Text>
                            <Text style={styles.optionButtonText}>{`(${numPlaced}/${shipType.limit})`}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderBoard()}
            {renderShipOptions()}
        </View>
    );
};

// Define ship types with their sizes and limits
const SHIP_TYPES = [
    { id: 1, name: 'Destroyer', size: 2, limit: 4 },
    { id: 2, name: 'Cruiser', size: 3, limit: 3 },
    { id: 3, name: 'Submarine', size: 4, limit: 2 },
    { id: 4, name: 'Battleship', size: 6, limit: 1 },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#89CFF0',
        marginBottom: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    boardContainer: {
        alignItems: 'center',
    },
    board: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row'
    },
    cell: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#89CFF0',
        backgroundColor: '#89CFF0',
        textAlign: 'center',
        lineHeight: 30,
    },
    columnHeaderRow: {
        marginBottom: 5,
        marginLeft: 17,
    },
    columnHeader: {
        width: 30,
        textAlign: 'center',
    },
    rowHeader: {
        width: 20,
        paddingRight: 5,
        textAlign: 'center',
    },
    topButtonsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    optionButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colours.BLUE,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 15,
        width: 140,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shipOptionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    optionButtonText: {
        color: '#FFF'
    },
    startButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colours.BLUE,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 15,
        alignItems: 'center',
        width: 140,
    },
    startButtonText: {
        color: '#FFF'
    }
});


export default NewGameScreen;
