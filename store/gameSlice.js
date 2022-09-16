import {createSlice} from '@reduxjs/toolkit'


const gameSlice = createSlice({
    name: 'state',
    initialState: 'IDLE',
    reducers: {
        loading: () => 'LOADING',
        start: () => 'START'
    },
});

export default gameSlice.reducer
export const {loading, start} = gameSlice.actions;


// TODO СОЗДАТЬ СЛАЙС ПОД ИГРУ
// TODO СВОЙСТВО STATE
// TODO КОМПОЕНТ ЗАМОУНТИЛСЯ -> СОСТОЯНИЕ ЗАГРУЗКИ, ВЫЗЫВАЮ РЕДЮСЕР, МЕНЯЮ НА ЛОАДИНГ
// TODO ИГРА ДОЛЖНА ВЕРНУТЬ ПРОМИС ВЫОЛНЕНИЯ СОСТОЯНИЯ

// fulfilled