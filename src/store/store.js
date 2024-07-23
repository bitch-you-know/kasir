import { combineReducers } from "@reduxjs/toolkit";
import { menuReducer } from "./menuReducer";


export const reducers = combineReducers({
    category : menuReducer
})