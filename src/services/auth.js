import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from '../utils';

export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: build => ({
        login: build.mutation({
            query: (values) => ({
                url: API_ROUTES.LOGIN,
                method: 'POST',
                body: values,
            }),
        }),
        signUp: build.mutation({
            query: (values) => ({
                url: API_ROUTES.REGISTER,
                method: 'POST',
                body: values,
            }),
        }),
        logout: build.mutation({
            query: (values) => ({
                url: API_ROUTES.FORGOT_PASSWORD,
                method: 'POST',
                body: values,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignUpMutation,
    useLogoutMutation,
} = authApi;
