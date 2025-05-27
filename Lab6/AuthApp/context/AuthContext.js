import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authInitializing, setAuthInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        await AsyncStorage.setItem("user", JSON.stringify(usr));
        setUser(usr);
      } else {
        await AsyncStorage.removeItem("user");
        setUser(null);
      }
      setAuthInitializing(false);
    });

    return unsubscribe;
  }, []);

  return (
      <AuthContext.Provider value={{ user, setUser, authInitializing }}>
        {children}
      </AuthContext.Provider>
  );
};
