import React from "react";
import { Header, Title, View, Right, Button, Icon, Text } from "native-base";
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants';
import { Colors } from "../config";
import Avatar from "./Avatar";

export default ({ contact, status, onBack, onProfile }) => {
   return (
       <View style={styles.container}>
           <Header style={styles.header} >
               <Right>
                   <Button transparent onPress={onProfile}>
                       <View>
                           <View>
                               <Title style={styles.right}>{contact.name}</Title>
                           </View>
                           <View>
                               <Text style={styles.status}>
                                   {status}
                               </Text>
                           </View>
                       </View>
                   </Button>
               </Right>
               <View style={styles.avatarContainer}>
                   <Button transparent onPress={onProfile}>
                       <Avatar source={contact.avatar} type='header'/>
                   </Button>
               </View>
               <Button transparent onPress={onBack}>
                   <Icon name='arrow-forward'/>
               </Button>
           </Header>
       </View>
   );
}

const styles = StyleSheet.create({
   container: {
       backgroundColor: Colors.GRAY,
   },
   header: {
       elevation: 0,
       shadowOpacity: 0,
       backgroundColor: Colors.GRAY,
       marginTop: Constants.statusBarHeight,
   },
   avatarContainer:{
       justifyContent: 'center',
       alignItems: 'center',
       marginLeft: 10
   },
   right: {
       textAlign: 'right'
   },
   status: {
       color: Colors.WHITE,
       fontSize: 12,
   }
});
