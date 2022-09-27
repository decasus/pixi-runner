import {createSlice} from '@reduxjs/toolkit'

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        state: 'idle',
        distance: 0,
        lifeCount: 3
    },
    reducers: {
        setState: (state, action) => {
            state.state = action.payload;
        },
        incrementDistance: (state, action) => {
            state.distance = action.payload;
        },
        decrementLifeCount: (state,action) => {
            state.lifeCount = action.payload;
        }
    },
});

export default gameSlice.reducer
export const { setState, incrementDistance, decrementLifeCount } = gameSlice.actions;
