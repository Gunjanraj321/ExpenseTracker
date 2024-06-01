import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:"modal",
    initialState:{
        showForm:false,
    },
    reducers:{
        setShowForm:(state, action) =>{
            state.showForm = action.payload;
        }
    },

});

export const { setShowForm } = modalSlice.actions;
export default modalSlice.reducer;