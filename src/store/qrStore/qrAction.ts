const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

interface GetFoldersProps {
  userId: string
}

interface updateQrProps {
  qrId: string
  data: string
}

interface duplicate {
  qrId: string
}

interface getQrProps {
  type: string
  offset: string
}
interface searchQrType {
  qrName: string
  qrStatus: string
  qrType: string
  sortBy: string
  searchType: string
  qrFolder: string
  qrLabel: string
  offset: number
  limit: number
}
interface setTemplateProps {
  userId: string
  templateName: string
  qrImage: string
  qrStyle: string
  qrFrame: string
  qrFrameColor: string
  qrEyeBallColor: string
  qrEyeFrameColor: string
  qrTextColor: string
  bgColor: string
  fgColor: string
  logo: string
  logoSize: string
  eyeBall: string
  eyeFrame: string
  pattern: string
}
export const getUserQrFolders = createAsyncThunk(
  'user-qr-folders',
  async (_: GetFoldersProps, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      const response = await axiosInstance.get(`/folder/user/${userId}`)
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const createFolder = createAsyncThunk(
  'create-qr-folders',
  async (name: string, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      let data = {
        owner: userId,
        name: name,
      }
      const res = await axiosInstance.post(`/folder`, data)
      return {
        id: res.id,
        name: res.name,
        createdAt: res.createdAt,
        qrs: 0,
      }
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
export const createLabel = createAsyncThunk(
  'create-qr-labels',
  async (name: string, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      let data = {
        owner: userId,
        name: name,
      }
      const res = await axiosInstance.post(`/label`, data)
      return {
        id: res._id,
        owner: res.owner,
        name: res.name,
        createdAt: res.createdAt,
        qrs: 0,
      }
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
export const getUserQrLabels = createAsyncThunk(
  'user-qr-labels',
  async (data: GetFoldersProps, {rejectWithValue}: any) => {
    try {
      const {userId} = data
      const response = await axiosInstance.get(`/label/user/${userId}`)
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getAllQrCodes = createAsyncThunk(
  'get-all-qr',
  async (data: getQrProps, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      const res = await axiosInstance.get(
        `/qr/user/${userId}?type=${data.type}&offset=${data.offset}&limit=10`
      )
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const updateQrCode = createAsyncThunk(
  'update-one-qr',
  async ({qrId, data}: updateQrProps, {rejectWithValue}: any) => {
    try {
      const res = await axiosInstance.put(`/qr/${qrId}`, data)
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const deleteSelectedQrCode = createAsyncThunk(
  'delete-all-selected-qr',
  async ({data}: updateQrProps, {rejectWithValue}: any) => {
    try {
      const res = await axiosInstance.post(`/qr/deleteselected`, data)
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const searchQrCodes = createAsyncThunk(
  'search-qrs',
  async (
    {
      qrName = '',
      qrStatus = '',
      qrType = '',
      sortBy = '',
      searchType = 'all',
      qrFolder = '',
      qrLabel = '',
      offset = 0, // Add offset and limit parameters with default values
      limit = 10,
    }: searchQrType,
    {rejectWithValue}: any
  ) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      let queryString = new URLSearchParams({
        qrName,
        qrStatus,
        qrType,
        sortBy,
        qrFolder,
        searchType,
        qrLabel,
        offset: String(offset), // Convert offset to a string
        limit: String(limit), // Convert limit to a string
      })

      const res = await axiosInstance.get(`/qr/user/search/${userId}?${queryString}`)
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getFoldersQrs = createAsyncThunk(
  'qrs/folders',
  async (id: string, {rejectWithValue}: any) => {
    try {
      const res = await axiosInstance.get(`/folder/${id}`)
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const setTemplate = createAsyncThunk(
  'set-template',
  async (data: setTemplateProps, {rejectWithValue}: any) => {
    try {
      const res = await axiosInstance.post(`/template/`, data)
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const duplicateQr = createAsyncThunk(
  'duplicate-one-qr',
  async ({qrId}: duplicate, {rejectWithValue}: any) => {
    try {
      const res = await axiosInstance.post(`/qr/duplicate/${qrId}`)
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
