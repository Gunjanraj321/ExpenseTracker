import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuth: false,
        isPremium: false
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
        },
        isAuth(state, action) {
            state.isAuth = action.payload;
        },
        updateUserPremiumStatus(state, action) {
            state.isPremium = action.payload;
        }
    }
});

export const { login, isAuth, updateUserPremiumStatus } = authSlice.actions;

export default authSlice.reducer;
