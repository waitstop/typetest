import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";

export type quoteType = { char: string, state: charState }[]

export enum charState {
    "notTyped",
    "typedCorrect",
    "typedIncorrect",
}

export const fetchRandomQuote = createAsyncThunk('quote/fetchRandomQuote', async () => {
    const {data}: AxiosResponse<{quote: string}> = await axios.get("https://dummyjson.com/quotes/random")
    return data.quote.split("").map(char => ({char: char === "’" ? "'" : char, state: charState.notTyped}))
})

export const quoteSlice = createSlice({
    name: 'quote',
    initialState: {
        value: [] as quoteType,
        cursor: 0,
        status: null as (null | "loading" | "succeeded" | "failed"),
    },
    reducers: {
        setQuote: (state, action: PayloadAction<quoteType>) => {
            state.value = action.payload
        },
        setCursor: (state, action: PayloadAction<number>) => {
            state.cursor = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchRandomQuote.fulfilled, (state, action) => {
            state.value = action.payload
            state.status = "succeeded"
        })
        builder.addCase(fetchRandomQuote.pending, state=>{
            state.status = "loading"
        })
        builder.addCase(fetchRandomQuote.rejected, state=>{
            state.status = "failed"
        })
    }
})

export const {setQuote, setCursor} = quoteSlice.actions
export default quoteSlice.reducer