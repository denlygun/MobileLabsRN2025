import { authAPI } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export const authService = {
    async register(email, password) {
        try {
            const response = await authAPI.post(':signUp', {
                email,
                password,
                returnSecureToken: true
            });

            const { idToken, localId } = response.data;
            await AsyncStorage.setItem('idToken', idToken);
            await AsyncStorage.setItem('userId', localId);

            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error?.message || 'Registration failed'
            };
        }
    },

    async login(email, password) {
        try {
            const response = await authAPI.post(':signInWithPassword', {
                email,
                password,
                returnSecureToken: true
            });

            const { idToken, localId } = response.data;
            await AsyncStorage.setItem('idToken', idToken);
            await AsyncStorage.setItem('userId', localId);

            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error?.message || 'Login failed'
            };
        }
    },

    async checkToken() {
        try {
            const token = await AsyncStorage.getItem('idToken');
            if (!token) return false;

            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            return decoded.exp > currentTime;
        } catch (error) {
            return false;
        }
    },

    async logout() {
        try {
            await AsyncStorage.removeItem('idToken');
            await AsyncStorage.removeItem('userId');
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    },

    async getUserId() {
        return await AsyncStorage.getItem('userId');
    }
};