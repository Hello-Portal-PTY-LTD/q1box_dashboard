const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

interface searchUserType {
  search: string
  plan: string
  blocked: string
  offset: string
  users: string
}

export const uploadFileGCP = createAsyncThunk(
  'upload-file',
  async (file: any, {rejectWithValue}: any) => {
    const form = new FormData()
    for (let i = 0; i < file.length; i++) {
      form.append('files', file[i])
    }
    try {
      const response = await axiosInstance.post(`/resource`, form)
      return response
    } catch (err) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

/**
 * Get user
 * this request for the super admin
 * the id in params is not required but used for backend middleware issue.
 */

export const getAllUsers = createAsyncThunk(
  'get-all-users',
  async (
    {search = '', plan = '', blocked = 'all', offset, users = 'admin'}: searchUserType,
    {rejectWithValue}: any
  ) => {
    try {
      let queryString = new URLSearchParams({
        search,
        plan,
        blocked,
        offset,
        users,
      })
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      const response = await axiosInstance.get(`/users/all/${userId}?${queryString}`)
      return response
    } catch (err) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'update-user',
  async (data: any, {rejectWithValue}: any) => {
    try {
      let newData = data
      if (newData?.subscriptionId?.id) {
        newData = {
          ...newData,
          subscriptionId: newData?.subscriptionId?.id,
        }
      }
      const response = await axiosInstance.post(`/users/update-user/${newData.id}`, {...newData})
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
