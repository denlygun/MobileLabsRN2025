import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyABVvzZSHYOWK_8ltcbcqa1xSck6vP4PuM",
    projectId: "lab07-2c105",
    databaseURL: "https://lab07-2c105-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const authAPI = axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts`,
    params: {
        key: FIREBASE_CONFIG.apiKey
    }
});

export const databaseAPI = axios.create({
    baseURL: FIREBASE_CONFIG.databaseURL
});

databaseAPI.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('idToken');
        if (token) {
            config.params = {
                ...config.params,
                auth: token
            };
        }
    } catch (error) {
        console.error('Error getting token:', error);
    }
    return config;
});

databaseAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('idToken');
            await AsyncStorage.removeItem('userId');
            // Тут можна додати навігацію до екрана логіну
            console.log('Token expired, redirecting to login');
        }
        return Promise.reject(error);
    }
);