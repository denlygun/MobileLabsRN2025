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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';

export default function EditProfileScreen({ route, navigation }) {
  const { profile } = route.params;
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [city, setCity] = useState(profile.city);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !age || !city) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля");
      return;
    }

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name, age, city });
      Alert.alert("Успіх", "Профіль оновлено");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Помилка", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
            colors={['#6366f1', '#4f46e5']}
            style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              <Text style={styles.title}>Редагування профілю</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Ім'я</Text>
                <TextInput
                    placeholder="Введіть ваше ім'я"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Вік</Text>
                <TextInput
                    placeholder="Введіть ваш вік"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Місто</Text>
                <TextInput
                    placeholder="Введіть ваше місто"
                    value={city}
                    onChangeText={setCity}
                    style={styles.input}
                />
              </View>

              <TouchableOpacity
                  style={[styles.saveButton, loading && styles.disabledButton]}
                  onPress={handleUpdate}
                  disabled={loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? "Збереження..." : "Зберегти зміни"}
                </Text>
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
    flexGrow: 1,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 18,
    marginTop: 10,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
});