import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';
import { Colours } from '../../styles/colours'

const UserInfoScreen=({navigation}) => {
    return (  
        <View style={styles.container}>
            <Text>Account</Text>
           
        </View>
    );
}
 
export default UserInfoScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colours.BABY_BLUE
    },
})