import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${props => props.theme.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.border};
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.text};
`;

export const ThemeToggle = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 8px;
  background-color: ${props => props.theme.accent};
`;