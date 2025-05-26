import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const SettingsItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${props => props.theme.surface};
  border-radius: 12px;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.border};
`;

const SettingsText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.text};
  font-weight: 500;
`;

const SettingsDescription = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
  margin-top: 2px;
`;

const SettingsLeft = styled.View`
  flex: 1;
`;

const SettingsItem = ({ setting, onToggle }) => {
    return (
        <SettingsItemContainer onPress={() => onToggle && onToggle(setting.id)}>
            <SettingsLeft>
                <SettingsText>{setting.title}</SettingsText>
                {setting.description && (
                    <SettingsDescription>{setting.description}</SettingsDescription>
                )}
            </SettingsLeft>
            <Ionicons
                name={setting.enabled ? "toggle" : "toggle-outline"}
                size={32}
                color={setting.enabled ? "#66c0f4" : "#666666"}
            />
        </SettingsItemContainer>
    );
};

export default SettingsItem;