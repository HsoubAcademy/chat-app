const SOCKET = 'ws://10.0.2.2:3001';
const API = 'http://10.0.2.2:3001';
const urls = {
    SOCKET: SOCKET,
    API: API,
    AUTH: API + '/api/auth',
    REGISTER: API + '/api/auth/register',
    UPDATE_PROFILE: API + '/api/account',
    CHANGE_PASSWORD: API + '/api/account/password',
    AVATARS: API + '/uploads/'
};
export default urls;
