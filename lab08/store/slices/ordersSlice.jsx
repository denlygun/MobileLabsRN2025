import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
    },
    reducers: {
        addOrder: (state, action) => {
            const newOrder = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                items: action.payload.items,
                totalAmount: action.payload.totalAmount,
                customerName: action.payload.customerName,
                customerEmail: action.payload.customerEmail,
                itemsCount: action.payload.items.reduce((total, item) => total + item.quantity, 0),
            };
            state.orders.unshift(newOrder);
        },
        clearOrders: (state) => {
            state.orders = [];
        },
    },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;