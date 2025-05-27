import React, { useState, useContext } from "react";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Помилка", "Введіть email та пароль");
            return;
        }

        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            Alert.alert("Помилка", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#6366f1', '#8b5cf6', '#a855f7']}
                style={styles.gradient}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Вітаємо!</Text>
                        <Text style={styles.subtitle}>Увійдіть до свого акаунта</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder="your@email.com"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Пароль</Text>
                            <TextInput
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton, loading && styles.disabledButton]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text style={styles.loginButtonText}>
                                {loading ? "Вхід..." : "Увійти"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.linkButton}
                            onPress={() => navigation.navigate("ResetPassword")}
                        >
                            <Text style={styles.linkText}>Забули пароль?</Text>
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>або</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <Text style={styles.signupButtonText}>Створити новий акаунт</Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
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
    loginButton: {
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
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    linkButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    linkText: {
        color: '#6366f1',
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        marginHorizontal: 15,
        color: '#9ca3af',
        fontSize: 14,
    },
    signupButton: {
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 18,
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
    signupButtonText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    disabledButton: {
        opacity: 0.6,
    },
});