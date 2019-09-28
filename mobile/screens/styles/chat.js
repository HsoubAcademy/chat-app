import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    chat: {
        backgroundColor: '#f2f2f2',
    },  
    inputItem: {
        paddingLeft: 5,
        paddingRight: 15,
        borderWidth: 0,
    },
    input: {
        paddingRight: 10,
        paddingLeft: 30,
        lineHeight: 25,
        maxHeight: 80
    },
    send: {
        position: 'absolute',
        left: 10,
        top: 5,
    }
  });
export default styles;
