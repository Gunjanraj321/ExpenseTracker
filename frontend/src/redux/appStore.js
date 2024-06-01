import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import drawerReducer from "./drawerSlice";

const appStore = configureStore({
  reducer:{
    auth:authReducer,
    modal:modalReducer,
    drawer:drawerReducer,
  }
});

export default appStore;
