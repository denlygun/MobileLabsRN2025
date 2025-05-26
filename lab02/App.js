import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { ThemeContext, useTheme } from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './themes';
import { Container, Header, HeaderTitle, ThemeToggle } from './components/StyledComponents';
import StoreScreen from './screens/StoreScreen';
import CommunityScreen from './screens/CommunityScreen';
import ChatScreen from './screens/ChatScreen';
import SafetyScreen from './screens/SafetyScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Store': iconName = 'storefront'; break;
                        case 'Community': iconName = 'people'; break;
                        case 'Chat': iconName = 'chatbubbles'; break;
                        case 'Safety': iconName = 'shield-checkmark'; break;
                        case 'Profile': iconName = 'person'; break;
                        default: iconName = 'home';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.accent,
                tabBarInactiveTintColor: theme.textSecondary,
                tabBarStyle: {
                    backgroundColor: theme.surface,
                    borderTopColor: theme.border,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Store" component={StoreScreen} />
            <Tab.Screen name="Community" component={CommunityScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Safety" component={SafetyScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const MainStack = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{
                    header: () => (
                        <Header>
                            <HeaderTitle>Steam</HeaderTitle>
                            <ThemeToggle onPress={toggleTheme}>
                                <Ionicons
                                    name={theme === lightTheme ? "moon" : "sunny"}
                                    size={20}
                                    color="white"
                                />
                            </ThemeToggle>
                        </Header>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default function App() {
    const [currentTheme, setCurrentTheme] = React.useState(darkTheme);

    const toggleTheme = () => {
        setCurrentTheme(prev => prev === darkTheme ? lightTheme : darkTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            <ThemeProvider theme={currentTheme}>
                <NavigationContainer>
                    <Container>
                        <StatusBar style={currentTheme === darkTheme ? "light" : "dark"} />
                        <MainStack />
                    </Container>
                </NavigationContainer>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}