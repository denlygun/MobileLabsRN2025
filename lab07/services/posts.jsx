import { databaseAPI } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postsService = {
    async getPosts() {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await databaseAPI.get(`/users/${userId}/posts.json`);

            const postsData = response.data || {};
            const posts = Object.keys(postsData).map(key => ({
                id: key,
                ...postsData[key]
            }));

            return { success: true, data: posts };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to fetch posts'
            };
        }
    },

    async createPost(title, content) {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const postData = {
                title,
                content,
                createdAt: new Date().toISOString()
            };

            const response = await databaseAPI.post(`/users/${userId}/posts.json`, postData);

            return {
                success: true,
                data: { id: response.data.name, ...postData }
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to create post'
            };
        }
    },

    async updatePost(postId, title, content) {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const postData = {
                title,
                content,
                updatedAt: new Date().toISOString()
            };

            await databaseAPI.put(`/users/${userId}/posts/${postId}.json`, postData);

            return { success: true, data: { id: postId, ...postData } };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to update post'
            };
        }
    },

    async deletePost(postId) {
        try {
            const userId = await AsyncStorage.getItem('userId');
            await databaseAPI.delete(`/users/${userId}/posts/${postId}.json`);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to delete post'
            };
        }
    }
};