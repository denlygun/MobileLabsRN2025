import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { SafeArea } from '../components/StyledComponents';
import ChatItem from '../components/ChatItem';

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

const SearchContainer = styled.View`
    padding: 16px;
    background-color: ${props => props.theme.surface};
`;

const SearchInput = styled.TextInput`
    background-color: ${props => props.theme.background};
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 16px;
    color: ${props => props.theme.text};
    border-width: 1px;
    border-color: ${props => props.theme.border};
`;

const chatsData = [
    {
        id: '1',
        name: 'Gaming Squad',
        message: 'Ready for tonight\'s raid? We need one more player for our team.',
        time: '5 min',
        online: true
    },
    {
        id: '2',
        name: 'Alex',
        message: 'Thanks for the game recommendation! Just finished downloading it.',
        time: '1 hour',
        online: true
    },
    {
        id: '3',
        name: 'Steam Friends',
        message: 'New sale items added to your wishlist are now on discount!',
        time: '2 hours',
        online: false
    },
    {
        id: '4',
        name: 'John',
        message: 'Want to play CS2? I\'m online right now.',
        time: '1 day',
        online: false
    },
    {
        id: '5',
        name: 'Sarah',
        message: 'Did you see the new update for Cyberpunk? Looks amazing!',
        time: '2 days',
        online: true
    },
    {
        id: '6',
        name: 'Mike',
        message: 'Steam Deck arrived today! Setting it up now.',
        time: '3 days',
        online: false
    },
];

const ChatScreen = () => {
    const [chats, setChats] = useState(chatsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setChats(chatsData);
            setRefreshing(false);
        }, 1000);
    }, []);

    const handleChatPress = useCallback((chat) => {
        console.log('Chat pressed:', chat.name);
        // Тут можна додати навігацію до екрану чату
    }, []);

    const renderChat = useCallback(({ item }) => (
        <ChatItem
            chat={item}
            onPress={() => handleChatPress(item)}
        />
    ), [handleChatPress]);

    const renderEmpty = useCallback(() => (
        <EmptyContainer>
            <EmptyText>
                {searchQuery
                    ? 'Нічого не знайдено.\nСпробуйте інший запит для пошуку.'
                    : 'У вас поки немає чатів.\nПочніть спілкування з друзями!'
                }
            </EmptyText>
        </EmptyContainer>
    ), [searchQuery]);

    const keyExtractor = useCallback((item) => item.id, []);

    return (
        <SafeArea>
            <SearchContainer>
                <SearchInput
                    placeholder="Пошук чатів..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={props => props.theme.textSecondary}
                />
            </SearchContainer>

            <FlatList
                data={filteredChats}
                keyExtractor={keyExtractor}
                renderItem={renderChat}
                ListEmptyComponent={renderEmpty}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => ({
                    length: 80, // Приблизна висота ChatItem
                    offset: 80 * index,
                    index,
                })}
            />
        </SafeArea>
    );
};

export default ChatScreen;