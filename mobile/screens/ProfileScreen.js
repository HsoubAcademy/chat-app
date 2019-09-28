import React from 'react';
import { withChatContext } from '../context/ChatProvider';
import { Container, Content, View, Text } from 'native-base';
import { Header, Avatar } from '../components';
import styles from "./styles/profile";
import { Strings } from '../config';

class ProfileScreen extends React.Component {
   render(){
       let contact = this.props.chat.contact;
       let status = this.props.chat.status();
       return (
           <Container>
               <Header title={Strings.TITLE_PROFILE} />
               <Content>
                   <View style={styles.avatarContainer}>
                       <View>
                           <Avatar source={contact.avatar} type='profile' />
                           <Text style={styles.name}>{contact.name}</Text>
                           <Text note style={styles.status}>{status}</Text>
                       </View>
                   </View>
                   <View>
                   <Text style={styles.about}>
                       {contact.about || Strings.DEFAULT_STATUS_MESSAGE}
                   </Text>
                   </View>
               </Content>
           </Container>
       );
   }
}

export default withChatContext(ProfileScreen);
