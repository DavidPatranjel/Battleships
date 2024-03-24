import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

const Account=({navigation}) => {
    return (  
        <View style={styles.container}>
            <Text>Account</Text>
           
        </View>
    );
}
 
export default Account;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#49E1F2'
    },
})