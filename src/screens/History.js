import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

const History =({navigation}) => {
    return (  
        <View style={styles.container}>
            <Text>History</Text>
          
        </View>
    );
}
 
export default History;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#49E1F2'
    },
})