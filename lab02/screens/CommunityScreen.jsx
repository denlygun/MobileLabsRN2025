import React, { useState, useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { SafeArea } from '../components/StyledComponents';
import NewsCard from '../components/NewsCard';

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

const newsData = [
    {
        id: '1',
        title: 'Steam Winter Sale Started!',
        content: 'Huge discounts on thousands of games. Don\'t miss out on incredible deals up to 90% off on your favorite titles.',
        date: '2 hours ago'
    },
    {
        id: '2',
        title: 'New Game Release: Portal 3',
        content: 'The long-awaited sequel to Portal 2 is finally here with new mechanics, puzzles, and mind-bending gameplay.',
        date: '1 day ago'
    },
    {
        id: '3',
        title: 'Steam Deck Update Available',
        content: 'New firmware update improves performance, battery life, and adds support for more games.',
        date: '3 days ago'
    },
    {
        id: '4',
        title: 'Community Choice Awards',
        content: 'Vote for your favorite games of the year in various categories. Voting ends next week.',
        date: '5 days ago'
    },
    {
        id: '5',
        title: 'Half-Life 3 Confirmed?',
        content: 'Valve drops mysterious hints about upcoming projects. Fans speculate about possible Half-Life continuation.',
        date: '1 week ago'
    },
];

const CommunityScreen = () => {
    const [news, setNews] = useState(newsData);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadMoreNews = useCallback(() => {
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            const newNews = newsData.map((item, index) => ({
                ...item,
                id: `${item.id}_${Date.now()}_${index}`,
                title: `${item.title} - Update ${Math.floor(Math.random() * 100)}`,
                date: `${Math.floor(Math.random() * 7) + 1} days ago`
            }));
            setNews(prev => [...prev, ...newNews]);
            setLoading(false);
        }, 1500);
    }, [loading]);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setNews(newsData);
            setRefreshing(false);
        }, 1000);
    }, []);

    const renderNews = useCallback(({ item }) => (
        <NewsCard news={item} />
    ), []);

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
            <EmptyText>No news available</EmptyText>
        </EmptyContainer>
    ), []);

    return (
        <SafeArea>
            <FlatList
                data={news}
                renderItem={renderNews}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16 }}
                onEndReached={loadMoreNews}
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

export default CommunityScreen;