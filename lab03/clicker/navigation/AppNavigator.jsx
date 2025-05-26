import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import GameScreen from '../screens/GameScreen';
import TasksScreen from '../screens/TasksScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Game') {
                        iconName = focused ? 'game-controller' : 'game-controller-outline';
                    } else if (route.name === 'Tasks') {
                        iconName = focused ? 'list' : 'list-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                headerStyle: {
                    backgroundColor: '#007AFF',
                },
                headerTintColor: '#fff',
            })}
        >
            <Tab.Screen name="Game" component={GameScreen} options={{ title: 'Гра-клікер' }} />
            <Tab.Screen name="Tasks" component={TasksScreen} options={{ title: 'Завдання' }} />
        </Tab.Navigator>
    );
}