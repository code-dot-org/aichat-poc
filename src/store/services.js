// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const aichatApi = createApi({
  reducerPath: "bots",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getBots: builder.query({
      query: () => `bots`,
    }),
    getChats: builder.query({
      query: (classroom) => `chat/${classroom}`,
    }),
    getClassrooms: builder.query({
      query: () => `classroom`,
    }),
    getRestrictions: builder.query({
      query: (classroom) => `restrictions/${classroom}`,
    }),
    updateRestrictions: builder.mutation({
      query: (username, classroom, restrictions) => ({
        url: "/restrictions",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, classroom, restrictions }),
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBotsQuery,
  useGetChatsQuery,
  useGetClassroomsQuery,
  useGetRestrictionsQuery,
  useUpdateRestrictionsMutation,
} = aichatApi;
