import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_QR_API,
    prepareHeaders: (headers) => {
      let userInfo = localStorage.getItem('userInfo')
      const data = JSON.parse(userInfo)
      headers.set('Authorization', `Bearer ${data.token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getTimeBasedAnalytics: builder.query({
      query: ({timePeriod, userId}) =>
        `v1/analytics/time-based?timePeriod=${timePeriod}&userId=${userId}`,
    }),
    getCountByUser: builder.query({
      query: ({userId, timePeriod}) =>
        `v1/analytics/count?userId=${userId}&timePeriod=${timePeriod}`,
    }),
    getAnalytics: builder.query({
      query: ({userId, groupBy, timePeriod}) =>
        `v1/analytics/?userId=${userId}&groupBy=${groupBy}&timePeriod=${timePeriod}`,
    }),
    getLocationViseAnalytics: builder.query({
      query: ({userId}) => `v1/analytics/locations?userId=${userId}`,
    }),
  }),
})

export const {
  useGetTimeBasedAnalyticsQuery,
  useGetCountByUserQuery,
  useGetAnalyticsQuery,
  useGetLocationViseAnalyticsQuery,
} = api

export default api
