import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { LinearGradient } from 'expo-linear-gradient';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Помилка", "Введіть email");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
          "Перевірте пошту",
          `На ${email} відправлено лист із посиланням для відновлення пароля.`
      );
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
            colors={['#6366f1', '#8b5cf6']}
            style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🔐</Text>
              </View>

              <Text style={styles.title}>Відновлення пароля</Text>
              <Text style={styles.instruction}>
                Введіть ваш email адрес і ми надішлемо вам посилання для скидання пароля
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="your@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />
              </View>

              <TouchableOpacity
                  style={[styles.resetButton, loading && styles.disabledButton]}
                  onPress={handleReset}
                  disabled={loading}
              >
                <Text style={styles.resetButtonText}>
                  {loading ? "Відправка..." : "Відправити лист"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>Повернутись до входу</Text>
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
  instruction: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 25,
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
  resetButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 18,
  },
  backButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
});