
import React from "react";
import { StyleSheet } from 'react-native';
import { Thumbnail } from 'native-base';
import { Urls } from '../config';
import avatar from "../assets/images/avatar.png";

export default ({ source, type }) => {

   let uri = source instanceof Object ? source.uri : Urls.AVATARS + source;

   source = source ? { uri : uri } : avatar;

   let style = styles[type || 'list'];

   return <Thumbnail circle style={style} source={source}/>

};

const styles = StyleSheet.create({
   profile: {
       alignSelf: 'center',
       width: 200,
       height: 200,
       borderRadius: 200,
       marginBottom: 20
   },
   list: {
       alignSelf: 'center',
       width: 50,
       height: 50,
       borderRadius: 50,
   },
   header: {
       width: 40,
       height: 40,
       borderRadius: 40,
   },
});
