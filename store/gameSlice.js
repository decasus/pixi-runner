import {createSlice} from '@reduxjs/toolkit'


export const gameSlice = createSlice({
    name: 'state',
    initialState: 'idle',
    reducers: {
        loading: () => 'loading',
        start: () => 'start'
    },
})



// TODO СОЗДАТЬ СЛАЙС ПОД ИГРУ

// TODO СВОЙСТВО STATE

// TODO КОМПОЕНТ ЗАМОУНТИЛСЯ -> СОСТОЯНИЕ ЗАГРУЗКИ, ВЫЗЫВАЮ РЕДЮСЕР, МЕНЯЮ НА ЛОАДИНГ

// TODO ИГРА ДОЛЖНА ВЕРНУТЬ ПРОМИС ВЫОЛНЕНИЯ СОСТОЯНИЯ

// fulfilled