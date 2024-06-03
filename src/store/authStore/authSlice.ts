import {createSlice} from '@reduxjs/toolkit'
import {confirmOtp, getAuthUser, logOut, sendOpt, updateAuthUser, verifyToken} from './authAction'
import UserState from 'store/userStore/userProfileInitails'

const initialState: UserState = {
  loading: false,
  user: {
    userId: '',
    _id: '',
    email: '',
    picture: null,
    firstName: null,
    lastName: null,
    role: null,
    status: null,
    joiningDate: null,
    subscriptionId: {
      paymentStatus: null,
      selectedPlan: null,
      subscriptionId: null,
      id: null,
    },
    city: '',
    country: '',
    industry: null,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut.pending, (state) => {
        state.loading = true
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(logOut.rejected, (state) => {
        state.loading = false
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(verifyToken.rejected, (state) => {
        state.loading = false
      })
      .addCase(getAuthUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(getAuthUser.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateAuthUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateAuthUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(updateAuthUser.rejected, (state) => {
        state.loading = false
      })

      .addCase(confirmOtp.pending, (state) => {
        state.loading = true
      })
      .addCase(confirmOtp.rejected, (state) => {
        state.loading = false
      })
      .addCase(confirmOtp.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(sendOpt.pending, (state) => {
        state.loading = true
      })
      .addCase(sendOpt.rejected, (state) => {
        state.loading = false
      })
      .addCase(sendOpt.fulfilled, (state, action) => {
        state.loading = false
      })
  },
})

export const {setAuthUser} = authSlice.actions
export default authSlice.reducer
