import {message} from 'antd'
interface searchUserType {
  planName: string
  offset: string
  status: string
}
const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

export const getAllSubscriptions = createAsyncThunk(
  'getAllSubscriptions',
  async ({planName = '', offset, status = ''}: searchUserType, {rejectWithValue}: any) => {
    try {
      let queryString = new URLSearchParams({
        status,
        planName,
        offset,
      })
      const response = await axiosInstance.get(`/plan/allsubscriptions?${queryString}`)
      return response
    } catch (err: any) {
      if (err?.data?.message) {
        message.error(err?.data.message)
      }
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getSubscriptionById = createAsyncThunk(
  'getSubscriptionById',
  async ({id}: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.get(`/plan/subscription/${id}`)

      return response
    } catch (err: any) {
      if (err?.data?.message) {
        message.error(err?.data.message)
      }
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
