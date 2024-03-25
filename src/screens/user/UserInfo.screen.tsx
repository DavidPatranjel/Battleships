import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

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
        backgroundColor: '#49E1F2'
    },
})