const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')
interface inviteUser {
  role: string
  email: string
  fullName: string
}

interface getTeamMemberss {
  isDeleted: boolean
  offset: number
}
// ** this is the same calls used for the super admin users that he add by him self

export const sendInvite = createAsyncThunk(
  'send-user-invite',
  async (data: inviteUser, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const createdBy = user.userId
      const newdata = {
        ...data,
        createdBy,
      }
      const res = await axiosInstance.post(`/users`, newdata)
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getTeamMembers = createAsyncThunk(
  'get-team-members',
  async ({isDeleted, offset}: getTeamMemberss, {rejectWithValue}: any) => {
    try {
      // 12 limit for grid position of elements that is users page
      let limit = !isDeleted ? 12 : 10
      const res = await axiosInstance.get(
        `/users/?isDeleted=${isDeleted}&offset=${offset}&limit=${limit}`
      )
      return {
        isDeleted,
        res: res,
      }
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
export const searchTeamMembers = createAsyncThunk(
  'search-team-members',
  async (searchTerm: string, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      const res = await axiosInstance.get(`/users/teamsearch/${userId}?searchTerm=${searchTerm}`)
      return res
    } catch (err) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const deleteMember = createAsyncThunk(
  'delete-member',
  async (userId: string, {rejectWithValue}: any) => {
    try {
      // const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      // const userId = user.userId
      const res = await axiosInstance.put(`/users/user-super/${userId}`)
      return res
    } catch (err) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const updateMember = createAsyncThunk(
  'updated-member',
  async (data: any, {rejectWithValue}: any) => {
    try {
      const userInfo = data
      const response = await axiosInstance.post(`/users/update-user/${userInfo.id}`, {...data})
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
