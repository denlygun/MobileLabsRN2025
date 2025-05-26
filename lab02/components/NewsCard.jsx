import React from 'react';
import styled from 'styled-components/native';

const NewsCardContainer = styled.View`
  background-color: ${props => props.theme.surface};
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 16px;
  border-width: 1px;
  border-color: ${props => props.theme.border};
  elevation: 1;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const NewsTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 8px;
`;

const NewsContent = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  line-height: 20px;
  margin-bottom: 8px;
`;

const NewsDate = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
`;

const NewsCard = ({ news }) => {
    return (
        <NewsCardContainer>
            <NewsTitle>{news.title}</NewsTitle>
            <NewsContent>{news.content}</NewsContent>
            <NewsDate>{news.date}</NewsDate>
        </NewsCardContainer>
    );
};

export default NewsCard;