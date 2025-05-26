import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const GameCardContainer = styled.TouchableOpacity`
    background-color: ${props => props.theme.surface};
    border-radius: 12px;
    padding: 16px;
    margin: 8px;
    elevation: 3;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
`;

const GameImage = styled.View`
    width: 100%;
    height: 180px;
    border-radius: 8px;
    margin-bottom: 12px;
    background-color: ${props => props.theme.background};
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const GameImageStyled = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 8px;
`;

const PlaceholderContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.background};
`;

const GameTitle = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.text};
    margin-bottom: 4px;
`;

const GameGenre = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 8px;
`;

const GamePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

// Варіант 1: З URL картинки
const GameCard = ({ game, onPress }) => {
    return (
        <GameCardContainer onPress={onPress}>
            <GameImage>
                {game.imageUrl ? (
                    <GameImageStyled
                        source={{ uri: game.imageUrl }}
                        resizeMode="cover"
                        onError={() => console.log('Image failed to load')}
                    />
                ) : (
                    <PlaceholderContainer>
                        <Ionicons name="game-controller" size={40} color="#66c0f4" />
                    </PlaceholderContainer>
                )}
            </GameImage>
            <GameTitle>{game.title}</GameTitle>
            <GameGenre>{game.genre}</GameGenre>
            <GamePrice>{game.price}</GamePrice>
        </GameCardContainer>
    );
};
export default GameCard;