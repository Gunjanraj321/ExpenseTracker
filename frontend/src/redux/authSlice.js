import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isToken:localStorage.getItem("token") || null,
        isAuth:localStorage.getItem("token") ? true : false,
        isPremium:localStorage.getItem("isPremium") === "true",
    },

    reducers: {
        setToken(state, action) {
            state.isToken = action.payload;
            localStorage.setItem("token",action.payload);
        },
        isAuth(state, action) {
            state.isAuth = action.payload;
        },
        updateUserPremiumStatus(state, action) {
            state.isPremium = action.payload;
            localStorage.setItem("isPremium",action.payload);
        },
        clearAuthState:(state)=>{
            state.isAuth = false;
            state.isPremium = false;
            localStorage.removeItem("isPremium");
            localStorage.removeItem("token");
        }
    }
});

export const { setToken, isAuth, updateUserPremiumStatus, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
