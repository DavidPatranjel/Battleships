import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

const NewGame=({navigation}) => {
    return (  
        <View style={styles.container}>
            <Text>New game</Text>
             
        </View>
    );
}
 
export default NewGame;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#49E1F2'
    }
})