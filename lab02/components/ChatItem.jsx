import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const ChatItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 16px;
  background-color: ${props => props.theme.surface};
  border-radius: 12px;
  margin-bottom: 8px;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.theme.border};
`;

const Avatar = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => props.theme.accent};
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

const ChatInfo = styled.View`
  flex: 1;
`;

const ChatName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 4px;
`;

const ChatMessage = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
`;

const ChatTime = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
`;

const ChatItem = ({ chat, onPress }) => {
    return (
        <ChatItemContainer onPress={onPress}>
            <Avatar>
                <Ionicons name="person" size={24} color="white" />
            </Avatar>
            <ChatInfo>
                <ChatName>{chat.name}</ChatName>
                <ChatMessage numberOfLines={1}>{chat.message}</ChatMessage>
            </ChatInfo>
            <ChatTime>{chat.time}</ChatTime>
        </ChatItemContainer>
    );
};

export default ChatItem;