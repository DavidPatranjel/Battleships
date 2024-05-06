import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';
import { Text } from "react-native";

const EndGameScreen = () => {
    const route = useRoute<any>();

    if(route.params.finalGameStatus)
    {
        return (
            <Text>WON</Text>
        )
    }
    
    else
    {
        return (
            <Text>LOST</Text>
        )
    }
     
}


export default () => (
    <EndGameScreen />
 );