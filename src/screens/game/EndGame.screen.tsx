import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Colours } from '../../styles/colours';
import { GameRouteNames } from '../../router/route-names';

const EndGameScreen = ({ navigation }) => {
    const route = useRoute<any>();

    const handleReturnToLobby = () => {

        navigation.reset({
            index: 0,
            routes: [{ name: GameRouteNames.MAIN_MENU }],
        });
    };

    const status = route.params.finalGameStatus;
    const resultText = status ? (
        <Text style={[styles.resultText, styles.won]}>WON</Text>
    ) : (
        <Text style={[styles.resultText, styles.lost]}>LOST</Text>
    );

    return (
        <View style={[styles.container, { backgroundColor: Colours.BABY_BLUE }]}>
            {resultText}
            <Image
                source={require('../../../assets/icons/cruise.png')}
                style={styles.image}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleReturnToLobby}
            >
                <Text style={styles.buttonText}>Return to Lobby</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colours.BABY_BLUE,
        marginBottom: 100,
    },
    resultText: {
        fontSize: 120,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    won: {
        color: 'green',
    },
    lost: {
        color: 'red',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20, // 
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EndGameScreen;
