import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AppStack from "./navigation/AppStack";
import AuthStack from "./navigation/AuthStack";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { user, authInitializing } = useContext(AuthContext);

  if (authInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
