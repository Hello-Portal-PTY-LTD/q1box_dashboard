import {createSlice} from '@reduxjs/toolkit'
import {getAllSubscriptions, getSubscriptionById} from './allSubscriptionsAction'

interface allSubscriptions {
  userId: string
  userName: string
  startDate: string
  endDate: string
  amount: number
  subscription: string
  status: boolean
}

interface Pagination {
  totalRecords: number
  currentPage?: number
}

interface MyState {
  loading: boolean
  allSubscriptions: {
    list: allSubscriptions[] // Specify that 'list' is an array of User objects
    pagination: Pagination // 'totalRecords' can be a number or a string
  }
  subscription_detail: {
    user: string
    email: string
    planName: string
    picture: string
    amount: number
    startDate: string
    endDate: string
    id: string
    status: string
    months: number
    invoices: [
      {
        invoice: string
        status: string
      }
    ]
  }
}

const initialState: MyState = {
  loading: false,
  allSubscriptions: {
    list: [],
    pagination: {
      totalRecords: 0,
      currentPage: 0,
    }, //
  },
  subscription_detail: {
    user: '',
    planName: '',
    amount: 0,
    months: 0,
    startDate: '',
    endDate: '',
    picture: '',
    id: '',
    status: '',
    email: '',
    invoices: [
      {
        invoice: '',
        status: '',
      },
    ],
  },
}

const allSubscriptionsSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubscriptions.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllSubscriptions.fulfilled, (state, action) => {
        state.loading = false
        state.allSubscriptions.list = action.payload.subscriptions
        state.allSubscriptions.pagination = {
          totalRecords: action.payload.totalRecords,
          currentPage: action.payload.currentPage,
        }
      })
      .addCase(getAllSubscriptions.rejected, (state) => {
        state.loading = false
      })
      .addCase(getSubscriptionById.pending, (state) => {
        state.loading = true
      })
      .addCase(getSubscriptionById.fulfilled, (state, action) => {
        state.loading = false
        state.subscription_detail = action.payload
      })
      .addCase(getSubscriptionById.rejected, (state) => {
        state.loading = false
      })
  },
})

export default allSubscriptionsSlice.reducer
