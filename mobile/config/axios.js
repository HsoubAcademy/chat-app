import axios from 'axios';
import Urls from './urls';

const instance = axios.create({
    baseURL: Urls.API_URL,
});

export default instance;
