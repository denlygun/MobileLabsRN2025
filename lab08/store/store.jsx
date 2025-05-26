import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import productsSlice from './slices/productsSlice';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import ordersSlice from './slices/ordersSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cart', 'orders'],
};

const rootReducer = combineReducers({
    products: productsSlice,
    cart: cartSlice,
    user: userSlice,
    orders: ordersSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);