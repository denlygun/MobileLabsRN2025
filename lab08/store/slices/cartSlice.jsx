import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }

            cartSlice.caseReducers.calculateTotal(state);
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.id !== productId);
            cartSlice.caseReducers.calculateTotal(state);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item && quantity > 0) {
                item.quantity = quantity;
            }

            cartSlice.caseReducers.calculateTotal(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
        },
        calculateTotal: (state) => {
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price * item.quantity),
                0
            );
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
