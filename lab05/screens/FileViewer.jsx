import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function FileViewer({ route, navigation }) {
    const { file } = route.params;
    const [content, setContent] = useState('');

    useEffect(() => {
        const readFile = async () => {
            const data = await FileSystem.readAsStringAsync(file.uri);
            setContent(data);
        };
        readFile();
    }, []);

    const saveChanges = async () => {
        await FileSystem.writeAsStringAsync(file.uri, content);
        Alert.alert('Збережено', 'Файл успішно збережено');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📄 {file.name}</Text>
            <TextInput
                style={styles.textArea}
                multiline
                value={content}
                onChangeText={setContent}
                placeholder="Вміст файлу..."
            />
            <View style={styles.buttonContainer}>
                <Button title="💾 Зберегти" onPress={saveChanges} />
                <Button title="↩️ Назад" onPress={() => navigation.goBack()} color="#999" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fdfdfd' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    textArea: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 12,
    },
});
