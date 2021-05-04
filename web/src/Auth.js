import axios from 'axios';

const Auth = {

    /**
     * Initialize axios headers.
     */
    init: () => {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.defaults.headers.common['Authorization'] = user !== null ? user.token : '';
    },

    /**
     * Store user data after login.
     * @param user
     */
    login: user => {
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = user.token;
    },

    /**
     * Delete user data.
     */
    logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('user');
    },

    /**
     * Is user authenticated.
     * @returns {boolean}
     */
    auth: () => localStorage.getItem('user') !== null,

    /**
     * Is guest.
     * @returns {boolean}
     */
    guest: () => localStorage.getItem('user') === null,

    /**
     * Get user token.
     * @returns {string}
     */
    getToken: () => {
        let user = JSON.parse(localStorage.getItem('user'));
        return user !== null ? user.token : '';
    },

    /**
     * Set user
     * @param newProfile
     */
    setUser: (newProfile) => {
        let user = JSON.parse(localStorage.getItem('user'));
        newProfile.token = user.token;
        localStorage.setItem('user', JSON.stringify(newProfile));
    },

};

export default Auth;