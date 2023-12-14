import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./loginSlice"
import updateReducer from "./userSlice"

export default combineReducers({
    userReducer,
    updateReducer
});