import React, { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext();

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};

export const GameProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [objectPosition, setObjectPosition] = useState({ x: 150, y: 300 });
    const [objectScale, setObjectScale] = useState(1);
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Зробити 10 кліків', target: 10, current: 0, completed: false, type: 'clicks' },
        { id: 2, title: 'Зробити подвійний клік 5 разів', target: 5, current: 0, completed: false, type: 'doubleClicks' },
        { id: 3, title: 'Утримувати об\'єкт 3 секунди', target: 1, current: 0, completed: false, type: 'longPress' },
        { id: 4, title: 'Перетягнути об\'єкт', target: 1, current: 0, completed: false, type: 'drag' },
        { id: 5, title: 'Зробити свайп вправо', target: 1, current: 0, completed: false, type: 'swipeRight' },
        { id: 6, title: 'Зробити свайп вліво', target: 1, current: 0, completed: false, type: 'swipeLeft' },
        { id: 7, title: 'Змінити розмір об\'єкта', target: 1, current: 0, completed: false, type: 'pinch' },
        { id: 8, title: 'Отримати 100 очок', target: 100, current: 0, completed: false, type: 'score' },
    ]);

    const updateTask = useCallback((type, increment = 1) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.type === type && !task.completed) {
                    const newCurrent = task.current + increment;
                    const completed = newCurrent >= task.target;
                    return { ...task, current: newCurrent, completed };
                }
                return task;
            })
        );
    }, []);

    const addScore = useCallback((points) => {
        setScore(prevScore => {
            const newScore = prevScore + points;
            // Оновлюємо завдання за очками
            setTasks(prevTasks =>
                prevTasks.map(task => {
                    if (task.type === 'score') {
                        const completed = newScore >= task.target;
                        return { ...task, current: newScore, completed };
                    }
                    return task;
                })
            );
            return newScore;
        });
    }, []);

    const handleSingleTap = useCallback(() => {
        console.log('Single tap!'); // Для дебагу
        addScore(1);
        updateTask('clicks');
    }, [addScore, updateTask]);

    const handleDoubleTap = useCallback(() => {
        console.log('Double tap!'); // Для дебагу
        addScore(2);
        updateTask('doubleClicks');
    }, [addScore, updateTask]);

    const handleLongPress = useCallback(() => {
        console.log('Long press!'); // Для дебагу
        addScore(5);
        updateTask('longPress');
    }, [addScore, updateTask]);

    const handlePan = useCallback((x, y) => {
        console.log('Pan!', x, y); // Для дебагу
        setObjectPosition({ x, y });
        updateTask('drag');
    }, [updateTask]);

    const handleFlingRight = useCallback(() => {
        console.log('Fling right!'); // Для дебагу
        const randomPoints = Math.floor(Math.random() * 10) + 1;
        addScore(randomPoints);
        updateTask('swipeRight');
    }, [addScore, updateTask]);

    const handleFlingLeft = useCallback(() => {
        console.log('Fling left!'); // Для дебагу
        const randomPoints = Math.floor(Math.random() * 10) + 1;
        addScore(randomPoints);
        updateTask('swipeLeft');
    }, [addScore, updateTask]);

    const handlePinch = useCallback((scale) => {
        console.log('Pinch!', scale); // Для дебагу
        setObjectScale(scale);
        addScore(Math.floor(scale));
        updateTask('pinch');
    }, [addScore, updateTask]);

    const value = {
        score,
        objectPosition,
        objectScale,
        tasks,
        handleSingleTap,
        handleDoubleTap,
        handleLongPress,
        handlePan,
        handleFlingRight,
        handleFlingLeft,
        handlePinch,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};