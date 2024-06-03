import {createSlice, current} from '@reduxjs/toolkit'
import {getAllUsers, updateUser, uploadFileGCP} from './userActions'
// import {AnyNaptrRecord} from 'dns'

interface User {
  // Define the properties of a user
  _id: string
  firstName: string
  lastName: string
  subscription: {
    subscriptionId: string
    _id: string
    planName: string
  }
  email: string
  subscriptionBlockedByAdmin: boolean
  isBlocked: boolean
  // ... other properties
}

interface Pagination {
  totalRecords: number
  currentPage?: number
}

interface MyState {
  loading: boolean
  uploadFileLoading: boolean
  users: {
    list: User[] // Specify that 'list' is an array of User objects
    pagination: Pagination
  }
}

const initialState: MyState = {
  loading: false,
  uploadFileLoading: false,
  users: {
    list: [],
    pagination: {
      totalRecords: 0,
      currentPage: 0,
    }, // You can set it to 0 initially
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileGCP.pending, (state) => {
        state.uploadFileLoading = true
      })
      .addCase(uploadFileGCP.rejected, (state) => {
        state.uploadFileLoading = false
      })
      .addCase(uploadFileGCP.fulfilled, (state, action) => {
        state.uploadFileLoading = false
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users.list = action.payload.users
        state.users.pagination = {
          totalRecords: action.payload.totalRecords,
          currentPage: action.payload.currentPage,
        }
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const user = action.payload.user
        const d = current(state.users.list)
        state.users.list = d.map((t: User) => (t._id === user.id ? {...t, ...user} : t))
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default userSlice.reducer
