import {message} from 'antd'

const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

export const logOut = createAsyncThunk('logout', async (_: any, {rejectWithValue}: any) => {
  try {
    const response = await axiosInstance.post('/auth/logout')
    localStorage.removeItem('userInfo')
    return response
  } catch (err: any) {
    return rejectWithValue((err as {data: {message: string}})?.data?.message)
  }
})

export const verifyToken = createAsyncThunk(
  'verify-user-blacklist',
  async (token: any, {rejectWithValue}: any) => {
    try {
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      const response = await axiosInstance.post('/auth/verify-user-blacklist')
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const updateAuthUser = createAsyncThunk(
  'update-auth-user',
  async (data: any, {rejectWithValue}: any) => {
    try {
      const newData = {
        ...data,
      }
      const userId = newData?._id || newData?.id
      const response = await axiosInstance.patch(`/users/${userId}`, {...newData})
      return response
    } catch (err: any) {
      message.error(err?.data?.message)
      // return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getAuthUser = createAsyncThunk(
  'get-user-by-id',
  async (userId: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.get(`/users/get-user-by-id/${userId}`)
      const user = response.user
      localStorage.setItem('role', user.role)
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const confirmOtp = createAsyncThunk(
  'confirm-otp',
  async (data: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.post(`/users/confirmOtp`, {...data})
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const sendOpt = createAsyncThunk('send-opt', async (data: any, {rejectWithValue}: any) => {
  axiosInstance
    .post(`/users/sendOpt/`, data)
    .then((res: any) => console.log('Response => ', res))
    .catch((err: any) => {
      console.log('Error-> ', err)
      return rejectWithValue('Hello')
    })

  // try {
  //   const response = await axiosInstance.post(`/users/sendOpt/`, data)
  //   console.log('response otp', response)
  //   return response
  // } catch (err: any) {
  //   console.log('err otp', err)
  //   return rejectWithValue('hello')
  // }
})

// type RejectWithValue = {
//   error: string // This can be customized based on the actual error structure
// }

// type RejectWithValue = {
//   error: string; // This can be customized based on the actual error structure
// };

// // Define the async thunk action
// export const sendOpt = createAsyncThunk<SendOptData, any, { rejectValue: RejectWithValue }>(
//   'send-opt',
//   async (data, thunkAPI) => {
//     try {
//       // Simulate an API call or any asynchronous operation
//       const response = await axiosInstance.post(`/users/sendOpt/`, data);
//       return data;
//     } catch (error) {
//       // Handle errors by rejecting with an error object
//       return thunkAPI.rejectWithValue({ error: error?.message });
//     }
//   }
// );
// )
