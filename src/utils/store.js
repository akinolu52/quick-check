import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { authApi, newsApi } from "../services";
import authSlice from '../slice/auth';
import newsSlice from '../slice/news';

export const createStore = options => configureStore({
    reducer: {
        [newsApi.reducerPath]: newsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,

        authSlice,
        newsSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(newsApi.middleware, authApi.middleware),
    ...options,
});

export const store = createStore();

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch();
