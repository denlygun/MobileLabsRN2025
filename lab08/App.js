import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CartStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="CartMain" component={CartScreen} options={{ title: 'Кошик' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Оформлення замовлення' }} />
      </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Products') {
                iconName = 'store';
              } else if (route.name === 'Cart') {
                iconName = 'shopping-cart';
              } else if (route.name === 'Orders') {
                iconName = 'history';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: 'gray',
          })}
      >
        <Tab.Screen name="Products" component={ProductsScreen} options={{ title: 'Каталог' }} />
        <Tab.Screen name="Cart" component={CartStack} options={{ title: 'Кошик', headerShown: false }} />
        <Tab.Screen name="Orders" component={OrderHistoryScreen} options={{ title: 'Історія' }} />
      </Tab.Navigator>
  );
};

const App = () => {
  return (
      <Provider store={store}>
        <PersistGate loading={<View><Text>Завантаження...</Text></View>} persistor={persistor}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
  );
};

export default App;