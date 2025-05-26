import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskItem from '../components/TaskItem';
import { useGame } from '../context/GameContext';

export default function TasksScreen() {
    const { tasks } = useGame();

    const renderTask = ({ item }) => <TaskItem task={item} />;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        paddingVertical: 10,
    },
});