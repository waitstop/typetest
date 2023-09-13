import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import quoteReducers from "@/store/reducers/quoteSlice";

const store = configureStore({
    reducer: {
        quote: quoteReducers
    },
    middleware: [thunkMiddleware],
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store