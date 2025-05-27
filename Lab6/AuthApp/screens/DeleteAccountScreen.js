import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView
} from "react-native";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';

export default function DeleteAccountScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      Alert.alert("Помилка", "Введіть пароль");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      setLoading(true);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      Alert.alert("Успіх", "Акаунт видалено");
    } catch (error) {
      Alert.alert("Помилка", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
            colors={['#ef4444', '#dc2626']}
            style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>⚠️</Text>
              </View>

              <Text style={styles.title}>Видалення акаунта</Text>
              <Text style={styles.warning}>
                Ця дія є незворотною. Всі ваші дані будуть втрачені назавжди.
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Підтвердіть ваш пароль"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
              </View>

              <TouchableOpacity
                  style={[styles.deleteButton, loading && styles.disabledButton]}
                  onPress={handleDelete}
                  disabled={loading}
              >
                <Text style={styles.deleteButtonText}>
                  {loading ? "Видалення..." : "Видалити акаунт"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => navigation.goBack()}
              >
                <Text style={styles.cancelButtonText}>Скасувати</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 15,
  },
  warning: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 18,
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
});