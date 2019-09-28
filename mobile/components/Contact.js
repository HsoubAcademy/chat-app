import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, Badge, ListItem, Left, Body, Right, Thumbnail } from "native-base";
import { Strings, Moment } from "../config";
import Avatar from "./Avatar";
import online from "../assets/images/online.png";

export default ({ contact, onClick }) => {

   const { name, avatar, counter, status, lastMessage } = contact;

   const { date, content } = lastMessage ? lastMessage : {};

   return (
       <ListItem avatar button noBorder style={styles.item} onPress={() => onClick(contact)}>
           <Left>
               <View>
                   <View>
                       <Text note>{ Moment(date).format("hh:mm a") || '' }</Text>
                   </View>
                   <View style={styles.counter}>
                       {counter > 0 ? <Badge success><Text>{ counter }</Text></Badge> : null }
                   </View>
               </View>
           </Left>
           <Body>
               <Text style={styles.right}>{ name }</Text>
               <Text note style={styles.right}>
                   {content || Strings.CLICK_HERE_TO_START_CHAT }
               </Text>
           </Body>
           <Right>
               <Avatar source={avatar} />
               {status === true ? <Thumbnail style={styles.status} source={online} /> : null }
           </Right>
       </ListItem>
   );
};

const styles = StyleSheet.create({
   item: {
       borderBottomWidth: 0.7
   },
   right: {
       textAlign: "right"
   },
   counter: {
       margin: 5
   },
   status: {
       position: 'absolute',
       width: 10,
       height: 10,
       left: 0,
       top: 15
   }
});
