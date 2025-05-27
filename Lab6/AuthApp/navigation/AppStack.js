import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#6366f1',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Профіль' }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: 'Редагування' }}
            />
            <Stack.Screen
                name="DeleteAccount"
                component={DeleteAccountScreen}
                options={{ title: 'Видалення акаунта' }}
            />
        </Stack.Navigator>
    );
}