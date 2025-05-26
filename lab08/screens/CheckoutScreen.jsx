import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../store/slices/ordersSlice';
import { clearCart } from '../store/slices/cartSlice';
import { setUserData } from '../store/slices/userSlice';

const CheckoutScreen = ({ navigation }) => {
    const { items, totalAmount } = useSelector(state => state.cart);
    const { name: savedName, email: savedEmail } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [name, setName] = useState(savedName);
    const [email, setEmail] = useState(savedEmail);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateForm = () => {
        let isValid = true;

        if (!name.trim()) {
            setNameError('Введіть ваше ім\'я');
            isValid = false;
        } else {
            setNameError('');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError('Введіть email');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Введіть коректний email');
            isValid = false;
        } else {
            setEmailError('');
        }

        return isValid;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        const orderData = {
            items: items,
            totalAmount: totalAmount,
            customerName: name.trim(),
            customerEmail: email.trim(),
        };

        dispatch(addOrder(orderData));
        dispatch(setUserData({ name: name.trim(), email: email.trim() }));
        dispatch(clearCart());

        Alert.alert(
            'Замовлення оформлено!',
            'Дякуємо за ваше замовлення. Ми зв\'яжемося з вами найближчим часом.',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('CartMain'),
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Інформація про замовлення</Text>
                <Text style={styles.totalText}>
                    Загальна сума: {totalAmount.toLocaleString()} ₴
                </Text>
                <Text style={styles.itemsText}>
                    Товарів: {items.reduce((total, item) => total + item.quantity, 0)} шт.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Контактні дані</Text>

                <Text style={styles.label}>Ім'я *</Text>
                <TextInput
                    style={[styles.input, nameError ? styles.inputError : null]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Введіть ваше ім'я"
                    autoCapitalize="words"
                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

                <Text style={styles.label}>Email *</Text>
                <TextInput
                    style={[styles.input, emailError ? styles.inputError : null]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Введіть ваш email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Підтвердити замовлення</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 4,
    },
    itemsText: {
        fontSize: 14,
        color: '#666',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    inputError: {
        borderColor: '#f44336',
    },
    errorText: {
        color: '#f44336',
        fontSize: 14,
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 32,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CheckoutScreen;