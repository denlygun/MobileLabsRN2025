import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { GameProvider } from './context/GameContext';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GameProvider>
                <NavigationContainer>
                    <AppNavigator />
                    <StatusBar style="auto" />
                </NavigationContainer>
            </GameProvider>
        </GestureHandlerRootView>
    );
}