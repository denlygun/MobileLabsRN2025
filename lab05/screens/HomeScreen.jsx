import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, TextInput, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen({ navigation, rootPath }) {
    const [path, setPath] = useState(rootPath);
    const [items, setItems] = useState([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [newFileName, setNewFileName] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [creatingFile, setCreatingFile] = useState(false);
    const [stats, setStats] = useState({});

    useEffect(() => {
        loadItems();
        loadStats();
    }, [path]);

    const loadItems = async () => {
        const dirItems = await FileSystem.readDirectoryAsync(path);
        const fullItems = await Promise.all(
            dirItems.map(async (name) => {
                const uri = `${path}/${name}`;
                const info = await FileSystem.getInfoAsync(uri);
                return { name, uri, isDirectory: info.isDirectory, size: info.size, modDate: info.modificationTime };
            })
        );
        setItems(fullItems);
    };

    const loadStats = async () => {
        const free = await FileSystem.getFreeDiskStorageAsync();
        const total = await FileSystem.getTotalDiskCapacityAsync();
        setStats({ free, total, used: total - free });
    };

    const goUp = () => {
        if (path !== rootPath) {
            setPath(path.substring(0, path.lastIndexOf('/')));
        }
    };

    const createFolder = async () => {
        if (newFolderName) {
            await FileSystem.makeDirectoryAsync(`${path}/${newFolderName}`);
            setNewFolderName('');
            setCreatingFolder(false);
            loadItems();
        }
    };

    const createFile = async () => {
        if (newFileName) {
            await FileSystem.writeAsStringAsync(`${path}/${newFileName}.txt`, fileContent);
            setNewFileName('');
            setFileContent('');
            setCreatingFile(false);
            loadItems();
        }
    };

    const deleteItem = (uri) => {
        Alert.alert('Підтвердження', 'Видалити цей обʼєкт?', [
            { text: 'Скасувати' },
            {
                text: 'Видалити', style: 'destructive', onPress: async () => {
                    await FileSystem.deleteAsync(uri);
                    loadItems();
                },
            },
        ]);
    };

    const showInfo = (item) => {
        Alert.alert('Інфо', `Назва: ${item.name}\nТип: ${item.isDirectory ? 'Папка' : 'Файл'}\nРозмір: ${item.size} байт\nМодифіковано: ${new Date(item.modDate * 1000).toLocaleString()}`);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => item.isDirectory ? setPath(`${path}/${item.name}`) : navigation.navigate('FileViewer', { file: item })}
            onLongPress={() => showInfo(item)}
        >
            <Text style={styles.itemText}>{item.isDirectory ? '📁 ' : '📄 '}{item.name}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.uri)}><Text style={styles.delete}>❌</Text></TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📁 {path.replace(rootPath, 'Root')}</Text>
            <View style={styles.actions}>
                <Button title="⬅️ Вгору" onPress={goUp} disabled={path === rootPath} />
                <Button title="📂 Папка" onPress={() => setCreatingFolder(true)} />
                <Button title="📄 Файл" onPress={() => setCreatingFile(true)} />
            </View>
            <FlatList data={items} keyExtractor={item => item.uri} renderItem={renderItem} style={styles.list} />
            <Text style={styles.footer}>Памʼять: Загальна — {(stats.total / 1e6).toFixed(1)} MB | Вільна — {(stats.free / 1e6).toFixed(1)} MB | Зайнята — {(stats.used / 1e6).toFixed(1)} MB</Text>

            {/* Створення папки */}
            <Modal visible={creatingFolder} transparent animationType="slide">
                <View style={styles.modalWrapper}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Нова папка</Text>
                        <TextInput placeholder="Назва папки" value={newFolderName} onChangeText={setNewFolderName} style={styles.input} />
                        <Button title="Створити" onPress={createFolder} />
                        <Button title="Скасувати" onPress={() => setCreatingFolder(false)} color="#999" />
                    </View>
                </View>
            </Modal>

            {/* Створення файлу */}
            <Modal visible={creatingFile} transparent animationType="slide">
                <View style={styles.modalWrapper}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Новий файл</Text>
                        <TextInput placeholder="Назва файлу" value={newFileName} onChangeText={setNewFileName} style={styles.input} />
                        <TextInput placeholder="Вміст" value={fileContent} onChangeText={setFileContent} style={[styles.input, styles.textArea]} multiline />
                        <Button title="Створити" onPress={createFile} />
                        <Button title="Скасувати" onPress={() => setCreatingFile(false)} color="#999" />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fdfdfd' },
    title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: '#333' },
    actions: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
    item: {
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    itemText: { fontSize: 16 },
    delete: { color: 'red', fontSize: 18 },
    footer: { marginTop: 10, fontSize: 12, color: '#666', textAlign: 'center' },
    modalWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
    modal: { width: '90%', padding: 20, backgroundColor: '#fff', borderRadius: 10, gap: 10 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: { backgroundColor: '#fff', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10 },
    textArea: { height: 100, textAlignVertical: 'top' },
    list: { flex: 1 },
});
