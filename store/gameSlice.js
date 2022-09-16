import {createSlice} from '@reduxjs/toolkit'


const gameSlice = createSlice({
    name: 'state',
    initialState: 'IDLE',
    reducers: {
        loading: () => 'LOADING',
        loadingFulfilled: () => 'LOADING_FULFILLED',
        gameInit: () => 'GAME_INIT',
        gameInitFulfilled: () => 'GAME_INIT_FULFILLED',
        preloadResources: () => 'PRELOAD_RESOURCES',
        preloadResourcesFulfilled: () => 'PRELOAD_RESOURCES_FULFILLED',
        levelInit: () => 'LEVEL_INIT',
        levelInitFulfilled: () => 'LEVEL_INIT_FULFILLED',
        start: () => 'START',
        pause: () => 'PAUSE'
    },
});

export default gameSlice.reducer
export const {
    loading,
    loadingFulfilled,
    start,
    gameInit,
    gameInitFulfilled,
    preloadResources,
    preloadResourcesFulfilled,
    levelInit,
    levelInitFulfilled,
    pause
} = gameSlice.actions;


// TODO СОЗДАТЬ СЛАЙС ПОД ИГРУ
// TODO СВОЙСТВО STATE
// TODO КОМПОЕНТ ЗАМОУНТИЛСЯ -> СОСТОЯНИЕ ЗАГРУЗКИ, ВЫЗЫВАЮ РЕДЮСЕР, МЕНЯЮ НА ЛОАДИНГ
// TODO ИГРА ДОЛЖНА ВЕРНУТЬ ПРОМИС ВЫОЛНЕНИЯ СОСТОЯНИЯ