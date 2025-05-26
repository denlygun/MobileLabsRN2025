import React, { useState, useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { SafeArea } from '../components/StyledComponents';
import GameCard from '../components/GameCard';

const LoadingContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.textSecondary};
  text-align: center;
`;

const gamesData = [
    { id: '1', title: 'Cyberpunk 2077', genre: 'Action RPG', price: '$29.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/ru/b/bb/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%B8%D0%B3%D1%80%D1%8B_Cyberpunk_2077.jpg' },
    { id: '3', title: 'Counter-Strike 2', genre: 'FPS', price: 'Free', imageUrl: 'https://cloudgaminghub.net.ua/wp-content/uploads/2024/04/counter-strike-2-update.webp' },
    { id: '4', title: 'Dota 2', genre: 'MOBA', price: 'Free', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota2_social.jpg' },
    { id: '2', title: 'The Witcher 3', genre: 'RPG', price: '$19.99', imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png' },
    { id: '5', title: 'Half-Life: Alyx', genre: 'VR Adventure', price: '$59.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/ru/b/bb/Half-Life_Alyx_Coverart.jpg' },
    { id: '6', title: 'Portal 2', genre: 'Puzzle', price: '$9.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/uk/d/d2/Portal_2_boxart.png' },
];

const StoreScreen = () => {
    const [games, setGames] = useState(gamesData);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadMoreGames = useCallback(() => {
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            const newGames = gamesData.map((game, index) => ({
                ...game,
                id: `${game.id}_${Date.now()}_${index}`,
                title: `${game.title} ${Math.floor(Math.random() * 100)}`
            }));
            setGames(prev => [...prev, ...newGames]);
            setLoading(false);
        }, 1500);
    }, [loading]);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setGames(gamesData);
            setRefreshing(false);
        }, 1000);
    }, []);

    const handleGamePress = useCallback((game) => {
        console.log('Game pressed:', game.title);
    }, []);

    const renderGame = useCallback(({ item }) => (
        <GameCard
            game={item}
            onPress={() => handleGamePress(item)}
        />
    ), [handleGamePress]);

    const renderFooter = useCallback(() => {
        if (!loading) return null;
        return (
            <LoadingContainer>
                <ActivityIndicator size="large" color="#66c0f4" />
            </LoadingContainer>
        );
    }, [loading]);

    const renderEmpty = useCallback(() => (
        <EmptyContainer>
            <EmptyText>No games available</EmptyText>
        </EmptyContainer>
    ), []);

    return (
        <SafeArea>
            <FlatList
                data={games}
                renderItem={renderGame}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16 }}
                onEndReached={loadMoreGames}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                windowSize={10}
            />
        </SafeArea>
    );
};

export default StoreScreen;