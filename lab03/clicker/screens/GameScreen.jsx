import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScoreDisplay from '../components/ScoreDisplay';
import GameButton from '../components/GameButton';
import { useGame } from '../context/GameContext';

export default function GameScreen() {
    const {
        score,
        objectPosition,
        objectScale,
        handleSingleTap,
        handleDoubleTap,
        handleLongPress,
        handlePan,
        handleFlingRight,
        handleFlingLeft,
        handlePinch,
    } = useGame();

    return (
        <SafeAreaView style={styles.container}>
            <ScoreDisplay score={score} />

            <View style={styles.gameArea}>
                <Text style={styles.instructions}>
                    • Одинарний клік: +1 очко{'\n'}
                    • Подвійний клік: +2 очки{'\n'}
                    • Довге натискання (3с): +5 очок{'\n'}
                    • Свайп: випадкові очки{'\n'}
                    • Перетягування та масштабування
                </Text>

                <GameButton
                    position={objectPosition}
                    scale={objectScale}
                    onSingleTap={handleSingleTap}
                    onDoubleTap={handleDoubleTap}
                    onLongPress={handleLongPress}
                    onPan={handlePan}
                    onFlingRight={handleFlingRight}
                    onFlingLeft={handleFlingLeft}
                    onPinch={handlePinch}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    gameArea: {
        flex: 1,
        position: 'relative',
    },
    instructions: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        lineHeight: 20,
    },
});