import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/loginSlice";
import userReducer from "../redux/userSlice"

export const store = configureStore({
  reducer: {
    loginReducer,
    userReducer
  },
  devTools: true,
});

export default store;
