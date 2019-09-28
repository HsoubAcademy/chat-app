import React, {Component} from 'react';
import { Keyboard, KeyboardAvoidingView} from 'react-native';
import { Button, Container, Content, Icon, Input, Item, Text, Toast, View } from 'native-base';
import { Header } from "../components";
import { Auth, Axios, Strings, Urls } from "../config";
import styles from "./styles/auth";

class PasswordScreen extends Component {
    
    state = {
        password: '',
        newPassword: ''
    }

    /**
     * On password change listener.
     */
    onPasswordChange = password => this.setState({ password });

    /**
     * On new password change listener.
     */
    onNewPasswordChange = newPassword => this.setState({ newPassword });

    /**
     * Validate password and new password.
     */
    validate(){
        Keyboard.dismiss();
        if(!this.state.password){
            Toast.show({ text: Strings.PASSWORD_REQUIRED, type: 'danger'});
            return false;
        }
        if(!this.state.newPassword){
            Toast.show({ text: Strings.NEW_PASSWORD_REQUIRED, type: 'danger'});
            return false;
        }
        return true;
    }

    /**
     * Send change password request to server.
     */
    send = async () => {
        if(!this.validate()) return;
        let data = {
            password: this.state.password, newPassword: this.state.newPassword
        }
        try{
            Axios.defaults.headers.common.Authorization = await Auth.getToken();
            await Axios.post(Urls.CHANGE_PASSWORD, data);
            this.setState({ password: '', newPassword: '' });
            Toast.show({ text: Strings.PASSWORD_CHANGED, type: 'success' });
        } catch (e) {
            Toast.show({ text: e.response.data.message, type: 'danger' });
        }
    }

    render(){
        return(
            <Container>
                <Header title={Strings.TITLE_CHANGE_PASSWORD}/>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <Content>
                        <View style={styles.form}>
                            <Item rounded style={styles.inputItem}>
                                <Input
                                    style={styles.input}
                                    placeholder={Strings.PASSWORD_PLACEHOLDER}
                                    secureTextEntry={true}
                                    onChangeText={this.onPasswordChange}
                                    value={this.state.password}
                                />
                                <Icon name='lock' style={styles.icon}/>
                            </Item>
                            <Item rounded style={styles.inputItem}>
                                <Input
                                    style={styles.input}
                                    placeholder={Strings.NEW_PASSWORD_PLACEHOLDER}
                                    secureTextEntry={true}
                                    onChangeText={this.onNewPasswordChange}
                                    value={this.state.newPassword}
                                />
                                <Icon name='lock' style={styles.icon}/>
                            </Item>
                            <Button rounded info block style={styles.button} onPress={this.send}>
                                <Text>{Strings.SEND}</Text>
                            </Button>
                        </View>
                    </Content>
                </KeyboardAvoidingView>
            </Container>
        );
    }

}

export default PasswordScreen
