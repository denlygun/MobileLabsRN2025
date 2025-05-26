import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const isValid = await authService.checkToken();
            setIsAuthenticated(isValid);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        const result = await authService.login(email, password);
        if (result.success) {
            setIsAuthenticated(true);
        }
        return result;
    };

    const register = async (email, password) => {
        const result = await authService.register(email, password);
        if (result.success) {
            setIsAuthenticated(true);
        }
        return result;
    };

    const logout = async () => {
        const result = await authService.logout();
        if (result) {
            setIsAuthenticated(false);
        }
        return result;
    };

    const value = {
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};