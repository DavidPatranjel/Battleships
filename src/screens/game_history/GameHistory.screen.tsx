import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';
import { COLOURS } from "../../styles/colours";


const GameHistoryScreen = ({navigation}) => {
    return (  
        <View style={styles.container}>
            <View style={styles.semiCircle}></View>
            <View style={styles.whiteBackground}>
                <Text>History</Text>
            </View>
        </View>
    );
}
 
export default GameHistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    semiCircle: {
        backgroundColor: COLOURS.BABY_BLUE,
        width: '100%',
        height: 250, // sau orice înălțime dorești
        borderBottomLeftRadius: 500, // unghiul de raza pentru semicerc
        borderBottomRightRadius: 500, // unghiul de raza pentru semicerc
    },
    whiteBackground: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent', // alb
        alignItems: 'center',
        justifyContent: 'center',
    },
});
