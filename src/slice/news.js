import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "news",
    initialState: {
        news: [],
    },
    reducers: {
        setNews: (
            state,
            { payload: { news } }
        ) => {
            state.news = [...state.news, ...news];
        }
    },
    extraReducers: (builder) => { }
});

export const { setNews } = slice.actions;

export default slice.reducer;
