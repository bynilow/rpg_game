import { combineReducers, configureStore } from "@reduxjs/toolkit";
import areaReducer from './reducers/AreaSlice'
import userReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
    areaReducer,
    userReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']