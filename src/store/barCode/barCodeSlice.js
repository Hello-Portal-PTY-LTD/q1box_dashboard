import {createSlice, current} from '@reduxjs/toolkit'

import {
  getQrCode,
  saveQrCode,
  setAnalytics,
  uploadFileGCP,
  updateTheQrCode,
  getTemplates,
  uploadLogo,
  getBase64,
  deleteTemplate,
} from './barCodeAction'
import {GRAPHICS_QR} from 'app/modules/GeneratoreBox/graphics'

const templateArray = [
  {
    _id: 1,
    qrImage: GRAPHICS_QR.QR_1,
    selected: false,
    type: 'plain',
    pattern: 'plain',
    eyeFrame: 'eye-frame-plain-square',
    eyeBall: 'eye-ball-plain-square',
  },
  {
    _id: 2,
    qrImage: GRAPHICS_QR.QR_5,
    selected: false,
    type: 'dots',
    pattern: 'dots',
    eyeFrame: 'eye-frame-rounded',
    eyeBall: 'eye-ball-plain-square',
  },
  {
    _id: 3,
    qrImage: GRAPHICS_QR.QR_3,
    selected: false,
    type: 'ScanButton',
    logo: 'youtube_plain',

    bgColor: '#ffffff',
    fgColor: '#000000',
    qrEyeFrameColor: '#000000',
    qrEyeBallColor: '#000000',
  },
  {
    _id: 4,
    qrImage: GRAPHICS_QR.QR_2,
    selected: false,
    type: 'ScanTagButton',
    logo: 'facebook',
    bgColor: '#000000',
    fgColor: '#ffffff',
    qrEyeFrameColor: '#ffffff',
    qrEyeBallColor: '#ffffff',
    pattern: 'dots',
    eyeFrame: 'eye-frame-rounded',
    eyeBall: 'eye-ball-plain-square',
  },
]

const initialState = {
  qrType: '',
  eyeBall: 'eye-ball-plain-square',
  eyeFrame: 'eye-frame-plain-square',
  pattern: 'plain',
  bgColor: '#ffffff',
  fgColor: '#000000',
  qrFrame: 'none',
  qrTemplate: 'none',
  qrEyeBallColor: '#000000',
  qrEyeFrameColor: '#000000',
  qrTextColor: '#000000',
  qrFrameColor: '#FF0000',
  modalTab: 'TEMPLATES',
  qrCodeUrl: `${process.env.REACT_APP_QR_APP}/DefaultQrPage`,
  qrFile: '',
  coverImage: '',
  profileImage: '',
  formSubmitted: false,
  folderModal: false,
  templates: templateArray,
  templatesLoading: false,
  logoSize: 0.4,
  qrFrameButtonText: 'Scan Me',
  qrErrorLevel: 'H',
  logoBase: '',
  logo: '',
  eyeRadius: {
    innerRadius: [0, 0, 0, 0],
    outerRadius: [0, 0, 0, 0],
  },
  aspectRatio: 1 / 1,
  templateType: '',
  logoUploading: false,
  templateName: '',
  templateLoading: false,
  fileList: [],
}

