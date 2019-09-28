import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../config'

const styles = StyleSheet.create({
   avatarContainer: {
       backgroundColor: Colors.GRAY,
       padding: 30,
   },
   form: {
       margin: 20
   },
   inputItem: {
       marginBottom: 20,
   },
   input: {
       textAlign: "right"
   },
   button: {
       marginBottom: 20
   }
});

export default styles;
