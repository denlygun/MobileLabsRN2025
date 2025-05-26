import React, { useState, useCallback } from 'react';
import { ScrollView, Alert, Linking } from 'react-native';
import styled from 'styled-components/native';
import { SafeArea } from '../components/StyledComponents';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const HeaderContainer = styled.View`
  background-color: ${props => props.theme.surface};
  padding: 24px;
  align-items: center;
`;

const SafetyIcon = styled.Text`
  font-size: 64px;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.text};
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.textSecondary};
  text-align: center;
  line-height: 22px;
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

const SafetyCard = styled.TouchableOpacity`
  background-color: ${props => props.theme.background};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border-left-width: 4px;
  border-left-color: ${props =>
    props.alertLevel === 'high' ? '#F44336' :
        props.alertLevel === 'medium' ? '#FF9800' : '#4CAF50'
};
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const CardIcon = styled.Text`
  font-size: 20px;
  margin-right: 12px;
`;

const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.text};
  flex: 1;
`;

const CardDescription = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  line-height: 20px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.primary};
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const TipContainer = styled.View`
  background-color: ${props => props.theme.surface};
  margin: 16px;
  padding: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${props => props.theme.primary}30;
`;

const TipIcon = styled.Text`
  font-size: 18px;
  margin-bottom: 8px;
`;

const TipText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.text};
  line-height: 20px;
`;

const SafetyScreen = () => {
    const [safetyData] = useState([
        {
            id: '1',
            icon: '🔒',
            title: 'Двофакторна автентифікація',
            description: 'Захистіть свій акаунт додатковим рівнем безпеки. Увімкнено.',
            alertLevel: 'low',
            action: 'manage_2fa'
        },
        {
            id: '2',
            icon: '⚠️',
            title: 'Підозрілі спроби входу',
            description: '2 невдалі спроби входу за останні 24 години з невідомих пристроїв.',
            alertLevel: 'medium',
            action: 'view_login_attempts'
        },
        {
            id: '3',
            icon: '💰',
            title: 'Steam Guard',
            description: 'Захист торгових операцій активний. Всі торгові операції затримуються на 15 днів.',
            alertLevel: 'low',
            action: 'manage_steam_guard'
        },
        {
            id: '4',
            icon: '📧',
            title: 'Email підтвердження',
            description: 'Ваша електронна пошта підтверджена та захищена.',
            alertLevel: 'low',
            action: 'manage_email'
        },
        {
            id: '5',
            icon: '🚨',
            title: 'Підозрілі транзакції',
            description: 'Не виявлено підозрілих фінансових операцій.',
            alertLevel: 'low',
            action: 'view_transactions'
        }
    ]);

    const handleSafetyAction = useCallback((action) => {
        switch (action) {
            case 'manage_2fa':
                Alert.alert(
                    'Двофакторна автентифікація',
                    'Ваша 2FA активна. Хочете змінити налаштування?',
                    [
                        { text: 'Скасувати', style: 'cancel' },
                        { text: 'Налаштування', onPress: () => console.log('2FA settings') }
                    ]
                );
                break;
            case 'view_login_attempts':
                Alert.alert(
                    'Спроби входу',
                    'Останні спроби входу:\n• IP: 192.168.1.100 (невдало)\n• IP: 203.0.113.0 (невдало)',
                    [
                        { text: 'ОК' },
                        { text: 'Заблокувати IP', onPress: () => console.log('Block IP') }
                    ]
                );
                break;
            case 'manage_steam_guard':
                Alert.alert('Steam Guard', 'Налаштування Steam Guard для торгових операцій');
                break;
            case 'manage_email':
                Alert.alert('Email', 'Налаштування електронної пошти');
                break;
            case 'view_transactions':
                Alert.alert('Транзакції', 'Переглянути історію фінансових операцій');
                break;
            default:
                break;
        }
    }, []);

    const handleReportScam = useCallback(() => {
        Alert.alert(
            'Повідомити про шахрайство',
            'Виберіть тип проблеми:',
            [
                { text: 'Скасувати', style: 'cancel' },
                { text: 'Фішингові повідомлення', onPress: () => console.log('Report phishing') },
                { text: 'Шахрайство в торгівлі', onPress: () => console.log('Report trade scam') },
                { text: 'Інше', onPress: () => console.log('Report other') }
            ]
        );
    }, []);

    const openSafetyGuide = useCallback(() => {
        Alert.alert(
            'Посібник з безпеки',
            'Відкрити офіційний посібник Steam з безпеки?',
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Відкрити',
                    onPress: () => Linking.openURL('https://help.steampowered.com/uk/faqs/view/6F69-0F18-C493-7061')
                }
            ]
        );
    }, []);

    return (
        <SafeArea>
            <Container>
                <HeaderContainer>
                    <SafetyIcon>🛡️</SafetyIcon>
                    <Title>Безпека акаунту</Title>
                    <Subtitle>
                        Захистіть свій Steam акаунт від шахраїв та несанкціонованого доступу
                    </Subtitle>
                </HeaderContainer>

                <SectionContainer>
                    <SectionTitle>Статус безпеки</SectionTitle>
                    {safetyData.map((item) => (
                        <SafetyCard
                            key={item.id}
                            alertLevel={item.alertLevel}
                            onPress={() => handleSafetyAction(item.action)}
                        >
                            <CardHeader>
                                <CardIcon>{item.icon}</CardIcon>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardDescription>{item.description}</CardDescription>
                        </SafetyCard>
                    ))}
                </SectionContainer>

                <TipContainer>
                    <TipIcon>💡</TipIcon>
                    <TipText>
                        <TipText style={{ fontWeight: 'bold' }}>Поради з безпеки:</TipText>
                        {'\n'}• Ніколи не розголошуйте свій пароль або Steam Guard коди
                        {'\n'}• Будьте обережні з підозрілими посиланнями
                        {'\n'}• Перевіряйте URL сайтів перед введенням даних
                        {'\n'}• Використовуйте унікальні паролі для різних сервісів
                    </TipText>
                </TipContainer>

                <ActionButton onPress={handleReportScam}>
                    <ButtonText>Повідомити про шахрайство</ButtonText>
                </ActionButton>

                <ActionButton onPress={openSafetyGuide}>
                    <ButtonText>Посібник з безпеки Steam</ButtonText>
                </ActionButton>
            </Container>
        </SafeArea>
    );
};

export default SafetyScreen;