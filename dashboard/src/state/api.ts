import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    GetKpisResponse,
    GetProductsResponse,
    GetTransactionsResponse,
} from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products", "Transactions"],
    endpoints: (build) => ({
        getKpis: build.query<GetKpisResponse[], void>({
            query: () => "kpi/",
            providesTags: ["Kpis"],
        }),
        getProducts: build.query<GetProductsResponse[], void>({
            query: () => "product/",
            providesTags: ["Products"],
        }),
        getTransactions: build.query<GetTransactionsResponse[], void>({
            query: () => "transaction/",
            providesTags: ["Transactions"],
        }),
    }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
    api;