const barCodeSlice = createSlice({
  name: 'barCode',
  initialState,
  reducers: {
    setInnerEyeRadius: (state, action) => {
      state.eyeRadius.innerRadius = action.payload
    },
    setOuterEyeRadius: (state, action) => {
      state.eyeRadius.outerRadius = action.payload
    },
    setSelectedTemplate: (state, action) => {
      state.templateName = action.payload
    },
    setQrType: (state, action) => {
      state.qrType = action.payload
    },
    setFiles: (state, action) => {
      state.files.push(action.payload)
    },
    removeFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload.id)
    },
    update: (state, action) => {
      state.files.push(action.payload)
    },
    setEyeFrame: (state, action) => {
      state.eyeFrame = action.payload
    },
    setEyeBall: (state, action) => {
      state.eyeBall = action.payload
    },
    setPattern: (state, action) => {
      state.pattern = action.payload
    },
    setQrFrameText: (state, action) => {
      state.qrFrameButtonText = action.payload
    },
    setBgColor: (state, action) => {
      state.bgColor = action.payload
    },
    setLogoSize: (state, action) => {
      state.logoSize = action.payload
    },
    setFgColor: (state, action) => {
      state.fgColor = action.payload
    },
    setErrorLevel: (state, action) => {
      state.qrErrorLevel = action.payload
    },
    setLogoAspect: (state, action) => {
      state.aspectRatio = action.payload
    },
    setQrFrame: (state, action) => {
      state.qrFrame = action.payload
      state.qrTemplate = 'none'
    },
    setLogo: (state, action) => {
      state.logo = action.payload
    },
    setFileList: (state, action) => {
      state.fileList = action.payload
    },
    setQrTemplate: (state, action) => {
      const type = action.payload
      state.qrTemplate = type
      if (type !== 'Custom') {
        state.qrFrame = 'none'
      }
    },
    setTemplateType: (state, action) => {
      state.templateType = action.payload
    },
    setEyeBallColor: (state, action) => {
      state.qrEyeBallColor = action.payload
    },
    setEyeFrameColor: (state, action) => {
      state.qrEyeFrameColor = action.payload
    },
    setQrTextColor: (state, action) => {
      state.qrTextColor = action.payload
    },
    setQrFrameColor: (state, action) => {
      state.qrFrameColor = action.payload
    },
    setModalTab: (state, action) => {
      state.modalTab = action.payload
    },
    setQrUrl: (state, action) => {
      state.qrCodeUrl = action.payload
    },
    setQrFile: (state, action) => {
      state.qrFile = action.payload
    },
    setCoverImage: (state, action) => {
      state.coverImage = action.payload
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload
    },
    setFormSubmitted: (state, action) => {
      state.formSubmitted = action.payload
    },
    setFolderModal: (state, action) => {
      state.folderModal = action.payload
    },
    // setLogo: (state, action) => {
    //   state.logo = action.payload
    // },
    setName: (state, action) => {
      state.qrName = action.payload
    },
    setFolder: (state, action) => {
      state.qrFolder = action.payload
    },
    setLogoBase: (state, action) => {
      state.logoBase = action.payload
    },
    setQrErrorLevel: (state, action) => {
      state.qrErrorLevel = action.payload
    },
    setTemplateLoading: (state, action) => {
      console.log('action', action.payload)
      state.templateLoading = action.payload
    },
    setQrCodeState: (state, action) => {
      const {id, ...payload} = action.payload
      const updatedData = {
        ...initialState,
        ...payload,
        templates: state.templates,
        templateType: state.templateType,
      }
      return updatedData
    },
    setQrCodeUrl: (state, action) => {
      state.qrCodeUrl = `${process.env.REACT_APP_QR_APP}Q1/${action.payload}`
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveQrCode.pending, (state) => {
        state.loading = true
      })
      .addCase(saveQrCode.fulfilled, (state, action) => {
        state.loading = false
        state.qrCodeUrl = `${process.env.REACT_APP_QR_APP}/Q1/` + action?.payload?.shortId
      })
      .addCase(saveQrCode.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateTheQrCode.pending, (state) => {
        state.loading = true
      })
      .addCase(updateTheQrCode.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateTheQrCode.rejected, (state) => {
        state.loading = false
      })
      .addCase(setAnalytics.pending, (state) => {
        state.loading = true
      })
      .addCase(setAnalytics.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(setAnalytics.rejected, (state) => {
        state.loading = false
      })
      .addCase(deleteTemplate.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.loading = false
        console.log(action.payload)
        const currentTemplates = current(state.templates)
        const newTemplates = currentTemplates.filter((template) => template._id !== action.payload)

        state.templates = [...newTemplates]
      })
      .addCase(deleteTemplate.rejected, (state) => {
        state.loading = false
      })
      .addCase(getQrCode.pending, (state) => {
        state.loading = true
      })
      .addCase(getQrCode.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(getQrCode.rejected, (state) => {
        state.loading = false
      })

      .addCase(uploadFileGCP.pending, (state) => {
        state.loading = true
      })
      .addCase(uploadFileGCP.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(uploadFileGCP.rejected, (state) => {
        state.loading = false
      })
      .addCase(uploadLogo.pending, (state) => {
        state.logoUploading = true
      })
      .addCase(uploadLogo.fulfilled, (state, action) => {
        state.logoUploading = false
      })
      .addCase(uploadLogo.rejected, (state) => {
        state.logoUploading = false
      })
      .addCase(getTemplates.pending, (state) => {
        state.templatesLoading = true
      })
      .addCase(getTemplates.fulfilled, (state, action) => {
        const newTemplates = action?.payload
        if (newTemplates?.length > 0) {
          state.templatesLoading = false
          const uniqueNewTemplates = newTemplates.filter((newTemplate) => {
            return !state.templates.some(
              (existingTemplate) => existingTemplate._id === newTemplate._id
            )
          })
          state.templates = [...state.templates, ...uniqueNewTemplates]
        }
      })
      .addCase(getTemplates.rejected, (state) => {
        state.templatesLoading = false
      })
      .addCase(getBase64.pending, (state) => {
        state.loading = true
      })
      .addCase(getBase64.fulfilled, (state, action) => {
        state.loading = false
        if (state.templateType === 'Custom') {
          state.logoBase = action.payload
        }
      })
      .addCase(getBase64.rejected, (state) => {
        state.loading = false
      })
  },
})

export const {
  setQrType,
  setFiles,
  removeFile,
  update,
  setEyeFrame,
  setEyeBall,
  setPattern,
  setBgColor,
  setFgColor,
  setErrorLevel,
  setQrFrame,
  setQrTemplate,
  setEyeBallColor,
  setEyeFrameColor,
  setFormSubmitted,
  setQrTextColor,
  setQrFrameColor,
  setDecorateModal,
  setModalTab,
  setQrUrl,
  setQrFile,
  setCoverImage,
  setProfileImage,
  setQrCodeState,
  setFolderModal,
  setForSub,
  setName,
  setFolder,
  setLogoBase,
  setLogo,
  setTemplateType,
  setInnerEyeRadius,
  setOuterEyeRadius,
  setLogoAspect,
  setSelectedTemplate,
  setLogoSize,
  setQrErrorLevel,
  setQrFrameText,
  setTemplateLoading,
  setQrCodeUrl,
  setFileList,
} = barCodeSlice.actions

export default barCodeSlice.reducer
