import React from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function RegisterScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      <TextInput placeholder="Електронна пошта" style={styles.input} />
      <TextInput placeholder="Пароль" secureTextEntry style={styles.input} />
      <TextInput placeholder="Пароль (ще раз)" secureTextEntry style={styles.input} />
      <TextInput placeholder="Прізвище" style={styles.input} />
      <TextInput placeholder="Ім'я" style={styles.input} />
      <Button title="Зареєструватися" color="#007AFF" onPress={() => {}} />
      <Text style={styles.footer}>Лигун Денис Андрійович, ІПЗ-23-3</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  footer: { textAlign: 'center', marginTop: 20, color: '#666' },
});
