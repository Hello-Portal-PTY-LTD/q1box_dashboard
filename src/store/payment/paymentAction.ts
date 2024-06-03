import {message} from 'antd'

const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

interface CreatePaymentArgs {
  annualPurchase: boolean
  selectedPlan: string | null
  fromHomePage: boolean
  couponCode: string
}

export const createPayment = createAsyncThunk(
  'create/payment',
  async ({isAnnual, selectedPlan, fromHomePage, couponCode}: any, {rejectWithValue}: any) => {
    try {
      const data: CreatePaymentArgs = {
        annualPurchase: isAnnual,
        selectedPlan: selectedPlan.toUpperCase(),
        fromHomePage: fromHomePage,
        couponCode: couponCode,
      }
      const response = await axiosInstance.post('/plan/create-plan', data)
      window.location.href = response.data
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const updatePayment = createAsyncThunk(
  'update/payment',
  async ({isAnnual, selectedPlan, fromHomePage, couponCode}: any, {rejectWithValue}: any) => {
    try {
      const data: CreatePaymentArgs = {
        annualPurchase: isAnnual,
        selectedPlan: selectedPlan.toUpperCase(),
        fromHomePage: fromHomePage,
        couponCode: couponCode,
      }
      const response = await axiosInstance.post('/plan/update-plan', data)
      window.location.href = response.data
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getTransactions = createAsyncThunk(
  'get/transactions',
  async (_id: string, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      const id = _id ? _id : userId
      const response = await axiosInstance.get(`/plan/transactions/${id}`)
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const cancelSubscription = createAsyncThunk(
  'cancel/subscription',
  async (id: string, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.post('/plan/cancel-plan', {
        subscriptionId: id,
      })
      return response
    } catch (err: any) {
      if (err?.data?.message) {
        message.error(err?.data.message)
      }
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getSubscriptionInfo = createAsyncThunk(
  'info/subscription',
  async (_: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.get('/plan/subscription-info')
      return response
    } catch (err: any) {
      if (err?.data?.message) {
        message.error(err?.data.message)
      }
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const pauseResumeSubscription = createAsyncThunk(
  'pause-resume',
  async ({id, userId, type}: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.post(`/plan/pause-resume`, {
        userId: userId,
        id: id,
        type: type,
      })
      return response
    } catch (err: any) {
      if (err?.data?.message) {
        message.error(err?.data.message)
      }
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const createCustomStripeProduct = createAsyncThunk(
  'custom-stripe-product',
  async (values: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.post('/plan/create-product/', {...values})
      return response
    } catch (err: any) {
      if (err?.data?.message) {
        message.error(err?.data.message)
      }
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const customSubscriptionPurchase = createAsyncThunk(
  'custom/payment',
  async (values: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.post(`/plan/custom-subscription/`, {...values})
      return response
    } catch (err) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
