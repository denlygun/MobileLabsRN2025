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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !name || !age || !city) {
            Alert.alert("Помилка", "Заповніть всі поля");
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            await setDoc(doc(db, "users", uid), {
                name,
                age,
                city,
                email,
                uid,
            });

            Alert.alert("Успіх", "Користувач зареєстрований!");
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
                        <Text style={styles.title}>Створити акаунт</Text>
                        <Text style={styles.subtitle}>Заповніть форму для реєстрації</Text>

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

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Ім'я</Text>
                            <TextInput
                                placeholder="Ваше повне ім'я"
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputContainer, styles.halfWidth]}>
                                <Text style={styles.label}>Вік</Text>
                                <TextInput
                                    placeholder="25"
                                    value={age}
                                    onChangeText={setAge}
                                    keyboardType="numeric"
                                    style={styles.input}
                                />
                            </View>

                            <View style={[styles.inputContainer, styles.halfWidth]}>
                                <Text style={styles.label}>Місто</Text>
                                <TextInput
                                    placeholder="Ваше місто"
                                    value={city}
                                    onChangeText={setCity}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.signupButton, loading && styles.disabledButton]}
                            onPress={handleSignup}
                            disabled={loading}
                        >
                            <Text style={styles.signupButtonText}>
                                {loading ? "Реєстрація..." : "Зареєструватися"}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>або</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.loginButtonText}>Вже є акаунт? Увійти</Text>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '47%',
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
    signupButton: {
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
    signupButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
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
    loginButton: {
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 18,
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
    loginButtonText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    disabledButton: {
        opacity: 0.6,
    },
});