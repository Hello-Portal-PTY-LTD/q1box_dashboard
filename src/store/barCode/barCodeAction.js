import {message} from 'antd'
import imageCompression from 'browser-image-compression'
const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

// import {toast} from 'react-toastify'

export const saveQrCode = createAsyncThunk('saveQrCode', async (payload, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.post(`/qr`, payload)
    return response
  } catch (err) {
    if (err.status === 402) {
      window.location.href = '/plan-expired'
      message.info(err?.data?.error)
    } else if (err.status === 405) {
      message.error(err?.data?.message)
    } else if (err.status === 403) {
      message.error(err?.data?.message, {
        toastId: 'Qr code creation',
      })
    } else {
      message.error(err?.data?.message)
    }

    return rejectWithValue(err?.data?.message)
  }
})

export const setAnalytics = createAsyncThunk('setAnalytics', async (payload, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.post(`/analytics`, payload)
    return response
  } catch (err) {
    message.error('There is a problem!')
    return rejectWithValue(err?.data?.message)
  }
})

export const getQrCode = createAsyncThunk('get/Qr/code', async (qrId, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get(`/qr/${qrId}`)

    return response
  } catch (err) {
    message.error('There is a problem!')
    return rejectWithValue(err?.data?.message)
  }
})

async function FileCompressor(file) {
  const imageForUpload = file
  const options = {
    maxSizeMB: 3,
    useWebWorker: true,
  }
  let compressedFile
  try {
    compressedFile = await imageCompression(imageForUpload, options)
    return compressedFile
  } catch (error) {
    console.log('Error in upload >> ', error)
  }
}

export const uploadLogo = createAsyncThunk('upload/file/logo', async (file, {rejectWithValue}) => {
  const form = new FormData()

  for (let i = 0; i < file.length; i++) {
    try {
      const compressedFile = await FileCompressor(file[i])
      form.append('files', compressedFile)
    } catch (error) {
      console.error(`Error compressing file ${i}:`, error)
    }
  }

  try {
    const response = await axiosInstance.post(`/resource`, form)
    return response
  } catch (err) {
    // toast.error('err while uploading file', {
    //   toastId: 'There is a problem while fetching qr',
    // })
    return rejectWithValue(err?.data?.message)
  }
})

export const uploadFileGCP = createAsyncThunk(
  'upload/file/gcp',
  async (file, {rejectWithValue}) => {
    const form = new FormData()

    for (let i = 0; i < file.length; i++) {
      form.append('files', file[i])
    }

    try {
      const response = await axiosInstance.post(`/resource`, form)
      return response
    } catch (err) {
      message.error('Error while uploading file')

      return rejectWithValue(err?.data?.message)
    }
  }
)

export const updateTheQrCode = createAsyncThunk(
  'updateQrCode',
  async ({id, payload}, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.put(`/qr/${id}`, {
        ...payload,
      })

      return response
    } catch (err) {
      message.error('There is a problem!')
      return rejectWithValue(err?.data?.message)
    }
  }
)
export const getTemplates = createAsyncThunk('get-Templates', async (_, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get(`/template/`)

    return response
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

export const deleteTemplate = createAsyncThunk(
  'delete-Templates',
  async (id, {rejectWithValue}) => {
    try {
      await axiosInstance.post(`/template/delete/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message)
    }
  }
)
export const getBase64 = createAsyncThunk('get-base64', async (url, {rejectWithValue}) => {
  try {
    const res = await axiosInstance.post(`/resource/getbase64`, {url})
    return res
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message)
  }
})
