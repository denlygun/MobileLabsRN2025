import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskItem({ task }) {
    const progressPercentage = (task.current / task.target) * 100;

    return (
        <View style={[styles.container, task.completed && styles.completed]}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={task.completed ? '#4CAF50' : '#ccc'}
                />
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, task.completed && styles.completedText]}>
                    {task.title}
                </Text>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${Math.min(progressPercentage, 100)}%` }
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {task.current}/{task.target}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    completed: {
        backgroundColor: '#f8f8f8',
    },
    iconContainer: {
        marginRight: 15,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        marginRight: 10,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007AFF',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: '#666',
        minWidth: 40,
    },
});