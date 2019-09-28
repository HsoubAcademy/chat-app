import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import PasswordScreen from '../screens/PasswordScreen';

let config = { headerMode: 'none' };
export default createAppContainer(
    createSwitchNavigator({
        Guest: createStackNavigator({
            Login: LoginScreen,
            Register: RegisterScreen,
        }, config),
        Auth: createStackNavigator({
            Home: HomeScreen,
            Chat: ChatScreen,
            Profile: ProfileScreen,
            EditProfile: EditProfileScreen,
            Password: PasswordScreen
        }, config) 
    }, config)
);