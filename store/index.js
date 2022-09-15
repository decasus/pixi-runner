import { configureStore } from '@reduxjs/toolkit'
import {gameSlice} from "./gameSlice";

const store = configureStore({
    reducer: gameSlice.reducer
});

export default store;