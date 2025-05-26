import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
    },
    reducers: {
        setUserData: (state, action) => {
            const { name, email } = action.payload;
            state.name = name;
            state.email = email;
        },
        clearUserData: (state) => {
            state.name = '';
            state.email = '';
        },
    },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;