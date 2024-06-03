const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

// ** this is the same calls used for the super admin users that he add by him self

export const createCoupon = createAsyncThunk(
  'create-coupon',
  async (data: any, {rejectWithValue}: any) => {
    try {
      const newdata = {
        ...data,
      }
      const res = await axiosInstance.post(`/coupon/create-coupon`, newdata)
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getCoupons = createAsyncThunk(
  'get-coupon',
  async (data: any, {rejectWithValue}: any) => {
    try {
      const res = await axiosInstance.get(
        `/coupon/get-all-coupons?isDeleted=${data?.isDeleted}&offset=${data?.offset}&limit=${10}`
      )
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
