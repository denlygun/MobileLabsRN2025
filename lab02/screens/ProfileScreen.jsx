import React, { useState, useCallback } from 'react';
import { ScrollView, Alert, Share } from 'react-native';
import styled from 'styled-components/native';
import { SafeArea } from '../components/StyledComponents';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const ProfileHeader = styled.View`
  background-color: ${props => props.theme.surface};
  padding: 24px;
  align-items: center;
`;

const AvatarContainer = styled.View`
  position: relative;
  margin-bottom: 16px;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 4px;
  border-color: ${props => props.theme.primary};
`;

const OnlineIndicator = styled.View`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #4CAF50;
  border-width: 3px;
  border-color: ${props => props.theme.surface};
`;

const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 4px;
`;

const UserStatus = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 8px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 16px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatNumber = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

const StatLabel = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
  margin-top: 4px;
`;

const SectionContainer = styled.View`
  background-color: ${props => props.theme.surface};
  margin: 16px;
  border-radius: 12px;
  padding: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 12px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.border};
`;

const MenuItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MenuIcon = styled.Text`
  font-size: 18px;
  margin-right: 12px;
  color: ${props => props.theme.primary};
`;

const MenuText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.text};
`;

const ChevronIcon = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.textSecondary};
`;

const RecentGame = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.border};
`;

const GameIcon = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 12px;
`;

const GameInfo = styled.View`
  flex: 1;
`;

const GameTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const GameTime = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin-top: 2px;
`;

const ProfileScreen = () => {
    const [userData] = useState({
        name: 'Denys_lyhun',
        status: 'Грає в Counter-Strike 2',
        avatar: 'https://zefirka.club/uploads/posts/2022-09/1662835076_1-zefirka-club-p-avatarka-s-ulibkoi-1.jpg',
        level: 47,
        friends: 156,
        games: 89,
        achievements: 1247,
        online: true
    });

    const [recentGames] = useState([
        {
            id: '1',
            title: 'Counter-Strike 2',
            time: '2.4 год. сьогодні',
            icon: 'https://cloudgaminghub.net.ua/wp-content/uploads/2024/04/counter-strike-2-update.webp'
        },
        {
            id: '2',
            title: 'Cyberpunk 2077',
            time: '12.5 год. цього тижня',
            icon: 'https://upload.wikimedia.org/wikipedia/ru/b/bb/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%B8%D0%B3%D1%80%D1%8B_Cyberpunk_2077.jpg'
        },
        {
            id: '3',
            title: 'The Witcher 3',
            time: '156 год. загалом',
            icon: 'https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png'
        }
    ]);

    const handleMenuPress = useCallback((action) => {
        switch (action) {
            case 'edit_profile':
                Alert.alert('Редагувати профіль', 'Функція в розробці');
                break;
            case 'friends':
                Alert.alert('Друзі', 'Переходимо до списку друзів');
                break;
            case 'inventory':
                Alert.alert('Інвентар', 'Ваші предмети та колекційні картки');
                break;
            case 'achievements':
                Alert.alert('Досягнення', 'Переглянути всі досягнення');
                break;
            case 'wishlist':
                Alert.alert('Список бажань', 'Ваші бажані ігри');
                break;
            case 'privacy':
                Alert.alert('Приватність', 'Налаштування приватності');
                break;
            case 'share':
                Share.share({
                    message: `Подивіться на мій Steam профіль: ${userData.name}`,
                    title: 'Мій Steam профіль'
                });
                break;
            default:
                break;
        }
    }, [userData.name]);

    return (
        <SafeArea>
            <Container>
                <ProfileHeader>
                    <AvatarContainer>
                        <Avatar source={{ uri: userData.avatar }} />
                        {userData.online && <OnlineIndicator />}
                    </AvatarContainer>

                    <UserName>{userData.name}</UserName>
                    <UserStatus>{userData.status}</UserStatus>

                    <StatsContainer>
                        <StatItem>
                            <StatNumber>{userData.level}</StatNumber>
                            <StatLabel>Рівень</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatNumber>{userData.friends}</StatNumber>
                            <StatLabel>Друзі</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatNumber>{userData.games}</StatNumber>
                            <StatLabel>Ігри</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatNumber>{userData.achievements}</StatNumber>
                            <StatLabel>Досягнення</StatLabel>
                        </StatItem>
                    </StatsContainer>
                </ProfileHeader>

                <SectionContainer>
                    <SectionTitle>Останні ігри</SectionTitle>
                    {recentGames.map((game) => (
                        <RecentGame key={game.id}>
                            <GameIcon source={{ uri: game.icon }} />
                            <GameInfo>
                                <GameTitle>{game.title}</GameTitle>
                                <GameTime>{game.time}</GameTime>
                            </GameInfo>
                        </RecentGame>
                    ))}
                </SectionContainer>

                <SectionContainer>
                    <SectionTitle>Профіль</SectionTitle>

                    <MenuItem onPress={() => handleMenuPress('edit_profile')}>
                        <MenuItemLeft>
                            <MenuIcon>✏️</MenuIcon>
                            <MenuText>Редагувати профіль</MenuText>
                        </MenuItemLeft>
                        <ChevronIcon>›</ChevronIcon>
                    </MenuItem>

                    <MenuItem onPress={() => handleMenuPress('friends')}>
                        <MenuItemLeft>
                            <MenuIcon>👥</MenuIcon>
                            <MenuText>Друзі</MenuText>
                        </MenuItemLeft>
                        <ChevronIcon>›</ChevronIcon>
                    </MenuItem>

                    <MenuItem onPress={() => handleMenuPress('inventory')}>
                        <MenuItemLeft>
                            <MenuIcon>🎒</MenuIcon>
                            <MenuText>Інвентар</MenuText>
                        </MenuItemLeft>
                        <ChevronIcon>›</ChevronIcon>
                    </MenuItem>

                    <MenuItem onPress={() => handleMenuPress('achievements')}>
                        <MenuItemLeft>
                            <MenuIcon>🏆</MenuIcon>
                            <MenuText>Досягнення</MenuText>
                        </MenuItemLeft>
                        <ChevronIcon>›</ChevronIcon>
                    </MenuItem>
                </SectionContainer>

                <SectionContainer>
                    <SectionTitle>Налаштування</SectionTitle>

                    <MenuItem onPress={() => handleMenuPress('wishlist')}>
                        <MenuItemLeft>
                            <MenuIcon>❤️</MenuIcon>
                            <MenuText>Список бажань</MenuText>
                        </MenuItemLeft>
                        <ChevronIcon>›</ChevronIcon>
                    </MenuItem>

                    <MenuItem onPress={() => handleMenuPress('privacy')}>
                        <MenuItemLeft>
                            <MenuIcon>🔒</MenuIcon>
                            <MenuText>Приватність</MenuText>
                        </MenuItemLeft>
                        <ChevronIcon>›</ChevronIcon>
                    </MenuItem>

                    <MenuItem onPress={() => handleMenuPress('share')}>
                        <MenuItemLeft>
                            <MenuIcon>📤</MenuIcon>
                            <MenuText>Поділитися профілем</MenuText>
                        </MenuItemLeft>
                        <ChevronIcon>›</ChevronIcon>
                    </MenuItem>
                </SectionContainer>
            </Container>
        </SafeArea>
    );
};

export default ProfileScreen;