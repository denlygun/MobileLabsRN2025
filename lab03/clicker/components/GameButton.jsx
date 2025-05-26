import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
    TapGestureHandler,
    LongPressGestureHandler,
    PanGestureHandler,
    FlingGestureHandler,
    PinchGestureHandler,
    State,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function GameButton({
                                       position,
                                       scale,
                                       onSingleTap,
                                       onDoubleTap,
                                       onLongPress,
                                       onPan,
                                       onFlingRight,
                                       onFlingLeft,
                                       onPinch,
                                   }) {
    const translateX = useSharedValue(position.x);
    const translateY = useSharedValue(position.y);
    const scaleValue = useSharedValue(scale);

    // Pan gesture handler
    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startX = translateX.value;
            context.startY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = context.startX + event.translationX;
            translateY.value = context.startY + event.translationY;
        },
        onEnd: () => {
            // Обмеження меж екрану
            translateX.value = withSpring(
                Math.max(50, Math.min(width - 50, translateX.value))
            );
            translateY.value = withSpring(
                Math.max(100, Math.min(height - 200, translateY.value))
            );
            runOnJS(onPan)(translateX.value, translateY.value);
        },
    });

    // Pinch gesture handler
    const pinchGestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startScale = scaleValue.value;
        },
        onActive: (event, context) => {
            scaleValue.value = context.startScale * event.scale;
        },
        onEnd: () => {
            scaleValue.value = withSpring(Math.max(0.5, Math.min(2, scaleValue.value)));
            runOnJS(onPinch)(scaleValue.value);
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scaleValue.value },
            ],
        };
    });

    const handleSingleTap = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            onSingleTap();
        }
    };

    const handleDoubleTap = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            onDoubleTap();
        }
    };

    const handleLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            onLongPress();
        }
    };

    const handleFlingRight = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            onFlingRight();
        }
    };

    const handleFlingLeft = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            onFlingLeft();
        }
    };

    return (
        <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
            <Animated.View>
                <PanGestureHandler onGestureEvent={panGestureHandler}>
                    <Animated.View>
                        <FlingGestureHandler
                            direction={4} // RIGHT
                            onHandlerStateChange={handleFlingRight}
                        >
                            <FlingGestureHandler
                                direction={8} // LEFT
                                onHandlerStateChange={handleFlingLeft}
                            >
                                <LongPressGestureHandler
                                    onHandlerStateChange={handleLongPress}
                                    minDurationMs={3000}
                                >
                                    <TapGestureHandler
                                        onHandlerStateChange={handleDoubleTap}
                                        numberOfTaps={2}
                                    >
                                        <TapGestureHandler
                                            onHandlerStateChange={handleSingleTap}
                                            waitFor={[]}
                                        >
                                            <Animated.View style={[styles.button, animatedStyle]}>
                                                <Text style={styles.buttonText}>🎯</Text>
                                                <Text style={styles.instructionText}>
                                                    Торкніться мене!
                                                </Text>
                                            </Animated.View>
                                        </TapGestureHandler>
                                    </TapGestureHandler>
                                </LongPressGestureHandler>
                            </FlingGestureHandler>
                        </FlingGestureHandler>
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </PinchGestureHandler>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100,
        backgroundColor: '#007AFF',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 30,
    },
    instructionText: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'center',
        marginTop: 2,
    },
});