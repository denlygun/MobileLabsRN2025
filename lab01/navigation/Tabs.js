import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsScreen from '../screens/NewsScreen';
import GalleryScreen from '../screens/GalleryScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Головна" component={NewsScreen} />
      <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
      <Tab.Screen name="Профіль" component={RegisterScreen} />
    </Tab.Navigator>
  );
}
