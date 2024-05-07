import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isAuth:false
    },
    reducers:{
        login(state,action){
            state.user = action.payload
        },
        isAuth(state,action){
            state.isAuth = action.payload
        }
    }
})

export const { login , isAuth} = authSlice.actions;

export default authSlice.reducer;