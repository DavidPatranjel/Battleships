import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';
import { useAuth } from "../../hooks/authContext";
import { createGame } from '../../api'

const NewGameScreen=({navigation}) => {
    const auth = useAuth();

    return (  
        <View >
            <Text>New game</Text>
             
        </View>
    );
}
 
export default NewGameScreen;

