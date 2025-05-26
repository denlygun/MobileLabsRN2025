import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScoreDisplay({ score }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Очки:</Text>
            <Text style={styles.score}>{score}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginHorizontal: 20,
    },
    label: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },
    score: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#007AFF',
    },
});