import React from "react";
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'; 
import { Colours } from "../styles/colours";

const Counter = ({ count, onIncrease, onDecrease }) => {
    return (
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={onDecrease} style={styles.arrow}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>{count}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.arrow}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default Counter;

const styles = StyleSheet.create({
    counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flex: 1
    },
    arrow: {
    },
    arrowText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: Colours.WHITE
    },
    counterText: {
      fontSize: 50,
      marginHorizontal: 50,
      fontWeight: 'bold',
      color: Colours.WHITE
      
    },
  });