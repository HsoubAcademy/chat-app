import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import { Strings, Axios, Urls, Auth } from "../config";
import { Toast, Container, Content, View, Text, Item, Input, Icon, Button } from 'native-base';
import styles from './styles/auth';
import companyLogo from '../assets/images/logo.png';
import { Loader } from '../components';

export default class RegisterScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            isLoading: false
        }
    }

    /**
     * On name change listener.
     */
    onNameChange = name => this.setState({name});

    /**
     * On username change listener.
     */
    onUsernameChange = username => this.setState({username});

    /**
     * On password change listener.
     */
    onPassowrdChange = password => this.setState({password});

    /**
     * Validate name username and password.
     */
    validate(){
        Keyboard.dismiss();
        if(!this.state.name){
            Toast.show({ text: Strings.NAME_REQUIRED, type: 'danger'});
            return false;
        }
        if(!this.state.username){
            Toast.show({ text: Strings.USERNAME_REQUIRED, type: 'danger'});
            return false;
        }
        if(!this.state.password){
            Toast.show({ text: Strings.PASSWORD_REQUIRED, type: 'danger'});
            return false;
        }
        return true;
    }

    /**
     * Send register request to server. 
     */
    register = async () => {
        if(!this.validate()) return;
        let data = {
            name: this.state.name, username: this.state.username, password: this.state.password
        };
        try{
            this.setState({ isLoading: true });
            let response = await Axios.post(Urls.REGISTER, data);
            Auth.setUser(response.data);
            this.props.navigation.navigate('Home');
            this.setState({ isLoading: false });
        } catch(e) {
            this.setState({ isLoading: false });
            Toast.show({ text: e.response.data.message, type: 'danger'});
        }
    }

    /**
     * Back to login screen.
     */
    backToLogin = () => this.props.navigation.navigate('Login');

    render() {
        return (
            <Container>
                <Loader title={Strings.PLEASE_WAIT} loading={this.state.isLoading} />
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                    <Content>
                        <View style={styles.logoContainer}>
                            <Image
                                style={styles.logo}
                                source={companyLogo}
                                resizeMode='contain' />
                        </View>
                        <View style={styles.form}>
                            <Text style={styles.title}>{Strings.TITLE_CREATE_NEW_ACCOUNT}</Text>
                            <Item rounded style={styles.inputItem}>
                                <Input
                                    style={styles.input}
                                    placeholder={Strings.NAME_PLACEHOLDER}
                                    onChangeText={this.onNameChange} />
                                <Icon name='person' style={styles.icon} />
                            </Item>
                            <Item rounded style={styles.inputItem}>
                                <Input
                                    style={styles.input}
                                    placeholder={Strings.USERNAME_PLACEHOLDER}
                                    onChangeText={this.onUsernameChange} />
                                <Icon name='person' style={styles.icon} />
                            </Item>
                            <Item rounded style={styles.inputItem}>
                                <Input
                                    style={styles.input}
                                    placeholder={Strings.PASSWORD_PLACEHOLDER}
                                    secureTextEntry={true}
                                    onChangeText={this.onPassowrdChange} />
                                <Icon name='lock' style={styles.icon} />
                            </Item>
                            <Button rounded info block style={styles.button} onPress={this.register}>
                                <Text>{Strings.SEND}</Text>
                            </Button> 
                            <Button rounded bordered dark block style={styles.button} onPress={this.backToLogin}>
                                <Text>{Strings.BACK_TO_LOGIN}</Text>
                            </Button> 
                        </View>
                    </Content>
                </KeyboardAvoidingView>
            </Container>
        )
   }
}
