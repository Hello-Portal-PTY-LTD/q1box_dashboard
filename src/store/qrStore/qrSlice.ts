import {createSlice} from '@reduxjs/toolkit'
import {
  getUserQrFolders,
  createFolder,
  getAllQrCodes,
  updateQrCode,
  searchQrCodes,
  createLabel,
  getUserQrLabels,
  duplicateQr,
} from './qrAction'

interface QRState {
  qrLabels: [
    {
      name: string
      owner: string
      id: string
      createdAt: string
    }
  ]

  foldersInfo: {
    currentPage: number
    totalItems: number
    totalPages: number
    qrFolders: [
      {
        name: string
        owner: string
        id: string
        createdAt: string
      }
    ]
  }

  qrsInfo: {
    currentPage: number
    totalRecords: number
    totalPages: number
    qrs: []
  }
  loading?: boolean
  foldersLoading: boolean
  labelsLoading: boolean
  selectedFolder: string
  offset: string
}

const initialState: QRState = {
  qrLabels: [
    {
      name: '',
      owner: '',
      id: '',
      createdAt: '',
    },
  ],

  foldersInfo: {
    currentPage: 1,
    totalItems: 1,
    totalPages: 1,
    qrFolders: [
      {
        name: '',
        owner: '',
        id: '',
        createdAt: '',
      },
    ],
  },
  qrsInfo: {
    currentPage: 1,
    totalRecords: 1,
    totalPages: 1,
    qrs: [],
  },
  loading: false,
  foldersLoading: false,
  labelsLoading: false,
  selectedFolder: '',
  offset: '',
}

const qrSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setQrFolders: (state, action) => {
      // state.qrFolders = action.payload
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload
    },
    setQrOffset: (state, action) => {
      state.offset = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserQrFolders.pending, (state) => {
        state.foldersLoading = true
      })
      .addCase(getUserQrFolders.fulfilled, (state, action) => {
        state.foldersLoading = false
        state.foldersInfo = action.payload
      })
      .addCase(getUserQrFolders.rejected, (state) => {
        state.foldersLoading = false
      })
      .addCase(getUserQrLabels.pending, (state) => {
        state.labelsLoading = true
      })
      .addCase(getUserQrLabels.fulfilled, (state, action) => {
        state.labelsLoading = false
        state.qrLabels = action.payload
      })
      .addCase(getUserQrLabels.rejected, (state) => {
        state.labelsLoading = false
      })
      .addCase(createFolder.pending, (state) => {
        state.loading = true
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.loading = false
        state.foldersInfo.qrFolders.push(action.payload)
      })
      .addCase(createFolder.rejected, (state) => {
        state.loading = false
      })
      .addCase(createLabel.pending, (state) => {
        state.loading = true
      })
      .addCase(createLabel.fulfilled, (state, action) => {
        state.loading = false
        state.qrLabels.push(action.payload)
      })
      .addCase(createLabel.rejected, (state) => {
        state.loading = false
      })
      .addCase(getAllQrCodes.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllQrCodes.fulfilled, (state, action) => {
        state.loading = false
        state.qrsInfo = action.payload
      })
      .addCase(getAllQrCodes.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateQrCode.pending, (state) => {
        state.loading = true
      })
      .addCase(updateQrCode.fulfilled, (state, action) => {
        state.loading = false
        // state.qrCodes = action.payload
      })
      .addCase(updateQrCode.rejected, (state) => {
        state.loading = false
      })
      .addCase(searchQrCodes.pending, (state) => {
        state.loading = true
      })
      .addCase(searchQrCodes.fulfilled, (state, action) => {
        state.loading = false
        state.qrsInfo = action.payload
      })
      .addCase(searchQrCodes.rejected, (state) => {
        state.loading = false
      })
      .addCase(duplicateQr.pending, (state) => {
        state.loading = true
      })
      .addCase(duplicateQr.fulfilled, (state, action: any) => {
        state.loading = false
      })
      .addCase(duplicateQr.rejected, (state) => {
        state.loading = false
      })

    // .addCase(getFoldersQrs.pending, (state) => {
    //   state.loading = true
    // })
    // .addCase(getFoldersQrs.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.qrCodes = action.payload.qrs
    // })
    // .addCase(getFoldersQrs.rejected, (state) => {
    //   state.loading = false
    // })
  },
})

export const {setQrFolders, setSelectedFolder, setQrOffset} = qrSlice.actions
export default qrSlice.reducer
