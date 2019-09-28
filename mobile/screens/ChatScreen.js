import React, { Component } from 'react';
import { Container, Icon} from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
import { withChatContext } from '../context/ChatProvider';
import styles from "./styles/chat";
import { ChatHeader } from '../components';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { Strings, Moment } from '../config';

class ChatScreen extends Component {

    state = {
        message: '',
        lastType: false
    }

    /**
     * componentWillUnmount When screen is going to close then remove the current contact.
     */
    componentWillUnmount(){
        this.props.chat.setCurrentContact({});
    }

    /**
     * On message change listener.
     */
    onMessageChange = message => {
        this.setState({ message });
        if(!this.state.lastType || Moment() - this.state.lastType > 2000){
            this.setState({ lastType: Moment()});
            this.props.chat.sendType();
        }
    }

    /**
     * Send message handler.
     */
    onSend = () => {
        let content = this.state.message.trim();
        if(!content) return;
        this.setState({ message: '', lastType: false });
        this.props.chat.sendMessage(content);
    }

    /**
     * On back button click listener.
     */
    onBackClick = () => this.props.navigation.goBack(null);

    /**
     * On profile button click listener.
     */
    onProfileClick = () => this.props.navigation.navigate('Profile');

   render() {
       let { account, contact } = this.props.chat;
       let status = this.props.chat.status();
       let messages = this.props.chat.messages.filter(
           e => e.sender === contact.id || e.receiver === contact.id
       );
       return (
           <Container>
               <ChatHeader
                    contact={contact}
                    onBack={this.onBackClick}
                    onProfile={this.onProfileClick}
                    status={status} />
                    <GiftedChat
                        user={{_id: account.id}}
                        messages={messages.reverse()}
                        text={this.state.message}
                        onInputTextChanged={this.onMessageChange}
                        renderInputToolbar={this.renderInputToolbar}
                        renderAvatar={null} />
                    <KeyboardAvoidingView behavior="padding" enabled />
           </Container>
       );
   }

    renderInputToolbar = props => {
        props.placeholder = Strings.WRITE_YOUR_MESSAGE;
        props.textInputStyle = styles.input;
        props.renderSend = this.renderSend;
        return <InputToolbar {...props} />
   }

   renderSend = () => <Icon name="paper-plane" onPress={this.onSend} style={styles.send} />

}

export default withChatContext(ChatScreen);
