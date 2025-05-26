import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    StyleSheet,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [reminderDate, setReminderDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        registerForPushNotificationsAsync();
        loadTasks();

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            console.log('Сповіщення отримано:', notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Натиснуто на сповіщення:', response);
            const taskId = response.notification.request.content.data?.taskId;
            if (taskId) {
                // Можна додати навігацію до конкретної задачі
                Alert.alert('Нагадування', 'Перехід до задачі: ' + taskId);
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    const registerForPushNotificationsAsync = async () => {
        let token;

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                Alert.alert('Помилка', 'Не вдалося отримати дозвіл на сповіщення!');
                return;
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: 'your-project-id',
            });
            console.log('Expo Push Token:', token);
        } else {
            Alert.alert('Увага', 'Push-сповіщення працюють тільки на реальних пристроях');
        }

        setExpoPushToken(token?.data || '');
    };

    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        } catch (error) {
            console.error('Помилка завантаження задач:', error);
        }
    };

    const saveTasks = async (newTasks) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
        } catch (error) {
            console.error('Помилка збереження задач:', error);
        }
    };

    const scheduleNotification = async (task) => {
        try {
            const trigger = new Date(task.reminderDate);

            // Перевірка, що час у майбутньому
            if (trigger <= new Date()) {
                console.warn('Час сповіщення в минулому');
                return null;
            }

            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '📝 Нагадування про задачу',
                    body: `${task.name}: ${task.description || 'Час виконати задачу!'}`,
                    data: { taskId: task.id, taskName: task.name },
                    sound: 'default',
                },
                trigger: {
                    date: trigger,
                },
            });

            console.log('Сповіщення заплановано:', notificationId);
            return notificationId;
        } catch (error) {
            console.error('Помилка планування сповіщення:', error);
            return null;
        }
    };


    
    const cancelNotification = async (notificationId) => {
        try {
            if (notificationId) {
                await Notifications.cancelScheduledNotificationAsync(notificationId);
                console.log('Сповіщення скасовано:', notificationId);
            }
        } catch (error) {
            console.error('Помилка скасування сповіщення:', error);
        }
    };

    const sendPushNotification = async (task) => {
        if (!expoPushToken) return null;

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: '📝 Нагадування про задачу',
            body: `${task.name}: ${task.description || 'Час виконати задачу!'}`,
            data: { taskId: task.id, taskName: task.name },
        };

        try {
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            const result = await response.json();
            console.log('Push-сповіщення відправлено:', result);
            return result;
        } catch (error) {
            console.error('Помилка відправки push-сповіщення:', error);
            return null;
        }
    };

    const addTask = async () => {
        if (!taskName.trim()) {
            Alert.alert('Помилка', 'Введіть назву задачі');
            return;
        }

        if (reminderDate <= new Date()) {
            Alert.alert('Помилка', 'Час нагадування повинен бути у майбутньому');
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            name: taskName.trim(),
            description: taskDescription.trim(),
            reminderDate: reminderDate.toISOString(),
            createdAt: new Date().toISOString(),
        };

        const notificationId = await scheduleNotification(newTask);
        if (notificationId) {
            newTask.notificationId = notificationId;
        }

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);

        setTaskName('');
        setTaskDescription('');
        setReminderDate(new Date());

        Alert.alert('Успіх', 'Задачу додано та сповіщення заплановано!');
    };

    const deleteTask = async (taskId) => {
        const taskToDelete = tasks.find(task => task.id === taskId);

        Alert.alert(
            'Видалити задачу',
            'Ви впевнені, що хочете видалити цю задачу?',
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        if (taskToDelete?.notificationId) {
                            await cancelNotification(taskToDelete.notificationId);
                        }

                        const updatedTasks = tasks.filter(task => task.id !== taskId);
                        setTasks(updatedTasks);
                        saveTasks(updatedTasks);
                    }
                }
            ]
        );
    };

    const sendTestNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: '🧪 Тестове сповіщення',
                body: 'Сповіщення працюють правильно!',
                data: { test: true },
            },
            trigger: { seconds: 2 },
        });

        Alert.alert('Тест', 'Тестове сповіщення буде показано через 2 секунди');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || reminderDate;
        setShowDatePicker(false);
        setReminderDate(currentDate);
    };

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || reminderDate;
        setShowTimePicker(false);

        const newDateTime = new Date(reminderDate);
        newDateTime.setHours(currentTime.getHours());
        newDateTime.setMinutes(currentTime.getMinutes());

        setReminderDate(newDateTime);
    };

    const renderTaskItem = ({ item }) => (
        <View style={styles.taskItem}>
            <View style={styles.taskContent}>
                <Text style={styles.taskName}>{item.name}</Text>
                {item.description && (
                    <Text style={styles.taskDescription}>{item.description}</Text>
                )}
                <Text style={styles.taskDate}>
                    Нагадати: {formatDate(item.reminderDate)}
                </Text>
                <Text style={styles.taskId}>ID: {item.id}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
            >
                <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

            <View style={styles.header}>
                <Text style={styles.title}>To-Do Reminder</Text>
                <Text style={styles.subtitle}>Локальні сповіщення</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Назва задачі"
                    value={taskName}
                    onChangeText={setTaskName}
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Опис задачі (необов'язково)"
                    value={taskDescription}
                    onChangeText={setTaskDescription}
                    multiline
                    numberOfLines={3}
                />

                <View style={styles.dateTimeContainer}>
                    <TouchableOpacity
                        style={[styles.dateButton, { flex: 1, marginRight: 8 }]}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.dateButtonText}>
                            📅 {reminderDate.toLocaleDateString('uk-UA')}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.dateButton, { flex: 1, marginLeft: 8 }]}
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Text style={styles.dateButtonText}>
                            🕐 {reminderDate.toLocaleTimeString('uk-UA', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={addTask}>
                    <Text style={styles.addButtonText}>Додати задачу</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: '#28a745', marginTop: 8 }]}
                    onPress={sendTestNotification}
                >
                    <Text style={styles.addButtonText}>🧪 Тест сповіщення</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tasksList}>
                <Text style={styles.sectionTitle}>
                    Мої задачі ({tasks.length})
                </Text>

                {tasks.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Немає задач</Text>
                        <Text style={styles.emptySubText}>
                            Додайте свою першу задачу вище
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTaskItem}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={reminderDate}
                    mode="date"
                    is24Hour={true}
                    onChange={onDateChange}
                    minimumDate={new Date()}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    testID="timePicker"
                    value={reminderDate}
                    mode="time"
                    is24Hour={true}
                    onChange={onTimeChange}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        marginTop: 4,
    },
    form: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    dateButton: {
        backgroundColor: '#e9ecef',
        padding: 12,
        borderRadius: 8,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#495057',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tasksList: {
        flex: 1,
        margin: 16,
        marginTop: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 12,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 18,
        color: '#6c757d',
        marginBottom: 4,
    },
    emptySubText: {
        fontSize: 14,
        color: '#adb5bd',
    },
    taskItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    taskContent: {
        flex: 1,
        marginRight: 12,
    },
    taskName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 4,
    },
    taskDescription: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 4,
    },
    taskDate: {
        fontSize: 12,
        color: '#007bff',
        fontWeight: '500',
    },
    taskId: {
        fontSize: 10,
        color: '#adb5bd',
        marginTop: 2,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});