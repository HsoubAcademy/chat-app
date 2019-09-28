import { AsyncStorage } from 'react-native';

export default {
    
    /**
     * Set user
     * @param user
     */
    setUser: async user => await AsyncStorage.setItem(
        'user', JSON.stringify(user)
    ),
    
    /**
     * Get user
     */  
    getUser: async () => JSON.parse(await AsyncStorage.getItem('user')),

    /**
     * Is user authenticated.
     * @returns {boolean}
     */
    auth: async () => await AsyncStorage.getItem('user') != null,

    /**
     * Get user token.
     * @returns {string}
     */
    getToken: async () => {
        let user = JSON.parse(await AsyncStorage.getItem('user'));
        return user !== null ? user.token : '';
    },

    /**
     * Update user profile
     * @param newProfile
     */
    updateProfile: async profile => {
        let user = JSON.parse(await AsyncStorage.getItem('user'));
        profile.token = user.token;
        await AsyncStorage.setItem('user', JSON.stringify(profile));
    },

    /**
     * Delete user data.
     */
    logout: async () => await AsyncStorage.removeItem('user')
    
}